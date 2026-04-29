import Link from 'next/link'
import type { PageStatus } from '@/types'

interface StatusPageProps {
  status: Exclude<PageStatus, 'active'>
  title: string
  message?: string
  estimate?: string
}

export default function StatusPage({ status, title, message, estimate }: StatusPageProps) {
  const isMaintenance = status === 'maintenance'

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--paper)',
      color: 'var(--ink)',
      padding: '0 24px',
      textAlign: 'center',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 9,
        fontFamily: 'var(--f-mono)',
        fontWeight: 700,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: isMaintenance ? 'var(--accent)' : 'var(--accent2)',
        marginBottom: 40,
      }}>
        <span style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'currentColor',
          animation: 'pulse 1.5s ease-in-out infinite',
          display: 'inline-block',
        }} />
        {isMaintenance ? 'Under Maintenance' : 'Coming Soon'}
      </div>

      <h1 style={{
        fontFamily: 'var(--f-display)',
        fontSize: 'clamp(60px, 12vw, 140px)',
        lineHeight: 1,
        color: 'var(--ink)',
        marginBottom: 24,
        letterSpacing: '0.02em',
      }}>
        {title.toUpperCase()}
      </h1>

      {message && (
        <p style={{
          fontFamily: 'var(--f-mono)',
          fontSize: 12,
          color: 'var(--muted)',
          maxWidth: 480,
          lineHeight: 1.8,
          marginBottom: 24,
        }}>
          {message}
        </p>
      )}

      {!isMaintenance && estimate && (
        <div style={{
          fontFamily: 'var(--f-mono)',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--muted2)',
          marginBottom: 40,
        }}>
          Expected: {estimate}
        </div>
      )}

      <Link
        href="/"
        style={{
          fontFamily: 'var(--f-mono)',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          textDecoration: 'none',
          transition: 'color 0.2s',
        }}
      >
        ← Back to Home
      </Link>
    </div>
  )
}
