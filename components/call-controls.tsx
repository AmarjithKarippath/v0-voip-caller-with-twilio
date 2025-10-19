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
        className="w-full h-14 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
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
      className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground"
      onClick={onCall}
      disabled={disabled}
    >
      <Phone className="h-5 w-5 mr-2" />
      Call
    </Button>
  )
}
