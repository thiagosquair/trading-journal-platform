"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)

    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  return isMobile
}

// Export alias for backward compatibility
export const useIsMobile = useMobile

// Default export
export default useMobile
