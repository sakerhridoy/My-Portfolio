import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { FaReact, FaCode, FaMobileAlt } from 'react-icons/fa';
import { SiTailwindcss, SiJavascript } from 'react-icons/si';

const Service = () => {
  const services = [
    {
      icon: <FaReact size={40} className="text-cyan-400" />,
      title: 'Frontend Development',
      desc: 'React.js, Tailwind CSS, Responsive UI, Component Architecture',
    },
    {
      icon: <SiJavascript size={40} className="text-yellow-300" />,
      title: 'JavaScript Development',
      desc: 'ES6+, DOM Manipulation, API Integration, Logic Building',
    },
    {
      icon: <SiTailwindcss size={40} className="text-cyan-300" />,
      title: 'Tailwind CSS Expert',
      desc: 'Pixel Perfect Modern UI, Utility-First Workflow',
    },
    {
      icon: <FaMobileAlt size={40} className="text-green-400" />,
      title: 'Responsive Design',
      desc: 'Fully mobile-friendly layout for all devices',
    },
  ];

  return (
    <section
      id="services"
      className="py-24 bg-[#020617] text-white relative overflow-hidden"
    >
      {/* BACKGROUND GRADIENTS */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-6">
        {/* SECTION TITLE */}
        <motion.h2
                  initial={{ opacity: 0, y: -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="text-6xl font-extrabold text-center mb-16 tracking-wide"
                >
                  My{' '}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600 animate-pulse">
                    Services
                  </span>
                </motion.h2>

        {/* SERVICE CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              scale={1.05}
              transitionSpeed={1500}
              className="w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="
                  bg-[#0f1a2a]/70 border border-white/10 
                  shadow-lg rounded-2xl p-6 backdrop-blur-xl 
                  hover:shadow-cyan-400/30 hover:border-cyan-400/40 
                  transition-all duration-300
                "
              >
                <div className="flex justify-center mb-4">{service.icon}</div>

                <h3 className="text-xl font-semibold text-center mb-2">
                  {service.title}
                </h3>

                <p className="text-gray-300 text-center text-sm">
                  {service.desc}
                </p>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
