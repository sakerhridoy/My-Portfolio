import React from 'react';
import Hero3D from './Hero3D';
import profile from '../assets/profile.png';
import { FiFacebook } from 'react-icons/fi';
import { FiGithub } from 'react-icons/fi';
import { SlSocialLinkedin } from 'react-icons/sl';
import { FiInstagram } from 'react-icons/fi';
import { FiTwitter } from 'react-icons/fi';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen bg-linear-to-br from-[#020617] via-[#0c1b33] to-[#041022] overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-24 h-full">
        <div className="grid md:grid-cols-2 items-center h-full gap-10">
          {/* Text Section */}
          <div className="text-white space-y-6 z-10">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Hi, I'm <span className="text-cyan-400">Saker Ahmed Hridoy</span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-md">
              Aspiring Frontend Web Developer | AI & Web Solutions Enthusiast |
              Lifelong Learner . {'   '}I create modern, smooth, animated &
              fully responsive websites using React, Tailwind CSS, and
              Artificial Intelligent.
            </p>

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

            {/* Social Links */}
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
                <FiTwitter />
              </a>
            </div>
          </div>

          {/* Right Section: Profile + 3D */}
          <div className="relative flex justify-center md:justify-end items-center">
            {/* Profile Image Shape */}
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
                    src={profile}
                    alt="profile-photo"
                    className="
                      w-[90%] h-[90%] object-cover
                      rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)]
                    "
                  />
                </div>
              </div>
            </div>

            {/* 3D Model */}
            <div className="absolute w-full h-[350px] md:h-[500px] lg:h-[600px] bottom-0 right-0 opacity-70">
              <Hero3D />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Shadow */}
      <div className="absolute bottom-0 w-full h-20 bg-linear-to-t from-black/40 to-transparent"></div>
    </section>
  );
};

export default Hero;
