import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'The Gospel Academy — Christian Online School Powered by AI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f0a2e 0%, #1a1145 50%, #0d1b3e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: 6,
              color: '#818cf8',
              marginBottom: 16,
              fontWeight: 600,
            }}
          >
            THE GOSPEL ACADEMY
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.2,
              marginBottom: 24,
              maxWidth: 900,
            }}
          >
            Christ-Centered Education Powered by AI
          </div>
          <div
            style={{
              fontSize: 22,
              color: '#94a3b8',
              lineHeight: 1.5,
              maxWidth: 700,
            }}
          >
            Pre-K–12 | AI Socratic Tutoring | Three Learning Pathways | Starting at $41/mo
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
