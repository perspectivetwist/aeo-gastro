import { NextRequest, NextResponse } from 'next/server'
import { saveEmailLead } from '@/lib/notion'

export async function POST(request: NextRequest) {
  try {
    const { email, url } = await request.json() as { email: string; url: string }

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Ungültige Email' }, { status: 400 })
    }

    await saveEmailLead({ email, url, source: 'email-gate' })

    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Fehler'
    console.error('Subscribe error:', message)
    return NextResponse.json({ error: 'Fehler beim Speichern' }, { status: 500 })
  }
}
