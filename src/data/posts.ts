import type { Post } from '@/types'

export const POSTS_DATA: Post[] = [
  {
    id: 'post-1',
    slug: 'membangun-design-system-scalable',
    title: 'Membangun Design System yang Scalable',
    excerpt: 'Design system bukan sekadar komponen library. Ini tentang membangun bahasa visual yang konsisten, evolving, dan mampu bertahan seiring pertumbuhan tim.',
    content: `
<h2>Apa itu Design System?</h2>
<p>Design system adalah kumpulan aturan, komponen, dan guideline yang menjadi "satu sumber kebenaran" untuk seluruh produk digital. Ini bukan hanya tentang membuat tombol yang konsisten — ini tentang membangun shared language antara designer dan developer.</p>

<h2>Mengapa Scalability Penting?</h2>
<p>Design system yang tidak dirancang untuk scale akan menjadi bottleneck. Tim akan mulai membuat exception, komponen duplikat muncul, dan inkonsistensi menyebar. Hasilnya: user experience yang terfragmentasi.</p>

<h2>Prinsip Utama</h2>
<p>Tiga prinsip yang harus ada dalam design system yang scalable:</p>
<ul>
<li><strong>Token-based:</strong> Semua nilai (warna, spacing, typography) harus jadi token, bukan nilai hardcode.</li>
<li><strong>Composable:</strong> Komponen harus bisa dikombinasikan tanpa menulis CSS baru.</li>
<li><strong>Documented:</strong> Setiap keputusan desain harus terdokumentasi beserta alasannya.</li>
</ul>

<h2>Implementasi Praktis</h2>
<p>Mulai dari yang kecil. Tidak perlu langsung membangun 200 komponen. Identifikasi komponen yang paling sering digunakan, bangun dengan benar, dan iterasi dari sana.</p>

<blockquote>Design system yang baik dimulai dari masalah nyata, bukan dari ambisi arsitektur.</blockquote>

<h2>Kesimpulan</h2>
<p>Investasi dalam design system adalah investasi jangka panjang. Return-nya tidak langsung terlihat, tapi setelah 6-12 bulan, perbedaannya dramatis: development speed meningkat, bug visual berkurang, dan konsistensi terjaga.</p>
    `,
    coverImage: '/assets/images/posts/design-system.jpg',
    tags: ['Design System', 'UI/UX', 'Figma'],
    status: 'published',
    publishedAt: '2026-03-15T00:00:00Z',
    createdAt: '2026-03-10T00:00:00Z',
    readTimeMin: 6,
  },
  {
    id: 'post-2',
    slug: 'motion-design-micro-interactions',
    title: 'Motion Design: Dari Micro-Interactions ke Macro-Animations',
    excerpt: 'Animasi yang baik bukan sekadar dekorasi. Ini adalah komunikasi — cara interface berbicara kepada user tentang apa yang sedang terjadi dan apa yang akan terjadi.',
    content: `
<h2>Mengapa Motion Matters?</h2>
<p>Di dunia yang penuh dengan interface statis, motion design yang tepat bisa membuat perbedaan antara produk yang terasa "hidup" dan yang terasa datar. Tapi motion yang berlebihan justru merusak experience.</p>

<h2>Prinsip Motion Design yang Baik</h2>
<p>Ada empat prinsip utama yang saya pegang ketika merancang animasi:</p>
<ul>
<li><strong>Purposeful:</strong> Setiap animasi harus punya alasan. Apa yang ingin dikomunikasikan?</li>
<li><strong>Fast:</strong> Animasi UI harus cepat — 200-400ms. Lebih dari itu terasa lambat.</li>
<li><strong>Natural:</strong> Gunakan easing yang mengikuti fisika nyata, bukan linear.</li>
<li><strong>Consistent:</strong> Bahasa motion harus konsisten di seluruh produk.</li>
</ul>

<h2>Spring Physics</h2>
<p>Spring physics adalah cara terbaik untuk membuat animasi terasa natural. Alih-alih mendefinisikan durasi, kita mendefinisikan stiffness, damping, dan mass. Hasilnya: animasi yang merespons konteks.</p>

<blockquote>The best animation is the one the user doesn't notice — they only notice when it's missing.</blockquote>

<h2>Tools dan Implementasi</h2>
<p>Untuk web, Framer Motion adalah pilihan terbaik. Untuk mobile, Reanimated 3 jika React Native, atau Lottie untuk animasi kompleks yang dibuat di After Effects.</p>
    `,
    coverImage: '/assets/images/posts/motion-design.jpg',
    tags: ['Motion Design', 'Animation', 'Framer Motion'],
    status: 'published',
    publishedAt: '2026-02-20T00:00:00Z',
    createdAt: '2026-02-15T00:00:00Z',
    readTimeMin: 5,
  },
  {
    id: 'post-3',
    slug: 'tipografi-sebagai-fondasi-visual',
    title: 'Tipografi sebagai Fondasi Visual Identity',
    excerpt: 'Pilihan typeface adalah salah satu keputusan paling fundamental dalam membangun identitas visual. Bukan tentang estetika semata, tapi tentang karakter dan komunikasi.',
    content: `
<h2>Typeface Adalah Suara Brand</h2>
<p>Jika warna adalah emosi brand, maka tipografi adalah suaranya. Typeface yang dipilih dengan benar akan berbicara bahkan sebelum user membaca satu kata pun.</p>

<h2>Memilih Typeface yang Tepat</h2>
<p>Beberapa pertanyaan yang harus dijawab sebelum memilih typeface:</p>
<ul>
<li>Apa personality brand yang ingin dikomunikasikan?</li>
<li>Di media apa typeface akan digunakan? (screen, print, kedua-duanya)</li>
<li>Apakah perlu mendukung multiple languages?</li>
<li>Apa budget lisensi yang tersedia?</li>
</ul>

<h2>Variable Fonts: The Future</h2>
<p>Variable fonts adalah revolusi tipografi. Satu file font bisa memiliki ratusan variasi weight, width, dan optical size. Ini menghemat bandwidth, memberikan kontrol presisi, dan memungkinkan animasi tipografi yang tidak mungkin sebelumnya.</p>

<blockquote>Good typography is invisible. Great typography makes the content feel inevitable.</blockquote>

<h2>Optical Sizing</h2>
<p>Optical sizing adalah teknik di mana bentuk huruf berubah sesuai ukurannya. Huruf kecil perlu counter yang lebih terbuka, stroke yang lebih tebal, dan x-height yang lebih tinggi dibanding huruf besar. Variable fonts yang support optical sizing otomatis menangani ini.</p>
    `,
    coverImage: '/assets/images/posts/typography.jpg',
    tags: ['Typography', 'Brand Identity', 'Variable Fonts'],
    status: 'published',
    publishedAt: '2026-01-28T00:00:00Z',
    createdAt: '2026-01-20T00:00:00Z',
    readTimeMin: 7,
  },
]

export function getAllPosts(): Post[] {
  return POSTS_DATA
    .filter((p) => p.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS_DATA.find((p) => p.slug === slug && p.status === 'published')
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag))
}

export function getAllPostTags(): string[] {
  const tags = POSTS_DATA.flatMap((p) => p.tags)
  return [...new Set(tags)]
}
