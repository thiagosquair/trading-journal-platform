import { type NextRequest, NextResponse } from "next/server"

// Backend service URL - in production, this should be an environment variable
const BACKEND_URL = process.env.MT5_BACKEND_URL || "http://localhost:3001"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { accountId } = body

    if (!accountId) {
      return NextResponse.json({ error: "Account ID is required" }, { status: 400 })
    }

    console.log(`Disconnecting account: ${accountId}`)

    try {
      // Make request to backend service
      const response = await fetch(`${BACKEND_URL}/api/mt5/disconnect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId
        })
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("Backend service error:", data.error)
        return NextResponse.json({ error: data.error || "Failed to disconnect account" }, { status: response.status })
      }

      return NextResponse.json({
        success: data.success,
        message: data.message || "Account disconnected successfully",
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
    console.error("Error disconnecting account:", error)
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}

