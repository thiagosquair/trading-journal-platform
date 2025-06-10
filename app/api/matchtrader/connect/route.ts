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

    if (!success) {
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
    }

    // Get account info after successful authentication
    const accountInfo = await client.getAccountInfo()

    return NextResponse.json({
      success: true,
      account: accountInfo,
    })
  } catch (error) {
    console.error("MatchTrader connection error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Connection failed" }, { status: 500 })
  }
}
