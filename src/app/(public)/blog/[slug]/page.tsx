import type { Metadata } from 'next'
import '@/styles/pages/blog.css'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/data/posts'
import ReadingProgress from '@/components/ui/ReadingProgress'
import TableOfContents from '@/components/ui/TableOfContents'
import type { TocHeading } from '@/components/ui/TableOfContents'

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

function extractHeadings(html: string): TocHeading[] {
  const headings: TocHeading[] = []
  const regex = /<h([23])[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h[23]>/gi
  let match: RegExpExecArray | null
  while ((match = regex.exec(html)) !== null) {
    headings.push({ level: parseInt(match[1]), id: match[2], text: match[3].trim() })
  }
  return headings
}

function injectHeadingIds(html: string): string {
  return html.replace(/<h([23])>([^<]+)<\/h[23]>/gi, (_, level, text) => {
    const id = text.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    return `<h${level} id="${id}">${text}</h${level}>`
  })
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const contentWithIds = injectHeadingIds(post.content)
  const headings = extractHeadings(contentWithIds)
  const relatedPosts = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <div className="blog-detail">
      <ReadingProgress />

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

      {/* Two-column layout */}
      <div className="bd-layout">
        <article
          className="bd-body"
          dangerouslySetInnerHTML={{ __html: contentWithIds }}
        />

        <aside className="bd-sidebar">
          <TableOfContents headings={headings} />

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
        </aside>
      </div>

      {/* Footer */}
      <div className="bd-footer">
        <Link href="/blog" className="bd-back">← Back to Blog</Link>
      </div>
    </div>
  )
}
