import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ThumbsUp, ThumbsDown, Bookmark, Share, Printer } from "lucide-react"

export const metadata: Metadata = {
  title: "Knowledge Base Article | TradeLinx",
  description: "Detailed information and guides for TradeLinx platform",
}

export default function KnowledgeBaseArticlePage({ params }: { params: { slug: string } }) {
  const slug = params.slug

  // Mock article data based on slug
  const article = {
    title: slug === "connect-mt4-account" ? "How to Connect Your MT4 Account" : "Knowledge Base Article",
    category: "Platform",
    lastUpdated: "May 10, 2023",
    content: `
      <h2>Introduction</h2>
      <p>Connecting your MetaTrader 4 (MT4) account to TradeLinx allows you to automatically track your trades, analyze your performance, and maintain a comprehensive trading journal. This guide will walk you through the process step by step.</p>
      
      <h2>Prerequisites</h2>
      <ul>
        <li>An active MT4 account with your broker</li>
        <li>MT4 platform installed on your computer</li>
        <li>TradeLinx account (Premium or Basic)</li>
      </ul>
      
      <h2>Step 1: Download the TradeLinx MT4 Bridge</h2>
      <p>The TradeLinx MT4 Bridge is a small application that securely connects your MT4 platform to your TradeLinx account.</p>
      <ol>
        <li>Log in to your TradeLinx account</li>
        <li>Navigate to Trading Accounts > Connect New Account</li>
        <li>Select "MetaTrader 4" from the platform options</li>
        <li>Click "Download MT4 Bridge" and save the installer to your computer</li>
      </ol>
      
      <h2>Step 2: Install the TradeLinx MT4 Bridge</h2>
      <p>Run the installer you downloaded and follow the on-screen instructions. The installation process is straightforward and typically takes less than a minute.</p>
      
      <h2>Step 3: Configure the Connection</h2>
      <p>After installation, the TradeLinx MT4 Bridge will open automatically. If it doesn't, you can find it in your Start menu or Applications folder.</p>
      <ol>
        <li>Enter your TradeLinx API key (found in your account settings)</li>
        <li>Select the MT4 terminal you want to connect (if you have multiple installations)</li>
        <li>Click "Connect" to establish the connection</li>
      </ol>
      
      <h2>Step 4: Verify the Connection</h2>
      <p>To ensure your MT4 account is properly connected:</p>
      <ol>
        <li>Go back to your TradeLinx dashboard</li>
        <li>Navigate to Trading Accounts</li>
        <li>You should see your MT4 account listed with a "Connected" status</li>
        <li>Your historical trades should begin syncing automatically</li>
      </ol>
      
      <h2>Troubleshooting</h2>
      <p>If you encounter any issues during the connection process:</p>
      <ul>
        <li>Ensure your MT4 platform is running before connecting the bridge</li>
        <li>Check that you've entered the correct API key</li>
        <li>Verify that your firewall isn't blocking the connection</li>
        <li>Restart both the MT4 platform and the TradeLinx MT4 Bridge</li>
      </ul>
      
      <h2>Next Steps</h2>
      <p>Once your MT4 account is connected, you can:</p>
      <ul>
        <li>View your trade history and performance metrics</li>
        <li>Set up automated journaling for your trades</li>
        <li>Use the AI analysis tools to improve your trading</li>
        <li>Create custom reports based on your trading data</li>
      </ul>
    `,
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link href="/knowledge-base">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Knowledge Base
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-2">{article.category}</span>
                  <span>•</span>
                  <span className="ml-2">Last updated: {article.lastUpdated}</span>
                </div>
              </div>

              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />

              <div className="mt-8 pt-6 border-t">
                <h3 className="font-medium mb-2">Was this article helpful?</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Yes
                  </Button>
                  <Button variant="outline" size="sm">
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    No
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Article Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save Article
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share className="h-4 w-4 mr-2" />
                    Share Article
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Printer className="h-4 w-4 mr-2" />
                    Print Article
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Related Articles</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/knowledge-base/articles/mt4-troubleshooting"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      MT4 Connection Troubleshooting
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/knowledge-base/articles/mt5-connection"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      How to Connect MT5 Accounts
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/knowledge-base/articles/trading-platforms-comparison"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Trading Platforms Comparison
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/knowledge-base/articles/account-security"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Securing Your Trading Accounts
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Need More Help?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Can't find what you're looking for or need personalized assistance?
                </p>
                <Button className="w-full">Contact Support</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
