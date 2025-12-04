import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

const Plans = () => {
  const plans = [
    {
      title: 'Basic',
      price: '$50',
      desc: '1 Page Website',
      highlight: false,
    },
    {
      title: 'Standard',
      price: '$120',
      desc: '3 Pages + Fully Responsive',
      highlight: true, // Highlighted plan
    },
    {
      title: 'Premium',
      price: '$250',
      desc: 'Full Website + Dashboard',
      highlight: false,
    },
  ];

  return (
    <section
      id="plans"
      className="py-24 bg-[#020617] text-white relative overflow-hidden"
    >
      {/* Background Glow Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-14"
        >
          Pricing <span className="text-cyan-400">Plans</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
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
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className={`
                  relative p-8 rounded-2xl backdrop-blur-xl shadow-lg 
                  border ${
                    plan.highlight ? 'border-cyan-400' : 'border-white/10'
                  } 
                  bg-[#0f1a2a]/70
                  hover:border-cyan-400 hover:shadow-cyan-400/40
                  transition-all duration-300
                `}
              >
                {/* Popular Badge */}
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-black px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-semibold text-center">
                  {plan.title}
                </h3>

                <p className="text-5xl font-bold text-center my-4 text-cyan-400">
                  {plan.price}
                </p>

                <p className="text-gray-300 text-center">{plan.desc}</p>

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
