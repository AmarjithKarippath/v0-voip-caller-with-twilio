import { type NextRequest, NextResponse } from "next/server"

// This endpoint will handle Twilio voice calls
export async function POST(request: NextRequest) {
  try {
    const { to } = await request.json()

    console.log("[v0] Twilio API called with number:", to)

    // Check for required environment variables
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const twilioNumber = process.env.TWILIO_PHONE_NUMBER

    if (!accountSid || !authToken || !twilioNumber) {
      console.error("[v0] Missing Twilio credentials")
      return NextResponse.json(
        {
          error:
            "Twilio credentials not configured. Please add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER to your environment variables.",
        },
        { status: 500 },
      )
    }

    // Validate phone number format
    if (!to || to.length < 10) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 })
    }

    // Initialize Twilio client
    const twilio = require("twilio")
    const client = twilio(accountSid, authToken)

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const twimlUrl = `${appUrl}/api/twilio/voice?to=${encodeURIComponent(to)}`

    console.log("[v0] Making Twilio call from", twilioNumber, "to", to)
    console.log("[v0] TwiML URL:", twimlUrl)

    // Make the call
    const call = await client.calls.create({
      url: twimlUrl,
      to: to,
      from: twilioNumber,
      statusCallback: `${appUrl}/api/twilio/status`,
      statusCallbackEvent: ["initiated", "ringing", "answered", "completed"],
    })

    console.log("[v0] Call created successfully:", call.sid, "Status:", call.status)

    return NextResponse.json({
      success: true,
      callSid: call.sid,
      status: call.status,
    })
  } catch (error: any) {
    console.error("[v0] Twilio call error:", error)

    // Provide more detailed error messages
    let errorMessage = "Failed to initiate call"
    if (error.code === 21211) {
      errorMessage = "Invalid phone number format. Please check the number and try again."
    } else if (error.code === 21608) {
      errorMessage = "The phone number is not verified. Please verify the number in your Twilio account."
    } else if (error.message) {
      errorMessage = error.message
    }

    return NextResponse.json({ error: errorMessage, code: error.code }, { status: 500 })
  }
}
