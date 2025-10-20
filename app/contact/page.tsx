import Link from "next/link"
import { ArrowLeft, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

        <div className="space-y-6">
          <p className="text-muted-foreground text-lg leading-relaxed">
            We're here to help! If you have any questions, concerns, or feedback, please don't hesitate to reach out to
            us.
          </p>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Email Support
              </CardTitle>
              <CardDescription>Get in touch with our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <a href="mailto:amarjithsudhakar@gmail.com" className="text-primary hover:underline text-lg font-medium">
                amarjithsudhakar@gmail.com
              </a>
              <p className="text-muted-foreground mt-2">We typically respond within 24 hours during business days.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                What We Can Help With
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Technical support and troubleshooting</li>
                <li>Account and billing inquiries</li>
                <li>Refund requests</li>
                <li>Feature requests and feedback</li>
                <li>General questions about our service</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM (EST)</p>
              <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
              <p className="text-sm text-muted-foreground mt-4">
                For urgent issues outside business hours, please email us and we'll respond as soon as possible.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
