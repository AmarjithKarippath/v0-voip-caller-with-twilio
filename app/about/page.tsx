import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-8">About Us</h1>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              VoiceCall is dedicated to providing affordable, high-quality international calling services directly from
              your browser. We believe communication should be accessible to everyone, everywhere.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our platform enables you to make international calls to any country without restrictions. With competitive
              rates and no hidden fees, you only pay for what you use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Why Choose VoiceCall?</h2>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-2">
              <li>No contracts or subscriptions required</li>
              <li>Crystal clear call quality</li>
              <li>Works in all countries without restrictions</li>
              <li>Privacy-first approach - we don't store your payment information</li>
              <li>Credit-based system - pay only for what you use</li>
              <li>No phone number required to start calling</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
            <p className="text-muted-foreground leading-relaxed">
              Built on reliable VOIP technology powered by Twilio, VoiceCall delivers enterprise-grade call quality at
              consumer-friendly prices. Our browser-based platform means no downloads or installations required.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Customer Support</h2>
            <p className="text-muted-foreground leading-relaxed">
              We're committed to providing excellent customer service. If you have any questions or need assistance, our
              support team is here to help.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
