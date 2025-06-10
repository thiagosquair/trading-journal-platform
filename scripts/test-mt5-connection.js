// Test script to verify MT5 backend connection
// Run with: node scripts/test-mt5-connection.js

const BACKEND_URL = process.env.MT5_BACKEND_URL || process.env.NEXT_PUBLIC_MT5_BACKEND_URL || "http://localhost:3001"

async function testConnection() {
  console.log(`Testing connection to MT5 backend at: ${BACKEND_URL}`)

  try {
    // Test health endpoint
    console.log("\nTesting health endpoint...")
    const healthResponse = await fetch(`${BACKEND_URL}/health`)
    const healthStatus = healthResponse.ok ? "OK" : "Failed"
    console.log(`Health check: ${healthStatus} (${healthResponse.status})`)

    try {
      const healthData = await healthResponse.json()
      console.log("Health response:", healthData)
    } catch (e) {
      const healthText = await healthResponse.text()
      console.log("Health response:", healthText)
    }

    // Test account info endpoint
    console.log("\nTesting account info endpoint...")
    const accountResponse = await fetch(`${BACKEND_URL}/api/mt5/account-info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accountId: "test-account-123" }),
    })

    const accountStatus = accountResponse.ok ? "OK" : "Failed"
    console.log(`Account info check: ${accountStatus} (${accountResponse.status})`)

    try {
      const accountData = await accountResponse.json()
      console.log("Account info response:", accountData)
    } catch (e) {
      const accountText = await accountResponse.text()
      console.log("Account info response:", accountText)
    }

    // Test history endpoint
    console.log("\nTesting history endpoint...")
    const historyResponse = await fetch(`${BACKEND_URL}/api/mt5/history?accountId=test-account-123`)

    const historyStatus = historyResponse.ok ? "OK" : "Failed"
    console.log(`History check: ${historyStatus} (${historyResponse.status})`)

    try {
      const historyData = await historyResponse.json()
      console.log("History response:", historyData)
    } catch (e) {
      const historyText = await historyResponse.text()
      console.log("History response:", historyText)
    }

    console.log("\nTest complete!")
  } catch (error) {
    console.error("Connection test failed:", error)
  }
}

testConnection()
