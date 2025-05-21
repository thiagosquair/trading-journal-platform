"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import type { Trade } from "@/lib/trading-types"
import { formatCurrency, formatDateTime } from "@/lib/utils"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

interface TradesTableProps {
  trades: Trade[]
  isLoading?: boolean
}

export function TradesTable({ trades = [], isLoading = false }: TradesTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof Trade>("openTime")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (column: keyof Trade) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedTrades = [...trades].sort((a, b) => {
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    // Handle dates
    if (sortColumn === "openTime" || sortColumn === "closeTime") {
      const aDate = new Date(a[sortColumn] as string).getTime()
      const bDate = new Date(b[sortColumn] as string).getTime()
      return sortDirection === "asc" ? aDate - bDate : bDate - aDate
    }

    return 0
  })

  if (isLoading) {
    return <div className="p-8 text-center">Loading trades...</div>
  }

  if (trades.length === 0) {
    return <div className="p-8 text-center">No trades found.</div>
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Button
                variant="ghost"
                onClick={() => handleSort("symbol")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Symbol
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("type")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Type
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("openTime")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Open Time
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("closeTime")}
                className="flex items-center gap-1 p-0 h-auto font-medium"
              >
                Close Time
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button
                variant="ghost"
                onClick={() => handleSort("volume")}
                className="flex items-center gap-1 p-0 h-auto font-medium ml-auto"
              >
                Volume
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button
                variant="ghost"
                onClick={() => handleSort("profit")}
                className="flex items-center gap-1 p-0 h-auto font-medium ml-auto"
              >
                Profit
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">
              <Button
                variant="ghost"
                onClick={() => handleSort("pips")}
                className="flex items-center gap-1 p-0 h-auto font-medium ml-auto"
              >
                Pips
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTrades.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell className="font-medium">{trade.symbol}</TableCell>
              <TableCell>
                <span className={trade.type === "BUY" ? "text-green-600" : "text-red-600"}>{trade.type}</span>
              </TableCell>
              <TableCell>{formatDateTime(trade.openTime)}</TableCell>
              <TableCell>{formatDateTime(trade.closeTime)}</TableCell>
              <TableCell className="text-right">{trade.volume.toFixed(2)}</TableCell>
              <TableCell className={`text-right ${trade.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                {formatCurrency(trade.profit)}
              </TableCell>
              <TableCell className={`text-right ${trade.pips >= 0 ? "text-green-600" : "text-red-600"}`}>
                {trade.pips}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Add to journal</DropdownMenuItem>
                    <DropdownMenuItem>Analyze trade</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
