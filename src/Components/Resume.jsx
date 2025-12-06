// Resume.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

const Resume = () => {
  return (
    <section
      id="resume"
      className="py-24 bg-black text-white relative overflow-hidden"
    >
      <div className="container max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-extrabold tracking-wide">
            My{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
              Resume
            </span>
          </h2>
          <p className="text-gray-400 mt-3 text-lg">
            A quick overview of my experience, education & achievements.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Briefcase className="text-cyan-400" size={28} />
              Experience
            </h3>

            <div className="glass rounded-2xl p-6 border border-white/10 shadow-xl">
              <h4 className="text-xl font-semibold">Frontend Developer</h4>
              <p className="text-cyan-400 font-medium">2024 - Present</p>
              <p className="text-gray-300 mt-2">
                Building sleek and high-performance web pages with React,
                Tailwind, Next.js, Framer Motion.
              </p>
            </div>
            <div className="glass rounded-2xl p-6 border border-white/10 shadow-xl">
              <h4 className="text-xl font-semibold">
                Management Information System
              </h4>
              <p className="text-cyan-400 font-medium">2022 - 2024</p>
              <p className="text-gray-300 mt-2">
                Skilled in Excel-based data handling, PowerPoint presentation
                design, and data analysis for meaningful business insights.
              </p>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <GraduationCap className="text-cyan-400" size={28} />
              Education
            </h3>

            <div className="glass rounded-2xl p-6 border border-white/10 shadow-xl">
              <h4 className="text-xl font-semibold">
                BBA in Political Science
              </h4>
              <p className="text-cyan-400 font-medium">2016 - 2021</p>
              <p className="text-gray-300 mt-2">
                Developed strong understanding of political systems, public
                policy, international relations, and governance.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 border border-white/10 shadow-xl">
              <h4 className="text-xl font-semibold">Web Development Course</h4>
              <p className="text-cyan-400 font-medium">2025 - Running</p>
              <p className="text-gray-300 mt-2">
                Gained hands-on skills in front-end and back-end development,
                building responsive websites, APIs, and full-stack web
                applications.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Award className="text-cyan-400" size={28} />
            Achievements
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl text-center border border-white/10">
              <h4 className="text-xl font-semibold">20+ Projects</h4>
              <p className="text-gray-300 mt-2">
                Delivered high-quality web applications.
              </p>
            </div>

            <div className="glass p-6 rounded-2xl text-center border border-white/10">
              <h4 className="text-xl font-semibold">0+ Awards</h4>
              <p className="text-gray-300 mt-2">
                Recognized for design & frontend innovation.
              </p>
            </div>

            <div className="glass p-6 rounded-2xl text-center border border-white/10">
              <h4 className="text-xl font-semibold">2+ Clients</h4>
              <p className="text-gray-300 mt-2">
                Worked with clients worldwide.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;