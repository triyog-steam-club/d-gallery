"use client";

import { useState } from "react";
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
import { collections } from "@/app/data/collection";

interface CollectionDetailProps {
  collectionId: number;
}

const CollectionDetail = ({ collectionId }: CollectionDetailProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { theme, setTheme } = useTheme();

  const collection = collections.find((c) => c.id === collectionId);

  if (!collection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-black dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Collection not found
          </h1>
          <Link href="/">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Gallery
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getGradeColor = (grade: number) => {
    if (grade >= 9) return "bg-emerald-500 dark:bg-emerald-600";
    if (grade >= 8) return "bg-emerald-500 dark:bg-emerald-600";
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Gallery
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {collection.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {collection.images.length} photos
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-1" />
                {collection.likes}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Content - Photo Grid */}
        <div className="flex justify-center items-center mb-8">
          <div className="grid grid-cols-5 grid-rows-3 gap-3 max-w-[900px] w-full h-[600px]">
            {collection.images[0] && (
              <Dialog>
                <DialogTrigger asChild>
                  <div className="col-span-2 row-span-2 relative overflow-hidden rounded-xl cursor-pointer group">
                    <Image
                      src={collection.images[0] || "/placeholder.svg"}
                      alt={`${collection.title} - Image 1`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh]">
                  <div className="relative h-[80vh]">
                    <Image
                      src={collection.images[0] || "/placeholder.svg"}
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
                  <div className="relative overflow-hidden rounded-xl cursor-pointer group">
                    <Image
                      src={collection.images[1] || "/placeholder.svg"}
                      alt={`${collection.title} - Image 2`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh]">
                  <div className="relative h-[80vh]">
                    <Image
                      src={collection.images[1] || "/placeholder.svg"}
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
                  <div className="relative overflow-hidden rounded-xl cursor-pointer group">
                    <Image
                      src={collection.images[2] || "/placeholder.svg"}
                      alt={`${collection.title} - Image 3`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh]">
                  <div className="relative h-[80vh]">
                    <Image
                      src={collection.images[2] || "/placeholder.svg"}
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
                  <div className="row-span-2 relative overflow-hidden rounded-xl cursor-pointer group">
                    <Image
                      src={collection.images[3] || "/placeholder.svg"}
                      alt={`${collection.title} - Image 4`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh]">
                  <div className="relative h-[80vh]">
                    <Image
                      src={collection.images[3] || "/placeholder.svg"}
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
                  <div className="relative overflow-hidden rounded-xl cursor-pointer group">
                    <Image
                      src={collection.images[4] || "/placeholder.svg"}
                      alt={`${collection.title} - Image 5`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh]">
                  <div className="relative h-[80vh]">
                    <Image
                      src={collection.images[4] || "/placeholder.svg"}
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
                  <div className="relative overflow-hidden rounded-xl cursor-pointer group">
                    <Image
                      src={collection.images[5] || "/placeholder.svg"}
                      alt={`${collection.title} - Image 6`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    {collection.images.length > 6 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">
                          +{collection.images.length - 6}
                        </span>
                      </div>
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh]">
                  <div className="relative h-[80vh]">
                    <Image
                      src={collection.images[5] || "/placeholder.svg"}
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
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              More Images
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {collection.images.slice(6).map((image, index) => (
                <Dialog key={index + 6}>
                  <DialogTrigger asChild>
                    <Card className="overflow-hidden border-0 shadow-lg bg-gray-50 dark:bg-gray-800 group cursor-pointer">
                      <div className="relative h-48">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${collection.title} - Image ${index + 7}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl max-h-[90vh]">
                    <div className="relative h-[80vh]">
                      <Image
                        src={image || "/placeholder.svg"}
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

        {/* Collection Info - Left Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Collection Info */}
          <Card className="bg-gray-50 dark:bg-gray-800 border-0 shadow-lg lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Collection Details
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {collection.caption}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          {collection.photographers.join(", ")}
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
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
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
                        {collection.photographers.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card className="bg-gray-50 dark:bg-gray-800 border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Actions
              </h3>
              <div className="space-y-3">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
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
