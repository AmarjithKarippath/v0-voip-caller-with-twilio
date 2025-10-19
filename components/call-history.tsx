"use client"

import { Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CallRecord {
  id: string
  number: string
  type: "incoming" | "outgoing" | "missed"
  duration: string
  timestamp: string
}

// Mock data - replace with actual call history from Twilio
const mockCallHistory: CallRecord[] = [
  {
    id: "1",
    number: "+1 (555) 123-4567",
    type: "outgoing",
    duration: "5:23",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    number: "+1 (555) 987-6543",
    type: "incoming",
    duration: "12:45",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    number: "+44 20 7123 4567",
    type: "missed",
    duration: "0:00",
    timestamp: "Yesterday",
  },
]

export function CallHistory() {
  const getCallIcon = (type: CallRecord["type"]) => {
    switch (type) {
      case "incoming":
        return <PhoneIncoming className="h-4 w-4 text-accent" />
      case "outgoing":
        return <PhoneOutgoing className="h-4 w-4 text-primary" />
      case "missed":
        return <PhoneMissed className="h-4 w-4 text-destructive" />
    }
  }

  if (mockCallHistory.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <Phone className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p>No call history</p>
        <p className="text-sm mt-1">Your recent calls will appear here</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {mockCallHistory.map((call) => (
        <div key={call.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors group">
          <div className="flex-shrink-0">{getCallIcon(call.type)}</div>

          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{call.number}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{call.timestamp}</span>
              {call.duration !== "0:00" && (
                <>
                  <span>•</span>
                  <span>{call.duration}</span>
                </>
              )}
            </div>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
