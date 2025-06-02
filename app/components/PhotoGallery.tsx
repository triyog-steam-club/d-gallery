"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Camera,
  Award,
  Search,
  Grid,
  List,
  Heart,
  Share2,
  Download,
} from "lucide-react";
import Image from "next/image";

const collections = [
  {
    id: 1,
    title: "Rainforest Expedition",
    photographers: ["John D.", "Sara T.", "Mike R."],
    caption: "A glimpse into jungle life — from explorers to wildlife.",
    grade: "A+",
    category: "Nature",
    date: "2024-03-15",
    likes: 234,
    images: [
      "https://storage.googleapis.com/a1aa/image/6d0350ab-05bb-4acb-1c1d-0dcecb887b36.jpg",
      "https://storage.googleapis.com/a1aa/image/2832d8bd-066c-49bb-b02e-ad65fd66b76a.jpg",
      "https://storage.googleapis.com/a1aa/image/6ece2fbb-2014-4f7a-019b-0807895fb2a2.jpg",
      "https://storage.googleapis.com/a1aa/image/97fc85ad-fb31-4625-a494-4c2d509b75ed.jpg",
      "https://storage.googleapis.com/a1aa/image/ff7490fe-43ce-4991-c390-fc3f0299589d.jpg",
    ],
  },
  {
    id: 2,
    title: "Urban Architecture",
    photographers: ["Alex M.", "Emma K."],
    caption:
      "Modern cityscapes and architectural marvels captured in stunning detail.",
    grade: "A",
    category: "Architecture",
    date: "2024-03-10",
    likes: 189,
    images: [
      "https://storage.googleapis.com/a1aa/image/6d0350ab-05bb-4acb-1c1d-0dcecb887b36.jpg",
      "https://storage.googleapis.com/a1aa/image/2832d8bd-066c-49bb-b02e-ad65fd66b76a.jpg",
      "https://storage.googleapis.com/a1aa/image/6ece2fbb-2014-4f7a-019b-0807895fb2a2.jpg",
      "https://storage.googleapis.com/a1aa/image/97fc85ad-fb31-4625-a494-4c2d509b75ed.jpg",
      "https://storage.googleapis.com/a1aa/image/ff7490fe-43ce-4991-c390-fc3f0299589d.jpg",
    ],
  },
  {
    id: 3,
    title: "Ocean Depths",
    photographers: ["David L.", "Maria S.", "Tom W."],
    caption:
      "Underwater photography showcasing marine life in its natural habitat.",
    grade: "A+",
    category: "Marine",
    date: "2024-03-05",
    likes: 312,
    images: [
      "https://storage.googleapis.com/a1aa/image/6d0350ab-05bb-4acb-1c1d-0dcecb887b36.jpg",
      "https://storage.googleapis.com/a1aa/image/2832d8bd-066c-49bb-b02e-ad65fd66b76a.jpg",
      "https://storage.googleapis.com/a1aa/image/6ece2fbb-2014-4f7a-019b-0807895fb2a2.jpg",
      "https://storage.googleapis.com/a1aa/image/97fc85ad-fb31-4625-a494-4c2d509b75ed.jpg",
      "https://storage.googleapis.com/a1aa/image/ff7490fe-43ce-4991-c390-fc3f0299589d.jpg",
    ],
  },
  {
    id: 4,
    title: "Mountain Peaks",
    photographers: ["Lisa R.", "James H."],
    caption:
      "Breathtaking views from the world's highest peaks and alpine landscapes.",
    grade: "A",
    category: "Landscape",
    date: "2024-02-28",
    likes: 267,
    images: [
      "https://storage.googleapis.com/a1aa/image/6d0350ab-05bb-4acb-1c1d-0dcecb887b36.jpg",
      "https://storage.googleapis.com/a1aa/image/2832d8bd-066c-49bb-b02e-ad65fd66b76a.jpg",
      "https://storage.googleapis.com/a1aa/image/6ece2fbb-2014-4f7a-019b-0807895fb2a2.jpg",
      "https://storage.googleapis.com/a1aa/image/97fc85ad-fb31-4625-a494-4c2d509b75ed.jpg",
      "https://storage.googleapis.com/a1aa/image/ff7490fe-43ce-4991-c390-fc3f0299589d.jpg",
    ],
  },
];

const PhotoGallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = ["All", "Nature", "Architecture", "Marine", "Landscape"];

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

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
        return "bg-emerald-500";
      case "A":
        return "bg-blue-500";
      case "B+":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Digital Photo Gallery
              </h1>
              <p className="text-gray-600">
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
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCollections.map((collection) => (
              <Card
                key={collection.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
              >
                <div className="relative">
                  {/* Main Image Grid */}
                  <div className="grid grid-cols-4 grid-rows-2 gap-2 p-4 h-80">
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="col-span-2 row-span-2 relative overflow-hidden rounded-xl cursor-pointer group/image">
                          <Image
                            src={collection.images[0] || "/"}
                            alt=""
                            fill
                            className="object-cover transition-transform duration-500 group-hover/image:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors duration-300" />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <Image
                          src={collection.images[0] || "/placeholder.svg"}
                          alt=""
                          width={800}
                          height={600}
                          className="w-full h-auto rounded-lg"
                        />
                      </DialogContent>
                    </Dialog>

                    {collection.images.slice(1, 5).map((image, idx) => (
                      <Dialog key={idx}>
                        <DialogTrigger asChild>
                          <div className="relative overflow-hidden rounded-lg cursor-pointer group/image">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt=""
                              fill
                              className="object-cover transition-transform duration-500 group-hover/image:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors duration-300" />
                          </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt=""
                            width={800}
                            height={600}
                            className="w-full h-auto rounded-lg"
                          />
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>

                  {/* Grade Badge */}
                  <div className="absolute top-6 right-6">
                    <Badge
                      className={`${getGradeColor(
                        collection.grade
                      )} text-white border-0`}
                    >
                      <Award className="w-3 h-3 mr-1" />
                      {collection.grade}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {collection.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {collection.caption}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Camera className="w-4 h-4" />
                      <span className="font-medium">Photographers:</span>
                      <span>{collection.photographers.join(", ")}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <Badge variant="secondary" className="rounded-full">
                          {collection.category}
                        </Badge>
                        <span>{collection.date}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-red-500"
                        >
                          <Heart className="w-4 h-4 mr-1" />
                          {collection.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredCollections.map((collection) => (
              <Card
                key={collection.id}
                className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-80 h-48 md:h-auto relative">
                    <Image
                      src={collection.images[0] || "/placeholder.svg"}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {collection.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {collection.caption}
                        </p>
                      </div>
                      <Badge
                        className={`${getGradeColor(
                          collection.grade
                        )} text-white border-0`}
                      >
                        <Award className="w-3 h-3 mr-1" />
                        {collection.grade}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Camera className="w-4 h-4" />
                        <span className="font-medium">Photographers:</span>
                        <span>{collection.photographers.join(", ")}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <Badge variant="secondary" className="rounded-full">
                            {collection.category}
                          </Badge>
                          <span>{collection.date}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-red-500"
                          >
                            <Heart className="w-4 h-4 mr-1" />
                            {collection.likes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500"
                          >
                            <Share2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredCollections.length === 0 && (
          <div className="text-center py-16">
            <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No collections found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
