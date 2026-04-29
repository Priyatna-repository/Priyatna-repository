import type { Metadata } from 'next'
import '@/styles/pages/blog.css'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/data/posts'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const relatedPosts = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <div className="blog-detail">
      {/* Breadcrumb */}
      <div className="bd-crumb">
        <Link href="/blog" className="bd-crumb-link">Blog</Link>
        <span className="bd-crumb-sep">›</span>
        <span>{post.tags[0]}</span>
      </div>

      {/* Article header */}
      <div className="bd-header">
        <div className="bd-meta">
          <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          {post.readTimeMin && <span>·</span>}
          {post.readTimeMin && <span>{post.readTimeMin} min read</span>}
        </div>
        <h1 className="bd-title">{post.title}</h1>
        <div className="bd-tags">
          {post.tags.map((tag) => (
            <span key={tag} className="bd-tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* Article body */}
      <article
        className="bd-body"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Footer */}
      <div className="bd-footer">
        <Link href="/blog" className="bd-back">← Back to Blog</Link>

        {relatedPosts.length > 0 && (
          <div className="bd-related">
            <div className="bd-related-label">ALSO READ</div>
            <div className="bd-related-list">
              {relatedPosts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="bd-related-card">
                  <div className="bdrc-title">{p.title}</div>
                  <div className="bdrc-date">
                    {new Date(p.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
