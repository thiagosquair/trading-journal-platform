import { NextResponse } from "next/server"
import { TradovateAdapter } from "@/lib/platforms/tradovate-adapter"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password, appId, appVersion } = body

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    const adapter = new TradovateAdapter(true) // Always use mock mode for testing

    const connected = await adapter.connect({
      username,
      password,
      appId,
      appVersion,
    })

    return NextResponse.json({
      success: connected,
      message: connected ? "Connection test successful" : "Connection test failed",
    })
  } catch (error: any) {
    console.error("Error testing Tradovate connection:", error)
    return NextResponse.json({ error: error.message || "Failed to test Tradovate connection" }, { status: 500 })
  }
}
