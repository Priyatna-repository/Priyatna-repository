'use client'
import '@/styles/home.css'
import { useState, useRef, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchStore } from '@/store/searchStore'
import { useUIStore } from '@/store/uiStore'
import { SUGGESTIONS, QUICK_CHIPS, SHORTCUTS } from '@/data'
import { getAllPosts } from '@/data/posts'
import { getAllProjects } from '@/data/projects'
import { getAllLabs } from '@/data/labs'

const TOTAL_ENTRIES = getAllPosts().length + getAllProjects().length + getAllLabs().length

export default function HomeView({ onCounterReady }: { onCounterReady: boolean }) {
  const [localInput, setLocalInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const { runSearch, history } = useSearchStore()
  const openLabs = useUIStore((s) => s.openLabs)
  const wrapRef = useRef<HTMLDivElement>(null)

  const filteredSuggestions = useMemo(() => {
    const term = localInput.trim().toLowerCase()
    if (!term) {
      const historyItems = history.slice(0, 5).map((h) => ({ query: h, label: h, tagClass: 'st-brand', tagText: 'History' }))
      const defaultItems = SUGGESTIONS.slice(0, 6)
      return { history: historyItems, defaults: defaultItems }
    }
    const historyItems = history
      .filter((h) => h.toLowerCase().includes(term))
      .map((h) => ({ query: h, label: h, tagClass: 'st-brand', tagText: 'History' }))
    const defaultItems = SUGGESTIONS.filter((s) => s.label.toLowerCase().includes(term))
    return { history: historyItems, defaults: defaultItems }
  }, [localInput, history])

  const allItems = useMemo(
    () => [...filteredSuggestions.history, ...filteredSuggestions.defaults],
    [filteredSuggestions]
  )

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setIsFocused(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (query: string) => {
    setLocalInput(query)
    setIsFocused(false)
    setActiveIndex(-1)
    runSearch(query)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIsFocused(true)
      setActiveIndex((prev) => (prev + 1) % allItems.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIsFocused(true)
      setActiveIndex((prev) => (prev - 1 + allItems.length) % allItems.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex >= 0 && activeIndex < allItems.length) {
        handleSelect(allItems[activeIndex].query)
      } else {
        runSearch(localInput)
        setIsFocused(false)
      }
    } else if (e.key === 'Escape') {
      setIsFocused(false)
      setActiveIndex(-1)
    }
  }

  const showSuggestions = isFocused && allItems.length > 0

  return (
    <div id="home">
      {/* Background image */}
      <div className="home-bg-container">
        <Image
          src="/assets/images/hero-background.jpg"
          alt=""
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="home-overlay" />
      </div>

      {/* Content */}
      <div className="home-hero">
        <div className="explore-tag">
          <span className="et-word">EXPLORE</span>
          <span className="et-word et-italic">The</span>
          <span className="et-word">ARCHIVE</span>
        </div>

        <div className="home-logo-row">
          <span className="hl-word hl-w1">PRI</span>
          <span className="hl-word hl-w2">YATNA</span>
          <span className="hl-dot">.</span>
        </div>

        {/* Sub-row: tagline + entry counter */}
        <div className="home-sub-row">
          <div className="home-sub-left">Creative Archive</div>
          <div className="home-counter">
            <span className="hc-num">{TOTAL_ENTRIES}</span>
            entries in archive
          </div>
        </div>

        {/* Search Box */}
        <div className="search-center-wrap" ref={wrapRef}>
          <div className="search-input-anchor">
            <div className="search-box">
              <input
                className="search-input"
                placeholder="Explore the Archive..."
                value={localInput}
                onChange={(e) => { setLocalInput(e.target.value); setActiveIndex(-1) }}
                onFocus={() => setIsFocused(true)}
                onKeyDown={handleKeyDown}
              />
              <button className="search-submit" onClick={() => runSearch(localInput)}>SEARCH</button>
            </div>

            {/* Suggestions Dropdown */}
            <div className={`suggestions${showSuggestions ? ' show' : ''}`}>
              {filteredSuggestions.history.length > 0 && (
                <>
                  <div className="sug-group-label">Recent Searches</div>
                  {filteredSuggestions.history.map((item, idx) => (
                    <div
                      key={`hist-${idx}`}
                      className={`sug-row${activeIndex === idx ? ' sug-selected' : ''}`}
                      onClick={() => handleSelect(item.query)}
                      onMouseEnter={() => setActiveIndex(idx)}
                    >
                      <span className="sug-arrow">↻</span>
                      <span className="sug-text">{item.label}</span>
                      <span className={`sug-tag ${item.tagClass}`}>{item.tagText}</span>
                    </div>
                  ))}
                </>
              )}
              {filteredSuggestions.defaults.length > 0 && (
                <>
                  <div className="sug-group-label">Suggestions</div>
                  {filteredSuggestions.defaults.map((item, idx) => {
                    const globalIdx = filteredSuggestions.history.length + idx
                    return (
                      <div
                        key={`def-${idx}`}
                        className={`sug-row${activeIndex === globalIdx ? ' sug-selected' : ''}`}
                        onClick={() => handleSelect(item.query)}
                        onMouseEnter={() => setActiveIndex(globalIdx)}
                      >
                        <span className="sug-arrow">→</span>
                        <span className="sug-text">{item.label}</span>
                        <span className={`sug-tag ${item.tagClass}`}>{item.tagText}</span>
                      </div>
                    )
                  })}
                </>
              )}
            </div>
          </div>

          {/* Quick Chips dari data */}
          <div className="quick-chips">
            {QUICK_CHIPS.map((chip) => (
              <button key={chip.label} className="qchip" onClick={() => runSearch(chip.query)}>
                <span className="qchip-dot" style={{ background: chip.color }} />
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Shortcuts */}
        <div className="home-shortcuts">
          {SHORTCUTS.map((sc) => (
            <div
              key={sc.label}
              className="sc-item"
              onClick={() => sc.query ? runSearch(sc.query) : openLabs()}
              style={{ cursor: 'none' }}
            >
              <div className="sc-icon">{sc.icon}</div>
              <div className="sc-label">{sc.label}</div>
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div className="home-footer-links">
          <Link href="/blog" className="hfl">Blog</Link>
          <Link href="/showcase" className="hfl">Showcase</Link>
          <Link href="/labs" className="hfl">Labs</Link>
          <span className="hfl" onClick={() => runSearch('contact priyatna')} style={{ cursor: 'none' }}>Contact</span>
        </div>
      </div>
    </div>
  )
}
