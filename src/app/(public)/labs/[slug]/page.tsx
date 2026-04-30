import type { Metadata } from 'next'
import '@/styles/pages/labs.css'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllLabs, getLabBySlug } from '@/data/labs'
import LabStatusBadge from '@/components/ui/LabStatusBadge'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllLabs().map((lab) => ({ slug: lab.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const lab = getLabBySlug(slug)
  if (!lab) return {}
  return {
    title: lab.name,
    description: lab.description,
  }
}

export default async function LabDetailPage({ params }: Props) {
  const { slug } = await params
  const lab = getLabBySlug(slug)
  if (!lab) notFound()

  const isActive = lab.status === 'live' || lab.status === 'beta'

  return (
    <div className="lab-detail">
      {/* Minimal top bar */}
      <div className="ld-bar">
        <Link href="/" className="ld-bar-logo">PRI<span>.</span></Link>
        <div className="ld-bar-center">
          <span className="ld-bar-name">{lab.name}</span>
          <LabStatusBadge status={lab.status} />
        </div>
        <Link href="/labs" className="ld-bar-exit">← Labs</Link>
      </div>

      {/* Workspace or upcoming */}
      {isActive ? (
        <div className="ld-workspace">
          <div className="ld-ws-icon">{lab.icon}</div>
          <h1 className="ld-ws-title">{lab.name.toUpperCase()}</h1>
          <p className="ld-ws-desc">{lab.fullDescription ?? lab.description}</p>
          <div className="ld-ws-placeholder">
            <div className="ld-ws-badge">
              <span className="ld-ws-badge-dot" />
              Workspace Interface
            </div>
            <p>The full lab tool interface will be embedded here.</p>
          </div>
        </div>
      ) : (
        <div className="ld-upcoming">
          <div className="ld-up-icon">{lab.icon}</div>
          <div className="ld-up-status">
            <span className="ld-up-dot" />
            UPCOMING
          </div>
          <h1 className="ld-up-title">{lab.name.toUpperCase()}</h1>
          <p className="ld-up-desc">{lab.fullDescription ?? lab.description}</p>

          {lab.features && lab.features.length > 0 && (
            <div className="ld-up-features">
              <div className="ld-up-feat-label">WHAT&apos;S COMING</div>
              <ul className="ld-up-feat-list">
                {lab.features.map((feat) => (
                  <li key={feat} className="ld-up-feat-item">
                    <span className="ld-up-feat-arrow">→</span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="ld-up-meta">
            <div className="ld-up-meta-item">
              <span className="ld-up-meta-label">VERSION TARGET</span>
              <span className="ld-up-meta-val">{lab.version}</span>
            </div>
            {lab.estimatedRelease && (
              <div className="ld-up-meta-item">
                <span className="ld-up-meta-label">ESTIMATED</span>
                <span className="ld-up-meta-val">{lab.estimatedRelease}</span>
              </div>
            )}
          </div>

          <Link href="/labs" className="ld-up-back">← Back to Labs</Link>
        </div>
      )}
    </div>
  )
}
