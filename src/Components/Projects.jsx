import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import useGithubData from './useGithubData';
import { FaTimes } from 'react-icons/fa';

// ---------------- YOUR IMAGES IMPORT ----------------
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

// ---------------- PROJECT DATA ----------------
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
    category: 'React',
  },
  {
    id: 3,
    img: landingPage,
    title: 'Landing Page Design',
    link: 'https://github.com/sakerhridoy/ProCleaning-web-Landing-page-design-with-React',
    category: 'Tailwind',
  },
  {
    id: 4,
    img: homePage,
    title: 'Landing Page Design',
    link: 'https://github.com/sakerhridoy/react_project_01',
    category: 'JS',
  },
  {
    id: 5,
    img: todos,
    title: 'Todo List Website',
    link: 'https://github.com/sakerhridoy/Todo-List-using-Redux-and-Firebase',
    category: 'React',
  },
  {
    id: 6,
    img: ludo,
    title: 'Ludo Disc Roll',
    link: 'https://github.com/sakerhridoy/Ludo-Dice-Roll',
    category: 'JS',
  },
  {
    id: 7,
    img: landingPage02,
    title: 'Landing Page Design',
    link: 'https://github.com/sakerhridoy/Nexcent---tailwind-Project',
    category: 'Tailwind',
  },
  {
    id: 8,
    img: portfolio02,
    title: 'Portfolio Website',
    link: 'https://github.com/sakerhridoy/Portfolio',
    category: 'React',
  },
  {
    id: 9,
    img: studentsPortal,
    title: 'Students Portal Website',
    link: 'https://github.com/sakerhridoy/Student-Portal-React-Tailwind-CSS',
    category: 'React',
  },
  {
    id: 10,
    img: moonAnimation,
    title: 'Moon Animation',
    link: 'https://github.com/sakerhridoy/Moon-Animation',
    category: 'JS',
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
    title: 'Landing Page Design',
    link: 'https://github.com/sakerhridoy/Bootstrap-Project-3',
    category: 'HTML',
  },
  {
    id: 13,
    img: landingPage04,
    title: 'Landing Page Design',
    link: 'https://github.com/sakerhridoy/Bootstrap-Project-2',
    category: 'HTML',
  },
  {
    id: 14,
    img: landingPage05,
    title: 'Landing Page Design',
    link: 'https://github.com/sakerhridoy/Bootstrap-Project',
    category: 'HTML',
  },
  {
    id: 15,
    img: landingPage06,
    title: 'Landing Page Design',
    link: 'https://github.com/sakerhridoy/html-and-css-2',
    category: 'HTML',
  },
  {
    id: 16,
    img: landingPage07,
    title: 'Landing Page Design',
    link: 'https://github.com/sakerhridoy/html-and-css-only',
    category: 'HTML',
  },
];

const Projects = () => {
  const { profile } = useGithubData('sakerhridoy');
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState(null);

  const categories = ['All', ...new Set(allProjects.map(p => p.category))];

  const filtered =
    filter === 'All'
      ? allProjects
      : allProjects.filter(p => p.category === filter);

  const visibleProjects = showAll ? filtered : filtered.slice(0, 3);

  return (
    <>
      {/* ---------------- MODAL ---------------- */}
      {selected && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-gray-900 p-5 rounded-lg max-w-lg w-full relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-2 text-white text-xl"
            >
              <FaTimes />
            </button>

            <img
              src={selected.img}
              alt={selected.title}
              className="w-full rounded mb-4"
            />
            <h2 className="text-center text-xl text-gray-400 mb-6">
              Total GitHub Projects: {profile?.public_repos}
            </h2>

            <a
              href={selected.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              View GitHub Repo
            </a>
          </div>
        </div>
      )}

      {/* ---------------- PROJECT SECTION ---------------- */}
      <section id="projects" className="py-20 bg-black text-white">
        <div className="container mx-4 md:mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Projects</h2>
          {/* ---------------- FILTER BUTTONS ---------------- */}
          <div className="flex justify-center gap-3 mb-10 flex-wrap mx-2 md:mx-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setShowAll(false);
                }}
                className={`px-4 py-2 rounded-full border transition
                  ${
                    filter === cat
                      ? 'bg-cyan-400 text-white'
                      : 'border-gray-500'
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* ---------------- PROJECT GRID ---------------- */}
          <div className="grid lg:grid-cols-3 gap-6 mx-4 xl:mx-0">
            {visibleProjects.map(p => (
              <Tilt
                glareEnable={true}
                glareColor="#ffffff"
                scale={1.05}
                key={p.id}
              >
                <motion.div
                  onClick={() => setSelected(p)}
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gray-800 rounded overflow-hidden cursor-pointer shadow-lg"
                >
                  <img src={p.img} className="w-full h-48 object-cover" />
                  <div className="p-4 text-center">
                    <p className="text-lg font-semibold">{p.title}</p>
                    <span className="text-sm text-gray-400">{p.category}</span>
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>
          {/* ---------------- VIEW ALL BUTTON ---------------- */}
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 bg-cyan-400 text-white rounded-md font-semibold hover:bg-cyan-600 cursor-pointer"
            >
              {showAll ? 'Show Less' : 'View All Projects'}
            </button>
          </div>{' '}
        </div>
      </section>
    </>
  );
};

export default Projects;
