import type { Post, Project, LabItem } from '@/types'

export type SearchResultType = 'blog' | 'project' | 'lab'

export interface SearchResult {
  id: string
  type: SearchResultType
  title: string
  description: string
  url: string
  meta: string
  tags: string[]
}

function match(query: string, ...fields: (string | string[] | undefined)[]): boolean {
  const q = query.toLowerCase()
  return fields.some((f) => {
    if (!f) return false
    if (Array.isArray(f)) return f.some((s) => s.toLowerCase().includes(q))
    return f.toLowerCase().includes(q)
  })
}

export function searchPosts(posts: Post[], query: string): SearchResult[] {
  return posts
    .filter((p) => !query || match(query, p.title, p.excerpt, p.tags))
    .map((p) => ({
      id: p.id,
      type: 'blog' as const,
      title: p.title,
      description: p.excerpt,
      url: `/blog/${p.slug}`,
      meta: new Date(p.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      tags: p.tags.slice(0, 3),
    }))
}

export function searchProjects(projects: Project[], query: string): SearchResult[] {
  return projects
    .filter((p) => !query || match(query, p.title, p.description, p.techStack, p.category))
    .map((p) => ({
      id: p.id,
      type: 'project' as const,
      title: p.title,
      description: p.description,
      url: `/showcase/${p.slug}`,
      meta: p.category,
      tags: p.techStack.slice(0, 3),
    }))
}

export function searchLabs(labs: LabItem[], query: string): SearchResult[] {
  return labs
    .filter((l) => !query || match(query, l.name, l.description, l.fullDescription))
    .map((l) => ({
      id: l.id,
      type: 'lab' as const,
      title: l.name,
      description: l.description,
      url: `/labs/${l.slug}`,
      meta: l.status.toUpperCase(),
      tags: [l.version],
    }))
}

export function runSearch(
  query: string,
  posts: Post[],
  projects: Project[],
  labs: LabItem[]
): SearchResult[] {
  const q = query.trim()
  return [
    ...searchPosts(posts, q),
    ...searchProjects(projects, q),
    ...searchLabs(labs, q),
  ]
}
