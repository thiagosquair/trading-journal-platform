import { type NextRequest, NextResponse } from "next/server"
import metaApiService from "@/lib/platforms/metaapi-service"

export async function GET(request: NextRequest) {
  try {
    const accountId = request.nextUrl.searchParams.get("accountId")

    if (!accountId) {
      return NextResponse.json({ error: "Account ID is required" }, { status: 400 })
    }

    console.log(`Getting account info for: ${accountId}`)

    // Check if MetaAPI service is initialized
    if (!metaApiService.isReady()) {
      const error = metaApiService.getInitializationError()
      console.error("MetaAPI service not initialized:", error)

      // If USE_MOCK_DATA is enabled, return mock data
      if (process.env.USE_MOCK_DATA === "true") {
        console.log("Using mock data for account info")
        return NextResponse.json({
          balance: 27544.7,
          equity: 12759.73,
          currency: "GBP",
          leverage: "1:30",
          margin: 1500.25,
          freeMargin: 11259.48,
          marginLevel: 850.5,
          server: "InterTrader-Server",
          message: "Account information retrieved (MOCK DATA)",
        })
      }

      return NextResponse.json({ error: `MetaAPI service not initialized: ${error}` }, { status: 500 })
    }

    try {
      // Get account information
      const accountInfo = await metaApiService.getAccountInformation(accountId)

      return NextResponse.json({
        ...accountInfo,
        message: "Account information retrieved successfully",
      })
    } catch (error: any) {
      console.error("Error getting account info from MetaAPI:", error)

      // Return mock data as fallback
      return NextResponse.json({
        balance: 27544.7,
        equity: 12759.73,
        currency: "GBP",
        leverage: "1:30",
        margin: 1500.25,
        freeMargin: 11259.48,
        marginLevel: 850.5,
        server: "InterTrader-Server",
        message: "Account information retrieved (MOCK DATA - Fallback)",
      })
    }
  } catch (error: any) {
    console.error("Error getting account info:", error)
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}
