"use client"

import { Button } from "@/components/ui/button"
import { Phone, PhoneOff } from "lucide-react"

interface CallControlsProps {
  isInCall: boolean
  onCall: () => void
  onEndCall: () => void
  disabled?: boolean
}

export function CallControls({ isInCall, onCall, onEndCall, disabled }: CallControlsProps) {
  if (isInCall) {
    return (
      <Button
        size="lg"
        className="w-full h-16 bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 font-semibold text-base"
        onClick={onEndCall}
      >
        <PhoneOff className="h-5 w-5 mr-2" />
        End Call
      </Button>
    )
  }

  return (
    <Button
      size="lg"
      className="w-full h-16 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-base"
      onClick={onCall}
      disabled={disabled}
    >
      <Phone className="h-5 w-5 mr-2" />
      Call
    </Button>
  )
}
