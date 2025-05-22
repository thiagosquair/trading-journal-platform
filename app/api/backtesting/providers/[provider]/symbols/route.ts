import { type NextRequest, NextResponse } from "next/server"
import { DataManager } from "@/lib/data-providers/data-manager"

export async function GET(request: NextRequest, { params }: { params: { provider: string } }) {
  try {
    const { provider } = params

    if (!provider) {
      return NextResponse.json({ success: false, message: "Provider name is required" }, { status: 400 })
    }

    const dataManager = DataManager.getInstance()
    const symbols = await dataManager.getAvailableSymbols(provider)

    return NextResponse.json({ success: true, symbols })
  } catch (error) {
    console.error(`Error fetching symbols for ${params.provider}:`, error)
    return NextResponse.json({ success: false, message: error.message || "Failed to fetch symbols" }, { status: 500 })
  }
}
