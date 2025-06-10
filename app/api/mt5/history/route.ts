import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.MT5_BACKEND_URL || process.env.NEXT_PUBLIC_MT5_BACKEND_URL || "http://localhost:3001"

export async function GET(request: NextRequest) {
  try {
    const accountId = request.nextUrl.searchParams.get("accountId")
    const startDate = request.nextUrl.searchParams.get("startDate") || undefined
    const endDate = request.nextUrl.searchParams.get("endDate") || undefined

    if (!accountId) {
      return NextResponse.json({ error: "Missing accountId parameter" }, { status: 400 })
    }

    console.log(`[MT5 History] Fetching history for accountId: ${accountId}`)
    console.log(`[MT5 History] Backend URL: ${BACKEND_URL}`)

    try {
      // Build the URL with query parameters
      let url = `${BACKEND_URL}/api/mt5/history?accountId=${accountId}`
      if (startDate) url += `&startDate=${startDate}`
      if (endDate) url += `&endDate=${endDate}`

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })

      console.log(`[MT5 History] Backend response status: ${response.status}`)

      const data = await response.json()
      console.log(`[MT5 History] Backend response data:`, data)

      if (!response.ok) {
        console.error("[MT5 History] Backend service error:", data.error)
        return NextResponse.json({ error: data.error || "Failed to fetch history" }, { status: response.status })
      }

      return NextResponse.json(data)
    } catch (fetchError: any) {
      console.error("[MT5 History] Error fetching history from backend service:", fetchError)
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
    console.error("[MT5 History] Error in MT5 history API:", error)
    return NextResponse.json(
      {
        error: error.message || "An unexpected error occurred",
        backendUrl: BACKEND_URL,
      },
      { status: 500 },
    )
  }
}
