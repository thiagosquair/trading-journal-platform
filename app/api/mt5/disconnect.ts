// src/pages/api/mt5/disconnect.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { mt5Connector } from "@/app/trading-accounts/mt5Connector"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const { accountId } = req.body

    if (!accountId) {
      return res.status(400).json({ message: "Missing accountId" })
    }

    // Assuming there's a disconnectFromAccount method
    await mt5Connector.disconnectFromAccount(accountId)

    return res.status(200).json({ success: true })
  } catch (error: any) {
    console.error("Error disconnecting account:", error)
    return res.status(500).json({ message: "Internal server error", error: error.message })
  }
}
