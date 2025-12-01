import React, { useState } from 'react';
import logo from '../assets/logo.png';
import ScrollSpy from 'react-scrollspy-navigation';
import resumePdf from '../assets/SakerAhmedHridoy_Full-stackWebDeveloper_CreativeIT.pdf';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ScrollSpy activeClass="nav-active">
        <nav className="fixed top-0 w-full bg-[#072135]/70 backdrop-blur-md shadow z-50">
          <div className="container mx-auto flex justify-between items-center py-4 px-4">
            {/* LOGO */}
            <img src={logo} alt="logo" className="w-[180px] lg:w-[210px]" />

            {/* Hamburger for Mobile */}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              className="text-white md:hidden text-3xl cursor-pointer bg-transparent border-none"
              onClick={() => setOpen(!open)}
            >
              {open ? <HiX /> : <HiMenu />}
            </button>
            {/* NAV ITEMS */}
            <ul
              className={`md:flex md:items-center md:static absolute left-0 w-full bg-[#072135] md:bg-transparent md:w-auto transition-all duration-400 ease-in-out text-center py-21 md:py-0 ${
                open
                  ? 'top-[70px] opacity-100'
                  : 'top-[-500px] opacity-0 md:opacity-100'
              }`}
            >
              <li className="mx-4 lg:mx-5 my-4 md:my-0">
                <a
                  href="#home"
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-cyan-400"
                >
                  Home
                </a>
              </li>

              <li className="mx-4 lg:mx-5 my-4 md:my-0">
                <a
                  href="#services"
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-cyan-400"
                >
                  Services
                </a>
              </li>

              <li className="mx-4 lg:mx-5 my-4 md:my-0">
                <a
                  href="#projects"
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-cyan-400"
                >
                  Projects
                </a>
              </li>

              <li className="mx-4 lg:mx-5 my-4 md:my-0">
                <a
                  href="#plans"
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-cyan-400"
                >
                  Plans
                </a>
              </li>

              <li className="mx-4 lg:mx-5 my-4 md:my-0">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-cyan-400"
                >
                  Contact
                </a>
              </li>

              {/* Resume Button */}
              <li className="mx-5 pt-4 md:pt-0 md:my-0">
                <a
                  href={resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 text-white bg-cyan-500 hover:bg-cyan-600 rounded-md font-semibold shadow-lg transition inline-block"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </ScrollSpy>
    </>
  );
};

export default Navbar;
