"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { useState, useRef, useEffect, type ChangeEvent } from "react"
import { CalendarIcon, Check, Download, ImageIcon, Loader2, Plus, Trash2, Upload, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"

// Sample categories for photos
const categories = [
  { id: "classroom", name: "Classroom Activities" },
  { id: "field-trip", name: "Field Trips" },
  { id: "experiments", name: "Science Experiments" },
  { id: "projects", name: "Student Projects" },
  { id: "events", name: "School Events" },
]

interface PhotoItem {
  id: string
  file: File | null
  preview: string
  title: string
  description: string
  category: string
  date: Date
  uploaded: boolean
}

export default function PhotosPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedCategory, setSelectedCategory] = useState("classroom")
  const [photos, setPhotos] = useState<PhotoItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files: FileList) => {
    const newPhotos: PhotoItem[] = Array.from(files).map((file) => ({
      id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      file,
      preview: URL.createObjectURL(file),
      title: file.name.split(".")[0].replace(/[_-]/g, " "),
      description: "",
      category: selectedCategory,
      date: date,
      uploaded: false,
    }))

    setPhotos((prev) => [...prev, ...newPhotos])
  }

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => {
      const filtered = prev.filter((photo) => photo.id !== id)
      return filtered
    })
  }

  const handleUpdatePhoto = (id: string, field: keyof PhotoItem, value: any) => {
    setPhotos((prev) =>
      prev.map((photo) => {
        if (photo.id === id) {
          return { ...photo, [field]: value }
        }
        return photo
      }),
    )
  }

  const handleUploadPhotos = async () => {
    setUploading(true)

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mark all photos as uploaded
    setPhotos((prev) => prev.map((photo) => ({ ...photo, uploaded: true })))

    setUploading(false)

    toast({
      title: "Photos Uploaded Successfully",
      description: `${photos.length} photos have been uploaded.`,
    })
  }

  if (!isClient) {
    return null // Prevent rendering until client-side
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
            Classroom Photos
          </h1>
          <p className="text-muted-foreground mt-1">Upload and manage photos of classroom activities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => fileInputRef.current?.click()}>
            <Plus className="h-4 w-4" />
            Add Photos
          </Button>
          <Button
            className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            onClick={handleUploadPhotos}
            disabled={uploading || photos.length === 0 || photos.every((p) => p.uploaded)}
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? "Uploading..." : "Upload Photos"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="animate-in slide-in-from-left duration-300 delay-100">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle>Upload Photos</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        {format(date, "MMMM d, yyyy")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                    </PopoverContent>
                  </Popover>

                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <CardDescription>Drag and drop photos or click to browse</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center",
                  dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20",
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center justify-center space-y-2 py-4">
                  <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
                  <h3 className="text-lg font-medium">Drag photos here or click to browse</h3>
                  <p className="text-sm text-muted-foreground">Support for JPG, PNG, GIF up to 10MB each</p>
                </div>
              </div>

              {photos.length > 0 && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-medium">Selected Photos ({photos.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {photos.map((photo) => (
                      <Card key={photo.id} className={cn(photo.uploaded && "border-green-200 bg-green-50")}>
                        <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                          <Image
                            src={photo.preview || "/placeholder.svg"}
                            alt={photo.title}
                            fill
                            className="object-cover"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-7 w-7 rounded-full"
                            onClick={() => handleRemovePhoto(photo.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          {photo.uploaded && (
                            <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                        <CardContent className="p-3 space-y-2">
                          <Input
                            placeholder="Photo title"
                            value={photo.title}
                            onChange={(e) => handleUpdatePhoto(photo.id, "title", e.target.value)}
                          />
                          <Textarea
                            placeholder="Description (optional)"
                            value={photo.description}
                            onChange={(e) => handleUpdatePhoto(photo.id, "description", e.target.value)}
                            rows={2}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{format(photo.date, "MMM d, yyyy")}</span>
                            <span>{photo.file?.size ? `${(photo.file.size / (1024 * 1024)).toFixed(2)} MB` : ""}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            {photos.length > 0 && (
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="gap-2" onClick={() => setPhotos([])}>
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </Button>
                <Button
                  className="gap-2"
                  onClick={handleUploadPhotos}
                  disabled={uploading || photos.every((p) => p.uploaded)}
                >
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  {uploading ? "Uploading..." : "Upload All"}
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>

      <div className="animate-in slide-in-from-bottom duration-300 delay-200">
        <Card>
          <CardHeader>
            <CardTitle>Recent Photo Galleries</CardTitle>
            <CardDescription>Previously uploaded photo collections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  id: "gallery-1",
                  title: "Science Lab Experiment",
                  date: "May 15, 2023",
                  count: 12,
                  thumbnail: "/placeholder.svg",
                  category: "Science Experiments",
                },
                {
                  id: "gallery-2",
                  title: "Field Trip to Museum",
                  date: "April 22, 2023",
                  count: 24,
                  thumbnail: "/placeholder.svg",
                  category: "Field Trips",
                },
                {
                  id: "gallery-3",
                  title: "Art Class Projects",
                  date: "March 10, 2023",
                  count: 18,
                  thumbnail: "/placeholder.svg",
                  category: "Student Projects",
                },
              ].map((gallery) => (
                <Card key={gallery.id} className="overflow-hidden">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={gallery.thumbnail || "/placeholder.svg"}
                      alt={gallery.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium">{gallery.title}</h3>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{gallery.date}</span>
                      <span>{gallery.count} photos</span>
                    </div>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs">
                        {gallery.category}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 pt-0 flex justify-end">
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      <Download className="h-3 w-3" />
                      <span className="text-xs">Download</span>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Galleries
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

