"use client"

import { useState } from "react"
import { DialPad } from "./dial-pad"
import { CallControls } from "./call-controls"
import { CallHistory } from "./call-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Phone, Clock, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function VoipDialer() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isInCall, setIsInCall] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [callSid, setCallSid] = useState<string | null>(null)
  const [durationInterval, setDurationInterval] = useState<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

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

      // Start call duration counter
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

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-6 text-center">
            <h1 className="text-2xl font-bold mb-1">VoiceCall</h1>
            <p className="text-sm opacity-90">Powered by Twilio</p>
          </div>

          <Tabs defaultValue="dialer" className="w-full">
            <TabsList className="w-full grid grid-cols-3 rounded-none border-b">
              <TabsTrigger value="dialer" className="gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Dialer</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2">
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
              <TabsTrigger value="contacts" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Contacts</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dialer" className="p-6 space-y-6">
              {/* Phone Number Display */}
              <div className="bg-muted rounded-lg p-4 min-h-[60px] flex items-center justify-center">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                  className="bg-transparent text-2xl font-mono text-center w-full outline-none text-foreground placeholder:text-muted-foreground"
                  readOnly={isInCall}
                />
              </div>

              {/* Call Duration (shown during call) */}
              {isInCall && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <span className="font-mono font-semibold">{formatDuration(callDuration)}</span>
                  </div>
                </div>
              )}

              {/* Dial Pad */}
              <DialPad onNumberInput={handleNumberInput} onDelete={handleDelete} disabled={isInCall} />

              {/* Call Controls */}
              <CallControls isInCall={isInCall} onCall={handleCall} onEndCall={handleEndCall} disabled={!phoneNumber} />
            </TabsContent>

            <TabsContent value="history" className="p-6">
              <CallHistory />
            </TabsContent>

            <TabsContent value="contacts" className="p-6">
              <div className="text-center text-muted-foreground py-12">
                <User className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No contacts yet</p>
                <p className="text-sm mt-1">Add contacts to quick dial</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-4 text-sm text-muted-foreground">
          <p>Tip: Long press 0 to enter + for international calls</p>
        </div>
      </div>
    </div>
  )
}
