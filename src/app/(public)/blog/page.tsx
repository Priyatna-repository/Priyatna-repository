import type { Metadata } from 'next'
import '@/styles/pages/blog.css'
import { getAllPosts, getAllPostTags } from '@/data/posts'
import { PAGE_STATUSES } from '@/data/pageStatuses'
import StatusPage from '@/components/ui/StatusPage'
import BlogList from '@/components/layout/BlogList'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artikel dan tulisan tentang design, motion, dan systems dari Priyatna.',
}

export default function BlogPage() {
  const pageStatus = PAGE_STATUSES.blog
  if (pageStatus.status !== 'active') {
    return (
      <StatusPage
        status={pageStatus.status}
        title="Blog"
        message={pageStatus.message}
        estimate={pageStatus.estimate}
      />
    )
  }

  const allPosts = getAllPosts()
  const tags = getAllPostTags()

  return (
    <div className="blog-page">
      <div className="bp-header">
        <div className="bp-eyebrow">PRIYATNA · WRITING</div>
        <h1 className="bp-title">BLOG.</h1>
        <p className="bp-sub">{allPosts.length} artikel · design, motion &amp; systems</p>
      </div>

      <BlogList allPosts={allPosts} tags={tags} />
    </div>
  )
}
