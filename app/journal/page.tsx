import { Suspense } from "react"
import type { Metadata } from "next"
import { CalendarDays, Filter, PlusCircle, Search, BarChart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { SidebarWrapper } from "@/components/sidebar-navigation"
import { JournalEntries } from "@/components/journal-entries"
import { JournalEntriesSkeleton } from "@/components/journal-entries-skeleton"

export const metadata: Metadata = {
  title: "Trading Journal | Trading Journal Platform",
  description: "Document your trading insights and reflections",
}

export default function JournalPage() {
  return (
    <SidebarWrapper>
      <div className="flex flex-col min-h-full">
        <header className="border-b bg-background">
          <div className="flex h-16 items-center px-4 gap-2">
            <SidebarTrigger />
            <div className="ml-2 flex-1">
              <h1 className="text-xl font-semibold">Trading Journal</h1>
              <p className="text-sm text-muted-foreground">Document your trading insights and reflections</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <a href="/journal/statistics">
                  <BarChart className="mr-2 h-4 w-4" />
                  Statistics
                </a>
              </Button>
              <Button asChild>
                <a href="/journal/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Entry
                </a>
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search journal entries..." className="w-full pl-9" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <CalendarDays className="mr-2 h-4 w-4" />
                Date Range
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Entries</TabsTrigger>
              <TabsTrigger value="market-analysis">Market Analysis</TabsTrigger>
              <TabsTrigger value="trade-review">Trade Reviews</TabsTrigger>
              <TabsTrigger value="trade-plan">Trade Plans</TabsTrigger>
              <TabsTrigger value="lesson-learned">Lessons Learned</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <Suspense fallback={<JournalEntriesSkeleton />}>
                <JournalEntries filter="all" />
              </Suspense>
            </TabsContent>
            <TabsContent value="market-analysis" className="mt-6">
              <Suspense fallback={<JournalEntriesSkeleton />}>
                <JournalEntries filter="market-analysis" />
              </Suspense>
            </TabsContent>
            <TabsContent value="trade-review" className="mt-6">
              <Suspense fallback={<JournalEntriesSkeleton />}>
                <JournalEntries filter="trade-review" />
              </Suspense>
            </TabsContent>
            <TabsContent value="trade-plan" className="mt-6">
              <Suspense fallback={<JournalEntriesSkeleton />}>
                <JournalEntries filter="trade-plan" />
              </Suspense>
            </TabsContent>
            <TabsContent value="lesson-learned" className="mt-6">
              <Suspense fallback={<JournalEntriesSkeleton />}>
                <JournalEntries filter="lesson-learned" />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarWrapper>
  )
}
