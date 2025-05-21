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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const account = MOCK_ACCOUNTS.find((acc) => acc.id === params.id)

  if (!account) {
    return NextResponse.json({ error: "Trading account not found" }, { status: 404 })
  }

  return NextResponse.json(account)
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const accountIndex = MOCK_ACCOUNTS.findIndex((acc) => acc.id === params.id)

    if (accountIndex === -1) {
      return NextResponse.json({ error: "Trading account not found" }, { status: 404 })
    }

    // In a real app, this would update a record in the database
    const updatedAccount = {
      ...MOCK_ACCOUNTS[accountIndex],
      ...body,
      lastUpdated: new Date().toISOString(),
    }

    return NextResponse.json(updatedAccount)
  } catch (error) {
    console.error("Error updating trading account:", error)
    return NextResponse.json({ error: "Failed to update trading account" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const accountIndex = MOCK_ACCOUNTS.findIndex((acc) => acc.id === params.id)

  if (accountIndex === -1) {
    return NextResponse.json({ error: "Trading account not found" }, { status: 404 })
  }

  // In a real app, this would delete a record from the database
  // or mark it as deleted

  return NextResponse.json({ success: true })
}
