import type { PageStatusConfig, SitePageStatuses } from '@/types'

export const PAGE_STATUSES: SitePageStatuses = {
  home: {
    status: 'active',
  } satisfies PageStatusConfig,
  blog: {
    status: 'active',
  } satisfies PageStatusConfig,
  showcase: {
    status: 'active',
  } satisfies PageStatusConfig,
  labs: {
    status: 'active',
  } satisfies PageStatusConfig,
  about: {
    status: 'upcoming',
    message: 'About page is coming soon.',
    estimate: 'Q3 2026',
  } satisfies PageStatusConfig,
}
