import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <Link href="/terms" className="hover:text-primary transition-colors">
            Terms & Conditions
          </Link>
          <Link href="/refund-policy" className="hover:text-primary transition-colors">
            Refund Policy
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About Us
          </Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/contact" className="hover:text-primary transition-colors">
            Contact Us
          </Link>
        </div>
        <div className="text-center mt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Chillout Fox. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
