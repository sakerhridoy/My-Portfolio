import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProjectsSlider from './ProjectsSlider';
import useGithubData from './useGithubData';
import api from '../admin/api';
import { useSite } from '../site/SiteContext';

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

const getVideoEmbed = url => {
  if (!url) return null;
  const value = String(url).trim();
  if (!value) return null;

  const youtube = value.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/i,
  );
  if (youtube)
    return {
      type: 'iframe',
      src: `https://www.youtube.com/embed/${youtube[1]}`,
    };

  const vimeo = value.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeo)
    return {
      type: 'iframe',
      src: `https://player.vimeo.com/video/${vimeo[1]}`,
    };

  if (/facebook\.com|fb\.watch/i.test(value)) {
    return {
      type: 'iframe',
      src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(value)}`,
    };
  }

  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(value))
    return { type: 'file', src: value };

  return null;
};

const Projects = () => {
  const { slug, identity } = useSite();
  const { profile } = useGithubData(identity.githubUser);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [projects, setProjects] = useState(
    identity.useBundledContent ? allProjects : [],
  );

  useEffect(() => {
    let active = true;
    setProjects(identity.useBundledContent ? allProjects : []);
    setFilter('All');

    api.projects
      .list({ status: 'published', limit: 50, sort: 'order' })
      .then(({ items }) => {
        if (!active || !items?.length) return;
        setProjects(
          items.map(project => ({
            id: project._id,
            img: project.images?.[0]?.url || '',
            title: project.title,
            description: project.description || '',
            link: project.repoUrl || project.liveUrl || '#',
            liveUrl: project.liveUrl || '',
            repoUrl: project.repoUrl || '',
            category: project.category || 'Other',
            video: project.video?.url || '',
            videoUrl: project.videoUrl || '',
            customLinks: project.customLinks || [],
          })),
        );
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [slug, identity.useBundledContent]);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map(p => p.category)))],
    [projects],
  );

  if (!projects.length) return null;

  const filtered =
    filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const videoEmbed = selected
    ? selected.video
      ? { type: 'file', src: selected.video }
      : getVideoEmbed(selected.videoUrl)
    : null;

  return (
    <>
      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-110 flex items-center justify-center bg-black/85 backdrop-blur-md px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-2xl bg-[#0a101d] rounded-2xl p-5 sm:p-8 border border-cyan-400/25 shadow-[0_20px_60px_rgba(34,211,238,0.2)] relative max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              aria-label="Close modal"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10 cursor-pointer"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2 gap-6 items-start mt-2">
              <div className="rounded-xl overflow-hidden shadow-lg bg-white/5 border border-white/10 min-h-40 flex items-center justify-center">
                {selected.img ? (
                  <img
                    src={selected.img}
                    alt={selected.title}
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm px-6 py-10">
                    No preview image
                  </span>
                )}
              </div>

              <div className="flex flex-col h-full">
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-8 h-px bg-cyan-400/40"></span>
                  {selected.category}
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {selected.title}
                </h3>

                <p className="text-gray-300/90 mt-3 text-sm sm:text-base leading-relaxed">
                  {selected.description ||
                    `A high-performance ${selected.category} project focusing on clean code, responsive design, and seamless user experience.`}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex-1 min-w-[110px]">
                    <p className="text-[10px] text-gray-400 uppercase font-mono">
                      GitHub Repos
                    </p>
                    <p className="text-lg font-bold text-cyan-400">
                      {profile?.public_repos ?? '—'}
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex-1 min-w-[110px]">
                    <p className="text-[10px] text-gray-400 uppercase font-mono">
                      Status
                    </p>
                    <p className="text-lg font-bold text-emerald-400 truncate">
                      Production
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2.5 pt-5 border-t border-white/10">
                  {selected.liveUrl && (
                    <a
                      href={selected.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 px-5 py-2.5 bg-linear-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 rounded-xl font-bold text-center text-sm transition-all shadow-lg shadow-cyan-500/20"
                    >
                      Live Demo
                    </a>
                  )}
                  <a
                    href={selected.repoUrl || selected.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white rounded-xl font-semibold text-center text-sm transition-all"
                  >
                    View Repository
                  </a>
                  {Array.isArray(selected.customLinks) &&
                    selected.customLinks.map((cl, idx) =>
                      cl?.url ? (
                        <a
                          key={idx}
                          href={cl.url}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-300 rounded-xl text-sm font-medium transition-colors"
                        >
                          {cl.label || 'Link'}
                        </a>
                      ) : null,
                    )}
                </div>
              </div>
            </div>

            {videoEmbed && (
              <div className="mt-6">
                <p className="text-[10px] text-gray-400 uppercase font-mono mb-2">
                  Project Video
                </p>
                <div className="rounded-xl overflow-hidden border border-white/10 bg-black aspect-video">
                  {videoEmbed.type === 'iframe' ? (
                    <iframe
                      src={videoEmbed.src}
                      title={`${selected.title} video`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={videoEmbed.src}
                      controls
                      className="w-full h-full"
                    />
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Projects Section with 3D Starfield & Horizon Grid Background */}
      <section
        id="projects"
        className="relative py-24 bg-linear-to-b from-black via-[#040914] to-black text-white overflow-hidden"
      >
        {/* 3D Starfield Particle Layer */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(1.5px 1.5px at 20px 30px, #22d3ee, transparent), radial-gradient(1.5px 1.5px at 90px 140px, #60a5fa, transparent), radial-gradient(2px 2px at 180px 70px, #a855f7, transparent)',
            backgroundSize: '220px 220px',
          }}
        />

        {/* 3D Perspective Floor Plane */}
        <div
          className="absolute inset-x-0 bottom-0 h-80 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(56,189,248,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.22) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            transform: 'perspective(550px) rotateX(62deg) scale(1.5)',
            transformOrigin: 'center bottom',
          }}
        />

        {/* Animated Ambient Light Orbs */}
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.12, 0.25, 0.12] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className="absolute top-12 right-0 w-[460px] h-[460px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.12, 0.22, 0.12] }}
          transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
          className="absolute bottom-12 left-0 w-[440px] h-[440px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none"
        />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-12 tracking-wide"
          >
            My{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600 animate-pulse">
              Projects
            </span>
          </motion.h2>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center gap-2 sm:gap-3 mb-10 flex-wrap"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full transition-all text-xs sm:text-sm font-semibold border cursor-pointer ${
                  filter === cat
                    ? 'bg-linear-to-r from-cyan-400 to-blue-500 text-slate-950 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.35)]'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:border-cyan-400/40 hover:bg-white/10'
                }`}
                aria-pressed={filter === cat}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* 3D Showcase Slider */}
          <ProjectsSlider projects={filtered} onSelectProject={setSelected} />

          {/* Interaction Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center text-gray-400 mt-10 text-xs sm:text-sm tracking-wide"
          >
            Drag side-to-side, click any card to preview, or use keyboard arrows
            ← →
          </motion.p>
        </div>
      </section>
    </>
  );
};

export default Projects;
