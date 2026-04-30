'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { LabItem, LabStatus } from '@/types'
import LabStatusBadge from '@/components/ui/LabStatusBadge'

const FILTERS: { label: string; value: LabStatus | 'all' }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'LIVE', value: 'live' },
  { label: 'BETA', value: 'beta' },
  { label: 'COMING SOON', value: 'soon' },
]

interface Props {
  labs: LabItem[]
}

export default function LabsGrid({ labs }: Props) {
  const [activeFilter, setActiveFilter] = useState<LabStatus | 'all'>('all')

  const filtered = activeFilter === 'all'
    ? labs
    : labs.filter((l) => l.status === activeFilter)

  return (
    <div className="lp-body">
      {/* Filter tabs */}
      <div className="lp-filters">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`lp-filter-btn${activeFilter === f.value ? ' active' : ''}`}
            onClick={() => setActiveFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="lp-grid">
        {filtered.map((lab, i) => {
          const isClickable = lab.status === 'live' || lab.status === 'beta'

          const card = (
            <div
              className={`lp-card lc-${lab.colorTheme}${isClickable ? '' : ' lp-card-disabled'}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="lpc-accent-line" />
              <div className="lpc-icon">{lab.icon}</div>
              <div className="lpc-name">{lab.name}</div>
              <div className="lpc-desc">{lab.description}</div>
              <div className="lpc-foot">
                <LabStatusBadge status={lab.status} />
                <span className="lpc-version">{lab.version}</span>
              </div>
            </div>
          )

          return isClickable ? (
            <Link key={lab.id} href={`/labs/${lab.slug}`} className="lp-card-link">
              {card}
            </Link>
          ) : (
            <div key={lab.id}>{card}</div>
          )
        })}

        {filtered.length === 0 && (
          <p style={{ color: 'var(--muted2)', fontFamily: 'var(--f-mono)', fontSize: 13, gridColumn: '1/-1' }}>
            Tidak ada lab dengan status ini.
          </p>
        )}
      </div>
    </div>
  )
}
