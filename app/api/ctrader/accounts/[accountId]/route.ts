import { type NextRequest, NextResponse } from "next/server"
import { ctraderApiClient, ctraderLiveApiClient } from "@/lib/api-clients/ctrader-api-client"

export async function GET(request: NextRequest, { params }: { params: { accountId: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    const isDemo = searchParams.get("demo") !== "false"
    const { accountId } = params

    console.log("[cTrader Account API] Fetching account:", accountId, "demo:", isDemo)

    const client = isDemo ? ctraderApiClient : ctraderLiveApiClient

    if (!client.getCredentials()?.accessToken) {
      return NextResponse.json({ error: "Not authenticated with cTrader" }, { status: 401 })
    }

    const account = await client.getAccountInfo(accountId)

    return NextResponse.json({
      success: true,
      data: account,
    })
  } catch (error) {
    console.error("[cTrader Account API] Error:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch account" }, { status: 500 })
  }
}
