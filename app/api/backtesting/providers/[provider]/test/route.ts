import { type NextRequest, NextResponse } from "next/server"
import { DataManager } from "@/lib/data-providers/data-manager"

export async function POST(request: NextRequest, { params }: { params: { provider: string } }) {
  try {
    const { provider } = params

    if (!provider) {
      return NextResponse.json({ success: false, message: "Provider name is required" }, { status: 400 })
    }

    const dataManager = DataManager.getInstance()
    const result = await dataManager.testProviderConnection(provider)

    return NextResponse.json(result)
  } catch (error) {
    console.error(`Error testing connection for ${params.provider}:`, error)
    return NextResponse.json({ success: false, message: error.message || "Failed to test connection" }, { status: 500 })
  }
}
