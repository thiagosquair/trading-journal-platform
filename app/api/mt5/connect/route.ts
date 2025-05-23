import { type NextRequest, NextResponse } from "next/server"
import metaApiService from "@/lib/platforms/metaapi-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, server, login, password, saveCredentials } = body

    // Validate required fields
    if (!name || !server || !login || !password) {
      return NextResponse.json(
        { error: "Missing required fields: name, server, login, and password are required" },
        { status: 400 },
      )
    }

    console.log(`Connecting to MT5 account: ${login}@${server}`)

    // Check if MetaAPI service is initialized
    if (!metaApiService.isReady()) {
      const error = metaApiService.getInitializationError()
      console.error("MetaAPI service not initialized:", error)

      // If USE_MOCK_DATA is enabled, return mock data
      if (process.env.USE_MOCK_DATA === "true") {
        console.log("Using mock data for MT5 connection")
        return NextResponse.json({
          success: true,
          accountId: `mt5_${login}`,
          balance: 27544.7,
          equity: 12759.73,
          currency: "GBP",
          leverage: "1:30",
          margin: 1500.25,
          freeMargin: 11259.48,
          marginLevel: 850.5,
          message: "Connected to MT5 account (MOCK DATA)",
        })
      }

      return NextResponse.json({ error: `MetaAPI service not initialized: ${error}` }, { status: 500 })
    }

    // Connect to MT5 account
    const result = await metaApiService.connectAccount({
      login,
      password,
      server,
      accountId: `mt5_${login}`,
    })

    if (!result.success) {
      console.error("Failed to connect to MT5:", result.error)
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    // Get account information
    const accountInfo = await metaApiService.getAccountInformation(result.accountId!)

    return NextResponse.json({
      success: true,
      accountId: result.accountId,
      ...accountInfo,
      message: "Connected to MT5 account successfully",
    })
  } catch (error: any) {
    console.error("Error in MT5 connect API:", error)
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}
