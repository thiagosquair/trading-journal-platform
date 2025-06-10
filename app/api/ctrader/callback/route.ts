import { type NextRequest, NextResponse } from "next/server"
import { createCTraderClient } from "@/lib/ctrader/ctrader-client"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const error = searchParams.get("error")

    console.log("[cTrader Callback] Received callback:", { code: !!code, state, error })

    if (error) {
      console.error("[cTrader Callback] OAuth error:", error)
      return NextResponse.redirect(
        new URL("/trading-accounts/connect-ctrader?error=" + encodeURIComponent(error), request.url),
      )
    }

    if (!code) {
      console.error("[cTrader Callback] No authorization code received")
      return NextResponse.redirect(new URL("/trading-accounts/connect-ctrader?error=no_code", request.url))
    }

    // Parse state to determine if demo or live
    const isDemo = state?.includes("demo") !== false

    // Create client
    const client = createCTraderClient({
      clientId: process.env.CTRADER_CLIENT_ID!,
      clientSecret: process.env.CTRADER_CLIENT_SECRET!,
      redirectUri: process.env.CTRADER_REDIRECT_URI!,
      environment: isDemo ? "demo" : "live",
    })

    // Exchange code for access token
    const tokenData = await exchangeCodeForToken(code, client)

    if (!tokenData.access_token) {
      throw new Error("Failed to get access token")
    }

    // Store tokens (in a real app, you'd store these securely)
    // For now, we'll redirect with success and let the frontend handle it
    const successUrl = new URL("/trading-accounts/connect-ctrader", request.url)
    successUrl.searchParams.set("success", "true")
    successUrl.searchParams.set("environment", isDemo ? "demo" : "live")

    return NextResponse.redirect(successUrl)
  } catch (error) {
    console.error("[cTrader Callback] Error:", error)
    const errorUrl = new URL("/trading-accounts/connect-ctrader", request.url)
    errorUrl.searchParams.set("error", encodeURIComponent(error.message || "Authentication failed"))
    return NextResponse.redirect(errorUrl)
  }
}

async function exchangeCodeForToken(code: string, client: any) {
  const response = await fetch(`${client.baseUrl}/v1/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.CTRADER_CLIENT_ID!,
      client_secret: process.env.CTRADER_CLIENT_SECRET!,
      code: code,
      redirect_uri: process.env.CTRADER_REDIRECT_URI!,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Token exchange failed: ${error}`)
  }

  return await response.json()
}
