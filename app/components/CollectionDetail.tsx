"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  ArrowLeft,
  Camera,
  Heart,
  Share2,
  Download,
  Moon,
  Sun,
  GraduationCap,
  Calendar,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { getCollectionById } from "@/app/actions/collections";
import type { CollectionWithImages } from "@/lib/types";

interface CollectionDetailProps {
  collectionId: number;
}

const CollectionDetail = ({ collectionId }: CollectionDetailProps) => {
  const [collection, setCollection] = useState<CollectionWithImages | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const fetchCollection = async () => {
      setLoading(true);
      try {
        const data = await getCollectionById(collectionId);
        setCollection(data);
      } catch (error) {
        console.error("Error fetching collection:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-black dark:to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f272ad]"></div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-black dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Collection not found
          </h1>
          <Link href="/">
            <Button className="bg-[#f272ad] hover:bg-[#e85ba0]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Gallery
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getGradeColor = (grade: number) => {
    if (grade >= 9) return "bg-[#f272ad] dark:bg-[#f272ad]";
    if (grade >= 8) return "bg-[#f272ad] dark:bg-[#f272ad]";
    if (grade >= 7) return "bg-yellow-500 dark:bg-yellow-600";
    if (grade >= 6) return "bg-orange-500 dark:bg-orange-600";
    return "bg-red-500 dark:bg-red-600";
  };

  const getGradeDescription = (grade: number) => {
    if (grade >= 9) return "Excellent";
    if (grade >= 8) return "Very Good";
    if (grade >= 7) return "Good";
    if (grade >= 6) return "Satisfactory";
    return "Needs Improvement";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-black dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md border-b dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-y-2">
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 px-2 sm:h-9 sm:px-4"
                >
                  <ArrowLeft className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate max-w-[200px] sm:max-w-none">
                  {collection.title}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  {collection.images.length} photos
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3"
              >
                <Heart className="w-4 h-4 sm:mr-1" />
                <span className="hidden sm:inline">{collection.likes}</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3"
              >
                <Share2 className="w-4 h-4 sm:mr-1" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3"
              >
                <Download className="w-4 h-4 sm:mr-1" />
                <span className="hidden sm:inline">Download</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 sm:h-9"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        {/* Main Content - Photo Grid */}
        <div className="flex justify-center items-center mb-6 sm:mb-8">
          <div className="grid grid-cols-5 grid-rows-3 gap-1 sm:gap-3 w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] max-w-[900px]">
            {collection.images[0] && (
              <Dialog>
                <DialogTrigger asChild>
                  <div className="col-span-2 row-span-2 relative overflow-hidden rounded-lg sm:rounded-xl cursor-pointer group">
                    <Image
                      src={
                        collection.images[0] ||
                        "/placeholder.svg?height=300&width=400"
                      }
                      alt={`${collection.title} - Image 1`}
                      fill
                      sizes="(max-width: 900px) 40vw, 360px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh]">
                  <div className="relative h-[80vh]">
                    <Image
                      src={
                        collection.images[0] ||
                        "/placeholder.svg?height=300&width=400"
                      }
                      alt={`${collection.title} - Image 1`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {collection.images[1] && (
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative overflow-hidden rounded-lg sm:rounded-xl cursor-pointer group">
                    <Image
                      src={
                        collection.images[1] ||
                        "/placeholder.svg?height=300&width=400"
                      }
                      alt={`${collection.title} - Image 2`}
                      fill
                      sizes="(max-width: 900px) 20vw, 180px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh]">
                  <div className="relative h-[80vh]">
                    <Image
                      src={
                        collection.images[1] ||
                        "/placeholder.svg?height=300&width=400"
                      }
                      alt={`${collection.title} - Image 2`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {collection.images[2] && (
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative overflow-hidden rounded-lg sm:rounded-xl cursor-pointer group">
                    <Image
                      src={
                        collection.images[2] ||
                        "/placeholder.svg?height=300&width=400"
                      }
                      alt={`${collection.title} - Image 3`}
                      fill
                      sizes="(max-width: 900px) 20vw, 180px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh]">
                  <div className="relative h-[80vh]">
                    <Image
                      src={
                        collection.images[2] ||
                        "/placeholder.svg?height=300&width=400"
                      }
                      alt={`${collection.title} - Image 3`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {collection.images[3] && (
              <Dialog>
                <DialogTrigger asChild>
                  <div className="row-span-2 relative overflow-hidden rounded-lg sm:rounded-xl cursor-pointer group">
                    <Image
                      src={
                        collection.images[3] ||
                        "/placeholder.svg?height=300&width=400"
                      }
                      alt={`${collection.title} - Image 4`}
                      fill
                      sizes="(max-width: 900px) 20vw, 180px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh]">
                  <div className="relative h-[80vh]">
                    <Image
                      src={
                        collection.images[3] ||
                        "/placeholder.svg?height=300&width=400"
                      }
                      alt={`${collection.title} - Image 4`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {collection.images[4] && (
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative overflow-hidden rounded-lg sm:rounded-xl cursor-pointer group">
                    <Image
                      src={
                        collection.images[4] ||
                        "/placeholder.svg?height=300&width=400"
                      }
                      alt={`${collection.title} - Image 5`}
                      fill
                      sizes="(max-width: 900px) 20vw, 180px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh]">
                  <div className="relative h-[80vh]">
                    <Image
                      src={
                        collection.images[4] ||
                        "/placeholder.svg?height=300&width=400"
                      }
                      alt={`${collection.title} - Image 5`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {collection.images.length > 5 && (
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative overflow-hidden rounded-lg sm:rounded-xl cursor-pointer group">
                    <Image
                      src={
                        collection.images[5] ||
                        "/placeholder.svg?height=300&width=400"
                      }
                      alt={`${collection.title} - Image 6`}
                      fill
                      sizes="(max-width: 900px) 20vw, 180px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    {collection.images.length > 6 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-lg sm:text-xl font-bold">
                          +{collection.images.length - 6}
                        </span>
                      </div>
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh]">
                  <div className="relative h-[80vh]">
                    <Image
                      src={
                        collection.images[5] ||
                        "/placeholder.svg?height=300&width=400"
                      }
                      alt={`${collection.title} - Image 6`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Additional Images Grid (if more than 6 images) */}
        {collection.images.length > 6 && (
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-center">
              More Images
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
              {collection.images.slice(6).map((image, index) => (
                <Dialog key={index + 6}>
                  <DialogTrigger asChild>
                    <Card className="overflow-hidden border-0 shadow-lg bg-gray-50 dark:bg-gray-800 group cursor-pointer">
                      <div className="relative aspect-square">
                        <Image
                          src={image || "/placeholder.svg?height=300&width=400"}
                          alt={`${collection.title} - Image ${index + 7}`}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl max-h-[90vh]">
                    <div className="relative h-[80vh]">
                      <Image
                        src={image || "/placeholder.svg?height=300&width=400"}
                        alt={`${collection.title} - Image ${index + 7}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        )}

        {/* Collection Info - Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Collection Info */}
          <Card className="bg-gray-50 dark:bg-gray-800 border-0 shadow-lg lg:col-span-2">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                    Collection Details
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                    {collection.caption}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={`${getGradeColor(
                              collection.grade
                            )} text-white border-0`}
                          >
                            Grade {collection.grade}
                          </Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {getGradeDescription(collection.grade)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Photographers
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {collection.photographer.join(", ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Date
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {collection.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Camera className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          Category
                        </p>
                        <Badge
                          variant="secondary"
                          className="rounded-full mt-1"
                        >
                          {collection.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="md:w-64 bg-white dark:bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    Statistics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Total Photos
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {collection.images.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Likes
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {collection.likes}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">
                        Photographers
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {collection.photographer.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card className="bg-gray-50 dark:bg-gray-800 border-0 shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Actions
              </h3>
              <div className="space-y-3">
                <Button className="w-full bg-[#f272ad] hover:bg-[#e85ba0]">
                  <Download className="w-4 h-4 mr-2" />
                  Download All Images
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Collection
                </Button>
                <Button variant="outline" className="w-full">
                  <Heart className="w-4 h-4 mr-2" />
                  Like Collection
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetail;
