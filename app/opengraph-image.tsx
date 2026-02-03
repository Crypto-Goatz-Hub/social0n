import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Social0n - AI-Powered Social Media Campaign Automation';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle at 25% 25%, #14b8a6 0%, transparent 50%), radial-gradient(circle at 75% 75%, #22c55e 0%, transparent 50%)',
        }}
      >
        {/* Logo/Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: 'linear-gradient(135deg, #14b8a6 0%, #22c55e 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 20,
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 72,
              fontWeight: 800,
              background: 'linear-gradient(135deg, #14b8a6 0%, #22c55e 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Social0n
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 36,
            color: '#ffffff',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
            marginBottom: 20,
          }}
        >
          AI-Powered Social Media
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#ffffff',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          Campaign Automation
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: '#71717a',
            marginTop: 30,
          }}
        >
          Outcome-driven campaigns that deliver results
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 24px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 50,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <span style={{ color: '#14b8a6', fontSize: 18 }}>social0n.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
