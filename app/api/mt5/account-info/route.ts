import { type NextRequest, NextResponse } from "next/server"

// Backend service URL - in production, this should be an environment variable
const BACKEND_URL = process.env.MT5_BACKEND_URL || "http://localhost:3001"

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

    try {
      // Make request to backend service
      const response = await fetch(`${BACKEND_URL}/api/mt5/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          server,
          login,
          password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("Backend service error:", data.error)
        return NextResponse.json({ error: data.error || "Failed to connect to MT5" }, { status: response.status })
      }

      if (!data.success) {
        console.error("Failed to connect to MT5:", data.error)
        return NextResponse.json({ error: data.error }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        accountId: data.accountId,
        balance: data.balance,
        equity: data.equity,
        currency: data.currency,
        leverage: data.leverage,
        margin: data.margin,
        freeMargin: data.freeMargin,
        marginLevel: data.marginLevel,
        message: data.message || "Connected to MT5 account successfully",
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
    console.error("Error in MT5 connect API:", error)
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}

