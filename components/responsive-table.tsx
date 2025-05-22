"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface Column<T> {
  header: string
  accessorKey: keyof T
  cell?: (item: T) => React.ReactNode
  className?: string
  sortable?: boolean
}

interface ResponsiveTableProps<T> {
  data: T[]
  columns: Column<T>[]
  className?: string
  onRowClick?: (item: T) => void
}

export function ResponsiveTable<T>({ data, columns, className, onRowClick }: ResponsiveTableProps<T>) {
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({})

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Desktop view */}
      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              {columns.map((column, i) => (
                <th
                  key={i}
                  className={cn("px-4 py-3 text-left text-sm font-medium text-muted-foreground", column.className)}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn("border-b transition-colors hover:bg-muted/50", onRowClick && "cursor-pointer")}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className={cn("px-4 py-3 text-sm", column.className)}>
                    {column.cell ? column.cell(item) : (item[column.accessorKey] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        {data.map((item, rowIndex) => (
          <div key={rowIndex} className="mb-2 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div
              className={cn("flex items-center justify-between p-4", onRowClick && "cursor-pointer")}
              onClick={() => {
                if (onRowClick) {
                  onRowClick(item)
                } else {
                  toggleRow(rowIndex)
                }
              }}
            >
              {/* Display first two columns in the header */}
              <div className="flex-1">
                <div className="font-medium">
                  {columns[0].cell ? columns[0].cell(item) : (item[columns[0].accessorKey] as React.ReactNode)}
                </div>
                {columns.length > 1 && (
                  <div className="text-sm text-muted-foreground">
                    {columns[1].cell ? columns[1].cell(item) : (item[columns[1].accessorKey] as React.ReactNode)}
                  </div>
                )}
              </div>
              {!onRowClick && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleRow(rowIndex)
                  }}
                  className="ml-2"
                >
                  {expandedRows[rowIndex] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              )}
            </div>

            {/* Expanded details */}
            {expandedRows[rowIndex] && !onRowClick && (
              <div className="border-t px-4 py-3">
                {columns.slice(2).map((column, i) => (
                  <div key={i} className="mb-2">
                    <div className="text-xs font-medium text-muted-foreground">{column.header}</div>
                    <div>{column.cell ? column.cell(item) : (item[column.accessorKey] as React.ReactNode)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
