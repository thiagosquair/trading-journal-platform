// src/pages/api/mt5/positions.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { mt5Connector } from "@/app/trading-accounts/mt5Connector"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const { accountId } = req.query

    if (!accountId) {
      return res.status(400).json({ message: "Missing accountId" })
    }

    const positions = await mt5Connector.getLiveData(accountId as string)

    return res.status(200).json(positions)
  } catch (error: any) {
    console.error("Error getting positions:", error)
    return res.status(500).json({ message: "Internal server error", error: error.message })
  }
}
