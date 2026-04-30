import type { Metadata } from 'next'
import '@/styles/pages/showcase.css'
import { getAllProjects, getAllProjectCategories } from '@/data/projects'
import { PAGE_STATUSES } from '@/data/pageStatuses'
import StatusPage from '@/components/ui/StatusPage'
import ShowcaseGrid from '@/components/layout/ShowcaseGrid'

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
  const categories = getAllProjectCategories()

  return (
    <div className="showcase-page">
      <div className="sp-header">
        <div className="sp-eyebrow">PRIYATNA · WORK</div>
        <h1 className="sp-title">SHOWCASE.</h1>
        <p className="sp-sub">{allProjects.length} selected projects</p>
      </div>

      <ShowcaseGrid allProjects={allProjects} categories={categories} />
    </div>
  )
}
