
import { Article } from './types';

export const BLOG_POSTS: Article[] = [
  {
    id: 1,
    title: "Memahami Dasar Keamanan Web",
    excerpt: "Keamanan web adalah aspek krusial dalam pengembangan aplikasi modern. Mari kita pelajari konsep dasarnya.",
    content: "Dunia teknologi web berkembang sangat cepat, namun tantangan keamanannya tetap ada. Salah satu celah yang paling umum ditemukan adalah Cross-Site Scripting (XSS). XSS memungkinkan penyerang menyisipkan skrip berbahaya ke dalam halaman web yang dilihat oleh pengguna lain. Dalam artikel ini, kita akan membahas mengapa sanitasi input sangat penting bagi setiap pengembang.",
    author: "Budi Santoso",
    category: "Security",
    date: "24 Mei 2024",
    image: "https://picsum.photos/seed/security/800/400"
  },
  {
    id: 2,
    title: "Tips Menulis Kode JavaScript Bersih",
    excerpt: "Kode yang bersih bukan hanya soal estetika, tapi juga kemudahan pemeliharaan dan keamanan jangka panjang.",
    content: "Clean code adalah filosofi penulisan kode yang memprioritaskan keterbacaan. Dengan menggunakan nama variabel yang deskriptif dan fungsi yang kecil, kita dapat mengurangi potensi bug yang seringkali menjadi pintu masuk bagi eksploitasi keamanan. Pelajari bagaimana standar industri membantu tim besar tetap produktif.",
    author: "Siti Aminah",
    category: "Development",
    date: "22 Mei 2024",
    image: "https://picsum.photos/seed/code/800/400"
  },
  {
    id: 3,
    title: "Evolusi Frontend di Tahun 2024",
    excerpt: "Melihat tren terbaru dalam pengembangan antarmuka pengguna, dari framework hingga library utilitas.",
    content: "Tahun 2024 membawa banyak perubahan dalam ekosistem frontend. Integrasi AI dalam alat bantu pengkodean dan fokus pada performance menjadi highlight utama. Namun, meskipun teknologi berubah, prinsip dasar seperti validasi data di sisi klien dan server tetap tidak boleh diabaikan.",
    author: "Andi Wijaya",
    category: "Frontend",
    date: "20 Mei 2024",
    image: "https://picsum.photos/seed/tech/800/400"
  }
];

export const XSS_PAYLOADS = [
  { label: 'Basic Alert', payload: "<script>alert('XSS Terdeteksi!')</script>" },
  { label: 'Image Error', payload: "<img src=x onerror=\"alert('XSS via Image Error')\">" },
  { label: 'SVG Injection', payload: "<svg onload=alert('XSS_SVG')>" },
  { label: 'Stealing Cookie (Demo)', payload: "<script>alert('Simulasi pencurian cookie: ' + document.cookie)</script>" }
];
