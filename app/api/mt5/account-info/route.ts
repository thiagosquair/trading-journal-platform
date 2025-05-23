import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const accountId = request.nextUrl.searchParams.get("accountId")

    if (!accountId) {
      return NextResponse.json({ error: "Account ID is required" }, { status: 400 })
    }

    console.log(`Getting account info for: ${accountId}`)

    // Always return mock data for now to avoid server-side issues
    const mockAccountInfo = {
      balance: 27544.7,
      equity: 12759.73,
      currency: "GBP",
      leverage: "1:30",
      margin: 1500.25,
      freeMargin: 11259.48,
      marginLevel: 850.5,
      server: "InterTrader-Server",
      message: "Account information retrieved (DEMO MODE)",
    }

    return NextResponse.json(mockAccountInfo)
  } catch (error: any) {
    console.error("Error getting account info:", error)
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}
