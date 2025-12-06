import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiBriefcase, FiStar, FiCpu, FiTable } from 'react-icons/fi';

const Experience = () => {
  const items = [
    {
      icon: <FiBriefcase />,
      title: 'Frontend Developer',
      desc: 'Building modern, animated & responsive web apps with React & Tailwind CSS.',
      duration: '2023 - Present',
    },
    {
      icon: <FiCode />,
      title: 'JavaScript Developer',
      desc: 'Developing interactive UI elements, custom animations, and smooth UX.',
      duration: '2024 - Present',
    },
    {
      icon: <FiCpu />,
      title: 'AI-Assisted Developer',
      desc: 'Using AI tools to speed up workflows, generate ideas & optimize UI/UX.',
      duration: '2024 - Present',
    },
    {
      icon: <FiTable />,
      title: 'Responsive & Accessible UI',
      desc: 'Ensuring every layout works flawlessly across all devices with clean accessibility standards.',
      duration: '2024 - Present',
    },
  ];

  return (
    <section
      id="experience"
      className="relative py-28 bg-linear-to-b from-black via-gray-900 to-black text-white overflow-hidden"
    >
      {/* Floating background glows */}
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="absolute top-28 left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute bottom-20 right-10 w-52 h-52 bg-purple-500/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 lg:px-16 relative z-20">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-6xl font-extrabold text-center mb-16"
        >
          My{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600 animate-pulse">
            Experience
          </span>
        </motion.h2>

        {/* Experience Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
          {items.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl 
                border border-white/10 hover:border-cyan-400 transition duration-300"
            >
              {/* ICON */}
              <div className="text-5xl text-cyan-400 mb-5">{exp.icon}</div>

              <h3 className="text-2xl font-semibold mb-2">{exp.title}</h3>
              <p className="text-gray-300 leading-7">{exp.desc}</p>

              <p className="mt-4 text-sm text-gray-400">
                <FiStar className="inline-block mr-1 text-yellow-400" />
                {exp.duration}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-14">
          <motion.a
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.92 }}
            href="#projects"
            className="px-10 py-3 bg-cyan-400 hover:bg-cyan-500 text-white 
            font-semibold rounded-xl shadow-lg transition cursor-pointer"
          >
            View My Work
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
