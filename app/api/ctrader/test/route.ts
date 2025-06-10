import { type NextRequest, NextResponse } from "next/server"
import { ctraderDemo, ctraderLive } from "@/lib/ctrader/ctrader-client"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const environment = searchParams.get("environment") || "demo"

    console.log("[cTrader Test] Testing connection for environment:", environment)

    const client = environment === "demo" ? ctraderDemo : ctraderLive

    // Test authentication
    const authSuccess = await client.authenticate()

    if (!authSuccess) {
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
    }

    // Test connection
    const connectionTest = await client.testConnection()

    if (!connectionTest.success) {
      return NextResponse.json({ error: connectionTest.message }, { status: 500 })
    }

    // Get accounts
    const accounts = await client.getAccounts()

    return NextResponse.json({
      success: true,
      message: connectionTest.message,
      environment,
      credentials: {
        clientId: process.env.CTRADER_CLIENT_ID?.substring(0, 10) + "...",
        hasClientSecret: !!process.env.CTRADER_CLIENT_SECRET,
        redirectUri: process.env.CTRADER_REDIRECT_URI,
      },
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
    console.error("[cTrader Test] Error:", error)
    return NextResponse.json(
      {
        error: error.message || "Test failed",
        details: error.stack,
        environment: request.nextUrl.searchParams.get("environment") || "demo",
      },
      { status: 500 },
    )
  }
}
