import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function PlatformFAQ() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Platform Features FAQ</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I connect my trading account?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">TradeLinx supports multiple brokers and platforms. To connect your trading account:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Go to the Trading Accounts section in the sidebar</li>
              <li>Click on "Connect New Account"</li>
              <li>Select your broker from the list</li>
              <li>Follow the specific instructions for your broker</li>
              <li>Once connected, your trades will automatically sync</li>
            </ol>
            <p className="mt-4">
              For detailed instructions for specific brokers, check our{" "}
              <a href="/knowledge-base/connect-accounts" className="text-blue-600 hover:underline">
                connection guides
              </a>
              .
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How does the AI trade analysis work?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">
              Our AI trade analysis feature uses advanced algorithms to analyze your trading patterns and provide
              insights:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>It examines entry and exit points against market conditions</li>
              <li>Identifies patterns in your successful and unsuccessful trades</li>
              <li>Suggests improvements based on your trading history</li>
              <li>Provides personalized recommendations to enhance your strategy</li>
            </ul>
            <p className="mt-4">
              To use this feature, navigate to any trade in your journal and click "Analyze Trade" or use the AI
              Analysis section from the dashboard.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>How do I create and track trading goals?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">Setting and tracking goals is easy with TradeLinx:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Navigate to the Goals section in the sidebar</li>
              <li>Click "Create New Goal"</li>
              <li>Choose from performance, risk management, or psychology goals</li>
              <li>Set your target metrics and timeframe</li>
              <li>TradeLinx will automatically track your progress</li>
            </ol>
            <p className="mt-4">
              You can view your goal progress on the Goals dashboard and receive notifications when you're approaching
              or have achieved your goals.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Can I export my trading data?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">Yes, TradeLinx allows you to export your trading data in multiple formats:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>CSV format for spreadsheet analysis</li>
              <li>PDF reports for printing or sharing</li>
              <li>Performance summaries for specific date ranges</li>
            </ul>
            <p className="mt-4">
              To export data, go to Reports → Statements in the sidebar, select your date range and account, then click
              "Export" and choose your preferred format.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>How do I use the journal feature effectively?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">The journal is a powerful tool for improving your trading:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Create entries for each trading day or individual trades</li>
              <li>Add screenshots of charts with your analysis</li>
              <li>Tag entries with relevant categories (strategy, market, etc.)</li>
              <li>Record your emotional state and decision-making process</li>
              <li>Review past entries to identify patterns and improvements</li>
            </ul>
            <p className="mt-4">
              We recommend journaling daily, even on days you don't trade, to maintain consistency and track your
              trading psychology.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
