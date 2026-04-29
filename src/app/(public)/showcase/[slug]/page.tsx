import type { Metadata } from 'next'
import '@/styles/pages/showcase.css'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllProjects, getProjectBySlug } from '@/data/projects'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ShowcaseDetailPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const related = getAllProjects().filter((p) => p.slug !== slug && p.category === project.category).slice(0, 3)

  return (
    <div className="showcase-detail">
      {/* Breadcrumb */}
      <div className="sd-crumb">
        <Link href="/showcase" className="sd-crumb-link">Showcase</Link>
        <span className="sd-crumb-sep">›</span>
        <span>{project.category}</span>
      </div>

      {/* Hero */}
      <div className="sd-hero">
        <div className="sd-cat">{project.category}</div>
        <h1 className="sd-title">{project.title}</h1>
        <p className="sd-desc">{project.description}</p>
        <div className="sd-actions">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="sd-btn sd-btn-primary">
              Live Demo ↗
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="sd-btn sd-btn-ghost">
              GitHub ↗
            </a>
          )}
        </div>
      </div>

      {/* Thumbnail / Preview */}
      <div className="sd-preview">
        <div className="sd-preview-placeholder">
          <span className="sd-preview-initial">{project.title[0]}</span>
        </div>
      </div>

      {/* Detail two-column */}
      <div className="sd-detail">
        <div className="sd-content">
          {project.fullDescription && (
            <div className="sd-full-desc">
              {project.fullDescription.split('\n\n').map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>
          )}
        </div>

        <div className="sd-sidebar">
          <div className="sd-meta-block">
            <div className="sd-meta-label">TECH STACK</div>
            <div className="sd-stack">
              {project.techStack.map((t) => (
                <span key={t} className="sd-tech">{t}</span>
              ))}
            </div>
          </div>
          <div className="sd-meta-block">
            <div className="sd-meta-label">CATEGORY</div>
            <div className="sd-meta-val">{project.category}</div>
          </div>
          {project.demoUrl && (
            <div className="sd-meta-block">
              <div className="sd-meta-label">LIVE URL</div>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="sd-meta-link">
                View Live ↗
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="sd-related">
          <div className="sd-related-label">RELATED PROJECTS</div>
          <div className="sd-related-grid">
            {related.map((p) => (
              <Link key={p.id} href={`/showcase/${p.slug}`} className="sd-rel-card">
                <div className="sdrc-cat">{p.category}</div>
                <div className="sdrc-title">{p.title}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="sd-footer">
        <Link href="/showcase" className="sd-back">← Back to Showcase</Link>
      </div>
    </div>
  )
}
