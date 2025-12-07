import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaTimes } from 'react-icons/fa';
import react from '../assets/react.webp'
import uiux from '../assets/uiux.png'
import tailwind from '../assets/tailwind.webp'

// ---------------- BLOG DATA ----------------
const blogData = [
  {
    id: 1,
    title: 'How I Build Modern React Websites',
    category: 'React',
    date: 'Jan 2025',
    img: react,
    content:
      'In this article, I break down the steps and architecture behind creating a clean, scalable, and animated React portfolio website. Includes Framer Motion, optimized components, reusable UI, and best practices.',
  },
  {
    id: 2,
    title: 'Frontend Design Principles for Developers',
    category: 'UI/UX',
    date: 'Dec 2024',
    img: uiux ,
    content:
      'Learn essential design rules as a developer: spacing, color theory, typography, contrast, layout structure, and how to avoid common UI mistakes.',
  },
  {
    id: 3,
    title: 'Why Tailwind CSS Makes You a Faster Developer',
    category: 'Tailwind',
    date: 'Nov 2024',
    img: tailwind,
    content:
      'Tailwind CSS allows developers to build professional, responsive, modern layouts without writing custom CSS. Here’s how I use it in my workflow.',
  },
];

const Blog = () => {
  const [active, setActive] = useState(null);
  const categories = ['All', ...new Set(blogData.map(b => b.category))];
  const [filter, setFilter] = useState('All');

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const filtered =
    filter === 'All' ? blogData : blogData.filter(b => b.category === filter);

  return (
    <>
      {/* ---------------- MODAL ---------------- */}
      {active && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center px-4 z-50"
          onClick={() => setActive(null)}
        >
          <motion.div
            onClick={e => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0d1a2d] max-w-xl w-full p-6 rounded-2xl border border-white/10 relative"
          >
            <button
              className="absolute top-4 right-4 text-gray-300 hover:text-white"
              onClick={() => setActive(null)}
            >
              <FaTimes size={20} />
            </button>

            <img
              src={active.img}
              className="rounded-lg mb-5 w-full"
              alt={active.title}
            />

            <h2 className="text-2xl font-bold mb-3 text-white/80">{active.title}</h2>
            <p className="text-gray-400 mb-2">{active.date}</p>
            <p className="text-gray-300 leading-relaxed">{active.content}</p>
          </motion.div>
        </div>
      )}

      {/* ---------------- BLOG SECTION ---------------- */}
      <section className="py-24 bg-black text-white" id="blog">
        <div className="container mx-auto px-6">
          {/* Title */}
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-6xl font-extrabold text-center mb-16"
          >
            Featured <span className="text-cyan-400">Blogs</span>
          </motion.h2>

          {/* Categories */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            className="flex justify-center gap-3 mb-12 flex-wrap"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full transition text-sm border
                ${
                  filter === cat
                    ? 'bg-cyan-500 text-black font-semibold'
                    : 'border-gray-600 text-gray-300 hover:bg-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Blog Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl overflow-hidden bg-[#0f1a2a]/70 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-cyan-500/20 transition cursor-pointer"
              >
                <img
                  src={post.img}
                  className="w-full h-48 object-cover"
                  alt=""
                />

                <div className="p-6">
                  <span className="text-sm text-cyan-400">{post.category}</span>

                  <h3 className="text-xl font-semibold mt-2">{post.title}</h3>

                  <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                    {post.content}
                  </p>

                  <button
                    onClick={() => setActive(post)}
                    className="flex items-center gap-2 mt-4 text-cyan-400 hover:gap-3 transition-all"
                  >
                    Read More <FaArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;