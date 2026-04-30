'use client'
import '@/styles/results.css'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useSearchStore } from '@/store/searchStore'
import { useUIStore } from '@/store/uiStore'
import { getAllPosts } from '@/data/posts'
import { getAllProjects } from '@/data/projects'
import { getActiveLabs } from '@/data/labs'
import { runSearch } from '@/lib/search'
import type { SearchResult, SearchResultType } from '@/lib/search'

const all_posts = getAllPosts()
const all_projects = getAllProjects()
const active_labs = getActiveLabs()

const TYPE_LABEL: Record<SearchResultType, string> = {
  blog: 'BLOG',
  project: 'SHOWCASE',
  lab: 'LAB',
}

const TYPE_COLOR: Record<SearchResultType, string> = {
  blog: 'rci-r',
  project: 'rci-b',
  lab: 'rci-g',
}

const TAG_COLOR: Record<SearchResultType, string> = {
  blog: 'rft-r',
  project: 'rft-b',
  lab: 'rft-g',
}

const TABS = [
  { value: 'all', label: 'ALL' },
  { value: 'blog', label: 'BLOG' },
  { value: 'project', label: 'PROJECTS' },
  { value: 'lab', label: 'LABS' },
]

function ResultCardItem({ result }: { result: SearchResult }) {
  return (
    <Link href={result.url} className="r-card" style={{ textDecoration: 'none' }}>
      <div className="rc-crumb">
        <div className={`rc-icon ${TYPE_COLOR[result.type]}`}>
          {result.title[0].toUpperCase()}
        </div>
        <div className="rc-source">
          {TYPE_LABEL[result.type]}
        </div>
      </div>
      <div className="rc-title">{result.title.toUpperCase()}</div>
      <div className="rc-desc">{result.description}</div>
      <div className="rc-foot">
        {result.tags.map((tag) => (
          <span key={tag} className={`rc-tag ${TAG_COLOR[result.type]}`}>{tag}</span>
        ))}
        <span className="rc-date">{result.meta}</span>
        <span className="rc-arrow">↗</span>
      </div>
    </Link>
  )
}

export default function ResultsView() {
  const { query, goHome, runSearch: storeSearch } = useSearchStore()
  const theme = useUIStore((s) => s.theme)
  const [activeTab, setActiveTab] = useState<'all' | SearchResultType>('all')
  const [localInput, setLocalInput] = useState(query)

  const results = useMemo(
    () => runSearch(query, all_posts, all_projects, active_labs),
    [query]
  )

  const filtered = useMemo(
    () => activeTab === 'all' ? results : results.filter((r) => r.type === activeTab),
    [results, activeTab]
  )

  const counts = useMemo(() => ({
    all: results.length,
    blog: results.filter((r) => r.type === 'blog').length,
    project: results.filter((r) => r.type === 'project').length,
    lab: results.filter((r) => r.type === 'lab').length,
  }), [results])

  return (
    <div id="results-view" className={`show rv-${theme}`}>

      {/* Sticky header */}
      <div className="rv-sticky-header">
        <div className="results-topbar">
          <div className="rtb-logo" onClick={goHome} style={{ cursor: 'none' }}>
            PRI<span>.</span>
          </div>
          <div className="search-bar-inline">
            <input
              className="sbi-input"
              value={localInput}
              onChange={(e) => setLocalInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  storeSearch(localInput)
                  setActiveTab('all')
                }
              }}
            />
            <button
              className="sbi-btn"
              onClick={() => { storeSearch(localInput); setActiveTab('all') }}
            >
              ↗
            </button>
          </div>
        </div>

        <div className="results-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              className={`rtab-btn${activeTab === tab.value ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.value as typeof activeTab)}
            >
              {tab.label}
              <span className="rtab-count">
                {counts[tab.value as keyof typeof counts]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Results list */}
      <div className="results-content">
        <div className="results-meta">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
        </div>

        {filtered.length > 0 ? (
          filtered.map((result) => <ResultCardItem key={result.id} result={result} />)
        ) : (
          <div className="results-empty">NO RESULTS FOUND</div>
        )}
      </div>

    </div>
  )
}
