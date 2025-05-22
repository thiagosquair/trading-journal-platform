import { type NextRequest, NextResponse } from "next/server"
import { DataManager } from "@/lib/data-providers/data-manager"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { provider, symbol, timeframe, startDate, endDate } = body

    if (!provider || !symbol || !timeframe || !startDate || !endDate) {
      return NextResponse.json({ success: false, message: "Missing required parameters" }, { status: 400 })
    }

    const dataManager = DataManager.getInstance()
    const data = await dataManager.getHistoricalData(provider, symbol, timeframe, startDate, endDate)

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Error fetching historical data:", error)
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch historical data" },
      { status: 500 },
    )
  }
}
