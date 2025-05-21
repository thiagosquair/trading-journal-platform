import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, FileText } from "lucide-react"

const popularArticles = [
  {
    id: "1",
    title: "How to Connect Your MT4 Account",
    category: "Platform",
    views: 1245,
    slug: "connect-mt4-account",
  },
  {
    id: "2",
    title: "Understanding Risk-to-Reward Ratio",
    category: "Trading",
    views: 982,
    slug: "risk-reward-ratio",
  },
  {
    id: "3",
    title: "Journal Entry Best Practices",
    category: "Journal",
    views: 876,
    slug: "journal-best-practices",
  },
  {
    id: "4",
    title: "Using AI Analysis for Trade Improvement",
    category: "AI Features",
    views: 754,
    slug: "ai-analysis-guide",
  },
  {
    id: "5",
    title: "Setting Effective Trading Goals",
    category: "Goals",
    views: 689,
    slug: "effective-trading-goals",
  },
]

export function PopularArticles() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {popularArticles.map((article) => (
            <Link
              key={article.id}
              href={`/knowledge-base/articles/${article.slug}`}
              className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <h3 className="font-medium">{article.title}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">{article.category}</span>
                    <span>•</span>
                    <span className="ml-2">{article.views} views</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
