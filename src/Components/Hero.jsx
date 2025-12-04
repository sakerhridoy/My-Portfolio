import React from 'react';
import Hero3D from './Hero3D';
import useGithubData from './useGithubData';
import HeroBackground from './HeroBackground';
import { BsTwitterX } from 'react-icons/bs';
import { FiFacebook, FiGithub, FiInstagram } from 'react-icons/fi';
import { SlSocialLinkedin } from 'react-icons/sl';
import PremiumSmall3D from './PremiumSmall3D';
import GlowBall from './GlowBall';
import { motion } from 'framer-motion';
import TechLogo3D from './TechLogo3D';
import profilePic from '../assets/profile.png';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiHtml5,
  SiCss3,
} from 'react-icons/si';

const Hero = () => {
  const { profile, loading } = useGithubData('sakerhridoy');
  return (
    <section
      id="home"
      className="relative w-full min-h-screen bg-linear-to-br from-[#020617] via-[#0c1b33] to-[#041022] overflow-hidden"
    >
      {/*BACKGROUND LAYER (stays behind everything) */}
      <HeroBackground />
      {/*GLOW BALL + FLOATING 3D OBJECTS (also behind text) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {/* Glow Balls */}
        <GlowBall size="300px" color="cyan" top="10%" left="70%" />
        <GlowBall size="250px" color="purple" top="50%" left="20%" />
        <GlowBall size="200px" color="blue" top="75%" left="55%" />
        <GlowBall size="280px" color="#00ffff" top="25%" left="40%" />

        {/* Floating 3D Small Objects */}
        <PremiumSmall3D
          size="140px"
          opacity={0.35}
          initialX="10%"
          initialY="20%"
          floatDelay="0s"
        />
        <PremiumSmall3D
          size="110px"
          opacity={0.3}
          initialX="30%"
          initialY="60%"
          floatDelay="1s"
        />
        <PremiumSmall3D
          size="160px"
          opacity={0.4}
          initialX="70%"
          initialY="40%"
          floatDelay="0.5s"
        />
        <PremiumSmall3D
          size="120px"
          opacity={0.33}
          initialX="55%"
          initialY="75%"
          floatDelay="1.4s"
        />
        <PremiumSmall3D
          size="130px"
          opacity={0.37}
          initialX="15%"
          initialY="80%"
          floatDelay="0.7s"
        />
      </div>
      {/* 3D TECH LOGO */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        {/* Floating Tech Logos */}
        <TechLogo3D
          icon={<SiReact />}
          size="140px"
          opacity={0.35}
          initialX="10%"
          initialY="20%"
          floatDelay="0s"
        />
        <TechLogo3D
          icon={<SiNextdotjs />}
          size="110px"
          opacity={0.3}
          initialX="30%"
          initialY="60%"
          floatDelay="1s"
        />
        <TechLogo3D
          icon={<SiTailwindcss />}
          size="160px"
          opacity={0.4}
          initialX="70%"
          initialY="40%"
          floatDelay="0.5s"
        />
        <TechLogo3D
          icon={<SiRedux />}
          size="120px"
          opacity={0.33}
          initialX="55%"
          initialY="75%"
          floatDelay="1.4s"
        />
        <TechLogo3D
          icon={<SiHtml5 />}
          size="130px"
          opacity={0.37}
          initialX="15%"
          initialY="80%"
          floatDelay="0.7s"
        />
        <TechLogo3D
          icon={<SiCss3 />}
          size="125px"
          opacity={0.36}
          initialX="40%"
          initialY="30%"
          floatDelay="0.9s"
        />
      </div>
      {/* MAIN CONTENT ABOVE BACKGROUND */}
      <div className="container mx-auto px-6 lg:px-12 py-24 md:pt-40 h-full relative z-20">
        <div className="grid md:grid-cols-2 items-center h-full gap-10 md:gap-0 lg:gap-10">
          {' '}
          {/* TEXT SECTION */}
          <motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
            className="text-white space-y-6 z-20">
            <h1 className="text-5xl sm:text-7xl md:text-[50px] lg:text-6xl font-bold leading-tight">
              Hi, I'm
              <span className="text-cyan-400">
                {' '}
                {loading ? 'Loading...' : profile?.name || 'Saker Ahmed Hridoy'}
              </span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-md">
              {loading
                ? 'Loading information...'
                : profile?.bio ||
                  'Aspiring Frontend Developer | I create modern, smooth, animated & fully responsive websites using React, Tailwind CSS, and AI.'}
            </p>

            {/* GITHUB STATS */}
            {!loading && profile && (
              <div className="flex gap-5 text-gray-300 pt-2">
                <p>Followers: {profile.followers}</p>
                <p>Following: {profile.following}</p>
                <p>Projects: {profile.public_repos}</p>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <a
                href="#contact"
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-md font-semibold shadow-lg transition"
              >
                Hire Me
              </a>

              <a
                href="#projects"
                className="px-6 py-3 border border-cyan-400 hover:bg-cyan-700 rounded-md font-semibold transition"
              >
                My Projects
              </a>
            </div>

            {/* SOCIAL LINKS */}
            <div className="flex items-center gap-5 pt-6 text-xl">
              <a
                className="hover:text-cyan-400 transition"
                href="https://www.facebook.com/sakerhridoy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiFacebook />
              </a>
              <a
                className="hover:text-cyan-400 transition"
                href="https://github.com/sakerhridoy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub />
              </a>
              <a
                className="hover:text-cyan-400 transition"
                href="https://www.linkedin.com/in/sakerhridoy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SlSocialLinkedin />
              </a>
              <a
                className="hover:text-cyan-400 transition"
                href="https://www.instagram.com/imsakerhridoy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiInstagram />
              </a>
              <a
                className="hover:text-cyan-400 transition"
                href="https://x.com/imsakerhridoy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsTwitterX />
              </a>
            </div>
          </motion.div>
          {/* RIGHT SECTION: PROFILE + MAIN 3D */}
          <div className="relative flex justify-center md:justify-end items-center z-20">
            {/* PROFILE IMAGE */}
            <div className="relative z-20">
              <div
                
                className="
                  w-[260px] md:w-[330px] lg:w-[400px]
                  aspect-square rounded-full
                  bg-linear-to-br from-cyan-500 via-blue-600 to-purple-700
                  p-1 shadow-[0_8px_30px_rgba(0,0,0,0.4)]
                  animate-floating
                "
              >
                <div
                  className="
                    w-full h-full rounded-full
                    bg-[#020617]/70 backdrop-blur-xl
                    flex items-center justify-center
                    overflow-hidden relative
                  "
                >
                  <img
                    // src={profile?.avatar_url}
                    src={profilePic}
                    alt="profile-photo"
                    className="
                      w-[90%] h-[90%] object-cover
                      rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)]
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* BOTTOM SHADOW GRADIENT */}
      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black/40 to-transparent"></div>{' '}
    </section>
  );
};

export default Hero;
