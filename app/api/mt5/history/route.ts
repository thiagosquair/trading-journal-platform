import { type NextRequest, NextResponse } from "next/server"

// Backend service URL - in production, this should be an environment variable
const BACKEND_URL = process.env.MT5_BACKEND_URL || "http://localhost:3001"

export async function GET(request: NextRequest) {
  try {
    const accountId = request.nextUrl.searchParams.get("accountId")

    if (!accountId) {
      return NextResponse.json({ error: "Account ID is required" }, { status: 400 })
    }

    console.log(`Getting trade history for: ${accountId}`)

    try {
      // Make request to backend service
      const response = await fetch(`${BACKEND_URL}/api/mt5/history/${accountId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("Backend service error:", data.error)
        return NextResponse.json({ error: data.error || "Failed to get trade history" }, { status: response.status })
      }

      return NextResponse.json({
        deals: data.deals || [],
        message: data.message || "Trade history retrieved successfully",
      })
    } catch (fetchError: any) {
      console.error("Error connecting to backend service:", fetchError)
      
      // If backend is not available, return a helpful error message
      if (fetchError.code === 'ECONNREFUSED' || fetchError.message.includes('fetch')) {
        return NextResponse.json({ 
          error: "MT5 backend service is not available. Please ensure the backend server is running on port 3001." 
        }, { status: 503 })
      }
      
      throw fetchError
    }
  } catch (error: any) {
    console.error("Error getting trade history:", error)
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}
