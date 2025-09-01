import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/photography');
}

// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';

// export default function HomePage() {
//   return (
//     <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 px-6 md:px-12 lg:px-24 py-12 items-center">
//       {/* Left: portrait */}
//       <motion.img
//         src="/me.jpg"
//         alt="Portrait of Edgar Demeude"
//         className="w-full max-h-[80vh] object-cover rounded-2xl shadow-lg"
//         initial={{ opacity: 0, x: -30 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8, ease: 'easeOut' }}
//       />

//       {/* Right: intro */}
//       <motion.div
//         className="flex flex-col justify-center space-y-6 text-center md:text-left"
//         initial={{ opacity: 0, x: 30 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
//       >
//         <h1 className="text-4xl md:text-5xl font-bold">Edgar Demeude</h1>
//         <p className="text-xl text-neutral-600 dark:text-neutral-400 italic">
//           I chase light through photography, film and research.
//         </p>
//         <div className="flex justify-center md:justify-start gap-6 pt-6">
//           <Link href="/photography" className="hover:underline text-lg">Photography</Link>
//           <Link href="/videos" className="hover:underline text-lg">Videos</Link>
//           <Link href="/about" className="hover:underline text-lg">About</Link>
//         </div>
//       </motion.div>
//     </main>
//   );
// }
