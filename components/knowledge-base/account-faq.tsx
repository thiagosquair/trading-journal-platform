import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function AccountFAQ() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Account & Billing FAQ</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What subscription plans does TradeLinx offer?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">TradeLinx offers three subscription tiers:</p>
            <ul className="list-disc pl-5 space-y-4">
              <li>
                <strong>Free Plan:</strong> Basic journaling, limited trade tracking, and access to essential
                educational content.
              </li>
              <li>
                <strong>Basic Plan ($19.99/month):</strong> Full journaling capabilities, unlimited trade tracking,
                performance analytics, and access to all educational content.
              </li>
              <li>
                <strong>Premium Plan ($39.99/month):</strong> Everything in Basic plus AI trade analysis, advanced
                psychology tools, priority support, and API access.
              </li>
            </ul>
            <p className="mt-4">
              All plans can be billed monthly or annually (with a 20% discount for annual billing). Visit our{" "}
              <a href="/pricing" className="text-blue-600 hover:underline">
                pricing page
              </a>{" "}
              for a detailed comparison.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How do I upgrade or downgrade my subscription?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">You can change your subscription at any time:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Go to Settings → Billing in the sidebar</li>
              <li>Click "Manage Subscription"</li>
              <li>Select your desired plan</li>
              <li>Confirm the change</li>
            </ol>
            <p className="mt-4">
              When upgrading, you'll be charged the prorated difference for the remainder of your billing cycle. When
              downgrading, the change will take effect at the end of your current billing cycle.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Can I cancel my subscription?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">Yes, you can cancel your subscription at any time:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Go to Settings → Billing in the sidebar</li>
              <li>Click "Manage Subscription"</li>
              <li>Select "Cancel Subscription"</li>
              <li>Confirm the cancellation</li>
            </ol>
            <p className="mt-4">
              Your subscription will remain active until the end of your current billing period. After cancellation,
              your account will revert to the Free plan, but you'll retain access to your historical data.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>How do I update my payment information?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">To update your payment method:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Go to Settings → Billing in the sidebar</li>
              <li>Click "Payment Methods"</li>
              <li>Select "Add Payment Method" or edit an existing one</li>
              <li>Enter your new payment details</li>
              <li>Set as default if desired</li>
            </ol>
            <p className="mt-4">
              TradeLinx uses Stripe for secure payment processing. Your payment information is never stored on our
              servers.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>Is my data secure and private?</AccordionTrigger>
          <AccordionContent>
            <p className="mb-4">Yes, TradeLinx takes data security and privacy seriously:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>All data is encrypted in transit and at rest</li>
              <li>We use industry-standard security practices</li>
              <li>Your trading data is never shared with third parties</li>
              <li>You maintain ownership of all your data</li>
              <li>We offer data export and deletion options</li>
            </ul>
            <p className="mt-4">
              For broker connections, we use read-only API access whenever possible, meaning we can never place trades
              on your behalf.
            </p>
            <p className="mt-4">
              For more details, please review our{" "}
              <a href="/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
