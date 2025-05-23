import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { accountId } = body

    if (!accountId) {
      return NextResponse.json({ error: "Account ID is required" }, { status: 400 })
    }

    console.log(`Disconnecting MT5 account: ${accountId}`)

    // For demo purposes, we'll simulate a successful disconnection
    return NextResponse.json({
      message: "Account disconnected successfully",
      accountId,
    })
  } catch (error: any) {
    console.error("Error disconnecting MT5 account:", error)
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}
