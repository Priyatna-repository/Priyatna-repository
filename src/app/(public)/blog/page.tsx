import type { Metadata } from 'next'
import '@/styles/pages/blog.css'
import Link from 'next/link'
import { getAllPosts, getAllPostTags } from '@/data/posts'
import { PAGE_STATUSES } from '@/data/pageStatuses'
import StatusPage from '@/components/ui/StatusPage'

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

  const posts = getAllPosts()
  const tags = getAllPostTags()

  return (
    <div className="blog-page">
      {/* Header */}
      <div className="bp-header">
        <div className="bp-eyebrow">PRIYATNA · WRITING</div>
        <h1 className="bp-title">BLOG.</h1>
        <p className="bp-sub">{posts.length} artikel · design, motion &amp; systems</p>

        {/* Tag filter */}
        <div className="bp-tags">
          <Link href="/blog" className="bp-tag bp-tag-all active">ALL</Link>
          {tags.map((tag) => (
            <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="bp-tag">
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Post list */}
      <div className="bp-list">
        {posts.map((post, i) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="bp-card" style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="bpc-meta">
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              {post.readTimeMin && <span className="bpc-read">{post.readTimeMin} min read</span>}
            </div>
            <h2 className="bpc-title">{post.title}</h2>
            <p className="bpc-excerpt">{post.excerpt}</p>
            <div className="bpc-foot">
              <div className="bpc-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="bpc-tag">{tag}</span>
                ))}
              </div>
              <span className="bpc-arrow">↗</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
