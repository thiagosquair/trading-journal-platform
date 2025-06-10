import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.MT5_BACKEND_URL || process.env.NEXT_PUBLIC_MT5_BACKEND_URL || "http://localhost:3001"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { accountId, login, password, server } = body

    if (!accountId || !login || !password || !server) {
      return NextResponse.json(
        { error: "Missing required fields: accountId, login, password, server" },
        { status: 400 },
      )
    }

    console.log(`[MT5 Connect] Connecting account: ${accountId} (${login}) to server: ${server}`)
    console.log(`[MT5 Connect] Backend URL: ${BACKEND_URL}`)

    try {
      const response = await fetch(`${BACKEND_URL}/api/mt5/connect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId, login, password, server }),
      })

      console.log(`[MT5 Connect] Backend response status: ${response.status}`)

      const data = await response.json()
      console.log(`[MT5 Connect] Backend response:`, data)

      if (!response.ok) {
        console.error("[MT5 Connect] Backend service error:", data.error)
        return NextResponse.json(
          { error: data.error || "Failed to connect to MT5 account" },
          { status: response.status },
        )
      }

      return NextResponse.json(data)
    } catch (fetchError: any) {
      console.error("[MT5 Connect] Error connecting to backend service:", fetchError)
      if (fetchError.code === "ECONNREFUSED" || fetchError.message.includes("fetch")) {
        return NextResponse.json(
          {
            error: "MT5 backend service is not available. Please ensure the backend server is running.",
            backendUrl: BACKEND_URL,
            details: fetchError.message,
          },
          { status: 503 },
        )
      }
      throw fetchError
    }
  } catch (error: any) {
    console.error("[MT5 Connect] Error in MT5 connect API:", error)
    return NextResponse.json(
      {
        error: error.message || "An unexpected error occurred",
        backendUrl: BACKEND_URL,
      },
      { status: 500 },
    )
  }
}
