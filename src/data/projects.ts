import type { Project } from '@/types'

export const PROJECTS_DATA: Project[] = [
  {
    id: 'proj-1',
    slug: 'verdant-analytics-dashboard',
    title: 'Verdant — Analytics Dashboard',
    description: 'Complex data visualization made intuitive. Custom charting library built from scratch with motion design principles baked in.',
    fullDescription: `Verdant adalah analytics dashboard yang dibangun untuk tim product yang butuh insight cepat tanpa kompleksitas. Proyek ini dimulai dari frustrasi dengan tools yang ada — terlalu banyak fitur yang tidak diperlukan, terlalu sedikit customization, dan performa yang buruk.

Solusinya: bangun charting library sendiri dari scratch menggunakan SVG dan React, dengan motion design principles sebagai fondasi. Setiap transisi data memiliki tujuan — bukan dekorasi, tapi komunikasi tentang perubahan yang terjadi.

Hasilnya: library dengan 40+ tipe chart, WCAG AA compliant, dan waktu render 3x lebih cepat dari Recharts.`,
    thumbnail: '/assets/images/projects/verdant-thumb.jpg',
    demoUrl: 'https://verdant.priyatna.design',
    repoUrl: 'https://github.com/Priyatna-repository/verdant',
    techStack: ['React', 'TypeScript', 'SVG', 'Framer Motion', 'Zustand'],
    category: 'Dashboard',
    featured: true,
    order: 1,
    status: 'active',
  },
  {
    id: 'proj-2',
    slug: 'gilded-luxury-ecommerce',
    title: 'Gilded — Luxury E-Commerce',
    description: 'Headless Shopify storefront with bespoke 3D product renders and custom WebGL shader for product configurator.',
    fullDescription: `Gilded adalah proyek yang menantang asumsi tentang apa yang bisa dilakukan di web untuk luxury brand. Client menginginkan sesuatu yang terasa seperti brand experience, bukan sekadar toko online.

Pendekatannya: Shopify headless dengan Next.js, 3D product configurator menggunakan Three.js dan custom GLSL shader, dan micro-interaction yang dirancang untuk memperlambat user — membuat mereka menikmati proses eksplorasi produk, bukan rush ke checkout.

Hasilnya: 210% peningkatan conversion rate, 45% penurunan bounce rate, dan average session duration naik dari 2 menit menjadi 7 menit.`,
    thumbnail: '/assets/images/projects/gilded-thumb.jpg',
    demoUrl: 'https://gilded.priyatna.design',
    techStack: ['Next.js', 'Shopify Storefront API', 'Three.js', 'GLSL', 'Framer Motion'],
    category: 'E-Commerce',
    featured: true,
    order: 2,
    status: 'active',
  },
  {
    id: 'proj-3',
    slug: 'priyatna-type-foundry',
    title: 'Priyatna Type Foundry',
    description: 'Custom variable typeface family with 6 weights and 3 optical sizes, designed for screen legibility.',
    fullDescription: `Type Foundry adalah eksplorasi personal tentang apa artinya merancang typeface dari awal untuk kebutuhan spesifik — screen legibility di berbagai ukuran, dukungan untuk 40+ scripts, dan fleksibilitas variable font.

Proses: riset 3 bulan tentang optical sizing dan x-height optimization, kemudian 6 bulan pengerjaan menggunakan Glyphs. Setiap karakter dioptimasi untuk 3 optical size — caption (8-11px), text (12-20px), dan display (21px+).

Tersedia dalam format variable font dengan axis: weight (100-900), optical size, dan width.`,
    thumbnail: '/assets/images/projects/type-foundry-thumb.jpg',
    repoUrl: 'https://github.com/Priyatna-repository/type-foundry',
    techStack: ['Glyphs 3', 'FontForge', 'Python (font scripting)', 'Variable Font'],
    category: 'Typography',
    featured: false,
    order: 3,
    status: 'active',
  },
  {
    id: 'proj-4',
    slug: 'nomad-travel-app',
    title: 'Nomad — Travel Planning App',
    description: 'Collaborative trip planning tool with AI-powered itinerary suggestions and real-time sync.',
    fullDescription: `Nomad lahir dari masalah nyata: merencanakan perjalanan bersama teman selalu berakhir di spreadsheet yang berantakan dan diskusi panjang di WhatsApp.

Solusinya: aplikasi yang menggabungkan collaborative planning (seperti Notion), AI itinerary suggestion, dan real-time sync. UI dirancang untuk mobile-first tapi tetap powerful di desktop.

Saat ini dalam beta testing dengan 200+ pengguna aktif.`,
    thumbnail: '/assets/images/projects/nomad-thumb.jpg',
    demoUrl: 'https://nomad.priyatna.design',
    techStack: ['React Native', 'Expo', 'Supabase', 'OpenAI API', 'Reanimated 3'],
    category: 'Product Design',
    featured: false,
    order: 4,
    status: 'active',
  },
]

export function getAllProjects(): Project[] {
  return PROJECTS_DATA
    .filter((p) => p.status === 'active')
    .sort((a, b) => a.order - b.order)
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS_DATA.find((p) => p.slug === slug && p.status === 'active')
}

export function getAllProjectCategories(): string[] {
  return [...new Set(PROJECTS_DATA.map((p) => p.category))]
}
