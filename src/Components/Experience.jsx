import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiCode,
  FiBriefcase,
  FiStar,
  FiCpu,
  FiTable,
  FiLayout,
} from 'react-icons/fi';
import api from '../admin/api';
import { useOwnedList } from '../site/useOwnedList';

const EXPERIENCE_ICONS = {
  briefcase: FiBriefcase,
  code: FiCode,
  cpu: FiCpu,
  table: FiTable,
  layout: FiLayout,
  star: FiStar,
};

const FALLBACK_EXPERIENCE = [
  {
    icon: 'briefcase',
    title: 'Frontend Developer',
    description:
      'Building modern, animated & responsive web apps with React & Tailwind CSS.',
    duration: '2023 - Present',
  },
  {
    icon: 'code',
    title: 'JavaScript Developer',
    description:
      'Developing interactive UI elements, custom animations, and smooth UX.',
    duration: '2024 - Present',
  },
  {
    icon: 'cpu',
    title: 'AI-Assisted Developer',
    description:
      'Using AI tools to speed up workflows, generate ideas & optimize UI/UX.',
    duration: '2024 - Present',
  },
  {
    icon: 'table',
    title: 'Responsive & Accessible UI',
    description:
      'Ensuring every layout works flawlessly across all devices with clean accessibility standards.',
    duration: '2024 - Present',
  },
];

const ExperienceCard = ({ exp, index }) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const IconComponent = EXPERIENCE_ICONS[exp.icon] || FiBriefcase;
  const isCustomIcon = typeof exp.icon === 'object' && exp.icon?.url;

  const handleMouseMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 10, rotateY: x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 45, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.1 }}
      style={{ perspective: 1000 }}
      className={index % 2 === 1 ? 'sm:translate-y-6' : ''}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative h-full p-6 sm:p-8 pl-8 sm:pl-10 rounded-2xl bg-[#0b1120]/80 backdrop-blur-xl 
        border border-white/10 hover:border-cyan-400/50 shadow-[0_12px_35px_rgba(0,0,0,0.5)] 
        hover:shadow-[0_18px_50px_rgba(34,211,238,0.18)] transition-colors duration-300 group overflow-hidden"
      >
        {/* Left Vertical Neon Accent Bar */}
        <div className="absolute left-0 top-6 bottom-6 w-1.5 rounded-r-full bg-linear-to-b from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_14px_rgba(34,211,238,0.8)] group-hover:top-3 group-hover:bottom-3 transition-all duration-300" />

        {/* Subtle Corner Spotlight */}
        <div className="absolute -bottom-16 -right-16 w-44 h-44 bg-linear-to-tl from-purple-500/15 via-cyan-400/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Header Row: 3D Floating Icon Pedestal + Duration Pill */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-cyan-500/20 to-purple-600/15 border border-cyan-400/30 flex items-center justify-center text-2xl sm:text-3xl text-cyan-400 shadow-[0_6px_20px_rgba(34,211,238,0.2)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            {isCustomIcon ? (
              <img
                src={exp.icon.url}
                alt={exp.title}
                className="w-8 h-8 object-contain"
              />
            ) : (
              <IconComponent />
            )}
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-cyan-300 border border-white/10 group-hover:border-cyan-400/40 transition-colors">
            <FiStar className="text-amber-400 shrink-0" />
            {exp.duration}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2.5">
          {exp.title}
        </h3>
        <p className="text-gray-300/90 text-sm sm:text-base leading-relaxed">
          {exp.description}
        </p>

        {/* Bottom Step Indicator */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
          <span className="uppercase tracking-widest">Role 0{index + 1}</span>
          <span className="h-1.5 w-12 rounded-full bg-white/10 overflow-hidden">
            <span className="block h-full w-1/2 group-hover:w-full bg-linear-to-r from-cyan-400 to-purple-500 transition-all duration-500" />
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
  const items = useOwnedList(FALLBACK_EXPERIENCE, () =>
    api.experience
      .list({ limit: 100, sort: 'order' })
      .then(({ items: fetched }) => fetched),
  );

  if (!items || !items.length) return null;

  return (
    <section
      id="experience"
      className="relative py-20 md:py-28 bg-linear-to-b from-black via-[#060b19] to-black text-white overflow-hidden"
    >
      {/* 3D Isometric Dot-Matrix & Floating Rings Background */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(34, 211, 238, 0.35) 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
          transform:
            'perspective(800px) rotateX(35deg) rotateZ(-8deg) scale(1.35)',
          transformOrigin: 'center center',
        }}
      />

      {/* Animated 3D Orbital Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
        className="absolute -top-32 -right-32 w-[460px] h-[460px] rounded-full border border-cyan-500/15 pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 55, ease: 'linear' }}
        className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full border border-purple-500/15 pointer-events-none"
      />

      {/* Ambient Glows */}
      <motion.div
        animate={{ y: [0, -25, 0], opacity: [0.15, 0.28, 0.15] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
        className="absolute top-28 left-10 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.15, 0.25, 0.15] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-6 lg:px-16 relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.05 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-14 sm:mb-20 tracking-wide"
        >
          My{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600 animate-pulse">
            Experience
          </span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-8 md:gap-10 sm:pb-6">
          {items.map((exp, index) => (
            <ExperienceCard
              key={exp._id || exp.id || index}
              exp={exp}
              index={index}
            />
          ))}
        </div>

        <div className="text-center mt-14 sm:mt-16">
          <motion.a
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.92 }}
            href="#projects"
            className="inline-block px-8 sm:px-10 py-3.5 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white 
            font-semibold rounded-xl shadow-[0_8px_25px_rgba(34,211,238,0.3)] transition cursor-pointer"
          >
            View My Work
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
