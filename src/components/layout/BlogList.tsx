'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Post } from '@/types'

interface Props {
  allPosts: Post[]
  tags: string[]
}

export default function BlogList({ allPosts, tags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const posts = activeTag ? allPosts.filter((p) => p.tags.includes(activeTag)) : allPosts

  return (
    <>
      <div className="bp-tags">
        <button
          className={`bp-tag bp-tag-all${!activeTag ? ' active' : ''}`}
          onClick={() => setActiveTag(null)}
        >
          ALL
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            className={`bp-tag${activeTag === tag ? ' active' : ''}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

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
                {post.tags.map((t) => (
                  <span key={t} className="bpc-tag">{t}</span>
                ))}
              </div>
              <span className="bpc-arrow">↗</span>
            </div>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="bp-empty">Tidak ada artikel dengan tag ini.</p>
        )}
      </div>
    </>
  )
}
