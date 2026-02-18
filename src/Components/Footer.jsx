import React from 'react';
import {FaArrowUp } from 'react-icons/fa';
import logo from '../assets/logo.png'
import { BsTwitterX } from 'react-icons/bs';
import { FiFacebook, FiGithub, FiInstagram} from 'react-icons/fi';
import { SlSocialLinkedin } from 'react-icons/sl';

const Footer = () => {
  return (
    <>
      <footer className="relative bg-[#020B15] text-white py-12 md:py-8 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-tr from-cyan-500/10 to-blue-500/10 blur-3xl animate-pulse"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6">
            <a href="#home" className="transition-transform hover:scale-105">
              <img src={logo} alt="logo" className="w-[160px] sm:w-[180px] lg:w-[210px]" />
            </a>
            <div className="flex items-center gap-6 text-2xl">
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
          </div>

          <div className="w-full h-px bg-white/10 my-8"></div>

          <p className="text-center text-white/50 text-sm sm:text-base tracking-wide animate-fadeIn">
            © 2025 Saker Ahmed Hridoy. <span className='block sm:inline mt-1 sm:mt-0'>All Rights Reserved.</span>
          </p>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed md:absolute right-6 bottom-6 sm:bottom-8 bg-cyan-400 hover:bg-cyan-600 text-black p-3 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300 hover:scale-110 z-50 overflow-hidden"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={18} />
        </button>
      </footer>
    </>
  );
};

export default Footer;
