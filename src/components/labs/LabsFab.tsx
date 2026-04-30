'use client'
import { useUIStore } from '@/store/uiStore'

export default function LabsFab() {
  const openLabs = useUIStore((s) => s.openLabs)

  return (
    <button className="labs-fab" onClick={openLabs} aria-label="Open Labs">
      <span className="lfab-dot" />
      <span className="lfab-icon">⬡</span>
      <span className="lfab-text">Labs</span>
    </button>
  )
}
