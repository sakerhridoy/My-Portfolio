import React from 'react';
import { motion } from 'framer-motion';
import { FaCircle } from 'react-icons/fa';

const timelineData = [
  {
    year: '2023',
    title: 'Started Web Development',
    desc: 'Began learning HTML, CSS, JavaScript and basic UI creation.',
  },
  {
    year: '2024',
    title: 'Frontend Specialization',
    desc: 'Mastered React, Tailwind and built multiple personal projects.',
  },
  {
    year: '2025',
    title: 'Advanced Development',
    desc: 'Built dashboards, full websites & complex frontend systems.',
  },
];

const Timeline = () => {
  return (
    <section id="timeline" className="py-24 bg-[#020617] text-white px-6">
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-5xl font-extrabold text-center mb-16"
      >
        My{' '}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
          Journey
        </span>
      </motion.h2>

      <div className="relative max-w-4xl mx-auto border-l border-white/20 pl-10 space-y-14">
        {timelineData.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative"
          >
            <div className="absolute -left-5 top-1">
              <FaCircle className="text-cyan-400 text-lg" />
            </div>

            <p className="text-cyan-400 font-semibold">{item.year}</p>
            <h3 className="text-2xl font-bold mt-1">{item.title}</h3>
            <p className="text-gray-300 mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
