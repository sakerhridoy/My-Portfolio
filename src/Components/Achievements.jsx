import React from 'react';
import { motion } from 'framer-motion';
import { LiaCertificateSolid } from 'react-icons/lia';
import { GiDiamondTrophy } from 'react-icons/gi';
import { PiGlobeStand } from 'react-icons/pi';
import { FaMedal, FaAward } from 'react-icons/fa';
import api from '../admin/api';
import { useOwnedList } from '../site/useOwnedList';

const ACHIEVEMENT_ICONS = {
  certificate: LiaCertificateSolid,
  trophy: GiDiamondTrophy,
  globe: PiGlobeStand,
  medal: FaMedal,
  award: FaAward,
};

const FALLBACK_ACHIEVEMENTS = [
  {
    icon: 'certificate',
    title: 'English Business Certificate',
    institution: 'Creative IT Institute',
    description:
      'Proficient in professional business English for clear communication and effective collaboration.',
    year: '2025',
  },
  {
    icon: 'trophy',
    title: 'Best Marshal',
    institution: 'Bangladesh Biking Community',
    description:
      'Recognized for outstanding skill, discipline, and exceptional performance throughout Moto Madness BD Season 1.',
    year: '2024',
  },
  {
    icon: 'globe',
    title: 'Team Leadership',
    institution: 'NST Biker Bangladesh',
    description:
      'Demonstrated effective team leadership by guiding members with clarity, coordination, and confident decision-making.',
    year: '2023',
  },
];

const Achievements = () => {
  const achievements = useOwnedList(FALLBACK_ACHIEVEMENTS, () =>
    api.achievements
      .list({ limit: 100, sort: 'order' })
      .then(({ items: fetched }) => fetched),
  );

  if (!achievements || !achievements.length) return null;

  return (
    <section
      id="achievements"
      className="relative py-24 bg-linear-to-b from-black via-[#020617] to-black text-white overflow-hidden"
    >
      {/* 3D Perspective Grid & Ambient Glow Orbs */}
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
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.28, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 -right-24 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-16 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white text-center mb-14 sm:mb-16 tracking-wide"
        >
          My{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600 animate-pulse">
            Achievements
          </span>
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={{
            show: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {achievements.map((item, index) => {
            const Icon = ACHIEVEMENT_ICONS[item.icon] || LiaCertificateSolid;
            return (
              <motion.div
                key={item._id || item.id || index}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: 'easeOut' },
                  },
                }}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                className="relative p-6 sm:p-8 rounded-2xl backdrop-blur-xl bg-[#0d1324]/75 border border-white/10 
                hover:border-cyan-400/50 shadow-[0_8px_32px_rgba(0,0,0,0.45)] hover:shadow-[0_14px_45px_rgba(34,211,238,0.2)] 
                transition-all duration-300 cursor-pointer flex flex-col h-full group overflow-hidden"
              >
                {/* Top-Right Hover Glow */}
                <div className="absolute -top-20 -right-20 w-44 h-44 bg-linear-to-br from-cyan-400/15 to-blue-600/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Animated Icon Container */}
                <div className="mb-5 sm:mb-6 flex justify-center sm:justify-start">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.15)] group-hover:scale-110 group-hover:bg-cyan-400/20 group-hover:border-cyan-400/50 transition-all duration-300">
                    <Icon size={32} className="text-cyan-400" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors text-center sm:text-left">
                  {item.title}
                </h3>

                <p className="text-cyan-400 font-semibold mt-2 sm:mt-3 text-sm sm:text-base text-center sm:text-left">
                  {item.institution}
                </p>

                <p className="text-gray-300/90 mt-3 text-sm sm:text-[15px] leading-relaxed flex-1 text-center sm:text-left">
                  {item.description}
                </p>

                <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-white/40 text-xs uppercase tracking-widest">
                    Year
                  </span>
                  <span className="px-3 py-0.5 rounded-full text-xs sm:text-sm font-bold bg-cyan-400/10 text-cyan-300 border border-cyan-400/30">
                    {item.year}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;