import { type NextRequest, NextResponse } from "next/server"
import { DataManager } from "@/lib/data-providers/data-manager"

export async function GET(request: NextRequest, { params }: { params: { provider: string } }) {
  try {
    const { provider } = params

    if (!provider) {
      return NextResponse.json({ success: false, message: "Provider name is required" }, { status: 400 })
    }

    const dataManager = DataManager.getInstance()
    const info = await dataManager.getProviderInfo(provider)

    return NextResponse.json({ success: true, info })
  } catch (error) {
    console.error(`Error fetching provider info for ${params.provider}:`, error)
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch provider info" },
      { status: 500 },
    )
  }
}
