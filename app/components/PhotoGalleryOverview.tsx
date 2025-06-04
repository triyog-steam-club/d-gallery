"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Camera,
  Search,
  Grid,
  List,
  Heart,
  Moon,
  Sun,
  GraduationCap,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { collections } from "@/app/data/collection";

const PhotoGalleryOverview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { theme, setTheme } = useTheme();

  const filteredCollections = collections.filter((collection) => {
    const matchesSearch =
      collection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collection.photographers.some((p) =>
        p.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "All" || collection.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getGradeColor = (grade: number) => {
    if (grade >= 9) return "bg-emerald-500 dark:bg-emerald-600";
    if (grade >= 8) return "bg-blue-500 dark:bg-blue-600";
    if (grade >= 7) return "bg-yellow-500 dark:bg-yellow-600";
    if (grade >= 6) return "bg-orange-500 dark:bg-orange-600";
    return "bg-red-500 dark:bg-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-black dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md border-b dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Digital Photo Gallery
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Discover stunning photography collections from talented artists
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search collections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
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
      </div>

      {/* Gallery Overview */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCollections.map((collection) => (
              <Link key={collection.id} href={`/collection/${collection.id}`}>
                <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-900 cursor-pointer">
                  <div className="relative">
                    {/* Preview Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={collection.images[0] || "/placeholder.svg"}
                        alt={collection.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                      {/* Image Count Overlay */}
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant="secondary"
                          className="bg-black/50 text-white border-0"
                        >
                          {collection.images.length} photos
                        </Badge>
                      </div>

                      {/* Grade Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge
                          className={`${getGradeColor(
                            collection.grade
                          )} text-white border-0`}
                        >
                          <GraduationCap className="w-3 h-3 mr-1" />
                          Grade {collection.grade}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {collection.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
                          {collection.caption}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Camera className="w-4 h-4" />
                        <span>
                          {collection.photographers.length} photographer
                          {collection.photographers.length > 1 ? "s" : ""}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="rounded-full text-xs"
                          >
                            {collection.category}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {collection.date}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                          <Heart className="w-4 h-4" />
                          <span>{collection.likes}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCollections.map((collection) => (
              <Link key={collection.id} href={`/collection/${collection.id}`}>
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 cursor-pointer">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 h-32 sm:h-auto relative">
                      <Image
                        src={collection.images[0] || "/placeholder.svg"}
                        alt={collection.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {collection.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                            {collection.caption}
                          </p>
                        </div>
                        <Badge
                          className={`${getGradeColor(
                            collection.grade
                          )} text-white border-0 ml-4`}
                        >
                          <GraduationCap className="w-3 h-3 mr-1" />
                          Grade {collection.grade}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Camera className="w-4 h-4" />
                            <span>
                              {collection.photographers.length} photographer
                              {collection.photographers.length > 1 ? "s" : ""}
                            </span>
                          </div>
                          <Badge
                            variant="secondary"
                            className="rounded-full text-xs"
                          >
                            {collection.category}
                          </Badge>
                          <span className="text-xs">{collection.date}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{collection.likes}</span>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {filteredCollections.length === 0 && (
          <div className="text-center py-16">
            <Camera className="w-16 h-16 text-gray-300 dark:text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No collections found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGalleryOverview;
