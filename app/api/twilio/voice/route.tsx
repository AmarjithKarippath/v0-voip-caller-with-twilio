import { type NextRequest, NextResponse } from "next/server"

// This endpoint provides TwiML instructions for Twilio voice calls
export async function POST(request: NextRequest) {
  try {
    // Create TwiML response to connect the call
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">Connecting your call. Please wait.</Say>
  <Dial callerId="${process.env.TWILIO_PHONE_NUMBER}">
    <Number>${request.nextUrl.searchParams.get("to") || ""}</Number>
  </Dial>
</Response>`

    return new NextResponse(twiml, {
      headers: {
        "Content-Type": "text/xml",
      },
    })
  } catch (error) {
    console.error("[v0] TwiML generation error:", error)

    // Return error TwiML
    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">We're sorry, but we couldn't connect your call. Please try again later.</Say>
  <Hangup/>
</Response>`

    return new NextResponse(errorTwiml, {
      status: 500,
      headers: {
        "Content-Type": "text/xml",
      },
    })
  }
}

// Handle GET requests (for Twilio webhook verification)
export async function GET() {
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">Hello from VoiceCall.</Say>
</Response>`

  return new NextResponse(twiml, {
    headers: {
      "Content-Type": "text/xml",
    },
  })
}
