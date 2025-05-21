"use client"

import { useState } from "react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  longDescription?: string
  className?: string
}

export default function FeatureCard({ icon, title, description, longDescription, className }: FeatureCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow",
        className,
      )}
    >
      <div className="p-6">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-slate-600">{description}</p>

        {longDescription && (
          <div className="mt-4">
            {isExpanded && (
              <div className="pt-4 border-t border-slate-100 mb-4">
                <p className="text-sm text-slate-500">{longDescription}</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 p-0 h-auto font-medium flex items-center mt-2"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  Show Less <ChevronUp className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  Learn More <ChevronDown className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
