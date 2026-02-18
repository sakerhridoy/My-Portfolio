import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const AUTOPLAY_DELAY = 3000; 

const ProjectsSlider = ({ projects = [], onSelectProject = () => {} }) => {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [index, setIndex] = useState(0);

  const items = projects.length ? projects : [];

  const getVisibleCount = () => {
    if (!trackRef.current) return 1;
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 768) return 2;
    return 1;
  };

  // scroll to index
  const goTo = useCallback(
    idx => {
      const container = trackRef.current;
      if (!container) return;
      const card = container.querySelector('[data-card]');
      if (!card) return;

      const cardWidth =
        card.getBoundingClientRect().width +
        parseFloat(getComputedStyle(card).marginRight || 16);
      container.scrollTo({
        left: idx * cardWidth,
        behavior: 'smooth',
      });
      setIndex(idx);
    },
    [trackRef]
  );

  // autoplay
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

  // pause autoplay on user interaction
  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;

    const onWheel = () => setAutoplay(false);
    container.addEventListener('wheel', onWheel, { passive: true });
    return () => container.removeEventListener('wheel', onWheel);
  }, []);

  // drag handling (mouse & touch)
  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;
    let pointerDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onPointerDown = e => {
      pointerDown = true;
      setIsDragging(true);
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
      setIsDragging(false);
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // touch fallback
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

  // keyboard support
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
        parseFloat(getComputedStyle(card).marginRight || 16);
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      setIndex(newIndex);
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2 items-center">
          <button
            aria-label="Previous"
            onClick={() => {
              const prev =
                (index - 1 + items.length) % Math.max(1, items.length);
              goTo(prev);
              setAutoplay(false);
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition border border-white/5 active:scale-95"
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
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition border border-white/5 active:scale-95"
          >
            ›
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            aria-label={autoplay ? 'Pause autoplay' : 'Start autoplay'}
            onClick={() => setAutoplay(a => !a)}
            className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition text-xs sm:text-sm font-medium border border-white/5 active:scale-95"
          >
            {autoplay ? 'Pause' : 'Play'}
          </button>

          <div className="text-[10px] sm:text-xs text-gray-400 font-mono tracking-tighter sm:tracking-normal">
            <span className="text-cyan-400">{index + 1}</span> / {items.length}
          </div>
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="overflow-x-auto no-scrollbar scroll-smooth -mx-6 px-6 sm:-mx-8 sm:px-8"
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
        }}
      >
        <div className="flex gap-5 sm:gap-8" style={{ minWidth: 'max-content' }}>
          {items.map((project, i) => (
            <motion.article
              key={project.id}
              data-card
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="w-[260px] sm:w-[320px] md:w-[350px] lg:w-[380px] shrink-0 rounded-2xl border border-white/10 bg-[#0f1a2a]/40 backdrop-blur-xl overflow-hidden cursor-grab flex flex-col group shadow-2xl"
              style={{ scrollSnapAlign: 'start' }}
              onClick={() => onSelectProject(project)}
            >
              <div className="h-40 sm:h-48 overflow-hidden relative">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <span className="text-[10px] sm:text-xs px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 w-fit mb-3">
                  {project.category}
                </span>

                <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                  {project.title}
                </h4>
                
                <p className="text-xs sm:text-sm text-gray-400 mt-2 line-clamp-2 leading-relaxed flex-1">
                  {project.title} • {project.category}
                </p>

                <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[10px] text-gray-500 font-mono">ID: {project.id}</span>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="text-cyan-400 text-sm font-bold flex items-center gap-1.5 hover:gap-2.5 transition-all"
                  >
                    Explore <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="flex gap-2 justify-center mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              goTo(i);
              setAutoplay(false);
            }}
            className={`w-3 h-3 rounded-full ${
              i === index ? 'bg-cyan-400' : 'bg-white/10'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSlider;
