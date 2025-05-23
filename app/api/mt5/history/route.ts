import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const accountId = request.nextUrl.searchParams.get("accountId")

    if (!accountId) {
      return NextResponse.json({ error: "Account ID is required" }, { status: 400 })
    }

    console.log(`Getting trade history for: ${accountId}`)

    // Always return mock data for now to avoid server-side issues
    const mockTrades = [
      {
        id: "1",
        symbol: "GBPUSD",
        type: "BUY",
        openTime: new Date("2025-05-20T10:30:00Z").toISOString(),
        closeTime: new Date("2025-05-20T14:45:00Z").toISOString(),
        openPrice: 1.265,
        closePrice: 1.268,
        volume: 0.5,
        profit: 150.0,
        commission: 5.0,
        swap: -2.5,
        pips: 30,
        status: "CLOSED",
      },
      {
        id: "2",
        symbol: "EURUSD",
        type: "SELL",
        openTime: new Date("2025-05-21T09:15:00Z").toISOString(),
        closeTime: new Date("2025-05-21T16:30:00Z").toISOString(),
        openPrice: 1.0865,
        closePrice: 1.0845,
        volume: 0.3,
        profit: 60.0,
        commission: 3.0,
        swap: -1.5,
        pips: 20,
        status: "CLOSED",
      },
      {
        id: "3",
        symbol: "USDJPY",
        type: "BUY",
        openTime: new Date("2025-05-22T08:00:00Z").toISOString(),
        closeTime: new Date("2025-05-22T12:30:00Z").toISOString(),
        openPrice: 149.85,
        closePrice: 150.15,
        volume: 0.2,
        profit: 40.0,
        commission: 2.0,
        swap: 0,
        pips: 30,
        status: "CLOSED",
      },
    ]

    return NextResponse.json({
      deals: mockTrades,
      message: "Trade history retrieved (DEMO MODE)",
    })
  } catch (error: any) {
    console.error("Error getting trade history:", error)
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}
