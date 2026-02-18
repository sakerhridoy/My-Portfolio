import { motion } from 'framer-motion';
import { LiaCertificateSolid } from 'react-icons/lia';
import { GiDiamondTrophy } from 'react-icons/gi';
import { PiGlobeStand } from 'react-icons/pi';

const achievements = [
  {
    icon: <LiaCertificateSolid size={38} className="text-cyan-400" />,
    title: 'English Business Certificate',
    inst: 'Creative IT Institute',
    desc: 'Proficient in professional business English for clear communication and effective collaboration.',
    year: '2025',
  },
  {
    icon: <GiDiamondTrophy size={38} className="text-cyan-400" />,
    title: 'Best Marshal',
    inst: 'Bangladesh Biking Community',
    desc: 'Recognized for outstanding skill, discipline, and exceptional performance throughout Moto Madness BD Season 1.',
    year: '2024',
  },
  {
    icon: <PiGlobeStand size={38} className="text-cyan-400" />,
    title: 'Team Leadership',
    inst: 'NST Biker Bangladesh',
    desc: 'Demonstrated effective team leadership by guiding members with clarity, coordination, and confident decision-making.',
    year: '2023',
  },
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-12 sm:mb-16"
        >
          Achievements
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            show: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              whileHover={{ scale: 1.05 }}
              className="p-6 sm:p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 
              hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/20 
              transition-all duration-300 cursor-pointer flex flex-col h-full"
            >
              <div className="mb-4 sm:mb-6 flex justify-center sm:justify-start">{item.icon}</div>

              <h3 className="text-xl sm:text-2xl font-bold text-white text-center sm:text-left">
                {item.title}
              </h3>

              <p className="text-cyan-400 font-semibold mt-2 sm:mt-3 text-sm sm:text-base text-center sm:text-left">
                {item.inst}
              </p>
              
              <p className="text-gray-300 mt-3 text-sm sm:text-[15px] leading-relaxed flex-1 text-center sm:text-left">
                {item.desc}
              </p>

              <div className="mt-5 pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-white/40 text-xs uppercase tracking-widest">Year</span>
                <span className="text-cyan-400 font-bold text-sm sm:text-base">{item.year}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
