// src/pages/api/mt5/connect.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { mt5Connector } from "@/app/trading-accounts/mt5Connector"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const { login, password, serverName, accountId } = req.body

    if (!login || !password || !serverName || !accountId) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    // Use the mt5Connector to connect to the account
    await mt5Connector.connectToAccount(accountId)

    return res.status(200).json({ success: true, accountId })
  } catch (error: any) {
    console.error("Error connecting to MT5:", error)
    return res.status(500).json({ message: "Internal server error", error: error.message })
  }
}
