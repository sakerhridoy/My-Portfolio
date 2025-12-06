import React, { useState } from 'react';
import { motion } from 'framer-motion';
import profile from '../assets/about3.png';

const About = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <section
      id="about"
      className="relative py-28 bg-linear-to-b from-black via-gray-900 to-black text-white overflow-hidden"
      onMouseMove={e => {
        setMousePos({
          x: e.clientX,
          y: e.clientY,
        });
      }}
    >
      {/* Cursor Follow Light Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,255,255,0.12), transparent 70%)`,
        }}
      ></div>

      {/* Floating Shapes */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"
      ></motion.div>

      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
      ></motion.div>

      <div className="container mx-auto px-6 lg:px-16 relative z-20">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-6xl font-extrabold text-center mb-16 tracking-wide"
        >
          About{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600 animate-pulse">
            Me
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Image Box with Parallax Hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center relative"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: 'spring', stiffness: 150 }}
              className="relative group"
            >
              {/* Animated Gradient Border */}
              <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition duration-500"></div>

              <img
                src={profile}
                alt="Profile"
                className="relative w-80 h-80 rounded-3xl object-cover shadow-2xl border border-white/10"
              />
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-2xl p-10 rounded-3xl border border-white/10 shadow-xl hover:shadow-cyan-400/30 transition"
          >
            <h3 className="text-4xl font-semibold mb-4">
              I'm <span className="text-cyan-400">Saker Ahmed</span>
            </h3>

            <p className="text-gray-300 leading-7">
              A passionate{' '}
              <span className="text-cyan-400 font-medium">
                Frontend Developer
              </span>{' '}
              crafting modern, clean & visually immersive digital experiences. I
              love animation-rich interfaces, smooth UX, and premium dark UI.
            </p>

            <p className="text-gray-300 leading-7 mt-4">
              My goal is to master full-stack development, AI-integrated web
              apps, and build real-world scalable solutions. I always push my
              limits to produce visually stunning and functional products.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-5 text-center">
              {[
                { count: '1+', title: 'Years Experience' },
                { count: '20+', title: 'Projects' },
                { count: '2+', title: 'Clients' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-5 bg-black/30 rounded-xl border border-white/10 hover:bg-black/50 transition"
                >
                  <h4 className="text-3xl font-bold text-cyan-400">
                    {item.count}
                  </h4>
                  <p className="text-gray-400 text-sm">{item.title}</p>
                </motion.div>
              ))}
            </div>

            {/* Button */}
            <div className="mt-10">
              <motion.a
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.92 }}
                href="#contact"
                className="px-10 py-3 bg-cyan-400 hover:bg-cyan-500 text-white font-semibold rounded-xl shadow-lg transition cursor-pointer"
              >
                Contact Me
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
