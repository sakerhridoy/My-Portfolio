import { motion } from 'framer-motion';
import { Award, Target, Trophy, Star } from 'lucide-react';

const achievements = [
  {
    icon: <Award size={38} className="text-cyan-400" />,
    title: 'English Business Language',
    desc: 'Proficient in professional business English for clear communication and effective collaboration.',
    year: '2025',
  },
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white text-center mb-12"
        >
          Achievements
        </motion.h2>

        {/* Cards Container */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            show: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 
              hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 
              transition-all duration-300 cursor-pointer"
            >
              <div className="mb-4">{item.icon}</div>

              <h3 className="text-2xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="text-gray-300 mt-2 text-sm leading-relaxed">
                {item.desc}
              </p>

              <p className="text-cyan-400 font-semibold mt-4">{item.year}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
