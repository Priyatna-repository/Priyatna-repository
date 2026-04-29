import type { LabStatus } from '@/types'

interface LabStatusBadgeProps {
  status: LabStatus
}

const STATUS_CONFIG: Record<LabStatus, { label: string; color: string; bg: string; pulse: boolean }> = {
  live:       { label: 'Live',        color: 'var(--accent3)', bg: 'rgba(0,200,83,0.1)',   pulse: true },
  beta:       { label: 'Beta',        color: '#b38f00',        bg: 'rgba(255,214,0,0.1)', pulse: false },
  upcoming:   { label: 'Upcoming',    color: 'var(--muted2)',  bg: 'rgba(0,0,0,0.06)',    pulse: false },
  soon:       { label: 'Coming Soon', color: 'var(--muted2)',  bg: 'rgba(0,0,0,0.06)',    pulse: false },
  deprecated: { label: 'Deprecated',  color: 'var(--accent)',  bg: 'rgba(255,59,0,0.08)', pulse: false },
}

export default function LabStatusBadge({ status }: LabStatusBadgeProps) {
  const cfg = STATUS_CONFIG[status]

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 9,
      fontFamily: 'var(--f-mono)',
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      padding: '3px 10px',
      background: cfg.bg,
      color: cfg.color,
      border: `1px solid ${cfg.color}33`,
    }}>
      {cfg.pulse && (
        <span style={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: 'currentColor',
          animation: 'pulse 1.5s ease-in-out infinite',
          display: 'inline-block',
        }} />
      )}
      {cfg.label}
    </span>
  )
}
