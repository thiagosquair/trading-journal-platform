"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import { MoreHorizontal, Search, ArrowUpDown, ChevronDown } from "lucide-react"

interface Trade {
  id: string
  accountId: string
  symbol: string
  type: string
  openPrice: number
  closePrice?: number
  openTime: string
  closeDate?: string
  volume: number
  profit?: number
  status: string
}

interface TradesTableProps {
  trades: Trade[]
}

export function TradesTable({ trades }: TradesTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<keyof Trade>("openTime")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  // Handle sort
  const handleSort = (column: keyof Trade) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("asc")
    }
  }

  // Filter and sort trades
  const filteredTrades = trades
    .filter((trade) => {
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        return (
          trade.symbol.toLowerCase().includes(searchLower) ||
          trade.type.toLowerCase().includes(searchLower) ||
          trade.id.toLowerCase().includes(searchLower)
        )
      }
      return true
    })
    .filter((trade) => {
      // Apply status filter
      if (statusFilter) {
        return trade.status === statusFilter
      }
      return true
    })
    .sort((a, b) => {
      // Apply sorting
      const aValue = a[sortBy]
      const bValue = b[sortBy]

      if (aValue === undefined || bValue === undefined) return 0

      let comparison = 0
      if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        comparison = aValue.localeCompare(bValue)
      }

      return sortDirection === "asc" ? comparison : -comparison
    })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search trades..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {statusFilter ? `Status: ${statusFilter}` : "All Statuses"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setStatusFilter(null)}>All Statuses</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("open")}>Open</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("closed")}>Closed</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort("symbol")}>
                  Symbol
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort("type")}>
                  Type
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <Button variant="ghost" size="sm" onClick={() => handleSort("openTime")}>
                  Open Time
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <Button variant="ghost" size="sm" onClick={() => handleSort("openPrice")}>
                  Open Price
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                <Button variant="ghost" size="sm" onClick={() => handleSort("closePrice")}>
                  Close Price
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort("volume")}>
                  Volume
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort("profit")}>
                  Profit
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" size="sm" onClick={() => handleSort("status")}>
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTrades.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No trades found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTrades.map((trade) => (
                <TableRow key={trade.id}>
                  <TableCell className="font-medium">{trade.symbol}</TableCell>
                  <TableCell>
                    <Badge variant={trade.type === "buy" ? "default" : "destructive"}>{trade.type.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(trade.openTime).toLocaleString()}</TableCell>
                  <TableCell className="hidden md:table-cell">{trade.openPrice}</TableCell>
                  <TableCell className="hidden lg:table-cell">{trade.closePrice || "—"}</TableCell>
                  <TableCell>{trade.volume}</TableCell>
                  <TableCell>
                    {trade.profit !== undefined ? (
                      <span className={trade.profit > 0 ? "text-green-600" : trade.profit < 0 ? "text-red-600" : ""}>
                        {formatCurrency(trade.profit)}
                      </span>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        trade.status === "open" ? "outline" : trade.status === "closed" ? "secondary" : "default"
                      }
                    >
                      {trade.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Add to Journal</DropdownMenuItem>
                        <DropdownMenuItem>Analyze Trade</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

// Default export for backward compatibility
export default TradesTable
