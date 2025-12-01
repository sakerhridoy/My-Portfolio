import React from 'react'
import { motion } from 'framer-motion';

const ProjectModal = ({ project, onClose }) => {
   if (!project) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
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

            <div className="mt-4 flex gap-3">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-blue-600 rounded"
              >
                Open Repo / Live
              </a>
              <button onClick={onClose} className="px-4 py-2 border rounded">
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