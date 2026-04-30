'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { useUIStore } from '@/store/uiStore'
import { getAllLabs } from '@/data/labs'
import LabStatusBadge from '@/components/ui/LabStatusBadge'

const labs = getAllLabs()

export default function LabsOverlay() {
  const { isLabsOpen, closeLabs } = useUIStore()

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeLabs()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeLabs])

  if (!isLabsOpen) return null

  return (
    <div
      id="labs-overlay"
      className="show"
      onClick={(e) => { if (e.target === e.currentTarget) closeLabs() }}
    >
      <div className="labs-modal">
        <button className="lm-close" onClick={closeLabs} aria-label="Close">✕</button>

        <div className="lm-header">
          <div className="lm-eyebrow">Priyatna · Creative Toolkit</div>
          <div className="lm-title">ADDON LABS</div>
          <div className="lm-sub">Browser-native tools for designers who think in systems.</div>
        </div>

        <div className="lm-body">
          <div className="labs-grid">
            {labs.map((lab) => {
              const isClickable = lab.status === 'live' || lab.status === 'beta'

              const card = (
                <div
                  className={`lab-card lc-${lab.colorTheme}`}
                  style={!isClickable ? { opacity: 0.65, cursor: 'default' } : undefined}
                >
                  <span className="lab-card-icon">{lab.icon}</span>
                  <div className="lab-card-name">{lab.name}</div>
                  <div className="lab-card-desc">{lab.description}</div>
                  <LabStatusBadge status={lab.status} />
                  <span className="lab-card-version">{lab.version}</span>
                </div>
              )

              return isClickable ? (
                <Link key={lab.id} href={`/labs/${lab.slug}`} onClick={closeLabs}>
                  {card}
                </Link>
              ) : (
                <div key={lab.id}>{card}</div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
