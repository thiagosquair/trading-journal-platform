import { type NextRequest, NextResponse } from "next/server"
import { MatchTraderApiClient } from "@/lib/api-clients/matchtrader-api-client"

export async function POST(request: NextRequest) {
  try {
    const { username, password, server, accountType } = await request.json()

    if (!username || !password || !server) {
      return NextResponse.json({ error: "Username, password, and server are required" }, { status: 400 })
    }

    const client = new MatchTraderApiClient()

    const success = await client.authenticate({
      username,
      password,
      server,
      accountType: accountType || "demo",
    })

    return NextResponse.json({
      success,
      message: success ? "Connection successful!" : "Authentication failed",
    })
  } catch (error) {
    console.error("MatchTrader test error:", error)
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Connection test failed",
    })
  }
}
