import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, server, login, password, saveCredentials } = body

    if (!name || !server || !login || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log(`Connecting MT5 account: ${name} (${login})`)

    // For demo purposes, we'll simulate a successful connection
    // In a real implementation, this would connect to MetaAPI or another service

    const mockAccountInfo = {
      balance: 10000 + Math.random() * 50000,
      equity: 9500 + Math.random() * 50000,
      currency: "USD",
      leverage: "1:100",
      margin: Math.random() * 1000,
      freeMargin: 9000 + Math.random() * 40000,
      marginLevel: 900 + Math.random() * 100,
      server: server,
      accountId: `mt5_${login}`,
      message: "Account connected successfully (DEMO MODE)",
    }

    return NextResponse.json(mockAccountInfo)
  } catch (error: any) {
    console.error("Error connecting MT5 account:", error)
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}
