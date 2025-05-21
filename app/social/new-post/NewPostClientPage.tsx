"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImageUpload } from "@/components/image-upload"
import { ArrowLeft, Link2, Hash } from "lucide-react"

export default function NewPostClientPage() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="sm" asChild className="mr-4">
          <Link href="/social">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Feed
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Create New Post</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Share with the Community</CardTitle>
              <CardDescription>Share your trading insights, analysis, or ask questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="post-title">Post Title</Label>
                <Input id="post-title" placeholder="Add a title for your post" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="post-content">Content</Label>
                <Textarea
                  id="post-content"
                  placeholder="What would you like to share?"
                  className="mt-1 min-h-[200px]"
                />
              </div>

              <div>
                <Label>Add Images</Label>
                <ImageUpload maxImages={4} onChange={() => {}} value={[]} />
              </div>

              <div>
                <Label htmlFor="post-tags">Tags</Label>
                <div className="flex items-center mt-1">
                  <Hash className="h-4 w-4 text-muted-foreground mr-2" />
                  <Input id="post-tags" placeholder="Add tags separated by commas (forex, analysis, eurusd)" />
                </div>
              </div>

              <div>
                <Label htmlFor="post-link">Add Link (Optional)</Label>
                <div className="flex items-center mt-1">
                  <Link2 className="h-4 w-4 text-muted-foreground mr-2" />
                  <Input id="post-link" placeholder="https://" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Save as Draft</Button>
              <Button>Publish Post</Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Posting Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    1
                  </span>
                  <span>Be respectful and constructive in your posts</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    2
                  </span>
                  <span>Do not share personal financial information</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    3
                  </span>
                  <span>Avoid making specific investment recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    4
                  </span>
                  <span>Use appropriate tags to help others find your content</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                    5
                  </span>
                  <span>Credit sources when sharing external content</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Post Visibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Public</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Visible to everyone</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">Followers Only</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Only your followers</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm">Private</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Only you can see</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
