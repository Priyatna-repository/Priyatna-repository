import type { Metadata } from 'next'
import '@/styles/pages/labs.css'
import { getAllLabs } from '@/data/labs'
import { PAGE_STATUSES } from '@/data/pageStatuses'
import StatusPage from '@/components/ui/StatusPage'
import LabsGrid from '@/components/labs/LabsGrid'

export const metadata: Metadata = {
  title: 'Labs',
  description: 'Browser-native tools for designers who think in systems. Creative toolkit dari Priyatna.',
}

export default function LabsPage() {
  const pageStatus = PAGE_STATUSES.labs
  if (pageStatus.status !== 'active') {
    return (
      <StatusPage
        status={pageStatus.status}
        title="Labs"
        message={pageStatus.message}
        estimate={pageStatus.estimate}
      />
    )
  }

  const labs = getAllLabs()

  return (
    <div className="labs-page">
      <div className="lp-header">
        <div className="lp-eyebrow">
          <span className="lp-dot" />
          Priyatna · Creative Toolkit
        </div>
        <h1 className="lp-title">ADDON LABS</h1>
        <p className="lp-sub">Browser-native tools for designers who think in systems.</p>
      </div>

      <LabsGrid labs={labs} />
    </div>
  )
}
