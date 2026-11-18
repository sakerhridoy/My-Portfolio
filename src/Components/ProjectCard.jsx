import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaYoutube, FaFacebook } from 'react-icons/fa';
import { ExternalLink } from 'lucide-react';

const ProjectCard = ({ project, onOpen, repoStats }) => {
  const ref = useRef(null);
  function handleMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx; 
    const dy = (y - cy) / cy;
    const rx = -dy * 8; // rotateX
    const ry = dx * 8; // rotateY
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
    el.style.boxShadow = `${-ry * 2}px ${rx * 2}px 20px rgba(2,6,23,0.6)`;
  }
  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
    el.style.boxShadow = '';
  }

  const hasGithub = Boolean(project.githubLink || project.repoUrl);
  const hasYoutube = Boolean(project.youtubeLink || project.videoUrl);
  const hasFacebook = Boolean(project.facebookLink);
  const hasLive = Boolean(project.liveLink || project.liveUrl || project.link);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer flex flex-col justify-between"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.35 }}
      onClick={() => onOpen(project)}
    >
      <div>
        <div className="relative">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
          <span className="absolute top-3 left-3 bg-blue-600 text-xs px-2 py-1 rounded-md font-medium text-white shadow">
            {project.category || 'Project'}
          </span>
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-lg text-white">{project.title}</h4>
          <p className="text-sm text-slate-300 mt-2 line-clamp-2">
            {project.description || `${project.title} - ${project.category || 'Project'}`}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0">
        <div className="mt-2 flex items-center justify-between text-xs text-slate-400 border-t border-white/5 pt-3">
          <div className="flex items-center gap-2">
            {/* GitHub icon (only if link exists) */}
            {hasGithub && (
              <a
                href={project.githubLink || project.repoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={e => e.stopPropagation()}
                className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                title="GitHub Repository"
              >
                <FaGithub size={14} />
              </a>
            )}

            {/* YouTube icon (only if link exists) */}
            {hasYoutube && (
              <a
                href={project.youtubeLink || project.videoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={e => e.stopPropagation()}
                className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                title="YouTube Video"
              >
                <FaYoutube size={14} />
              </a>
            )}

            {/* Facebook icon (only if link exists) */}
            {hasFacebook && (
              <a
                href={project.facebookLink}
                target="_blank"
                rel="noreferrer"
                onClick={e => e.stopPropagation()}
                className="p-1.5 rounded bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-colors"
                title="Facebook Link"
              >
                <FaFacebook size={14} />
              </a>
            )}

            {/* Custom Links badges (if any) */}
            {Array.isArray(project.customLinks) &&
              project.customLinks.slice(0, 2).map((cl, idx) =>
                cl.url ? (
                  <a
                    key={idx}
                    href={cl.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-[11px] text-cyan-300 transition-colors"
                    title={cl.label}
                  >
                    {cl.label}
                  </a>
                ) : null
              )}
          </div>

          {/* Live / Demo link */}
          {hasLive && (
            <a
              href={project.liveLink || project.liveUrl || project.link}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium"
            >
              <span>Demo</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
