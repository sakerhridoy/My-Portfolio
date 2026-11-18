import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSite } from '../site/SiteContext';
import SocialLinks from './SocialLinks';
import AboutScene from './Three/Scenes/AboutScene';

const About = () => {
  const { identity, profileData, settings } = useSite();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const socials =
    settings?.socials || identity?.socials || profileData?.socials || {};
  const hasSocials = Object.values(socials).some(
    v => typeof v === 'string' && v.trim(),
  );

  const socialLinks =
    settings?.socialLinks?.length > 0
      ? settings.socialLinks
      : identity?.socialLinks?.length > 0
        ? identity.socialLinks
        : profileData?.socialLinks || [];
  const hasSocialLinks = socialLinks.some(s => s?.url?.trim());

  const aboutCards =
    settings?.aboutCards?.length > 0
      ? settings.aboutCards
      : identity?.aboutCards?.length > 0
        ? identity.aboutCards
        : identity?.settings?.aboutCards?.length > 0
          ? identity.settings.aboutCards
          : identity?.stats || [];

  return (
    <section
      id="about"
      className="relative py-14 md:py-20 bg-linear-to-b from-black via-gray-800 to-black text-white overflow-hidden"
      onMouseMove={e => {
        setMousePos({
          x: e.clientX,
          y: e.clientY,
        });
      }}
    >
      {/* 3D Scene Wrapper */}
      <div className="absolute inset-0 w-full h-full opacity-60 pointer-events-none">
        <AboutScene />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-20">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.05 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-12 sm:mb-16 tracking-wide"
        >
          About{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600 animate-pulse">
            Me
          </span>
        </motion.h2>

        {/* Full-Width Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.05 }}
          className="max-w-full mx-auto border border-white/10 hover:border-cyan-400/40 rounded-2xl backdrop-blur-sm p-6 sm:p-10 md:p-12 text-center"
        >
          <h3 className="text-3xl sm:text-4xl font-semibold mb-5">
            I'm <span className="text-cyan-400">{identity?.heroTitle}</span>
          </h3>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            {identity?.aboutShort ? (
              identity.aboutShort
            ) : (
              <>
                A passionate{' '}
                <span className="text-cyan-400 font-medium">
                  {identity?.roleLabel}
                </span>{' '}
                {identity?.aboutBody}
              </>
            )}
          </p>

          {identity?.aboutExtra && !identity?.aboutShort && (
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mt-4 max-w-3xl mx-auto">
              {identity.aboutExtra}
            </p>
          )}

          {/* Highlight Cards Grid */}
          {aboutCards.length > 0 && (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {aboutCards.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`p-4 sm:p-6 bg-[#0d1324]/80 rounded-xl border border-white/10 hover:bg-black/50 transition ${
                    index === 2 && aboutCards.length === 3
                      ? 'col-span-2 sm:col-span-1'
                      : ''
                  }`}
                >
                  <h4 className="text-2xl sm:text-3xl font-bold text-cyan-400">
                    {item.count || item.title}
                  </h4>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    {item.subtitle || item.title}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Contact Me Button & Social Links */}
          <div className="mt-8 flex flex-col items-center gap-6">
            <motion.a
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.92 }}
              href="#contact"
              className="inline-block px-8 sm:px-10 py-3 bg-cyan-400 hover:bg-cyan-500 text-white font-semibold rounded-xl shadow-lg transition cursor-pointer"
            >
              Contact Me
            </motion.a>

            {(hasSocials || hasSocialLinks) && (
              <div className="w-full pt-5 border-t border-white/10">
                <SocialLinks
                  socials={socials}
                  socialLinks={socialLinks}
                  className="flex items-center justify-center gap-5 text-xl text-gray-400"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
