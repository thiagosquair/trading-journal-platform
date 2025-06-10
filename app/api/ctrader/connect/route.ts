import { type NextRequest, NextResponse } from "next/server"
import { createCTraderClient } from "@/lib/ctrader/ctrader-client"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clientId, clientSecret, environment = "demo" } = body

    console.log("[cTrader Connect API] Attempting to connect:", { clientId, environment })

    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: "Client ID and Client Secret are required" }, { status: 400 })
    }

    // Create client with provided credentials
    const client = createCTraderClient({
      clientId,
      clientSecret,
      redirectUri: process.env.CTRADER_REDIRECT_URI || "",
      environment: environment as "demo" | "live",
    })

    // Authenticate
    const success = await client.authenticate()

    if (!success) {
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
    }

    // Get accounts to verify connection
    const accounts = await client.getAccounts()

    // Test connection
    const connectionTest = await client.testConnection()

    return NextResponse.json({
      success: true,
      message: connectionTest.message,
      environment,
      accountCount: accounts.length,
      accounts: accounts.map((account) => ({
        accountId: account.accountId,
        accountNumber: account.accountNumber,
        brokerName: account.brokerName,
        currency: account.depositCurrency,
        balance: account.balance,
        equity: account.equity,
        accountType: account.accountType,
        isLive: account.isLive,
      })),
    })
  } catch (error) {
    console.error("[cTrader Connect API] Error:", error)
    return NextResponse.json(
      {
        error: error.message || "Connection failed",
        details: error.stack,
      },
      { status: 500 },
    )
  }
}
