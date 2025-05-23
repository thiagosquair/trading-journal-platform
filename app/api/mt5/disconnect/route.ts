import { type NextRequest, NextResponse } from "next/server"
import metaApiService from "@/lib/platforms/metaapi-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { accountId } = body

    if (!accountId) {
      return NextResponse.json({ error: "Account ID is required" }, { status: 400 })
    }

    console.log(`Disconnecting account: ${accountId}`)

    // Check if MetaAPI service is initialized
    if (!metaApiService.isReady()) {
      const error = metaApiService.getInitializationError()
      console.error("MetaAPI service not initialized:", error)

      // If we're using mock data, just return success
      if (process.env.USE_MOCK_DATA === "true") {
        console.log("Using mock data for disconnection")
        return NextResponse.json({
          success: true,
          message: "Account disconnected (MOCK DATA)",
        })
      }

      return NextResponse.json({ error: `MetaAPI service not initialized: ${error}` }, { status: 500 })
    }

    // Disconnect the account
    const result = await metaApiService.disconnectAccount(accountId)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: result.message || "Account disconnected successfully",
    })
  } catch (error: any) {
    console.error("Error disconnecting account:", error)
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}
