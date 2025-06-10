// Force API usage instead of localStorage mock data
const BACKEND_URL = process.env.NEXT_PUBLIC_MT5_BACKEND_URL || "http://localhost:3001"

export const MT5_CONFIG = {
  useRealApi: true, // Force using real API instead of mock data
  backendUrl: BACKEND_URL,
  debug: true, // Enable verbose logging
}

export async function fetchFromMT5Backend(endpoint: string, options: RequestInit = {}) {
  const url = `${BACKEND_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`

  console.log(`[MT5 API] Fetching from: ${url}`, options)

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    const data = await response.json()
    console.log(`[MT5 API] Response from ${endpoint}:`, data)

    if (!response.ok) {
      throw new Error(data.error || `API error: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error(`[MT5 API] Error fetching ${endpoint}:`, error)
    throw error
  }
}
