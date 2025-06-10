import { type NextRequest, NextResponse } from "next/server"
import { ctraderApiClient, ctraderLiveApiClient } from "@/lib/api-clients/ctrader-api-client"

export async function GET(request: NextRequest, { params }: { params: { accountId: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const isDemo = searchParams.get("demo") !== "false"
    const { accountId } = params

    console.log("[cTrader Positions API] Fetching positions for account:", accountId)

    const client = isDemo ? ctraderApiClient : ctraderLiveApiClient

    if (!client.getCredentials()?.accessToken) {
      return NextResponse.json({ error: "Not authenticated with cTrader" }, { status: 401 })
    }

    const positions = await client.getOpenPositions(accountId)

    return NextResponse.json({
      success: true,
      data: positions,
    })
  } catch (error) {
    console.error("[cTrader Positions API] Error:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch positions" }, { status: 500 })
  }
}
