'use client'
import { useState, useEffect } from 'react'

export interface TocHeading {
  id: string
  text: string
  level: number
}

interface Props {
  headings: TocHeading[]
}

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <div className="toc">
      <div className="toc-label">CONTENTS</div>
      <ul className="toc-list">
        {headings.map(({ id, text, level }) => (
          <li key={id} className={`toc-item toc-h${level}${activeId === id ? ' active' : ''}`}>
            <a
              href={`#${id}`}
              className="toc-link"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
