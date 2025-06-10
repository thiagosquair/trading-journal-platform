import { NextResponse } from "next/server"
import { TradovateAdapter } from "@/lib/platforms/tradovate-adapter"

export async function GET(request: Request, { params }: { params: { accountId: string } }) {
  try {
    const { accountId } = params

    const adapter = new TradovateAdapter(process.env.USE_MOCK_DATA === "true")

    // In a real implementation, you would get credentials from a session or database
    const connected = await adapter.connect({
      username: "demo",
      password: "password",
    })

    if (!connected) {
      return NextResponse.json({ error: "Failed to authenticate with Tradovate" }, { status: 401 })
    }

    const trades = await adapter.fetchTrades(accountId)

    return NextResponse.json({
      success: true,
      trades,
    })
  } catch (error: any) {
    console.error(`Error fetching Tradovate trades for account ${params.accountId}:`, error)
    return NextResponse.json({ error: error.message || "Failed to fetch Tradovate trades" }, { status: 500 })
  }
}
