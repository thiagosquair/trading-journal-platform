"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { JournalImage } from "@/lib/journal-types"

interface ImageGalleryProps {
  images: JournalImage[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<JournalImage | null>(null)

  if (images.length === 0) {
    return null
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="border rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div className="aspect-video relative">
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.caption || "Journal image"}
                fill
                className="object-cover"
              />
            </div>
            {image.caption && <div className="p-2 text-sm text-muted-foreground truncate">{image.caption}</div>}
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] p-0 overflow-hidden">
          <div className="relative">
            <div className="relative h-[80vh]">
              {selectedImage && (
                <Image
                  src={selectedImage.url || "/placeholder.svg"}
                  alt={selectedImage.caption || "Journal image"}
                  fill
                  className="object-contain"
                />
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 hover:bg-background/90"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          {selectedImage?.caption && (
            <div className="p-4 bg-background border-t">
              <p className="text-sm">{selectedImage.caption}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
