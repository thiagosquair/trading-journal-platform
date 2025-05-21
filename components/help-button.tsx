"use client"

import { useState } from "react"
import Link from "next/link"
import { HelpCircle, BookOpen, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export function HelpButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg border-blue-200 bg-white hover:bg-blue-50"
        >
          <HelpCircle className="h-6 w-6 text-blue-600" />
          <span className="sr-only">Help</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end" alignOffset={-20}>
        <div className="flex flex-col">
          <div className="flex items-center justify-between p-4 bg-blue-50">
            <div className="flex items-center">
              <HelpCircle className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="font-medium">Need Help?</h3>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search knowledge base..." className="pl-8" />
            </div>

            <div className="space-y-2 mb-4">
              <Link
                href="/knowledge-base/getting-started"
                className="flex items-center p-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <BookOpen className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm">Getting Started Guide</span>
              </Link>
              <Link
                href="/knowledge-base/connect-accounts"
                className="flex items-center p-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <BookOpen className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm">Connecting Trading Accounts</span>
              </Link>
              <Link
                href="/knowledge-base/journal-tips"
                className="flex items-center p-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                <BookOpen className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm">Journal Tips & Best Practices</span>
              </Link>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col space-y-2">
              <Button asChild variant="outline" size="sm" className="justify-start" onClick={() => setIsOpen(false)}>
                <Link href="/knowledge-base">
                  <Search className="mr-2 h-4 w-4" />
                  Browse Knowledge Base
                </Link>
              </Button>
              <Button asChild size="sm" className="justify-start" onClick={() => setIsOpen(false)}>
                <Link href="/courses">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Explore Free Courses
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
