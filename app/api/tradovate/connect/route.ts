import { NextResponse } from "next/server"
import { TradovateAdapter } from "@/lib/platforms/tradovate-adapter"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password, appId, appVersion } = body

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    const adapter = new TradovateAdapter(process.env.USE_MOCK_DATA === "true")

    const connected = await adapter.connect({
      username,
      password,
      appId,
      appVersion,
    })

    if (!connected) {
      return NextResponse.json({ error: "Failed to connect to Tradovate" }, { status: 401 })
    }

    const accounts = await adapter.fetchAccounts()

    return NextResponse.json({
      success: true,
      message: "Successfully connected to Tradovate",
      accounts,
    })
  } catch (error: any) {
    console.error("Error connecting to Tradovate:", error)
    return NextResponse.json({ error: error.message || "Failed to connect to Tradovate" }, { status: 500 })
  }
}
