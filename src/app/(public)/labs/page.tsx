import type { Metadata } from 'next'
import '@/styles/pages/labs.css'
import Link from 'next/link'
import { getAllLabs } from '@/data/labs'
import { PAGE_STATUSES } from '@/data/pageStatuses'
import StatusPage from '@/components/ui/StatusPage'
import LabStatusBadge from '@/components/ui/LabStatusBadge'

export const metadata: Metadata = {
  title: 'Labs',
  description: 'Browser-native tools for designers who think in systems. Creative toolkit dari Priyatna.',
}

export default function LabsPage() {
  const pageStatus = PAGE_STATUSES.labs
  if (pageStatus.status !== 'active') {
    return (
      <StatusPage
        status={pageStatus.status}
        title="Labs"
        message={pageStatus.message}
        estimate={pageStatus.estimate}
      />
    )
  }

  const labs = getAllLabs()

  return (
    <div className="labs-page">
      {/* Header — dark bg */}
      <div className="lp-header">
        <div className="lp-eyebrow">
          <span className="lp-dot" />
          Priyatna · Creative Toolkit
        </div>
        <h1 className="lp-title">ADDON LABS</h1>
        <p className="lp-sub">Browser-native tools for designers who think in systems.</p>
      </div>

      {/* Grid */}
      <div className="lp-body">
        <div className="lp-grid">
          {labs.map((lab, i) => {
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
        </div>
      </div>
    </div>
  )
}
