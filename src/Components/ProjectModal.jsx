import React from 'react'
import { motion } from 'framer-motion';

const ProjectModal = ({ project, onClose }) => {
   if (!project) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative z-10 max-w-3xl w-full mx-4 bg-gray-900 rounded-lg overflow-hidden"
      >
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-80 object-cover"
            />
          </div>
          <div className="p-6 md:w-1/2">
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <p className="text-slate-300 mt-3">
              {project.description || 'No description provided.'}
            </p>

            <div className="mt-4 flex flex-wrap gap-2.5">
              {(project.liveLink || project.liveUrl) && (
                <a
                  href={project.liveLink || project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded text-sm transition-colors"
                >
                  Live Preview
                </a>
              )}
              {(project.githubLink || project.repoUrl) && (
                <a
                  href={project.githubLink || project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm transition-colors"
                >
                  GitHub Code
                </a>
              )}
              {(project.youtubeLink || project.videoUrl) && (
                <a
                  href={project.youtubeLink || project.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded text-sm transition-colors"
                >
                  YouTube Demo
                </a>
              )}
              {project.facebookLink && (
                <a
                  href={project.facebookLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm transition-colors"
                >
                  Facebook
                </a>
              )}
              {Array.isArray(project.customLinks) &&
                project.customLinks.map((cl, idx) =>
                  cl.url ? (
                    <a
                      key={idx}
                      href={cl.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-sm transition-colors"
                    >
                      {cl.label || 'Link'}
                    </a>
                  ) : null
                )}
              {!project.liveLink &&
                !project.liveUrl &&
                !project.githubLink &&
                !project.repoUrl &&
                !project.youtubeLink &&
                !project.videoUrl &&
                !project.facebookLink &&
                (!project.customLinks || project.customLinks.length === 0) &&
                project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-blue-600 rounded text-sm"
                  >
                    Open Repo / Live
                  </a>
                )}
              <button
                onClick={onClose}
                className="px-4 py-2 border border-white/20 text-gray-300 hover:text-white rounded text-sm"
              >
                Close
              </button>
            </div>

            {project.extra && (
              <div className="mt-4 text-sm text-slate-400">
                <strong>Note: </strong>
                {project.extra}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal