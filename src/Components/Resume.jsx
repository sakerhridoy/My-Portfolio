import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Download } from 'lucide-react';
import api from '../admin/api';
import { useSite } from '../site/SiteContext';
import { triggerResumeDownload } from '../utils/downloadHelper';

const FALLBACK_EXPERIENCE = [
  {
    title: 'Frontend Developer',
    period: '2024 - Present',
    description:
      'Building sleek and high-performance web pages with React, Tailwind, Next.js, Framer Motion.',
  },
  {
    title: 'Management Information System',
    period: '2022 - 2024',
    description:
      'Skilled in Excel-based data handling, PowerPoint presentation design, and data analysis for meaningful business insights.',
  },
];

const FALLBACK_EDUCATION = [
  {
    title: 'BBA in Political Science',
    period: '2016 - 2021',
    description:
      'Developed strong understanding of political systems, public policy, international relations, and governance.',
  },
  {
    title: 'Web Development Course',
    period: '2025 - Running',
    description:
      'Gained hands-on skills in front-end and back-end development, building responsive websites, APIs, and full-stack web applications.',
  },
];

const FALLBACK_STATS = [
  {
    label: 'Projects',
    value: '20+',
    description: 'Delivered high-quality web applications.',
  },
  {
    label: 'Awards',
    value: '0+',
    description: 'Recognized for design & frontend innovation.',
  },
  {
    label: 'Clients',
    value: '2+',
    description: 'Worked with clients worldwide.',
  },
];

const Resume = () => {
  const { slug, identity } = useSite();
  const bundled = identity.useBundledContent;
  const isSumaiya = window.location.pathname.toLowerCase().includes('sumaiya');

  const handleResumeClick = (url) => {
    if (!url) return;
    const fileName = isSumaiya ? 'Sumaiya_Tazeen_Resume.pdf' : `${identity.siteName || 'Portfolio'}_Resume.pdf`;
    const downloadUrl = `${url}?t=${Date.now()}`;
    triggerResumeDownload(downloadUrl, fileName);
  };

  const [experience, setExperience] = useState(bundled ? FALLBACK_EXPERIENCE : []);
  const [education, setEducation] = useState(bundled ? FALLBACK_EDUCATION : []);
  const [stats, setStats] = useState(bundled ? FALLBACK_STATS : []);
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    let active = true;
    setExperience(bundled ? FALLBACK_EXPERIENCE : []);
    setEducation(bundled ? FALLBACK_EDUCATION : []);
    setStats(bundled ? FALLBACK_STATS : []);
    setResumeFile(null);
    api.resume
      .get()
      .then(data => {
        if (!active || !data) return;
        if (Array.isArray(data.experience) && data.experience.length) {
          setExperience(data.experience);
        }
        if (Array.isArray(data.education) && data.education.length) {
          setEducation(data.education);
        }
        if (Array.isArray(data.stats) && data.stats.length) {
          setStats(data.stats);
        }
        if (data.resumeFile?.url) {
          setResumeFile(data.resumeFile);
        }
      })
      .catch(() => {
        // keep the bundled fallback content
      });
    return () => {
      active = false;
    };
  }, [slug, bundled]);

  if (!experience.length && !education.length && !stats.length && !resumeFile?.url) return null;

  return (
    <section
      id="resume"
      className="py-24 bg-black text-white relative overflow-hidden"
    >
      <div className="container max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-wide">
            My{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
              Resume
            </span>
          </h2>
          <p className="text-gray-400 mt-3 text-base sm:text-lg">
            A quick overview of my experience, education & achievements.
          </p>
          {resumeFile?.url && (
            <button
              onClick={() => handleResumeClick(resumeFile.url)}
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-linear-to-r from-cyan-400 to-blue-600 text-black font-bold hover:opacity-90 transition-opacity"
            >
              <Download size={18} />
              Download Resume
            </button>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-3">
              <Briefcase className="text-cyan-400" size={24} />
              Experience
            </h3>

            {experience.map((item, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-5 sm:p-6 border border-white/10 shadow-xl"
              >
                <h4 className="text-lg sm:text-xl font-semibold">{item.title}</h4>
                <p className="text-cyan-400 font-medium text-sm sm:text-base">{item.period}</p>
                <p className="text-gray-300 mt-2 text-sm sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8 mt-10 md:mt-0"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-3">
              <GraduationCap className="text-cyan-400" size={24} />
              Education
            </h3>

            {education.map((item, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-5 sm:p-6 border border-white/10 shadow-xl"
              >
                <h4 className="text-lg sm:text-xl font-semibold">{item.title}</h4>
                <p className="text-cyan-400 font-medium text-sm sm:text-base">{item.period}</p>
                <p className="text-gray-300 mt-2 text-sm sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-20"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3">
            <Award className="text-cyan-400" size={24} />
            Achievements
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`glass p-5 sm:p-6 rounded-2xl text-center border border-white/10${
                  index === stats.length - 1 ? ' sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <h4 className="text-lg sm:text-xl font-semibold">
                  {[stat.value, stat.label].filter(Boolean).join(' ')}
                </h4>
                <p className="text-gray-300 mt-2 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
