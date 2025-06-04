"use client";

import { useState, useEffect } from "react";
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
  Menu,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { getCollections } from "@/app/actions/collections";
import type { CollectionWithImages } from "@/lib/types";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const PhotoGalleryOverview = () => {
  const [collections, setCollections] = useState<CollectionWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<number | "All">("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      try {
        const data = await getCollections();
        console.log("this is data", data);
        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const grades = ["All", 6, 7, 8, 9, 10];

  const filteredCollections = collections.filter((collection) => {
    const matchesSearch =
      collection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collection.photographer.some((p) =>
        p.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesGrade =
      selectedGrade === "All" || collection.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const getGradeColor = (grade: number) => {
    if (grade >= 9) return "bg-[#f272ad] dark:bg-[#f272ad]";
    if (grade >= 8) return "bg-[#f272ad] dark:bg-[#f272ad]";
    if (grade >= 7) return "bg-yellow-500 dark:bg-yellow-600";
    if (grade >= 6) return "bg-orange-500 dark:bg-orange-600";
    return "bg-red-500 dark:bg-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-black dark:to-gray-900">
      <div className="lg:hidden bg-white/80 dark:bg-black/80 backdrop-blur-md border-b dark:border-gray-700 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Digital Photo Gallery
            </h1>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              {/* <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                  <div className="space-y-6 py-4">
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Search</h2>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search collections..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold mb-2">View Mode</h2>
                      <div className="flex gap-2">
                        <Button
                          variant={viewMode === "grid" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setViewMode("grid")}
                          className={
                            viewMode === "grid"
                              ? "bg-[#f272ad] hover:bg-[#e85ba0] text-white"
                              : ""
                          }
                        >
                          <Grid className="w-4 h-4 mr-2" /> Grid
                        </Button>
                        <Button
                          variant={viewMode === "list" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setViewMode("list")}
                          className={
                            viewMode === "list"
                              ? "bg-[#f272ad] hover:bg-[#e85ba0] text-white"
                              : ""
                          }
                        >
                          <List className="w-4 h-4 mr-2" /> List
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold mb-2">
                        Filter by Grade
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {grades.map((grade) => (
                          <Button
                            key={grade}
                            variant={
                              selectedGrade === grade ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => setSelectedGrade(grade)}
                            className={`rounded-full ${
                              selectedGrade === grade
                                ? "bg-[#f272ad] hover:bg-[#e85ba0] text-white"
                                : ""
                            }`}
                          >
                            {grade === "All" ? "All" : `Grade ${grade}`}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet> */}
            </div>
          </div>

          <div className="mt-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search collections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Mobile Grade Filter */}
        <div className="px-4 pb-3 overflow-x-auto">
          <div className="flex gap-2 whitespace-nowrap">
            {grades.map((grade) => (
              <Button
                key={grade}
                variant={selectedGrade === grade ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGrade(grade)}
                className={`rounded-full ${
                  selectedGrade === grade
                    ? "bg-[#f272ad] hover:bg-[#e85ba0] text-white"
                    : ""
                }`}
              >
                {grade === "All" ? "All" : `Grade ${grade}`}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-white/80 dark:bg-black/80 backdrop-blur-md border-b dark:border-gray-700 sticky top-0 z-40">
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
                  className={
                    viewMode === "grid"
                      ? "bg-[#f272ad] hover:bg-[#e85ba0] text-white"
                      : ""
                  }
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list"
                      ? "bg-[#f272ad] hover:bg-[#e85ba0] text-white"
                      : ""
                  }
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

          {/* Grade Filter */}
          <div className="flex flex-wrap gap-2 mt-4">
            {grades.map((grade) => (
              <Button
                key={grade}
                variant={selectedGrade === grade ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGrade(grade)}
                className={`rounded-full ${
                  selectedGrade === grade
                    ? "bg-[#f272ad] hover:bg-[#e85ba0] text-white"
                    : ""
                }`}
              >
                {grade === "All" ? "All" : `Grade ${grade}`}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e85ba0]"></div>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {filteredCollections.map((collection, x) => (
              <Link key={x} href={`/collection/${x}`}>
                <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gray-50 dark:bg-gray-800 cursor-pointer h-full flex flex-col">
                  <div className="relative">
                    {/* Preview Image with consistent aspect ratio */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={
                          collection.images[0] ||
                          "/placeholder.svg?height=300&width=400"
                        }
                        alt={collection.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority={x <= 3}
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
                      {/* <div className="absolute top-4 right-4">
                        <Badge
                          className={`${getGradeColor(
                            // collection.grade
                          )} text-white border-0`}
                        >
                          <GraduationCap className="w-3 h-3 mr-1" />
                          Grade {collection.grade}
                        </Badge>
                      </div> */}
                    </div>
                  </div>

                  <CardContent className="p-4 sm:p-6 flex-1 flex flex-col">
                    <div className="space-y-3 sm:space-y-4 flex-1">
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 group-hover:text-[#f272ad] dark:group-hover:text-[#f272ad] transition-colors line-clamp-2">
                          {collection.title}
                        </h3>
                        {/* <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                          {collection.caption}
                        </p> */}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Camera className="w-4 h-4 flex-shrink-0" />
                        {/* <span className="truncate">
                          {collection.photographer.length} photographer
                          {collection.photographer.length > 1 ? "s" : ""}
                        </span> */}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          {/* <Badge
                            variant="secondary"
                            className="rounded-full text-xs"
                          >
                            {collection.category}
                          </Badge>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {collection.date}
                          </span> */}
                        </div>

                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                          <Heart className="w-4 h-4" />
                          {/* <span>{collection.likes}</span> */}
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
            {filteredCollections.map((collection, x) => (
              <Link key={x} href={`/collection/${x}`}>
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-50 dark:bg-gray-800 cursor-pointer">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 aspect-[4/3] sm:aspect-auto sm:h-32 relative flex-shrink-0">
                      <Image
                        src={
                          collection.images[0] ||
                          "/placeholder.svg?height=300&width=400"
                        }
                        alt={collection.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 192px"
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="flex-1 p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-2 sm:mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 truncate">
                            {collection.title}
                          </h3>
                          {/* <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 sm:mb-3 line-clamp-2">
                            {collection.caption}
                          </p> */}
                        </div>
                        {/* <Badge
                          className={`${getGradeColor(
                            collection.grade
                          )} text-white border-0 ml-4 flex-shrink-0`}
                        >
                          <GraduationCap className="w-3 h-3 mr-1" />
                          Grade {collection.grade}
                        </Badge> */}
                      </div>

                      <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 dark:text-gray-400 gap-y-2">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            <Camera className="w-4 h-4 flex-shrink-0" />
                            {/* <span className="truncate">
                              {collection.photographer.length} photographer
                              {collection.photographer.length > 1 ? "s" : ""}
                            </span> */}
                          </div>
                          {/* <Badge
                            variant="secondary"
                            className="rounded-full text-xs flex-shrink-0"
                          >
                            {collection.category}
                          </Badge>
                          <span className="text-xs flex-shrink-0">
                            {collection.date}
                          </span> */}
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Heart className="w-4 h-4" />
                          {/* <span>{collection.likes}</span> */}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredCollections.length === 0 && (
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
