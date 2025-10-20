"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Phone, CreditCard, DollarSign, Check } from "lucide-react"

interface AddCreditModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const PRESET_AMOUNTS = [
  { value: 5, label: "$5" },
  { value: 10, label: "$10" },
  { value: 20, label: "$20", badge: "Most Popular" },
  { value: 50, label: "$50", badge: "5% free" },
  { value: 100, label: "$100", badge: "10% free" },
]

const calculateMinutes = (amount: number): number => {
  const minutesMap: { [key: number]: number } = {
    5: 250,
    10: 500,
    20: 1000,
    50: 3000,
    100: 5000,
  }

  // If exact match exists, use it
  if (minutesMap[amount]) {
    return minutesMap[amount]
  }

  // Otherwise calculate at 50 minutes per dollar
  return amount * 50
}

export function AddCreditModal({ open, onOpenChange }: AddCreditModalProps) {
  const [selectedAmount, setSelectedAmount] = useState(20)
  const [customAmount, setCustomAmount] = useState("")
  const [autoTopUp, setAutoTopUp] = useState(true)
  const [taxInvoice, setTaxInvoice] = useState(true)
  const [promoCode, setPromoCode] = useState("")

  const currentAmount = customAmount ? Number.parseFloat(customAmount) : selectedAmount
  const minutes = calculateMinutes(currentAmount)

  const handleCheckout = () => {
    // Handle checkout logic here
    console.log("[v0] Processing checkout for amount:", selectedAmount || customAmount)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid lg:grid-cols-[1.5fr,1fr]">
          {/* Left Column - Payment Form */}
          <div className="p-8 space-y-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-primary" />
                Select Your Credit Amount
              </DialogTitle>
            </DialogHeader>

            {/* Enterprise Banner */}
            {/* <div className="bg-muted/50 border border-border rounded-lg p-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Need Yadaphone for the team?</span>
              <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">
                See enterprise plans
              </Button>
            </div> */}

            {/* Info Text */}
            {/* <p className="text-sm text-muted-foreground">
              Your credits are used to make international calls at competitive rates.{" "}
              <a href="#" className="text-primary hover:underline">
                View our detailed rate calculator →
              </a>
            </p> */}

            {/* Amount Selection */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">Choose Amount (USD)*</Label>
              <div className="grid grid-cols-5 gap-3">
                {PRESET_AMOUNTS.map((amount) => (
                  <button
                    key={amount.value}
                    onClick={() => {
                      setSelectedAmount(amount.value)
                      setCustomAmount(amount.value.toString())
                    }}
                    className={`relative p-4 rounded-lg border-2 transition-all hover:border-primary/50 ${
                      selectedAmount === amount.value && !customAmount
                        ? "border-primary bg-primary/10"
                        : "border-border bg-background"
                    }`}
                  >
                    <div className="text-lg font-semibold">{amount.label}</div>
                    {amount.badge && (
                      <div
                        className={`absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${
                          amount.badge === "Most Popular"
                            ? "bg-primary text-primary-foreground"
                            : "bg-yellow-500 text-yellow-950"
                        }`}
                      >
                        {amount.badge}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Or enter custom amount (minimum $5)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setSelectedAmount(0)
                  }}
                  placeholder="20"
                  className="pl-10 text-lg"
                  min="5"
                />
              </div>
            </div>

            {/* Checkboxes */}
            {/* <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Checkbox id="auto-topup" checked={autoTopUp} onCheckedChange={(checked) => setAutoTopUp(!!checked)} />
                <div className="space-y-1">
                  <Label htmlFor="auto-topup" className="cursor-pointer font-medium">
                    Enable Auto Top-up
                  </Label>
                  <p className="text-sm text-red-500">Avoids interrupting an important call</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="tax-invoice"
                  checked={taxInvoice}
                  onCheckedChange={(checked) => setTaxInvoice(!!checked)}
                />
                <Label htmlFor="tax-invoice" className="cursor-pointer">
                  Issue tax-deductible invoice (address required)
                </Label>
              </div>
            </div> */}

            {/* Promo Code */}
            {/* <div className="space-y-2">
              <Label>Promo Code (Optional)</Label>
              <Input value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="Enter promo code" />
            </div> */}

            {/* Minutes Info */}
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4" />
              <span>
                Up to <span className="font-semibold">{minutes.toLocaleString()}</span> minutes of international calling
                time
              </span>
            </div>

            {/* Checkout Button */}
            <Button onClick={handleCheckout} size="lg" className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
              Secure Checkout
            </Button>

            {/* Guarantee */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-primary" />
              <span>100% Money Back Guarantee. No Questions Asked.</span>
            </div>

            {/* VAT Notice */}
            <p className="text-xs text-muted-foreground text-center">
              *VAT may be added depending on your country and payment method
            </p>
          </div>

          {/* Right Column - Why Yadaphone */}
          {/* <div className="bg-muted/30 p-8 space-y-8 border-l border-border">
            <div>
              <h3 className="text-2xl font-bold mb-6">
                Why <span className="italic font-serif">Yadaphone</span>
              </h3>

              <div className="space-y-6">
                <div className="flex gap-3">
                  <Globe className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium">International calls to any country without restrictions.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium">Our service works in all countries, no restrictions.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Lock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium">Privacy first. We don't store your payment information.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CreditCard className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium">Credit based, no subscription. Pay only for what you use.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <DollarSign className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium">No phone number required. Start calling immediately.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-6 border border-border space-y-3">
              <p className="text-sm italic text-muted-foreground leading-relaxed">
                "After Skype announced they were shutting down, I've been looking for an alternative for ages. I'm so
                glad I found ChilloutFox!"
              </p>
              <p className="text-sm font-medium">- Michael T., Canada</p>
            </div>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
