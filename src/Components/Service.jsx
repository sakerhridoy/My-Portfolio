import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { FaReact, FaMobileAlt, FaPalette, FaPenNib, FaCode, FaTable, FaStar, FaBriefcase, FaDesktop, FaLayerGroup } from 'react-icons/fa';
// Note: FaCpu and FaLayout were removed as they may not exist in this version of react-icons/fa
// Use alternatives like FaDesktop for CPU-related tasks, FaLayerGroup for layout tasks.
import { SiTailwindcss, SiJavascript, SiFigma } from 'react-icons/si';
import api from '../admin/api';
import { useOwnedList } from '../site/useOwnedList';

const DESIGN_ICONS = {
  briefcase: FaBriefcase,
  code: FaCode,
  cpu: FaDesktop, // Alias FaDesktop
  table: FaTable,
  layout: FaLayerGroup, // Alias FaLayerGroup
  star: FaStar,
  react: FaReact,
  tailwind: SiTailwindcss,
  pen: FaPenNib,
  mobile: FaMobileAlt,
  palette: FaPalette,
};

const FALLBACK_SERVICES = [
  {
    icon: 'react',
    title: 'Frontend Development',
    desc: 'React.js, Tailwind CSS, Responsive UI, Component Architecture',
  },
  {
    icon: 'code',
    title: 'JavaScript Development',
    desc: 'ES6+, DOM Manipulation, API Integration, Logic Building',
  },
  {
    icon: 'tailwind',
    title: 'Tailwind CSS Expert',
    desc: 'Pixel Perfect Modern UI, Utility-First Workflow',
  },
  {
    icon: 'mobile',
    title: 'Responsive Design',
    desc: 'Fully mobile-friendly layout for all devices',
  },
];

const Service = () => {
  const items = useOwnedList(FALLBACK_SERVICES, () =>
    api.services.list({ status: 'published', limit: 100, sort: 'order' }).then(({ items: fetched }) => fetched)
  );

  if (!items.length) return null;

  return (
    <section id="services" className="py-24 bg-[#020617] text-white relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.05 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-12 sm:mb-16 tracking-wide"
        >
          My{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600 animate-pulse">
            Services
          </span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {items.map((service, index) => {
            const IconComponent = DESIGN_ICONS[service.icon] || FaCode;
            const iconUrl =
              typeof service.icon === 'string' && service.icon.startsWith('http')
                ? service.icon
                : service.icon?.url;

            return (
              <Tilt key={index} tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05} transitionSpeed={1500} className="w-full">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="bg-[#0f1a2a]/70 border border-white/10 shadow-lg rounded-2xl p-6 backdrop-blur-xl hover:shadow-cyan-400/30 hover:border-cyan-400/40 transition-all duration-300 h-full flex flex-col items-center"
                >
                  <div className="flex justify-center mb-4 sm:mb-5">
                    {iconUrl ? (
                      <img src={iconUrl} alt={service.title} className="w-10 h-10 object-contain" />
                    ) : (
                      <IconComponent size={40} className="text-cyan-400" />
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-center mb-2">{service.title}</h3>
                  <p className="text-gray-300 text-center text-sm leading-relaxed">{service.desc}</p>
                </motion.div>
              </Tilt>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Service;
