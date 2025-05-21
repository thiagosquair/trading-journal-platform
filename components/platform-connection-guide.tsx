"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"

interface PlatformConnectionGuideProps {
  platform: string
  onClose: () => void
}

export default function PlatformConnectionGuide({ platform, onClose }: PlatformConnectionGuideProps) {
  const renderGuide = () => {
    switch (platform) {
      case "mt4":
        return <MT4Guide />
      case "mt5":
        return <MT5Guide />
      case "tradingview":
        return <TradingViewGuide />
      case "interactivebrokers":
        return <InteractiveBrokersGuide />
      case "tradelocker":
        return <TradeLockerGuide />
      default:
        return <GenericGuide platform={platform} />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onClose}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h2 className="text-xl font-semibold">Connection Guide: {getPlatformName(platform)}</h2>
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      <div className="space-y-6">{renderGuide()}</div>
    </div>
  )
}

function getPlatformName(platformId: string): string {
  const platformNames: Record<string, string> = {
    mt4: "MetaTrader 4",
    mt5: "MetaTrader 5",
    tradingview: "TradingView",
    interactivebrokers: "Interactive Brokers",
    dxtrade: "DXtrade",
    ctrader: "cTrader",
    ninjatrader: "NinjaTrader 8",
    matchtrader: "Match Trader",
    tradovate: "Tradovate",
    tradestation: "TradeStation",
    rithmic: "Rithmic",
    sierrachart: "Sierra Chart",
    thinkorswim: "thinkorswim",
    dxfeed: "DX Feed",
    tradelocker: "TradeLocker",
  }

  return platformNames[platformId] || platformId
}

function MT4Guide() {
  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">How to Connect MetaTrader 4</h3>
        <p>
          To connect your MetaTrader 4 account, you'll need your account credentials and the server address. Follow
          these steps:
        </p>

        <div className="space-y-4">
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Step 1: Find Your MT4 Server</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Open your MetaTrader 4 platform and find your server information:
            </p>
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>Open MetaTrader 4</li>
              <li>Go to Tools &gt; Options</li>
              <li>Click on the "Server" tab</li>
              <li>Note the server address (e.g., "Demo-Server-MT4")</li>
            </ol>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Step 2: Get Your Login Credentials</h4>
            <p className="text-sm text-muted-foreground mb-2">You'll need:</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Account Number/Login (e.g., "7890179")</li>
              <li>
                Either your main password <strong>OR</strong> your investor password (recommended for read-only access)
              </li>
            </ul>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Step 3: Enter Details in the Connection Form</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Enter the information in the connection form and click "Test Connection" to verify.
            </p>
            <div className="bg-muted p-2 rounded text-sm">
              <p>
                <strong>Note:</strong> Using the investor password is recommended as it provides read-only access to
                your account data without allowing trades to be placed.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <Button variant="outline" size="sm" asChild>
            <a href="https://www.metatrader4.com/en/trading-platform" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              MT4 Website
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://www.mql5.com/en/articles/1208"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              MT4 User Guide
            </a>
          </Button>
        </div>
      </div>
    </>
  )
}

function MT5Guide() {
  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">How to Connect MetaTrader 5</h3>
        <p>
          To connect your MetaTrader 5 account, you'll need your account credentials and the server address. Follow
          these steps:
        </p>

        <div className="space-y-4">
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Step 1: Find Your MT5 Server</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Open your MetaTrader 5 platform and find your server information:
            </p>
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>Open MetaTrader 5</li>
              <li>Go to Tools &gt; Options</li>
              <li>Click on the "Server" tab</li>
              <li>Note the server address (e.g., "Demo-Server-MT5")</li>
            </ol>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Step 2: Get Your Login Credentials</h4>
            <p className="text-sm text-muted-foreground mb-2">You'll need:</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Account Number/Login (e.g., "8342156")</li>
              <li>
                Either your main password <strong>OR</strong> your investor password (recommended for read-only access)
              </li>
            </ul>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Step 3: Enter Details in the Connection Form</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Enter the information in the connection form and click "Test Connection" to verify.
            </p>
            <div className="bg-muted p-2 rounded text-sm">
              <p>
                <strong>Note:</strong> Using the investor password is recommended as it provides read-only access to
                your account data without allowing trades to be placed.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <Button variant="outline" size="sm" asChild>
            <a href="https://www.metatrader5.com/en/trading-platform" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              MT5 Website
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://www.mql5.com/en/articles/1279"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              MT5 User Guide
            </a>
          </Button>
        </div>
      </div>
    </>
  )
}

function TradingViewGuide() {
  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">How to Connect TradingView</h3>
        <p>
          To connect your TradingView account, you'll need to generate an API key. Follow these steps to set up the
          connection:
        </p>

        <div className="space-y-4">
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Step 1: Generate an API Key</h4>
            <p className="text-sm text-muted-foreground mb-2">
              You'll need to generate an API key from your TradingView account:
            </p>
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>Log in to your TradingView account</li>
              <li>Go to Profile &gt; Settings</li>
              <li>Navigate to the "API Access" tab</li>
              <li>Click "Create New API Key"</li>
              <li>Set appropriate permissions (read-only is recommended)</li>
              <li>Copy both the API Key and API Secret</li>
            </ol>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Step 2: Enter API Details</h4>
            <p className="text-sm text-muted-foreground mb-2">In the connection form, enter:</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>API Key: The key you generated</li>
              <li>API Secret: The secret associated with your key</li>
              <li>Account ID: (Optional) If you have multiple accounts</li>
            </ul>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Step 3: Test and Connect</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Click "Test Connection" to verify your API credentials, then "Connect Account" to complete the setup.
            </p>
            <div className="bg-muted p-2 rounded text-sm">
              <p>
                <strong>Note:</strong> TradingView integration allows you to import charts, indicators, and strategies,
                but does not provide real-time trade synchronization.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <Button variant="outline" size="sm" asChild>
            <a href="https://www.tradingview.com/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              TradingView Website
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://www.tradingview.com/support/solutions/43000614331-how-to-use-pine-script/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Pine Script Guide
            </a>
          </Button>
        </div>
      </div>
    </>
  )
}

function InteractiveBrokersGuide() {
  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">How to Connect Interactive Brokers</h3>
        <p>
          To connect your Interactive Brokers account, you'll need to set up API access. Follow these steps to establish
          the connection:
        </p>

        <div className="space-y-4">
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Step 1: Enable API Access</h4>
            <p className="text-sm text-muted-foreground mb-2">First, enable API access in your IBKR account:</p>
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>Log in to your Interactive Brokers account</li>
              <li>Go to User Settings &gt; API Settings</li>
              <li>Enable API access</li>
              <li>Set appropriate permissions (read-only is recommended for safety)</li>
            </ol>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Step 2: Create API Credentials</h4>
            <p className="text-sm text-muted-foreground mb-2">Generate your API credentials:</p>
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>In API Settings, click "Create API Key"</li>
              <li>Follow the prompts to generate your credentials</li>
              <li>Save your Username/Login and Password securely</li>
            </ol>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Step 3: Enter Connection Details</h4>
            <p className="text-sm text-muted-foreground mb-2">In the connection form, enter:</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Username/Login: Your IBKR username or API username</li>
              <li>Password: Your API password</li>
            </ul>
            <div className="bg-muted p-2 rounded text-sm mt-2">
              <p>
                <strong>Note:</strong> For security reasons, we recommend creating a separate API user with limited
                permissions rather than using your main account credentials.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <Button variant="outline" size="sm" asChild>
            <a href="https://www.interactivebrokers.com/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              IBKR Website
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://www.interactivebrokers.com/en/software/api/api.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              IBKR API Guide
            </a>
          </Button>
        </div>
      </div>
    </>
  )
}

function TradeLockerGuide() {
  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">How to Connect TradeLocker</h3>
        <p>
          To connect your TradeLocker account, you'll need to generate API credentials. Follow these steps to set up the
          connection:
        </p>

        <div className="space-y-4">
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Step 1: Generate API Credentials</h4>
            <p className="text-sm text-muted-foreground mb-2">
              You'll need to generate API credentials from your TradeLocker account:
            </p>
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>Log in to your TradeLocker dashboard</li>
              <li>Navigate to Settings &gt; API Access</li>
              <li>Click "Generate New API Key"</li>
              <li>Set appropriate permissions (read-only is recommended)</li>
              <li>Copy both the API Key and API Secret</li>
            </ol>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Step 2: Enter API Details</h4>
            <p className="text-sm text-muted-foreground mb-2">In the connection form, enter:</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>API Key: The key you generated</li>
              <li>API Secret: The secret associated with your key</li>
              <li>Account ID: (Optional) If you have multiple accounts</li>
            </ul>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Step 3: Test and Connect</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Click "Test Connection" to verify your API credentials, then "Connect Account" to complete the setup.
            </p>
            <div className="bg-muted p-2 rounded text-sm">
              <p>
                <strong>Note:</strong> TradeLocker integration is currently in beta. It provides advanced risk
                management features and trade synchronization capabilities.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            TradeLocker Website
          </Button>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            API Documentation
          </Button>
        </div>
      </div>
    </>
  )
}

function GenericGuide({ platform }: { platform: string }) {
  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">How to Connect {getPlatformName(platform)}</h3>
        <p>
          To connect your {getPlatformName(platform)} account, you'll need to provide the appropriate credentials.
          Follow these general steps:
        </p>

        <div className="space-y-4">
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Step 1: Locate Your Credentials</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Depending on the platform, you'll need different types of credentials:
            </p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Username/Login and Password</li>
              <li>API Key and Secret (for some platforms)</li>
              <li>Server information (if applicable)</li>
            </ul>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Step 2: Enter Connection Details</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Enter the required information in the connection form fields.
            </p>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-2">Step 3: Test and Connect</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Click "Test Connection" to verify your credentials, then "Connect Account" to complete the setup.
            </p>
            <div className="bg-muted p-2 rounded text-sm">
              <p>
                <strong>Note:</strong> For security reasons, we recommend using read-only API access whenever possible.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center pt-4">
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit {getPlatformName(platform)} Website
          </Button>
        </div>
      </div>
    </>
  )
}
