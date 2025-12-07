import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaCodeBranch, FaBook, FaGitAlt } from 'react-icons/fa';
import { FiGithub } from 'react-icons/fi';
import useGithubData from './useGithubData';

const GitHubActivity = () => {
  const { profile, repos, loading, error } = useGithubData('sakerhridoy');

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  // Recent 6 updated repos
  const recentRepos = repos.slice(0, 6);

  // Fake 7×20 grid to simulate contribution graph
  const grid = React.useMemo(
    () =>
      Array.from({ length: 7 }).map(() =>
        Array.from({ length: 20 }).map(
          () => `bg-[rgba(0,255,200,${Math.random().toFixed(2)})]`
        )
      ),
    []
  );

  return (
    <section className="py-24 bg-black text-white" id="github">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-6xl font-extrabold text-center mb-16"
        >
          GitHub <span className="text-cyan-400">Activity</span>
        </motion.h2>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-400">
            Fetching GitHub activity...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-400 text-lg mt-4">{error}</p>
        )}

        {/* Profile Stats */}
        {profile && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto glassmorphism p-8 rounded-2xl backdrop-blur-lg shadow-xl border border-[#1c1c1c]"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src={profile.avatar_url}
                alt="profile"
                className="w-32 h-32 rounded-full border-2 border-cyan-400 shadow-lg"
              />

              <div>
                <h3 className="text-3xl font-bold">{profile.name}</h3>
                <p className="text-gray-400">@{profile.login}</p>
                <p className="mt-3 text-gray-300">{profile.bio}</p>

                <div className="flex flex-wrap gap-5 mt-5 text-gray-300">
                  <span className="flex items-center gap-2">
                    <FaBook className="text-cyan-400" /> Repos:{' '}
                    {profile.public_repos}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaGitAlt className="text-cyan-400" /> Followers:{' '}
                    {profile.followers}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaCodeBranch className="text-cyan-400" /> Following:{' '}
                    {profile.following}
                  </span>
                </div>

                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-5 px-5 py-2 rounded-full bg-cyan-500 hover:bg-cyan-600 transition"
                >
                  <FiGithub /> View GitHub Profile
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Contribution Grid */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-semibold mb-6">Contribution Activity</h3>

          <div className="overflow-x-auto py-4">
            <div className="grid grid-cols-20 gap-1">
              {grid.map((col, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-1">
                  {col.map((shade, rowIdx) => (
                    <div
                      key={rowIdx}
                      className={`w-4 h-4 rounded-sm ${shade}`}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Repos */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-semibold mb-8">Recent Projects</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentRepos.map(repo => (
              <motion.div
                key={repo.id}
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="glassmorphism p-6 rounded-xl border border-gray-700 hover:border-cyan-400 transition cursor-pointer backdrop-blur-xl"
              >
                <h4 className="text-xl font-semibold mb-2">{repo.name}</h4>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {repo.description || 'No description available.'}
                </p>

                <div className="flex justify-between items-center text-gray-300 mt-3">
                  <span className="flex items-center gap-2">
                    <FaStar className="text-yellow-400" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaCodeBranch className="text-cyan-400" />
                    {repo.forks_count}
                  </span>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 underline"
                  >
                    Visit Repo
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubActivity;
