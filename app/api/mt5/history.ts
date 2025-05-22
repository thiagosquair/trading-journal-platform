// src/pages/api/mt5/history.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { mt5Connector } from "@/app/trading-accounts/mt5Connector"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const { accountId, startDate, endDate } = req.query

    if (!accountId || !startDate || !endDate) {
      return res.status(400).json({ message: "Missing required fields" })
    }

    const history = await mt5Connector.getHistory(accountId as string, startDate as string, endDate as string)

    return res.status(200).json(history)
  } catch (error: any) {
    console.error("Error getting trade history:", error)
    return res.status(500).json({ message: "Internal server error", error: error.message })
  }
}
