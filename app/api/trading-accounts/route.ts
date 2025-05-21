import { NextResponse } from "next/server"
import type { TradingAccount } from "@/lib/trading-types"

// Mock data for development
const MOCK_ACCOUNTS: TradingAccount[] = [
  {
    id: "1",
    name: "Main Trading Account",
    broker: "Interactive Brokers",
    status: "active",
    balance: 25000,
    equity: 24850,
    openPL: -150,
    lastUpdated: new Date().toISOString(),
    accountNumber: "U12345678",
    currency: "USD",
  },
  {
    id: "2",
    name: "Swing Trading",
    broker: "TD Ameritrade",
    status: "active",
    balance: 15000,
    equity: 15300,
    openPL: 300,
    lastUpdated: new Date().toISOString(),
    accountNumber: "TD98765432",
    currency: "USD",
  },
  {
    id: "3",
    name: "Crypto Account",
    broker: "Alpaca",
    status: "disconnected",
    balance: 5000,
    equity: 5000,
    openPL: 0,
    lastUpdated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    currency: "USD",
  },
]

export async function GET() {
  // In a real app, this would fetch from a database
  return NextResponse.json(MOCK_ACCOUNTS)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.broker) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, this would create a record in the database
    const newAccount: TradingAccount = {
      id: `acc-${Date.now()}`,
      name: body.name,
      broker: body.broker,
      status: "active",
      balance: body.initialBalance || 0,
      equity: body.initialBalance || 0,
      openPL: 0,
      lastUpdated: new Date().toISOString(),
      currency: body.currency || "USD",
    }

    return NextResponse.json(newAccount, { status: 201 })
  } catch (error) {
    console.error("Error creating trading account:", error)
    return NextResponse.json({ error: "Failed to create trading account" }, { status: 500 })
  }
}
