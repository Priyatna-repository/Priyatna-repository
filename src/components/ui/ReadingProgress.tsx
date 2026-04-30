'use client'
import { useState, useEffect } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function update() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 30,
        left: 0,
        height: 2,
        width: `${progress}%`,
        background: 'var(--accent)',
        zIndex: 150,
        transition: 'width 0.1s linear',
        pointerEvents: 'none',
      }}
    />
  )
}
