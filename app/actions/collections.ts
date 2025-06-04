"use server";

import { createServerClient } from "@/lib/supabase";
import type { Collection, Image, CollectionWithImages } from "@/lib/types";

export async function getCollections(): Promise<CollectionWithImages[]> {
  const supabase = createServerClient();

  // Fetch collections
  const { data: collections, error: collectionsError } = await supabase
    .from("collections")
    .select("*")
    .order("created_at", { ascending: false });

  if (collectionsError) {
    console.error("Error fetching collections:", collectionsError);
    return [];
  }

  // Fetch images for all collections
  const collectionIds = collections.map((collection) => collection.id);
  const { data: images, error: imagesError } = await supabase
    .from("images")
    .select("*")
    .in("collection_id", collectionIds)
    .order("order", { ascending: true });

  if (imagesError) {
    console.error("Error fetching images:", imagesError);
    return [];
  }

  // Group images by collection_id
  const imagesByCollection: Record<number, string[]> = {};
  images.forEach((image: Image) => {
    if (!imagesByCollection[image.collection_id]) {
      imagesByCollection[image.collection_id] = [];
    }
    imagesByCollection[image.collection_id].push(image.url);
  });

  // Combine collections with their images
  const collectionsWithImages: CollectionWithImages[] = collections.map(
    (collection: Collection) => ({
      ...collection,
      images: imagesByCollection[collection.id] || [],
    })
  );

  return collectionsWithImages;
}

export async function getCollectionById(
  id: number
): Promise<CollectionWithImages | null> {
  const supabase = createServerClient();

  // Fetch collection
  const { data: collection, error: collectionError } = await supabase
    .from("collections")
    .select("*")
    .eq("id", id)
    .single();

  if (collectionError || !collection) {
    console.error("Error fetching collection:", collectionError);
    return null;
  }

  // Fetch images for the collection
  const { data: images, error: imagesError } = await supabase
    .from("images")
    .select("*")
    .eq("collection_id", id)
    .order("order", { ascending: true });

  if (imagesError) {
    console.error("Error fetching images:", imagesError);
    return null;
  }

  // Extract image URLs
  const imageUrls = images.map((image: Image) => image.url);

  // Combine collection with its images
  const collectionWithImages: CollectionWithImages = {
    ...collection,
    images: imageUrls,
  };

  return collectionWithImages;
}
