import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import portfolio from '../assets/portfolioProject.png'
import fulleCommerce from '../assets/fulleComerce.png'
import landingPage from '../assets/landingPage.png';

const projects = [
  {
    title: 'Modern Portfolio Website',
    desc: 'A fully responsive portfolio built with React, Tailwind, and Framer Motion. Includes dark mode, smooth animations, and reusable UI components.',
    tech: ['React', 'Tailwind', 'Framer Motion'],
    img: portfolio,
    live: 'https://my-portfolio-nine-mauve.vercel.app/',
    github: 'https://github.com/sakerhridoy/My-Portfolio',
  },
  {
    title: 'E-Commerce Website',
    desc: 'React e-commerce platform with cart system, product filtering & JWT authentication.',
    tech: ['React', 'Tailwind', 'Redux'],
    img: fulleCommerce,
    live: '',
    github: 'https://github.com/sakerhridoy/Full-E-commerce-Website---React',
  },
  {
    title: 'Landing Page Design',
    desc: 'A sleek, fully responsive, and professionally crafted landing page for cleaning services. Built using React, Tailwind CSS, and Swiper.js.',
    tech: ['React', 'Tailwind', 'Swiper'],
    img: landingPage,
    live: 'https://pro-cleaning-web-landing-page-desig.vercel.app/',
    github:
      'https://github.com/sakerhridoy/ProCleaning-web-Landing-page-design-with-React',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const FeaturedProjects = () => {
  return (
    <section id="Featuredprojects" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
                  initial={{ opacity: 0, y: -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true }}
                  className="text-6xl font-extrabold text-center mb-16 tracking-wide text-white"
                >
                  Featured{' '}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600 animate-pulse">
                    Projects
                  </span>
                </motion.h2>
        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.15 } } }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl overflow-hidden backdrop-blur-xl bg-white/10 
              border border-white/20 hover:border-cyan-400/40 hover:shadow-cyan-500/20 
              hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="h-52 overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-white text-2xl font-semibold">
                  {project.title}
                </h3>

                <p className="text-gray-300 mt-2 text-sm leading-relaxed">
                  {project.desc}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-cyan-400/10 
                      text-cyan-300 border border-cyan-400/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-4 mt-6">
                  <a
                    href={project.live}
                    target="_blank"
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition"
                  >
                    <ExternalLink size={20} /> Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition"
                  >
                    <Github size={20} />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
