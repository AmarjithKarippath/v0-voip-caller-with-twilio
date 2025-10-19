"use client"

import { useState } from "react"
import { VoipDialer } from "@/components/voip-dialer"
import { Header } from "@/components/header"
import { AddCreditModal } from "@/components/add-credit-modal"

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [showAddCredit, setShowAddCredit] = useState(false)
  const [userEmail, setUserEmail] = useState("user@example.com")

  const handleSignIn = () => {
    setIsSignedIn(true)
    setUserEmail("user@example.com")
  }

  const handleSignOut = () => {
    setIsSignedIn(false)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header
        isSignedIn={isSignedIn}
        userEmail={userEmail}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        onAddCredit={() => setShowAddCredit(true)}
      />
      <div className="pt-16">
        <VoipDialer isSignedIn={isSignedIn} onSignIn={handleSignIn} onAddCredit={() => setShowAddCredit(true)} />
      </div>
      <AddCreditModal open={showAddCredit} onOpenChange={setShowAddCredit} />
    </main>
  )
}
