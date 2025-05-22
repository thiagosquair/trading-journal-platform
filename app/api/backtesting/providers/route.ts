import { type NextRequest, NextResponse } from "next/server"
import { DataManager } from "@/lib/data-providers/data-manager"

export async function GET(request: NextRequest) {
  try {
    const dataManager = DataManager.getInstance()
    const providers = await dataManager.getAvailableProviders()

    return NextResponse.json({ success: true, providers })
  } catch (error) {
    console.error("Error fetching data providers:", error)
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch data providers" },
      { status: 500 },
    )
  }
}
