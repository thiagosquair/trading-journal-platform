import { type NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.MT5_BACKEND_URL || process.env.NEXT_PUBLIC_MT5_BACKEND_URL || "http://localhost:3001"

export async function GET(request: NextRequest) {
  try {
    console.log(`[MT5 Test] Testing connection to backend: ${BACKEND_URL}`)

    const response = await fetch(`${BACKEND_URL}/health`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const isHealthy = response.ok
    let backendData = null

    try {
      backendData = await response.json()
    } catch (e) {
      backendData = await response.text()
    }

    console.log(`[MT5 Test] Backend health check result:`, { isHealthy, backendData })

    return NextResponse.json({
      backendUrl: BACKEND_URL,
      isHealthy,
      status: response.status,
      backendResponse: backendData,
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        MT5_BACKEND_URL: process.env.MT5_BACKEND_URL ? "Set" : "Not set",
        NEXT_PUBLIC_MT5_BACKEND_URL: process.env.NEXT_PUBLIC_MT5_BACKEND_URL ? "Set" : "Not set",
      },
    })
  } catch (error: any) {
    console.error("[MT5 Test] Error testing backend connection:", error)

    return NextResponse.json(
      {
        backendUrl: BACKEND_URL,
        isHealthy: false,
        error: error.message,
        timestamp: new Date().toISOString(),
        environment: {
          NODE_ENV: process.env.NODE_ENV,
          MT5_BACKEND_URL: process.env.MT5_BACKEND_URL ? "Set" : "Not set",
          NEXT_PUBLIC_MT5_BACKEND_URL: process.env.NEXT_PUBLIC_MT5_BACKEND_URL ? "Set" : "Not set",
        },
      },
      { status: 500 },
    )
  }
}
