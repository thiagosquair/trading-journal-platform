import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.MT5_BACKEND_URL || process.env.NEXT_PUBLIC_MT5_BACKEND_URL || "http://localhost:3001"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { accountId } = body

    if (!accountId) {
      return NextResponse.json({ error: "Missing accountId in request body" }, { status: 400 })
    }

    console.log(`[MT5 Disconnect] Disconnecting account: ${accountId}`)
    console.log(`[MT5 Disconnect] Backend URL: ${BACKEND_URL}`)

    try {
      const response = await fetch(`${BACKEND_URL}/api/mt5/disconnect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId }),
      })

      console.log(`[MT5 Disconnect] Backend response status: ${response.status}`)

      const data = await response.json()
      console.log(`[MT5 Disconnect] Backend response:`, data)

      if (!response.ok) {
        console.error("[MT5 Disconnect] Backend service error:", data.error)
        return NextResponse.json(
          { error: data.error || "Failed to disconnect MT5 account" },
          { status: response.status },
        )
      }

      return NextResponse.json(data)
    } catch (fetchError: any) {
      console.error("[MT5 Disconnect] Error connecting to backend service:", fetchError)
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
    console.error("[MT5 Disconnect] Error in MT5 disconnect API:", error)
    return NextResponse.json(
      {
        error: error.message || "An unexpected error occurred",
        backendUrl: BACKEND_URL,
      },
      { status: 500 },
    )
  }
}
