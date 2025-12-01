import React from 'react'
import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, onOpen, repoStats }) => {
  const ref = useRef(null);
  function handleMouseMove(e) {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx; // -1 .. 1
    const dy = (y - cy) / cy;
    const rx = -dy * 8; // rotateX
    const ry = dx * 8; // rotateY
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
    el.style.boxShadow = `${-ry * 2}px ${rx * 2}px 20px rgba(2,6,23,0.6)`;
  }
  function handleMouseLeave() {
    const el = ref.current;
    el.style.transform = '';
    el.style.boxShadow = '';
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.35 }}
      onClick={() => onOpen(project)}
    >
      <div className="relative">
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-3 left-3 bg-blue-600 text-xs px-2 py-1 rounded-md font-medium">
          {project.category || 'Uncategorized'}
        </span>
      </div>
      <div className="p-4">
        <h4 className="font-semibold">{project.title}</h4>
        <p className="text-sm text-slate-300 mt-2 line-clamp-2">
          {project.description || 'Project description here.'}
        </p>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <div className="flex gap-3 items-center">
            {repoStats ? (
              <>
                <span>⭐ {repoStats.stars}</span>
                <span>🍴 {repoStats.forks}</span>
              </>
            ) : (
              <span>—</span>
            )}
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()} // so clicking link doesn't open modal
            className="underline"
          >
            Code / Live
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard