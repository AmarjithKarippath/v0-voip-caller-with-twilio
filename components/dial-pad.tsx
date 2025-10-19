"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Delete } from "lucide-react"

interface DialPadProps {
  onNumberInput: (digit: string) => void
  onDelete: () => void
  disabled?: boolean
}

const dialPadButtons = [
  { digit: "1", letters: "" },
  { digit: "2", letters: "ABC" },
  { digit: "3", letters: "DEF" },
  { digit: "4", letters: "GHI" },
  { digit: "5", letters: "JKL" },
  { digit: "6", letters: "MNO" },
  { digit: "7", letters: "PQRS" },
  { digit: "8", letters: "TUV" },
  { digit: "9", letters: "WXYZ" },
  { digit: "*", letters: "" },
  { digit: "0", letters: "+" },
  { digit: "#", letters: "" },
]

export function DialPad({ onNumberInput, onDelete, disabled }: DialPadProps) {
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const isLongPress = useRef(false)

  const handleMouseDown = (digit: string) => {
    if (disabled) return

    isLongPress.current = false

    // Special handling for 0 - long press adds +
    if (digit === "0") {
      longPressTimer.current = setTimeout(() => {
        isLongPress.current = true
        onNumberInput("+")
      }, 500) // 500ms for long press
    }
  }

  const handleMouseUp = (digit: string) => {
    if (disabled) return

    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }

    // Only add the digit if it wasn't a long press
    if (!isLongPress.current) {
      onNumberInput(digit)
    }
  }

  const handleTouchStart = (digit: string) => {
    handleMouseDown(digit)
  }

  const handleTouchEnd = (digit: string) => {
    handleMouseUp(digit)
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {dialPadButtons.map(({ digit, letters }) => (
          <Button
            key={digit}
            variant="outline"
            size="lg"
            className="h-16 flex flex-col items-center justify-center gap-0 hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50 bg-transparent"
            onMouseDown={() => handleMouseDown(digit)}
            onMouseUp={() => handleMouseUp(digit)}
            onMouseLeave={() => {
              if (longPressTimer.current) {
                clearTimeout(longPressTimer.current)
                longPressTimer.current = null
              }
            }}
            onTouchStart={() => handleTouchStart(digit)}
            onTouchEnd={() => handleTouchEnd(digit)}
            disabled={disabled}
          >
            <span className="text-2xl font-semibold">{digit}</span>
            {letters && <span className="text-xs text-muted-foreground">{letters}</span>}
          </Button>
        ))}
      </div>

      <Button
        variant="ghost"
        size="lg"
        className="w-full h-12 hover:bg-destructive/10 hover:text-destructive"
        onClick={onDelete}
        disabled={disabled}
      >
        <Delete className="h-5 w-5" />
      </Button>
    </div>
  )
}
