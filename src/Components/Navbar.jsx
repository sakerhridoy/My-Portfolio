import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { FaRobot } from 'react-icons/fa';
import logo from '../assets/logo.png';
import resumePdf from '../assets/SakerAhmedHridoy_Full-stackWebDeveloper_CreativeIT.pdf';

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'Plans', id: 'plans' },
  { label: 'Contact', id: 'contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [shrink, setShrink] = useState(false);
  const [dark, setDark] = useState(true);

  /* ================= Scroll Spy ================= */
  useEffect(() => {
    const onScroll = () => {
      setShrink(window.scrollY > 80);
      navItems.forEach(item => {
        const section = document.getElementById(item.id);
        if (section) {
          const top = section.offsetTop - 150;
          const height = section.offsetHeight;
          if (window.scrollY >= top && window.scrollY < top + height) {
            setActive(item.id);
          }
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ================= Dark Mode ================= */
  // useEffect(() => {
  //   document.documentElement.classList.toggle('dark', dark);
  // }, [dark]);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          shrink
            ? 'py-3 bg-white/10 dark:bg-black/40 backdrop-blur-xl shadow-lg'
            : 'py-5 bg-white/5 dark:bg-black/20 backdrop-blur-md'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* LOGO */}
          <img
            src={logo}
            alt="logo"
            onClick={() => scrollTo('home')}
            className="w-[170px] md:w-[200px] cursor-pointer"
          />

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-8 text-white font-medium">
            {navItems.map(item => (
              <li key={item.id} className="relative">
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  onClick={() => scrollTo(item.id)}
                  className={`${
                    active === item.id ? 'text-cyan-400' : 'hover:text-cyan-400'
                  } transition`}
                >
                  {item.label}
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 -bottom-1 w-full h-[2px] bg-cyan-400"
                    />
                  )}
                </motion.button>
              </li>
            ))}

            {/* DARK TOGGLE */}
            {/* <button
              onClick={() => setDark(!dark)}
              className="text-xl hover:text-cyan-400 transition"
            >
              {dark ? <BsSunFill /> : <BsMoonStarsFill />}
            </button> */}

            {/* RESUME */}
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-6 py-2 rounded-md bg-cyan-500 hover:bg-cyan-600 text-black font-semibold shadow-lg transition"
            >
              Resume
            </a>
          </ul>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white text-3xl"
          >
            {open ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <motion.div
          initial={{ y: -300 }}
          animate={{ y: open ? 0 : -300 }}
          transition={{ duration: 0.35 }}
          className="md:hidden absolute w-full bg-black/90 backdrop-blur-xl"
        >
          <ul className="flex flex-col items-center gap-6 py-8 text-white text-lg">
            {navItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`${
                    active === item.id ? 'text-cyan-400' : ''
                  } hover:text-cyan-400`}
                >
                  {item.label}
                </button>
              </li>
            ))}

            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-md shadow"
            >
              Resume
            </a>
          </ul>
        </motion.div>
      </nav>
    </>
  );
};

export default Navbar;
