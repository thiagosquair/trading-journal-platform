import { type NextRequest, NextResponse } from "next/server"

// Backend service URL - in production, this should be an environment variable
const BACKEND_URL = process.env.MT5_BACKEND_URL || process.env.NEXT_PUBLIC_MT5_BACKEND_URL || "http://localhost:3001"

export async function GET(request: NextRequest) {
  try {
    const accountId = request.nextUrl.searchParams.get("accountId")

    if (!accountId) {
      return NextResponse.json({ error: "Missing accountId parameter" }, { status: 400 })
    }

    console.log(`[MT5 API] Fetching account info for accountId: ${accountId}`)
    console.log(`[MT5 API] Backend URL: ${BACKEND_URL}`)

    try {
      const response = await fetch(`${BACKEND_URL}/api/mt5/account-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId }),
      })

      console.log(`[MT5 API] Backend response status: ${response.status}`)

      const data = await response.json()
      console.log(`[MT5 API] Backend response data:`, data)

      if (!response.ok) {
        console.error("[MT5 API] Backend service error:", data.error)
        return NextResponse.json({ error: data.error || "Failed to fetch account info" }, { status: response.status })
      }

      return NextResponse.json(data)
    } catch (fetchError: any) {
      console.error("[MT5 API] Error fetching account info from backend service:", fetchError)
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
    console.error("[MT5 API] Error in MT5 account-info API:", error)
    return NextResponse.json(
      {
        error: error.message || "An unexpected error occurred",
        backendUrl: BACKEND_URL,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { accountId } = body

    if (!accountId) {
      return NextResponse.json({ error: "Missing accountId in request body" }, { status: 400 })
    }

    console.log(`[MT5 API] Fetching account info for accountId: ${accountId}`)
    console.log(`[MT5 API] Backend URL: ${BACKEND_URL}`)

    try {
      const response = await fetch(`${BACKEND_URL}/api/mt5/account-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId }),
      })

      console.log(`[MT5 API] Backend response status: ${response.status}`)

      const data = await response.json()
      console.log(`[MT5 API] Backend response data:`, data)

      if (!response.ok) {
        console.error("[MT5 API] Backend service error:", data.error)
        return NextResponse.json({ error: data.error || "Failed to fetch account info" }, { status: response.status })
      }

      return NextResponse.json(data)
    } catch (fetchError: any) {
      console.error("[MT5 API] Error fetching account info from backend service:", fetchError)
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
    console.error("[MT5 API] Error in MT5 account-info API:", error)
    return NextResponse.json(
      {
        error: error.message || "An unexpected error occurred",
        backendUrl: BACKEND_URL,
      },
      { status: 500 },
    )
  }
}
