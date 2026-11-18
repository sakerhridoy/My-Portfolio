import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiSun, HiMoon } from 'react-icons/hi';
import { FiDownload } from 'react-icons/fi';
import logo from '../assets/logo.png';
import resumePdf from '../assets/SakerAhmedHridoy_Full-stackWebDeveloper_CreativeIT.pdf';
import { useSite } from '../site/SiteContext';
import api from '../admin/api';
import { triggerResumeDownload } from '../utils/downloadHelper';

const Navbar = () => {
  const { identity, slug, themeMode, toggleThemeMode } = useSite();
  const activeSlug = slug || 'saker';
  const [resumeUrl, setResumeUrl] = useState(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [shrink, setShrink] = useState(false);
  const [hasProducts, setHasProducts] = useState(false);

  useEffect(() => {
    api.resume.get().then(data => { if (data?.resumeFile?.url) setResumeUrl(data.resumeFile.url); });
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/digital-products/public?slug=${activeSlug}`)
        .then(res => res.json())
        .then(res => setHasProducts((res.products || res.data || []).length > 0));
  }, [activeSlug]);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'Plans', id: 'plans' },
    ...(hasProducts ? [{ label: 'Digital Products', id: 'digital-products' }] : []),
    { label: 'Contact', id: 'contact' },
  ];

  const handleResumeClick = () => {
    const url = resumeUrl || identity.resumeUrl || (identity.useBundledContent ? resumePdf : null);
    if (!url) return;
    triggerResumeDownload(url, 'Resume.pdf');
  };

  useEffect(() => {
    const onScroll = () => {
      setShrink(window.scrollY > 80);
      navItems.forEach(item => {
        const section = document.getElementById(item.id);
        if (section) {
          const top = section.offsetTop - 150;
          const height = section.offsetHeight;
          if (window.scrollY >= top && window.scrollY < top + height) setActive(item.id);
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[1000px] z-50 transition-all duration-500 rounded-2xl border border-[--border-glass] ${shrink ? 'py-3 bg-[--bg-surface]/80 backdrop-blur-2xl shadow-2xl' : 'py-5 bg-[--bg-surface]/50 backdrop-blur-md'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <img src={identity.logoUrl || logo} alt="logo" onClick={() => scrollTo('home')} className="max-h-10 w-auto cursor-pointer" />
        <ul className="hidden lg:flex items-center gap-6">
          {navItems.map(item => (
            <li key={item.id}>
              <button onClick={() => scrollTo(item.id)} className={`text-sm font-medium ${active === item.id ? 'text-[--accent-primary]' : 'text-[--text-body]'}`}>{item.label}</button>
            </li>
          ))}
          <button onClick={toggleThemeMode} className="p-2 rounded-full bg-[--bg-main]/10 hover:bg-[--bg-main]/20 text-[--text-body] transition">
             {themeMode === 'dark' ? <HiSun size={20} /> : <HiMoon size={20} />}
          </button>
          <button onClick={handleResumeClick} className="ml-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[--accent-primary] to-[--accent-secondary] text-white text-sm font-medium flex items-center gap-2 navbar-resume-btn">
            <FiDownload size={16} /> Resume
          </button>
        </ul>
        <div className="lg:hidden flex items-center gap-4">
            <button onClick={toggleThemeMode} className="p-2 text-[--text-body]"><HiSun size={24} /></button>
            <button onClick={() => setOpen(!open)} className="text-3xl text-[--text-body]"><HiMenu /></button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="lg:hidden fixed inset-0 bg-[--bg-main] z-40 flex flex-col items-center justify-center gap-8">
                {navItems.map(item => <button key={item.id} onClick={() => scrollTo(item.id)} className="text-2xl font-bold">{item.label}</button>)}
            </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;

