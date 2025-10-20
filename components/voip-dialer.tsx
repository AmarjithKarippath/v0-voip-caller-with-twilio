"use client"

import { useState } from "react"
import { DialPad } from "./dial-pad"
import { Button } from "@/components/ui/button"
import { Phone, Plus, X, Check, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface VoipDialerProps {
  isSignedIn: boolean
  onSignIn: () => void
  onAddCredit: () => void
}

export function VoipDialer({ isSignedIn, onSignIn, onAddCredit }: VoipDialerProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isInCall, setIsInCall] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [callSid, setCallSid] = useState<string | null>(null)
  const [durationInterval, setDurationInterval] = useState<NodeJS.Timeout | null>(null)
  const [countryCode, setCountryCode] = useState("+1")
  const [balance] = useState(200)
  const { toast } = useToast()

  const handleBalanceClick = () => {
    if (!isSignedIn) {
      onSignIn()
    } else {
      onAddCredit()
    }
  }

  const handleNumberInput = (digit: string) => {
    setPhoneNumber((prev) => prev + digit)
  }

  const handleDelete = () => {
    setPhoneNumber((prev) => prev.slice(0, -1))
  }

  const handleCall = async () => {
    if (!phoneNumber) return

    try {
      console.log("[v0] Initiating call to:", phoneNumber)

      const response = await fetch("/api/twilio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: phoneNumber,
          from: process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate call")
      }

      console.log("[v0] Call initiated successfully:", data.callSid)
      setIsInCall(true)
      setCallSid(data.callSid)

      const interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
      setDurationInterval(interval)

      toast({
        title: "Call initiated",
        description: `Calling ${phoneNumber}...`,
      })
    } catch (error) {
      console.error("[v0] Call error:", error)
      toast({
        title: "Call failed",
        description: error instanceof Error ? error.message : "Failed to initiate call",
        variant: "destructive",
      })
    }
  }

  const handleEndCall = () => {
    if (durationInterval) {
      clearInterval(durationInterval)
      setDurationInterval(null)
    }
    setIsInCall(false)
    setCallDuration(0)
    setCallSid(null)
    console.log("[v0] Call ended")

    toast({
      title: "Call ended",
      description: `Duration: ${formatDuration(callDuration)}`,
    })
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAddCreditClick = () => {
    if (!isSignedIn) {
      onSignIn()
    } else {
      onAddCredit()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left Column - Hero Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight header-text">
              Cheapest International Calls
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Call clients worldwide to any number. Pay only for what you use. No contracts
              or hidden fees.
            </p>
          </div>

          <Button
            onClick={handleAddCreditClick}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all text-lg"
          >
            Add Credit to Call
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                From only <span className="font-semibold text-foreground">0.02 USD</span> per minute!
              </p>
              <p className="text-sm font-semibold text-primary">First call is FREE</p>
            </div>

            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full border border-accent/20">
              <Check className="h-4 w-4" />
              <span className="text-sm font-medium">50x cheaper than your carrier</span>
            </div>
          </div>
        </div>

        {/* Right Column - Dialer Card */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-card rounded-3xl shadow-2xl p-8 space-y-6 border border-border/50">
            {/* Balance */}
            <div className="flex items-center justify-start">
              <div className="flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full border border-primary/30">
                <span className="text-sm font-semibold">Balance: ${balance}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 rounded-full hover:bg-primary/30"
                  onClick={handleBalanceClick}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Country Selector and Phone Input */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="w-32 bg-secondary border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+1">US +1</SelectItem>
                    <SelectItem value="+44">UK +44</SelectItem>
                    <SelectItem value="+91">IN +91</SelectItem>
                    <SelectItem value="+86">CN +86</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex-1 relative">
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full bg-secondary border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    readOnly={isInCall}
                  />
                  {phoneNumber && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 hover:bg-muted"
                      onClick={() => setPhoneNumber("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>


            {/* Dial Pad */}
            <DialPad onNumberInput={handleNumberInput} onDelete={handleDelete} disabled={isInCall} />
            {/* Call Button */}
            <div className="flex items-center justify-center gap-4">
              {/* <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-full border-border/50 hover:bg-secondary bg-transparent"
              >
                <span className="text-sm font-semibold">123</span>
              </Button> */}

              {!isInCall ? (
                <Button
                  size="icon"
                  onClick={handleCall}
                  disabled={!phoneNumber}
                  className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  <Phone className="h-6 w-6" />
                </Button>
              ) : (
                <Button
                  size="icon"
                  onClick={handleEndCall}
                  className="h-16 w-16 rounded-full bg-destructive hover:bg-destructive/90 shadow-lg hover:shadow-xl transition-all"
                >
                  <Phone className="h-6 w-6 rotate-135" />
                </Button>
              )}

              <Button
                variant="outline"
                size="icon"
                onClick={handleDelete}
                className="h-14 w-14 rounded-full border-border/50 hover:bg-secondary bg-transparent"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Call Duration */}
            {isInCall && (
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="font-mono font-semibold">{formatDuration(callDuration)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
