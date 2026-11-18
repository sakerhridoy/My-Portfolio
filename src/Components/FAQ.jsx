import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { TbHandClick } from 'react-icons/tb';
import api from '../admin/api';
import { useOwnedList } from '../site/useOwnedList';

const FALLBACK_FAQS = [
  {
    question: 'What services do you offer?',
    answer: 'I specialize in modern Frontend Development, UI/UX Design, Responsive Web Apps, Framer Motion animations, API integrations and premium dark-themed interfaces.',
  },
  {
    question: 'Which technologies do you work with?',
    answer: 'React.js, Next.js, Tailwind CSS, Framer Motion, Firebase, Node.js basics, and modern frontend tools.',
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Yes! I work with clients worldwide and maintain smooth communication through email, messages, and video calls.',
  },
  {
    question: 'How long does a project usually take?',
    answer: 'It depends on complexity. Simple websites take 3–7 days, medium projects 1–3 weeks, and advanced systems vary based on requirements.',
  },
  {
    question: 'Do you provide ongoing support?',
    answer: 'Absolutely! I offer maintenance, updates, UI improvements, and future feature additions after project delivery.',
  },
];

const FAQ = () => {
  const faqData = useOwnedList(FALLBACK_FAQS, () =>
    api.faqs.list({ limit: 100, sort: 'order' }).then(({ items: fetched }) => fetched)
  );
  const [activeIndex, setActiveIndex] = useState(null);

  if (!faqData.length) return null;

  const toggleFAQ = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative py-24 bg-linear-to-b from-black via-gray-900 to-black text-white overflow-hidden"
    >
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.07),transparent_70%)] pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-24 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 35, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-20 right-16 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.05 }}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-12 sm:mb-16"
        >
          Frequently Asked{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
            Questions
          </span>
        </motion.h2>
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.05 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-cyan-400/20 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left gap-4"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-200">
                  {item.question}
                </h3>

                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0"
                >
                  <FaChevronDown className="text-cyan-400 text-base sm:text-lg" />
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-300 pt-4 text-sm sm:text-base leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12 sm:mt-14">
          <motion.a
            href="#contact"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-8 py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-black font-semibold rounded-xl shadow-lg hover:shadow-cyan-400/40 hover:-translate-y-1 transition-all text-sm sm:text-base"
          >
            <span> Still Have a Question?</span>{' '}
            <span>
              <TbHandClick className='inline-block text-lg align-middle ml-1'/>
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
