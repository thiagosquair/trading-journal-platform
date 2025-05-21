import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MT4BridgeDownloadGuide() {
  return (
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>MT4 Bridge Download & Installation Guide</CardTitle>
          <CardDescription>
            Follow these steps to download and install the MT4 Bridge to connect your MetaTrader 4 account to our platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-muted rounded-lg">
            <img 
              src="/metatrader-bridge-installer.png" 
              alt="MT4 Bridge Installer" 
              className="w-full md:w-1/3 h-auto rounded-md"
            />
            <div>
              <h3 className="text-xl font-semibold mb-2">MT\
