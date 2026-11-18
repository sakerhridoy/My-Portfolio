import React from 'react';
import { motion } from 'framer-motion';
import { FaCircle } from 'react-icons/fa';
import api from '../admin/api';
import { useOwnedList } from '../site/useOwnedList';

const FALLBACK_TIMELINE = [
  {
    year: '2023',
    title: 'Started Web Development',
    description: 'Began learning HTML, CSS, JavaScript and basic UI creation.',
  },
  {
    year: '2024',
    title: 'Frontend Specialization',
    description:
      'Mastered React, Tailwind and built multiple personal projects.',
  },
  {
    year: '2025',
    title: 'Advanced Development',
    description: 'Built dashboards, full websites & complex frontend systems.',
  },
];

const Timeline = () => {
  const items = useOwnedList(FALLBACK_TIMELINE, () =>
    api.timeline
      .list({ limit: 100, sort: 'order' })
      .then(({ items: fetched }) => fetched),
  );

  if (!items || !items.length) return null;

  return (
    <section
      id="timeline"
      className="relative py-24 bg-linear-to-b from-black via-[#020617] to-black text-white px-6 overflow-hidden"
    >
      {/* 3D Perspective Grid & Floating Orbs Background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(34,211,238,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.18) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          transform: 'perspective(600px) rotateX(45deg) scale(1.4)',
          transformOrigin: 'center top',
        }}
      />

      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.16, 0.3, 0.16] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-24 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.16, 0.28, 0.16] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container mx-auto relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-14 sm:mb-20 tracking-wide"
        >
          My{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600 animate-pulse">
            Journey
          </span>
        </motion.h2>

        <div className="relative max-w-4xl mx-auto pl-8 sm:pl-12 space-y-8 sm:space-y-12">
          {/* Base Vertical Track Line */}
          <div className="absolute left-2 sm:left-3 top-2 bottom-2 w-0.5 bg-white/10 rounded-full" />

          {/* Animated Glowing Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.1 }}
            className="absolute left-2 sm:left-3 top-2 bottom-2 w-0.5 bg-linear-to-b from-cyan-400 via-blue-500 to-purple-500 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.8)] origin-top"
          />

          {items.map((item, i) => (
            <motion.div
              key={item._id || item.id || i}
              initial={{ opacity: 0, x: -35, y: 15 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.15 }}
              className="relative group"
            >
              {/* Animated Timeline Node */}
              <div className="absolute -left-[33px] sm:-left-[45px] top-6 flex items-center justify-center">
                <span className="absolute w-7 h-7 rounded-full bg-cyan-400/20 animate-ping" />
                <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#020617] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.75)] group-hover:scale-125 transition-transform duration-300">
                  <FaCircle className="text-cyan-400 text-[8px] sm:text-[9px]" />
                </div>
              </div>

              {/* Glassmorphic 3D Hover Card */}
              <motion.div
                whileHover={{ y: -4, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="relative p-6 sm:p-8 rounded-2xl bg-[#0d1324]/75 backdrop-blur-xl border border-white/10 group-hover:border-cyan-400/50 shadow-[0_8px_32px_rgba(0,0,0,0.45)] group-hover:shadow-[0_12px_40px_rgba(34,211,238,0.16)] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 w-44 h-44 bg-linear-to-br from-cyan-400/15 to-blue-600/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase bg-cyan-400/10 text-cyan-300 border border-cyan-400/30 shadow-[0_0_12px_rgba(34,211,238,0.2)]">
                    {item.year}
                  </span>
                  <span className="text-xs font-mono text-gray-500 group-hover:text-cyan-400/70 transition-colors">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-gray-300/90 mt-2.5 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;