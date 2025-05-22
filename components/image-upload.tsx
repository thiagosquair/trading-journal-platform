"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, X } from "lucide-react"

interface ImageUploadProps {
  maxImages?: number
  onChange: (value: string[]) => void
  value: string[]
}

export function ImageUpload({ maxImages = 5, onChange, value }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const newFiles = Array.from(e.dataTransfer.files)
          .filter((file) => file.type.startsWith("image/"))
          .slice(0, maxImages - value.length)

        if (newFiles.length === 0) return

        const newImageUrls = newFiles.map((file) => URL.createObjectURL(file))
        onChange([...value, ...newImageUrls])
      }
    },
    [maxImages, onChange, value],
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const newFiles = Array.from(e.target.files)
          .filter((file) => file.type.startsWith("image/"))
          .slice(0, maxImages - value.length)

        if (newFiles.length === 0) return

        const newImageUrls = newFiles.map((file) => URL.createObjectURL(file))
        onChange([...value, ...newImageUrls])
      }
    },
    [maxImages, onChange, value],
  )

  const removeImage = useCallback(
    (index: number) => {
      const newImages = [...value]
      newImages.splice(index, 1)
      onChange(newImages)
    },
    [onChange, value],
  )

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="image-upload"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={value.length >= maxImages}
        />
        <label
          htmlFor="image-upload"
          className={`flex flex-col items-center justify-center cursor-pointer ${
            value.length >= maxImages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">Drag & drop images here or click to browse</p>
          <p className="text-xs text-gray-400 mt-1">
            {value.length} / {maxImages} images
          </p>
        </label>
      </div>

      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {value.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image || "/placeholder.svg"}
                alt={`Uploaded image ${index + 1}`}
                className="h-24 w-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
