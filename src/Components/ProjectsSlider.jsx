import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers } from 'lucide-react';

const AUTOPLAY_DELAY = 3200;

const ProjectCard = ({ project, index, onSelectProject }) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 10, rotateY: x * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div style={{ perspective: 1100 }} className="shrink-0">
      <motion.article
        data-card
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
        whileHover={{ y: -6 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          type: 'spring',
          stiffness: 240,
          damping: 20,
          delay: Math.min(index * 0.06, 0.3),
        }}
        className="w-[270px] sm:w-[330px] md:w-[360px] lg:w-[390px] h-full rounded-2xl border border-white/10 hover:border-cyan-400/50 
        bg-[#0b1222]/85 backdrop-blur-xl overflow-hidden cursor-pointer flex flex-col group 
        shadow-[0_14px_40px_rgba(0,0,0,0.65)] hover:shadow-[0_20px_55px_rgba(34,211,238,0.2)] transition-colors duration-300"
        style={{ scrollSnapAlign: 'start' }}
        onClick={() => onSelectProject(project)}
      >
        {/* Top Browser-Frame Preview */}
        <div className="p-3 pb-0">
          <div className="h-44 sm:h-52 rounded-xl overflow-hidden relative bg-slate-900 border border-white/10">
            {project.img ? (
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                No Preview
              </div>
            )}

            {/* Gradient Overlay & Floating Category Pill */}
            <div className="absolute inset-0 bg-linear-to-t from-[#0b1222] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-cyan-300 border border-cyan-400/30 shadow">
              <Layers size={11} />
              {project.category}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 sm:p-6 flex flex-col flex-1">
          <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
            {project.title}
          </h4>

          <p className="text-xs sm:text-sm text-gray-400 mt-2 line-clamp-2 leading-relaxed flex-1">
            {project.description ||
              `${project.title} • Built with modern ${project.category} architecture.`}
          </p>

          <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-[11px] text-gray-500 font-mono">
              #{String(index + 1).padStart(2, '0')}
            </span>

            <a
              href={project.liveUrl || project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="text-cyan-400 hover:text-cyan-300 text-sm font-bold flex items-center gap-1.5 group-hover:translate-x-0.5 transition-all"
            >
              Explore <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

const ProjectsSlider = ({ projects = [], onSelectProject = () => {} }) => {
  const trackRef = useRef(null);
  const [autoplay, setAutoplay] = useState(true);
  const [index, setIndex] = useState(0);

  const items = projects.length ? projects : [];

  const goTo = useCallback(idx => {
    const container = trackRef.current;
    if (!container) return;
    const card = container.querySelector('[data-card]');
    if (!card) return;

    const cardWidth =
      card.getBoundingClientRect().width +
      parseFloat(getComputedStyle(card).marginRight || 24);
    container.scrollTo({
      left: idx * cardWidth,
      behavior: 'smooth',
    });
    setIndex(idx);
  }, []);

  useEffect(() => {
    if (!autoplay || items.length <= 1) return;
    const id = setInterval(() => {
      setIndex(i => {
        const next = (i + 1) % Math.max(1, items.length);
        goTo(next);
        return next;
      });
    }, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [autoplay, items.length, goTo]);

  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;
    const onWheel = () => setAutoplay(false);
    container.addEventListener('wheel', onWheel, { passive: true });
    return () => container.removeEventListener('wheel', onWheel);
  }, []);

  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;
    let pointerDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onPointerDown = e => {
      pointerDown = true;
      setAutoplay(false);
      startX = e.pageX ?? e.touches?.[0]?.pageX;
      scrollLeft = container.scrollLeft;
    };

    const onPointerMove = e => {
      if (!pointerDown) return;
      const x = e.pageX ?? e.touches?.[0]?.pageX;
      const walk = startX - x;
      container.scrollLeft = scrollLeft + walk;
    };

    const onPointerUp = () => {
      pointerDown = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    container.addEventListener('touchmove', onPointerMove, { passive: false });
    container.addEventListener('touchend', onPointerUp);

    return () => {
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      container.removeEventListener('touchmove', onPointerMove);
      container.removeEventListener('touchend', onPointerUp);
    };
  }, []);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowRight') {
        const next = (index + 1) % Math.max(1, items.length);
        goTo(next);
        setAutoplay(false);
      } else if (e.key === 'ArrowLeft') {
        const prev = (index - 1 + items.length) % Math.max(1, items.length);
        goTo(prev);
        setAutoplay(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, items.length, goTo]);

  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;
    const onScroll = () => {
      const card = container.querySelector('[data-card]');
      if (!card) return;
      const cardWidth =
        card.getBoundingClientRect().width +
        parseFloat(getComputedStyle(card).marginRight || 24);
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      setIndex(Math.min(newIndex, Math.max(0, items.length - 1)));
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [items.length]);

  return (
    <div className="relative">
      {/* Top Controls */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2.5 items-center">
          <button
            aria-label="Previous"
            onClick={() => {
              const prev =
                (index - 1 + items.length) % Math.max(1, items.length);
              goTo(prev);
              setAutoplay(false);
            }}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 transition-all border border-white/10 hover:border-cyan-400 shadow-lg active:scale-95 cursor-pointer text-lg font-bold"
          >
            ‹
          </button>

          <button
            aria-label="Next"
            onClick={() => {
              const next = (index + 1) % Math.max(1, items.length);
              goTo(next);
              setAutoplay(false);
            }}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 hover:bg-cyan-500 text-cyan-400 hover:text-slate-950 transition-all border border-white/10 hover:border-cyan-400 shadow-lg active:scale-95 cursor-pointer text-lg font-bold"
          >
            ›
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            aria-label={autoplay ? 'Pause autoplay' : 'Start autoplay'}
            onClick={() => setAutoplay(a => !a)}
            className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-200 transition text-xs sm:text-sm font-medium border border-white/10 active:scale-95 cursor-pointer"
          >
            {autoplay ? 'Pause' : 'Play'}
          </button>

          <div className="text-xs text-gray-400 font-mono bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <span className="text-cyan-400 font-bold">{index + 1}</span> /{' '}
            {items.length}
          </div>
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="overflow-x-auto overflow-y-hidden scroll-smooth -mx-6 px-6 sm:-mx-8 sm:px-8 py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
        }}
      >
        <div
          className="flex gap-6 sm:gap-8"
          style={{ minWidth: 'max-content' }}
        >
          {items.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onSelectProject={onSelectProject}
            />
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex gap-2 justify-center mt-6 flex-wrap">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              goTo(i);
              setAutoplay(false);
            }}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${
              i === index
                ? 'w-7 bg-cyan-400'
                : 'w-2.5 bg-white/15 hover:bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSlider;
