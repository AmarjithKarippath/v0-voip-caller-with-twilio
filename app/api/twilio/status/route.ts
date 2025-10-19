import { type NextRequest, NextResponse } from "next/server"

// This endpoint receives status callbacks from Twilio
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const callSid = formData.get("CallSid")
    const callStatus = formData.get("CallStatus")

    console.log("[v0] Call status update:", {
      callSid,
      status: callStatus,
      timestamp: new Date().toISOString(),
    })

    // You can store call status in a database here
    // For now, we just log it

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Status callback error:", error)
    return NextResponse.json({ error: "Failed to process status" }, { status: 500 })
  }
}
