import { type NextRequest, NextResponse } from "next/server"
import { ctraderApiClient, ctraderLiveApiClient } from "@/lib/api-clients/ctrader-api-client"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const isDemo = searchParams.get("demo") !== "false"

    console.log("[cTrader Accounts API] Fetching accounts, demo:", isDemo)

    const client = isDemo ? ctraderApiClient : ctraderLiveApiClient

    // Check if authenticated
    if (!client.getCredentials()?.accessToken) {
      return NextResponse.json({ error: "Not authenticated with cTrader" }, { status: 401 })
    }

    const accounts = await client.getAccounts()

    return NextResponse.json({
      success: true,
      data: accounts,
    })
  } catch (error) {
    console.error("[cTrader Accounts API] Error:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch accounts" }, { status: 500 })
  }
}
