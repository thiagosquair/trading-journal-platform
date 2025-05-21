import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/image-upload"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Create New Post | TradeLinx",
  description: "Share your trading insights with the community",
}

export default function NewSocialPostPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Link href="/social" className="mr-4">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Create New Post</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Share with the community</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Add a title for your post" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Share your trading insights, analysis, or questions..."
                className="min-h-[150px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Add Images (Optional)</Label>
              <ImageUpload onImagesSelected={() => {}} maxImages={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (Optional)</Label>
              <Input id="tags" placeholder="forex, technical-analysis, eurusd (comma separated)" />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline">Save as Draft</Button>
              <Button>Publish Post</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
