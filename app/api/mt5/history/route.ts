import { type NextRequest, NextResponse } from "next/server"
import metaApiService from "@/lib/platforms/metaapi-service"

export async function GET(request: NextRequest) {
  try {
    const accountId = request.nextUrl.searchParams.get("accountId")

    if (!accountId) {
      return NextResponse.json({ error: "Account ID is required" }, { status: 400 })
    }

    console.log(`Getting trade history for: ${accountId}`)

    // Check if MetaAPI service is initialized
    if (!metaApiService.isReady()) {
      const error = metaApiService.getInitializationError()
      console.error("MetaAPI service not initialized:", error)

      // If USE_MOCK_DATA is enabled, return mock data
      if (process.env.USE_MOCK_DATA === "true") {
        console.log("Using mock data for trade history")
        return NextResponse.json({
          deals: [
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
          ],
          message: "Trade history retrieved (MOCK DATA)",
        })
      }

      return NextResponse.json({ error: `MetaAPI service not initialized: ${error}` }, { status: 500 })
    }

    // Get trade history for the last 90 days
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 90)

    const history = await metaApiService.getTradeHistory(accountId, startDate, endDate)

    return NextResponse.json({
      ...history,
      message: "Trade history retrieved successfully",
    })
  } catch (error: any) {
    console.error("Error getting trade history:", error)
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}
