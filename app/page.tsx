import { VoipDialer } from "@/components/voip-dialer"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="fixed top-6 left-6 z-50">
        <ThemeToggle />
      </div>
      <VoipDialer />
    </main>
  )
}
