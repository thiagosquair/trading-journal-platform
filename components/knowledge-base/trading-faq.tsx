import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function TradingFAQ() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Trading Knowledge FAQ</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is risk management and why is it important?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">
              Risk management is the practice of identifying, analyzing, and mitigating potential losses in trading.
              It's crucial because:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>It protects your trading capital from significant drawdowns</li>
              <li>It helps you maintain emotional stability during trading</li>
              <li>It ensures longevity in the markets despite inevitable losing trades</li>
              <li>It's often the difference between successful and unsuccessful traders</li>
            </ul>
            <p className="mt-4">
              Key risk management principles include position sizing, setting stop losses, maintaining proper
              risk-reward ratios, and avoiding overtrading.
            </p>
            <p className="mt-4">
              Learn more in our{" "}
              <a href="/courses/risk-management" className="text-blue-600 hover:underline">
                Risk Management course module
              </a>
              .
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How do I develop a trading strategy?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">Developing a trading strategy involves several key steps:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Define your trading goals and time commitment</li>
              <li>Choose markets that match your interests and schedule</li>
              <li>Identify your edge (what gives you an advantage)</li>
              <li>Establish entry and exit criteria</li>
              <li>Determine position sizing and risk parameters</li>
              <li>Backtest your strategy with historical data</li>
              <li>Paper trade to validate in real-time without risk</li>
              <li>Implement with small positions and scale gradually</li>
              <li>Continuously review and refine based on results</li>
            </ol>
            <p className="mt-4">
              Your strategy should align with your personality and risk tolerance. What works for others may not work
              for you.
            </p>
            <p className="mt-4">
              Our{" "}
              <a href="/courses/strategy-development" className="text-blue-600 hover:underline">
                Strategy Development course
              </a>{" "}
              provides a comprehensive framework for creating your own strategy.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>What are the most common trading mistakes?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">Even experienced traders make these common mistakes:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Overtrading:</strong> Taking too many trades out of boredom or FOMO
              </li>
              <li>
                <strong>Inadequate risk management:</strong> Risking too much on single trades
              </li>
              <li>
                <strong>Moving stop losses:</strong> Widening stops to avoid losses
              </li>
              <li>
                <strong>Revenge trading:</strong> Trying to recover losses with impulsive trades
              </li>
              <li>
                <strong>Not following your plan:</strong> Abandoning strategy in the heat of the moment
              </li>
              <li>
                <strong>Confirmation bias:</strong> Only seeing information that supports your view
              </li>
              <li>
                <strong>Cutting winners short:</strong> Taking profits too early due to fear
              </li>
              <li>
                <strong>Letting losses run:</strong> Hoping losing trades will turn around
              </li>
            </ul>
            <p className="mt-4">
              TradeLinx's journaling and analytics tools help identify these patterns in your trading so you can address
              them.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>How do I prepare for trading each day?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">A structured pre-market routine improves trading performance:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Market overview:</strong> Review major indices, futures, and overnight news
              </li>
              <li>
                <strong>Economic calendar:</strong> Check for important economic releases
              </li>
              <li>
                <strong>Watchlist preparation:</strong> Identify potential setups for the day
              </li>
              <li>
                <strong>Level identification:</strong> Mark key support/resistance levels
              </li>
              <li>
                <strong>Plan creation:</strong> Define specific entry, exit, and risk parameters
              </li>
              <li>
                <strong>Mental preparation:</strong> Brief meditation or mindfulness exercise
              </li>
              <li>
                <strong>Journal review:</strong> Check recent entries for insights
              </li>
            </ol>
            <p className="mt-4">
              Use TradeLinx's pre-trade checklist in the Psychology section to ensure you're mentally prepared for the
              trading day.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>How do I become a funded trader?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">Becoming a funded trader through prop firms requires these steps:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Develop and refine a consistent trading strategy</li>
              <li>Practice with a demo account until you achieve consistent results</li>
              <li>Research reputable prop firms and their evaluation criteria</li>
              <li>Select a challenge that matches your trading style</li>
              <li>Prepare for the evaluation by understanding all rules</li>
              <li>Focus on risk management during the challenge (this is key!)</li>
              <li>Pass the evaluation phase(s) by meeting profit targets while respecting drawdown limits</li>
              <li>Complete any verification phases</li>
              <li>Receive funding and continue trading with the firm's capital</li>
            </ol>
            <p className="mt-4">
              TradeLinx's performance tracking can help you demonstrate your trading consistency to potential prop
              firms.
            </p>
            <p className="mt-4">
              Our{" "}
              <a href="/courses/funded-trader" className="text-blue-600 hover:underline">
                Funded Trader course
              </a>{" "}
              provides detailed guidance on preparing for and passing prop firm challenges.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
