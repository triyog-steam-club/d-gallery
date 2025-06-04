"use server";

import { createClient } from "@supabase/supabase-js";
import type { CollectionWithImages } from "@/lib/types";

console.log(process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BUCKET = "pictures";

async function debugStorage() {
  // List all buckets in your Supabase project
  const { data: buckets, error: bucketErr } = await supabase.storage.listBuckets();
  console.log("Buckets:", buckets, "Error:", bucketErr);

  // List root items inside your pictures bucket
  const { data: rootItems, error: rootErr } = await supabase.storage.from("pictures").list("", { limit: 100 });
  console.log("Root items in 'pictures' bucket:", rootItems, "Error:", rootErr);
}



// Test function - run this first to debug
export async function testSinglePhotographer(testPhotographer: string) {

  
  console.log('Testing storage access...');

  // List root items (should be folders)
  const { data: rootItems, error: rootError } = await supabase.storage.from("pictures").list("", { limit: 100 });

  console.log('Root items:', rootItems);
  console.log('Root error:', rootError);

  if (rootError) {
    console.error('Error listing root:', rootError);
    return;
  }

  // Check if testPhotographer folder exists
  const foundFolder = rootItems?.find(item => item.name === testPhotographer && item.metadata?.mimetype === undefined);

  if (!foundFolder) {
    console.error(`Folder for photographer "${testPhotographer}" not found in root!`);
    return;
  }

  // List files inside the photographer folder
  const { data: files, error: filesError } = await supabase.storage.from("pictures").list(testPhotographer, { limit: 100 });

  console.log(`Files in ${testPhotographer} folder:`, files);
  console.log(`Files error:`, filesError);

  if (filesError) {
    console.error(`Error listing files in folder ${testPhotographer}:`, filesError);
    return;
  }

  if (!files || files.length === 0) {
    console.error(`No files found inside folder ${testPhotographer}`);
    return;
  }

  // Generate URLs for image files
  const imageFiles = files.filter(f => /\.(jpe?g|png|webp)$/i.test(f.name));

  if (imageFiles.length === 0) {
    console.error(`No image files found inside folder ${testPhotographer}`);
    return;
  }

  const firstImage = imageFiles[0];
  const encodedPath = encodeURIComponent(testPhotographer) + "/" + encodeURIComponent(firstImage.name);

  const url = supabase.storage.from("pictures").getPublicUrl(encodedPath).data.publicUrl;

  console.log('Sample public URL:', url);
  console.log('Try opening this URL in a new tab.');
}


const photographers = [
  "Aaditya Poudel",
  "Anshu Acharya", 
  "Mayan Manandar",
  "Pranisha Rimal",
  "Riyans Niroula",
  "Roshik Poudel",
  "Shivanshu Shrestha",
  "Simran Khadka",
  "Swornim Gurung",
  "Usha Bohora KC",
];

export async function getCollections(): Promise<any> {
  console.log('Starting getCollections...');
  console.log('BUCKET:', BUCKET); // Check if BUCKET is defined
  await debugStorage();

  
  const collections: any = [];
  
  for (const photographer of photographers) {
    testSinglePhotographer(photographer);

    try {
      console.log(`Fetching files for: ${photographer}`);
      
      const { data: files, error } = await supabase.storage
        .from(BUCKET)
        .list(photographer, { 
          limit: 100,
          sortBy: { column: 'name', order: 'asc' }
        });

      if (error) {
        console.error(`Error fetching files for ${photographer}:`, error);
        continue;
      }

      console.log(`Found ${files?.length || 0} files for ${photographer}:`, files);

      if (!files || files.length === 0) {
        console.warn(`No files found for ${photographer}`);
        continue;
      }

      const imageFiles = files.filter((f) => 
        /\.(jpe?g|png|webp|gif)$/i.test(f.name)
      );
      
      console.log(`Filtered to ${imageFiles.length} image files for ${photographer}`);

      const imageUrls = imageFiles.map((f) => {
        const url = supabase.storage
          .from(BUCKET)
          .getPublicUrl(`${photographer}/${f.name}`).data.publicUrl;
        console.log(`Generated URL: ${url}`);
        return url;
      });

      if (imageUrls.length > 0) {
        collections.push({
          title: photographer,
          images: imageUrls,
        });
      }
    } catch (err) {
      console.error(`Failed to get images for ${photographer}:`, err);
    }
  }

  console.log('Final collections:', collections);
  return collections;
}