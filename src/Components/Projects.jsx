import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProjectsSlider from './ProjectsSlider';
import useGithubData from './useGithubData';

import eCommerceProject from '../assets/eCommerceProject02.png';
import portfolioProject from '../assets/portfolioProject.png';
import landingPage from '../assets/landingPage.png';
import homePage from '../assets/homePage.png';
import todos from '../assets/todoList.png';
import ludo from '../assets/ludo.png';
import fulleCommerce from '../assets/fulleComerce.png';
import realtyBazar from '../assets/realtyBazar.png';
import fullStore from '../assets/fullStore.png';
import landingPage02 from '../assets/landingPage02.png';
import landingPage03 from '../assets/landingPage03.png';
import landingPage04 from '../assets/landingPage04.png';
import landingPage05 from '../assets/landingPage05.png';
import landingPage06 from '../assets/landingPage06.png';
import landingPage07 from '../assets/landingPage07.png';
import portfolio02 from '../assets/portfolio02.png';
import studentsPortal from '../assets/studentPortal.png';
import moonAnimation from '../assets/moonAnimation.png';
import registrationForm from '../assets/registrationForm.png';

const allProjects = [
  {
    id: 1,
    img: portfolioProject,
    title: 'Portfolio Website',
    link: 'https://github.com/sakerhridoy/My-Portfolio',
    category: 'React',
  },
  {
    id: 2,
    img: fulleCommerce,
    title: 'E-commerce Website',
    link: 'https://github.com/sakerhridoy/eCommerceReact',
    category: 'React',
  },
  {
    id: 3,
    img: fullStore,
    title: 'E-commerce Website',
    link: 'https://github.com/sakerhridoy/full-ecommerce-website',
    category: 'React',
  },
  {
    id: 4,
    img: eCommerceProject,
    title: 'E-commerce Website',
    link: 'https://github.com/sakerhridoy/Bangla-Library',
    category: 'HTML/CSS',
  },
  {
    id: 5,
    img: realtyBazar,
    title: 'Landing Page Design',
    link: 'https://github.com/sakerhridoy/Realty-Bazaar-Landing-Page',
    category: 'React',
  },
  {
    id: 6,
    img: landingPage,
    title: 'Landing Page Design',
    link: 'https://github.com/sakerhridoy/ProCleaning-web-Landing-page-design-with-React',
    category: 'React',
  },
  {
    id: 7,
    img: homePage,
    title: 'Landing Page Design',
    link: 'https://github.com/sakerhridoy/react_project_01',
    category: 'React',
  },
  {
    id: 8,
    img: todos,
    title: 'Todo List Website',
    link: 'https://github.com/sakerhridoy/Todo-List-using-Redux-and-Firebase',
    category: 'Redux',
  },
  {
    id: 9,
    img: ludo,
    title: 'Ludo Dice Roll',
    link: 'https://github.com/sakerhridoy/Ludo-Dice-Roll',
    category: 'JavaScript',
  },
  {
    id: 10,
    img: landingPage02,
    title: 'Landing Page (Tailwind)',
    link: 'https://github.com/sakerhridoy/Nexcent---tailwind-Project',
    category: 'Tailwind',
  },
  {
    id: 11,
    img: portfolio02,
    title: 'Portfolio (Bootstrap)',
    link: 'https://github.com/sakerhridoy/Portfolio',
    category: 'Bootstrap',
  },
  {
    id: 12,
    img: studentsPortal,
    title: 'Students Portal',
    link: 'https://github.com/sakerhridoy/Student-Portal-React-Tailwind-CSS',
    category: 'React',
  },
  {
    id: 13,
    img: moonAnimation,
    title: 'Moon Animation',
    link: 'https://github.com/sakerhridoy/Moon-Animation',
    category: 'HTML/CSS',
  },
  {
    id: 14,
    img: registrationForm,
    title: 'Registration Form',
    link: 'https://github.com/sakerhridoy/Registration-Form--React-Project',
    category: 'React',
  },
  {
    id: 15,
    img: landingPage03,
    title: 'Landing Page (Bootstrap)',
    link: 'https://github.com/sakerhridoy/Bootstrap-Project-3',
    category: 'Bootstrap',
  },
  {
    id: 16,
    img: landingPage04,
    title: 'Landing Page (Bootstrap 2)',
    link: 'https://github.com/sakerhridoy/Bootstrap-Project-2',
    category: 'Bootstrap',
  },
  {
    id: 17,
    img: landingPage05,
    title: 'Landing Page (Bootstrap 1)',
    link: 'https://github.com/sakerhridoy/Bootstrap-Project',
    category: 'Bootstrap',
  },
  {
    id: 18,
    img: landingPage06,
    title: 'Landing Page (HTML/CSS)',
    link: 'https://github.com/sakerhridoy/html-and-css-2',
    category: 'HTML/CSS',
  },
  {
    id: 19,
    img: landingPage07,
    title: 'Landing Page (HTML Only)',
    link: 'https://github.com/sakerhridoy/html-and-css-only',
    category: 'HTML/CSS',
  },
];

const Projects = () => {
  const { profile } = useGithubData('sakerhridoy'); 
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null); 

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(allProjects.map(p => p.category)))],
    []
  );

  const filtered =
    filter === 'All'
      ? allProjects
      : allProjects.filter(p => p.category === filter);

  return (
    <>
      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-2xl bg-[#0b0f14] rounded-2xl p-5 sm:p-8 border border-white/10 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              aria-label="Close modal"
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-6 items-start mt-4">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={selected.img}
                  alt={selected.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="flex flex-col h-full">
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-8 h-px bg-cyan-400/30"></span>
                  {selected.category}
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {selected.title}
                </h3>
                
                <p className="text-gray-400 mt-4 text-sm sm:text-base leading-relaxed">
                  A high-performance {selected.category} project focusing on clean code, responsive design, and seamless user experience.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex-1 min-w-[120px]">
                    <p className="text-[10px] text-gray-500 uppercase font-mono">GitHub Repos</p>
                    <p className="text-xl font-bold text-cyan-400">{profile?.public_repos ?? '—'}</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex-1 min-w-[120px]">
                    <p className="text-[10px] text-gray-500 uppercase font-mono">Status</p>
                    <p className="text-xl font-bold text-green-400 truncate">Vercel Live</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/5">
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg font-bold text-center transition-all shadow-lg shadow-cyan-500/20"
                  >
                    View Repository
                  </a>
                  <button
                    onClick={() => setSelected(null)}
                    className="px-6 py-3 border border-white/10 hover:bg-white/5 rounded-lg text-white font-semibold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-black text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-12"
          >
            My <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">Projects</span>
          </motion.h2>

          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-2 sm:gap-3 mb-10 flex-wrap"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full transition-all text-xs sm:text-sm font-medium border ${
                  filter === cat
                    ? 'bg-cyan-500 text-black border-cyan-500 shadow-lg shadow-cyan-500/30'
                    : 'border-white/10 text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5'
                }`}
                aria-pressed={filter === cat}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Slider */}
          <ProjectsSlider projects={filtered} onSelectProject={setSelected} />

          {/* interaction hint */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center text-gray-500 mt-10 text-xs sm:text-sm tracking-wide"
          >
             Drag side-to-side or use keyboard arrows ← →
          </motion.p>
        </div>
      </section>
    </>
  );
};

export default Projects;
