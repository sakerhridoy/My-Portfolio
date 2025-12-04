import React from 'react';
import {FaArrowUp } from 'react-icons/fa';
import logo from '../assets/logo.png'
import { BsTwitterX } from 'react-icons/bs';
import { FiFacebook, FiGithub, FiInstagram} from 'react-icons/fi';
import { SlSocialLinkedin } from 'react-icons/sl';

const Footer = () => {
  return (
    <>
      <footer className="relative bg-[#020B15] text-white py-6 overflow-hidden">
        {/* Background Glow Animation */}
        <div className="absolute inset-0 bg-linear-to-tr from-cyan-500/10 to-blue-500/10 blur-3xl animate-pulse"></div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Brand */}
            <a href="#home">
              <img src={logo} alt="logo" className="w-[180px] lg:w-[210px]" />
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-5 text-xl">
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

          {/* Divider */}
          <div className="w-full h-px bg-white/10 my-8"></div>

          {/* Copyright */}
          <p className="text-center text-white/50 tracking-wide animate-fadeIn">
            © 2025 Saker Ahmed Hridoy. All Rights Reserved.
          </p>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute right-6 bottom-6 bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <FaArrowUp size={20} />
        </button>
      </footer>
    </>
  );
};

export default Footer;
