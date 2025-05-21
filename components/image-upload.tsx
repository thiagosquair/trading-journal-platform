"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { X, Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { JournalImage } from "@/lib/journal-types"

interface ImageUploadProps {
  images: JournalImage[]
  onImagesChange: (images: JournalImage[]) => void
  maxImages?: number
}

export function ImageUpload({ images = [], onImagesChange, maxImages = 5 }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = async (files: FileList) => {
    if (images.length >= maxImages) {
      alert(`You can only upload a maximum of ${maxImages} images.`)
      return
    }

    const newFiles = Array.from(files).slice(0, maxImages - images.length)
    if (newFiles.length === 0) return

    setIsUploading(true)

    try {
      // In a real app, you would upload these files to a storage service
      // For this demo, we'll create object URLs for the images
      const newImages: JournalImage[] = await Promise.all(
        newFiles.map(async (file) => {
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Create a local URL for the file
          const url = URL.createObjectURL(file)

          return {
            id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            url,
            caption: "",
            createdAt: new Date().toISOString(),
          }
        }),
      )

      onImagesChange([...images, ...newImages])
    } catch (error) {
      console.error("Error uploading images:", error)
      alert("Failed to upload images. Please try again.")
    } finally {
      setIsUploading(false)
      // Reset the input
      if (inputRef.current) {
        inputRef.current.value = ""
      }
    }
  }

  const removeImage = (id: string) => {
    const updatedImages = images.filter((image) => image.id !== id)
    onImagesChange(updatedImages)
  }

  const updateCaption = (id: string, caption: string) => {
    const updatedImages = images.map((image) => {
      if (image.id === id) {
        return { ...image, caption }
      }
      return image
    })
    onImagesChange(updatedImages)
  }

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
          dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
          isUploading && "opacity-50 cursor-not-allowed",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isUploading && inputRef.current?.click()}
      >
        <div className="flex flex-col items-center justify-center py-4 text-muted-foreground">
          {isUploading ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin mb-2" />
              <p>Uploading...</p>
            </>
          ) : (
            <>
              <Upload className="h-8 w-8 mb-2" />
              <p className="mb-1 font-medium">Drag & drop images here or click to browse</p>
              <p className="text-xs">
                Supported formats: JPEG, PNG, GIF, WebP • Max {maxImages} images • Max 5MB per image
              </p>
            </>
          )}
        </div>
        <Input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleChange}
          disabled={isUploading}
        />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {images.map((image) => (
            <div key={image.id} className="relative group border rounded-lg overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.caption || "Journal image"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2">
                <Input
                  type="text"
                  placeholder="Add a caption..."
                  value={image.caption || ""}
                  onChange={(e) => updateCaption(image.id, e.target.value)}
                  className="text-sm"
                />
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(image.id)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove image</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
