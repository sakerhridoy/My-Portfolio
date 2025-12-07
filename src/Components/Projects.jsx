// Projects.jsx
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProjectsSlider from './ProjectsSlider';
import useGithubData from './useGithubData';

// images imports (keep your existing imports or adjust paths)
import eCommerceProject from '../assets/eCommerceProject02.png';
import portfolioProject from '../assets/portfolioProject.png';
import landingPage from '../assets/landingPage.png';
import homePage from '../assets/homePage.png';
import todos from '../assets/todoList.png';
import ludo from '../assets/ludo.png';
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

// Projects data
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
    img: eCommerceProject,
    title: 'E-commerce Website',
    link: 'https://github.com/sakerhridoy/Bangla-Library',
    category: 'HTML/CSS',
  },
  {
    id: 3,
    img: landingPage,
    title: 'Landing Page Design',
    link: 'https://github.com/sakerhridoy/ProCleaning-web-Landing-page-design-with-React',
    category: 'React',
  },
  {
    id: 4,
    img: homePage,
    title: 'Landing Page Design',
    link: 'https://github.com/sakerhridoy/react_project_01',
    category: 'React',
  },
  {
    id: 5,
    img: todos,
    title: 'Todo List Website',
    link: 'https://github.com/sakerhridoy/Todo-List-using-Redux-and-Firebase',
    category: 'Redux',
  },
  {
    id: 6,
    img: ludo,
    title: 'Ludo Dice Roll',
    link: 'https://github.com/sakerhridoy/Ludo-Dice-Roll',
    category: 'JavaScript',
  },
  {
    id: 7,
    img: landingPage02,
    title: 'Landing Page (Tailwind)',
    link: 'https://github.com/sakerhridoy/Nexcent---tailwind-Project',
    category: 'Tailwind',
  },
  {
    id: 8,
    img: portfolio02,
    title: 'Portfolio (Bootstrap)',
    link: 'https://github.com/sakerhridoy/Portfolio',
    category: 'Bootstrap',
  },
  {
    id: 9,
    img: studentsPortal,
    title: 'Students Portal',
    link: 'https://github.com/sakerhridoy/Student-Portal-React-Tailwind-CSS',
    category: 'React',
  },
  {
    id: 10,
    img: moonAnimation,
    title: 'Moon Animation',
    link: 'https://github.com/sakerhridoy/Moon-Animation',
    category: 'HTML/CSS',
  },
  {
    id: 11,
    img: registrationForm,
    title: 'Registration Form',
    link: 'https://github.com/sakerhridoy/Registration-Form--React-Project',
    category: 'React',
  },
  {
    id: 12,
    img: landingPage03,
    title: 'Landing Page (Bootstrap)',
    link: 'https://github.com/sakerhridoy/Bootstrap-Project-3',
    category: 'Bootstrap',
  },
  {
    id: 13,
    img: landingPage04,
    title: 'Landing Page (Bootstrap 2)',
    link: 'https://github.com/sakerhridoy/Bootstrap-Project-2',
    category: 'Bootstrap',
  },
  {
    id: 14,
    img: landingPage05,
    title: 'Landing Page (Bootstrap 1)',
    link: 'https://github.com/sakerhridoy/Bootstrap-Project',
    category: 'Bootstrap',
  },
  {
    id: 15,
    img: landingPage06,
    title: 'Landing Page (HTML/CSS)',
    link: 'https://github.com/sakerhridoy/html-and-css-2',
    category: 'HTML/CSS',
  },
  {
    id: 16,
    img: landingPage07,
    title: 'Landing Page (HTML Only)',
    link: 'https://github.com/sakerhridoy/html-and-css-only',
    category: 'HTML/CSS',
  },
];

const Projects = () => {
  const { profile } = useGithubData('sakerhridoy'); // optional; hook returns { profile, loading }
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null); // selected project for modal

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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-3xl bg-[#0b0f14] rounded-2xl p-6 border border-white/10 shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              aria-label="Close modal"
              className="text-gray-300 float-right text-xl"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>

            <div className="mt-4 grid md:grid-cols-2 gap-6 items-start">
              <img
                src={selected.img}
                alt={selected.title}
                className="w-full rounded-lg object-cover"
              />
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {selected.title}
                </h3>
                <p className="text-gray-300 mt-3">
                  {selected.category} • Project showcase
                </p>

                <p className="text-gray-300 mt-4">
                  Total GitHub Projects:{' '}
                  <span className="text-cyan-400 font-semibold">
                    {profile?.public_repos ?? '—'}
                  </span>
                </p>

                <div className="mt-6 flex gap-3">
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-cyan-400 text-black rounded-lg font-semibold"
                  >
                    View Repo
                  </a>
                  <button
                    onClick={() => setSelected(null)}
                    className="px-4 py-2 border border-white/10 rounded-lg text-white"
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
      <section id="projects" className="py-20 bg-black text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-extrabold text-center mb-12"
          >
            My{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
              Projects
            </span>
          </motion.h2>

          {/* Filters */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full transition-colors border ${
                  filter === cat
                    ? 'bg-cyan-400 text-black border-cyan-400'
                    : 'border-white/10 text-white/60'
                }`}
                aria-pressed={filter === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Slider */}
          <ProjectsSlider projects={filtered} onSelectProject={setSelected} />

          {/* small note */}
          <p className="text-center text-gray-400 mt-8">
            Tip: drag the slider or use arrow buttons / keyboard ← →
          </p>
        </div>
      </section>
    </>
  );
};

export default Projects;
