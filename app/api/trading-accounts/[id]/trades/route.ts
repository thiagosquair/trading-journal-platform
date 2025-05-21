import { NextResponse } from "next/server"
import type { Trade } from "@/lib/trading-types"

// Mock data for development
const MOCK_TRADES: Trade[] = [
  {
    id: "t1",
    accountId: "1",
    symbol: "AAPL",
    direction: "long",
    openDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    openPrice: 175.5,
    size: 10,
    status: "open",
    stopLoss: 170,
    takeProfit: 190,
    tags: ["tech", "swing"],
  },
  {
    id: "t2",
    accountId: "1",
    symbol: "MSFT",
    direction: "long",
    openDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    closeDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    openPrice: 320.75,
    closePrice: 330.25,
    size: 5,
    profit: 47.5,
    profitPercent: 2.96,
    status: "closed",
    tags: ["tech", "earnings"],
  },
  {
    id: "t3",
    accountId: "2",
    symbol: "SPY",
    direction: "short",
    openDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    openPrice: 450.25,
    size: 10,
    status: "open",
    stopLoss: 455,
    tags: ["index", "hedge"],
  },
  {
    id: "t4",
    accountId: "1",
    symbol: "AMZN",
    direction: "long",
    openDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    closeDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    openPrice: 130.25,
    closePrice: 128.5,
    size: 8,
    profit: -14,
    profitPercent: -1.34,
    status: "closed",
    tags: ["tech", "swing"],
  },
  {
    id: "t5",
    accountId: "1",
    symbol: "GOOGL",
    direction: "long",
    openDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    closeDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    openPrice: 140.5,
    closePrice: 145.75,
    size: 6,
    profit: 31.5,
    profitPercent: 3.74,
    status: "closed",
    tags: ["tech", "earnings"],
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Filter trades by account ID
  const accountTrades = MOCK_TRADES.filter((trade) => trade.accountId === params.id)

  return NextResponse.json(accountTrades)
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.symbol || !body.direction || !body.openPrice || !body.size) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, this would create a record in the database
    const newTrade: Trade = {
      id: `trade-${Date.now()}`,
      accountId: params.id,
      symbol: body.symbol,
      direction: body.direction,
      openDate: body.openDate || new Date().toISOString(),
      openPrice: body.openPrice,
      size: body.size,
      status: "open",
      stopLoss: body.stopLoss,
      takeProfit: body.takeProfit,
      tags: body.tags || [],
    }

    return NextResponse.json(newTrade, { status: 201 })
  } catch (error) {
    console.error("Error creating trade:", error)
    return NextResponse.json({ error: "Failed to create trade" }, { status: 500 })
  }
}
