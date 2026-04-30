'use client'
import '@/styles/pages/showcase.css'
import { useState } from 'react'
import Link from 'next/link'
import type { Project } from '@/types'

interface Props {
  allProjects: Project[]
  categories: string[]
}

export default function ShowcaseGrid({ allProjects, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = activeCategory
    ? allProjects.filter((p) => p.category === activeCategory)
    : allProjects

  const featuredProjects = filtered.filter((p) => p.featured)
  const otherProjects = filtered.filter((p) => !p.featured)

  return (
    <>
      <div className="sp-cats">
        <button
          className={`sp-cat${!activeCategory ? ' active' : ''}`}
          onClick={() => setActiveCategory(null)}
        >
          ALL
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`sp-cat${activeCategory === cat ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
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

      {filtered.length === 0 && (
        <p style={{ padding: '40px 0', color: 'var(--muted2)', fontFamily: 'var(--f-mono)', fontSize: 13 }}>
          Tidak ada project dengan kategori ini.
        </p>
      )}
    </>
  )
}
