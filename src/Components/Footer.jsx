import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { useSite } from '../site/SiteContext';
import SocialLinks from './SocialLinks';

const Footer = () => {
  const { identity, settings } = useSite();
  const adminLoginPath = '/admin/login';

  return (
    <footer className="relative bg-[--bg-surface] text-[--text-body] py-12 overflow-hidden border-t border-[--border-glass] backdrop-blur-md">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--accent-glow),_transparent,_transparent)]"></div>
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center gap-8">
        <img src={identity.logoUrl || logo} alt="logo" className="max-h-12 w-auto" />
        <SocialLinks socials={identity.socials} className="flex gap-6 text-xl" />
        <nav className="flex gap-6 text-sm text-[--text-muted]">
            <a href="#home">Home</a>
            <a href="#projects">Projects</a>
            <Link to={adminLoginPath}>Admin</Link>
        </nav>
        <p className="text-[--text-muted] text-sm">© {new Date().getFullYear()} {identity.siteName}. All rights reserved.</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-[--accent-primary] text-[--bg-main] p-3 rounded-full shadow-lg shadow-[--accent-glow] hover:scale-110 transition">
          <FaArrowUp />
        </button>
      </div>
    </footer>
  );
};
export default Footer;
