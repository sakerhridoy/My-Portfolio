import React from 'react';
import logo from '../assets/logo.png';
import resumePdf from '../assets/SakerAhmedHridoy_Full-stackWebDeveloper_CreativeIT.pdf';

const Navbar = () => {
  return (
    <>
      <nav className="fixed top-0 w-full bg-[#072135]/70 backdrop-blur-md shadow z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-2">
          <img src={logo} alt="logo" className="w-[210px]" />
          <ul className="flex gap-6 text-white text-sm justify-end">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#plans">Plans</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a
                href={resumePdf} // Use the imported variable here!
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-md font-semibold shadow-lg transition"
              >
                Resume
              </a>
            </li>{' '}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
