import type React from "react"
// This file might be importing BacktestingSection
// Let's check and fix it if needed
export default function BacktestingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="bg-gray-100 min-h-screen">{children}</div>
    </div>
  )
}
