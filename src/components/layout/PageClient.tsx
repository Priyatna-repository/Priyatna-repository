'use client'
import { useEffect } from 'react'
import { useSearchStore } from '@/store/searchStore'
import { useUIStore } from '@/store/uiStore'
import Loader from '@/components/ui/Loader'
import HomeView from '@/components/layout/HomeView'
import ResultsView from '@/components/layout/ResultsView'

export default function PageClient() {
  const isResultsView = useSearchStore((s) => s.isResultsView)
  const hasHydrated = useSearchStore((s) => s._hasHydrated)
  const setLoaderDone = useUIStore((s) => s.setLoaderDone)
  const resetLoader = useUIStore((s) => s.resetLoader)

  // Reset loader state on every home visit so ticker starts dark during loader
  useEffect(() => {
    resetLoader()
  }, [resetLoader])

  // Blank overlay until store hydrates — prevents flash of wrong state
  if (!hasHydrated) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--paper)',
          zIndex: 9999,
        }}
      />
    )
  }

  return (
    <>
      <Loader onComplete={setLoaderDone} />
      {!isResultsView && <HomeView />}
      {isResultsView && <ResultsView />}
    </>
  )
}
