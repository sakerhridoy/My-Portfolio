import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaStar, FaBolt, FaCrown } from 'react-icons/fa';

const Plans = () => {
  const plans = [
    {
      title: 'Basic',
      icon: <FaBolt className="text-cyan-400 text-4xl mb-3" />,
      price: '$50',
      highlight: false,
      features: [
        '1 Page Website',
        'Responsive Design',
        'Basic Animations',
        'Fast Delivery',
      ],
    },
    {
      title: 'Standard',
      icon: <FaStar className="text-yellow-400 text-4xl mb-3" />,
      price: '$120',
      highlight: true, // Highlight
      features: [
        '3 Pages Website',
        'Full Responsiveness',
        'Premium Animations',
        'Contact Form Integration',
        'Performance Optimization',
      ],
    },
    {
      title: 'Premium',
      icon: <FaCrown className="text-purple-400 text-4xl mb-3" />,
      price: '$250',
      highlight: false,
      features: [
        'Full Website + Dashboard',
        'Advanced Animations + Effects',
        'API Integration',
        'SEO Optimization',
        'Admin Panel / CMS',
      ],
    },
  ];

  return (
    <section
      id="plans"
      className="relative py-24 bg-linear-to-b from-black via-gray-900 to-black text-white overflow-hidden"
    >
      {/* Floating Glow Background */}
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full"
      ></motion.div>
      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full"
      ></motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-6xl font-extrabold text-center mb-16 tracking-wide"
        >
          Pricing{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600 animate-pulse">
            Plans
          </span>
        </motion.h2>

        {/* Plans Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {plans.map((plan, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              scale={1.05}
              transitionSpeed={1200}
              className="w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`relative p-10 rounded-3xl backdrop-blur-xl bg-white/5 border 
                  ${
                    plan.highlight
                      ? 'border-cyan-400 shadow-cyan-400/40'
                      : 'border-white/10'
                  }
                  hover:border-cyan-400 hover:shadow-cyan-300/40 transition-all duration-300 shadow-xl`}
              >
                {/* Highlight Badge */}
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-black px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                )}

                {/* Icon */}
                <div className="flex justify-center">{plan.icon}</div>

                {/* Title & Price */}
                <h3 className="text-3xl font-bold text-center">{plan.title}</h3>
                <p className="text-5xl font-extrabold text-center my-4 text-cyan-400">
                  {plan.price}
                </p>

                {/* Features */}
                <ul className="space-y-3 my-6">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <FaCheckCircle className="text-cyan-400 text-lg" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <div className="flex justify-center mt-6">
                  <a
                    href="#contact"
                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg shadow-lg font-semibold transition"
                  >
                    Get Started
                  </a>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;