import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Modern Portfolio Website',
    desc: 'A fully responsive portfolio built with React, Tailwind, and Framer Motion. Includes dark mode, smooth animations, and reusable UI components.',
    tech: ['React', 'Tailwind', 'Framer Motion'],
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    live: 'https://example.com',
    github: 'https://github.com',
  },
  {
    title: 'E-Commerce Web App',
    desc: 'Full-stack MERN e-commerce platform with cart system, product filtering, admin panel & JWT authentication.',
    tech: ['MERN', 'Redux', 'Stripe'],
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    live: 'https://example.com',
    github: 'https://github.com',
  },
  {
    title: 'AI SaaS Tool',
    desc: 'SaaS application featuring AI-powered tools like text generation, image generation & speech-to-text built using OpenAI API.',
    tech: ['Next.js', 'OpenAI', 'Stripe Billing'],
    img: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769',
    live: 'https://example.com',
    github: 'https://github.com',
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
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-center mb-12"
        >
          Featured{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
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
