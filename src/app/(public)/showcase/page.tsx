import type { Metadata } from 'next'
import '@/styles/pages/showcase.css'
import Link from 'next/link'
import { getAllProjects, getFeaturedProjects, getAllProjectCategories } from '@/data/projects'
import { PAGE_STATUSES } from '@/data/pageStatuses'
import StatusPage from '@/components/ui/StatusPage'

export const metadata: Metadata = {
  title: 'Showcase',
  description: 'Selected projects — brand identity, motion, e-commerce, dan product design dari Priyatna.',
}

export default function ShowcasePage() {
  const pageStatus = PAGE_STATUSES.showcase
  if (pageStatus.status !== 'active') {
    return (
      <StatusPage
        status={pageStatus.status}
        title="Showcase"
        message={pageStatus.message}
        estimate={pageStatus.estimate}
      />
    )
  }

  const allProjects = getAllProjects()
  const featuredProjects = getFeaturedProjects()
  const categories = getAllProjectCategories()
  const otherProjects = allProjects.filter((p) => !p.featured)

  return (
    <div className="showcase-page">
      {/* Header */}
      <div className="sp-header">
        <div className="sp-eyebrow">PRIYATNA · WORK</div>
        <h1 className="sp-title">SHOWCASE.</h1>
        <p className="sp-sub">{allProjects.length} selected projects</p>

        <div className="sp-cats">
          <button className="sp-cat active">ALL</button>
          {categories.map((cat) => (
            <button key={cat} className="sp-cat">{cat}</button>
          ))}
        </div>
      </div>

      {/* Featured */}
      {featuredProjects.length > 0 && (
        <div className="sp-featured">
          {featuredProjects.map((project, i) => (
            <Link key={project.id} href={`/showcase/${project.slug}`} className="sp-feat-card" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="spfc-thumb">
                <div className="spfc-thumb-placeholder" style={{ background: i === 0 ? 'var(--accent)' : 'var(--accent2)' }}>
                  <span className="spfc-initial">{project.title[0]}</span>
                </div>
                <div className="spfc-overlay">
                  <span className="spfc-view">View Project ↗</span>
                </div>
              </div>
              <div className="spfc-info">
                <div className="spfc-cat">{project.category}</div>
                <h2 className="spfc-title">{project.title}</h2>
                <p className="spfc-desc">{project.description}</p>
                <div className="spfc-stack">
                  {project.techStack.slice(0, 4).map((t) => (
                    <span key={t} className="spfc-tech">{t}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Other projects */}
      {otherProjects.length > 0 && (
        <>
          <div className="sp-divider">OTHER PROJECTS</div>
          <div className="sp-grid">
            {otherProjects.map((project, i) => (
              <Link key={project.id} href={`/showcase/${project.slug}`} className="sp-card" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="spc-thumb">
                  <div className="spc-placeholder" />
                  <div className="spc-overlay">
                    <span className="spc-view">View ↗</span>
                    {project.repoUrl && <span className="spc-repo">GitHub ↗</span>}
                  </div>
                </div>
                <div className="spc-cat">{project.category}</div>
                <h3 className="spc-title">{project.title}</h3>
                <div className="spc-stack">
                  {project.techStack.slice(0, 3).map((t) => (
                    <span key={t} className="spc-tech">{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
