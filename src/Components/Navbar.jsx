import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${
          shrink
            ? 'py-3 bg-black/60 backdrop-blur-2xl border-b border-white/5 shadow-2xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* LOGO */}
          <div className="relative group">
            <img
              src={logo}
              alt="logo"
              onClick={() => scrollTo('home')}
              className="w-[140px] sm:w-[170px] md:w-[200px] cursor-pointer transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></div>
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden lg:flex items-center gap-8 text-[15px] text-white/90 font-medium">
            {navItems.map(item => (
              <li key={item.id} className="relative">
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`${
                    active === item.id ? 'text-cyan-400' : 'hover:text-cyan-400'
                  } transition-colors duration-300 tracking-wider`}
                >
                  {item.label}
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 -bottom-1 w-full h-[2px] bg-cyan-400 rounded-full"
                    />
                  )}
                </button>
              </li>
            ))}

            {/* RESUME */}
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-6 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-cyan-400/50 transition-all duration-300 hover:-translate-y-0.5"
            >
              Resume
            </a>
          </ul>

          {/* MOBILE MENU BUTTON & TABLET MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden relative z-50 p-2 text-white hover:text-cyan-400 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="text-3xl">
              {open ? <HiX /> : <HiMenu />}
            </div>
          </button>
        </div>

        {/* MOBILE MENU - FULL SCREEN OVERLAY */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-0 h-screen w-full bg-[#020617]/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center pt-20"
            >
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]"></div>
              </div>

              <ul className="flex flex-col items-center gap-8 text-white relative z-10">
                {navItems.map((item, idx) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <button
                      onClick={() => scrollTo(item.id)}
                      className={`text-2xl font-bold tracking-tight ${
                        active === item.id ? 'text-cyan-400' : 'text-white/70'
                      } hover:text-cyan-400 transition-colors`}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}

                <motion.li
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  className="mt-6"
                >
                  <a
                    href={resumePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-4 bg-linear-to-r from-cyan-500 to-blue-600 text-black font-extrabold rounded-full shadow-[0_0_30px_rgba(34,211,238,0.4)]"
                  >
                    Download Resume
                  </a>
                </motion.li>
              </ul>
              
              <div className="mt-20 flex gap-6 relative z-10">
                {/* Social icons placeholder for mobile menu */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
