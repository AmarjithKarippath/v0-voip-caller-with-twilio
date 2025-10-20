import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Money Back Guarantee</h2>
            <p className="text-muted-foreground leading-relaxed">
              We offer a 100% money back guarantee with no questions asked. Your satisfaction is our priority.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Refund Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              You may request a refund within 30 days of your purchase if you are not satisfied with our service.
              Refunds are available for unused credits only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How to Request a Refund</h2>
            <p className="text-muted-foreground leading-relaxed">
              To request a refund, please contact our support team at amarjithsudhakar@gmail.com with your account
              details and reason for the refund request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Processing Time</h2>
            <p className="text-muted-foreground leading-relaxed">
              Refunds are typically processed within 5-7 business days. The refund will be credited to the original
              payment method used for the purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Partial Refunds</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have used some of your credits, we will issue a partial refund for the unused portion based on the
              current rate.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Non-Refundable Items</h2>
            <p className="text-muted-foreground leading-relaxed">
              Service fees and promotional credits are non-refundable. Only purchased credits are eligible for refunds.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
