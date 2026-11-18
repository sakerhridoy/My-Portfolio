import SocialLinks from './SocialLinks';
import React, { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaPaperPlane, FaShieldAlt } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../admin/api';
import { useSite } from '../site/SiteContext';

/* ===================== CONSTANTS ===================== */
const DEFAULT_WHATSAPP_PHONE = '8801743202274';

/* ===================== UTILS ===================== */
const sendWhatsApp = ({ name, project, budget, phone }) => {
  const targetPhone = phone || DEFAULT_WHATSAPP_PHONE;
  const msg = `Hello, my name is ${name}.

Project: ${project}
Estimated Budget: ${budget}

Please guide me further.`;

  window.open(
    `https://wa.me/${targetPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`,
    '_blank',
    'noopener,noreferrer',
  );
};

/* ===================== 3D COMMAND GLASS CARD ===================== */
const GlassCard = ({ children, className = '', accent = 'cyan' }) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 7, rotateY: x * 7 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const gradientBorder =
    accent === 'emerald'
      ? 'from-emerald-400/50 via-cyan-500/40 to-teal-600/50'
      : 'from-cyan-400/55 via-blue-500/40 to-purple-600/55';

  return (
    <div style={{ perspective: 1100 }} className="w-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
        transition={{ type: 'spring', stiffness: 240, damping: 22 }}
        className={`relative p-px rounded-2xl bg-linear-to-br ${gradientBorder} shadow-[0_20px_60px_rgba(0,0,0,0.65),0_0_50px_rgba(34,211,238,0.12)] group`}
      >
        {/* Top-Right & Bottom-Left 3D Corner Brackets */}
        <span className="pointer-events-none absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-cyan-400 rounded-tr-xl opacity-70 group-hover:opacity-100 transition-opacity" />
        <span className="pointer-events-none absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-blue-400 rounded-bl-xl opacity-70 group-hover:opacity-100 transition-opacity" />

        <div
          className={`rounded-2xl bg-[#070d19]/85 backdrop-blur-2xl relative overflow-hidden ${className}`}
        >
          {/* Subtle Inner Top Reflection */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/40 to-transparent pointer-events-none" />
          {children}
        </div>
      </motion.div>
    </div>
  );
};

const GlassSelect = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="floating-input flex items-center justify-between cursor-pointer"
      >
        <span>{value}</span>
        <span className="text-emerald-400">▾</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute z-50 mt-2 w-full rounded-xl overflow-hidden
                       bg-[#081020]/95 backdrop-blur-xl border border-cyan-400/35
                       shadow-[0_12px_35px_rgba(0,255,255,0.22)]"
          >
            {options.map(option => (
              <li
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className="px-4 py-3 cursor-pointer text-white text-sm
                           hover:bg-cyan-400/20 transition"
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ===================== FLOATING INPUT ===================== */
const FloatingInput = ({ label, textarea = false, ...props }) => (
  <div className="relative">
    {textarea ? (
      <textarea
        {...props}
        placeholder=" "
        className="peer floating-input resize-none"
      />
    ) : (
      <input {...props} placeholder=" " className="peer floating-input" />
    )}
    <label className="floating-label">{label}</label>
  </div>
);

/* ===================== WHATSAPP FORM ===================== */
const WhatsAppQuickForm = memo(({ phone }) => {
  const [data, setData] = useState({
    name: '',
    project: 'Website Development',
    budget: '$100 – $300',
  });

  return (
    <GlassCard accent="emerald" className="p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
          <FaWhatsapp className="text-xl" /> Quick WhatsApp Inquiry
        </h3>
        <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
          Instant
        </span>
      </div>

      <FloatingInput
        label="Your Name"
        value={data.name}
        onChange={e => setData({ ...data, name: e.target.value })}
      />

      <GlassSelect
        value={data.project}
        onChange={project => setData({ ...data, project })}
        options={[
          'Website Development',
          'Portfolio Website',
          'Landing Page',
          'Full Stack App',
        ]}
      />

      <GlassSelect
        value={data.budget}
        onChange={budget => setData({ ...data, budget })}
        options={['$100 – $300', '$300 – $700', '$700 – $1500', '$1500+']}
      />

      <motion.button
        type="button"
        whileHover={{ scale: data.name ? 1.02 : 1 }}
        whileTap={{ scale: data.name ? 0.98 : 1 }}
        disabled={!data.name}
        onClick={() => sendWhatsApp({ ...data, phone })}
        className="w-full py-3 rounded-xl bg-linear-to-r from-emerald-400 to-green-500 text-slate-950 font-bold hover:from-emerald-300 hover:to-green-400 transition shadow-lg shadow-emerald-500/20 disabled:opacity-45 cursor-pointer"
      >
        Send via WhatsApp <FaWhatsapp className="inline ml-1.5 text-base" />
      </motion.button>
    </GlassCard>
  );
});

/* ===================== MAIN ===================== */
const Contact = () => {
  const { profileData, identity, settings, slug } = useSite();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [typed, setTyped] = useState('');
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const isSumaiya = Boolean(
    pathname.toLowerCase().includes('sumaiya') ||
    String(slug || '').toLowerCase() === 'sumaiya' ||
    String(profileData?.slug || '').toLowerCase() === 'sumaiya',
  );

  const userPhone = profileData?.whatsapp || profileData?.phone || '';
  const contactSubtitleText =
    settings?.contactSubtitle ||
    identity?.contactSubtitle ||
    profileData?.contactSubtitle ||
    "Let's Build Something Amazing Together";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(contactSubtitleText.slice(0, i));
      i = i === contactSubtitleText.length ? 0 : i + 1;
    }, 150);
    return () => clearInterval(t);
  }, [contactSubtitleText]);

  const showPopup = (type, message) => {
    setPopup({ type, message });
    setTimeout(() => setPopup(null), 2500);
  };

  const submit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.leads.create({
        name: form.name,
        email: form.email,
        message: form.message,
        source: 'contact',
        tenant: slug || profileData?.slug || 'root',
      });
      showPopup('success', 'Message sent!');
      setForm({ name: '', email: '', message: '' });
      navigate(
        slug || identity.slug
          ? `/${slug || identity.slug}/thankyou`
          : '/thankyou',
      );
    } catch {
      showPopup('error', 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-linear-to-b from-black via-[#040814] to-black text-white overflow-hidden"
    >
      {/* 3D Diagonal Cyber-Wave & Floating Nodes Background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(34,211,238,0.16) 0px, rgba(34,211,238,0.16) 1px, transparent 1px, transparent 36px)',
          transform: 'perspective(700px) rotateX(40deg) scale(1.35)',
          transformOrigin: 'center center',
        }}
      />

      {/* Floating 3D Geometric Diamond Frames */}
      <motion.div
        animate={{ rotate: [45, 90, 45], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
        className="hidden md:block absolute top-24 right-16 w-28 h-28 border border-cyan-400/20 rounded-2xl pointer-events-none"
      />
      <motion.div
        animate={{ rotate: [12, -18, 12], y: [0, 22, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: 'easeInOut' }}
        className="hidden md:block absolute bottom-28 left-12 w-24 h-24 border border-purple-500/20 rounded-full pointer-events-none"
      />

      {/* Neon Glow Orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.3, 0.18] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/25 blur-[180px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.15, 1, 1.15], opacity: [0.18, 0.3, 0.18] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/25 blur-[180px] rounded-full pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto px-5 z-10">
        <div
          className={`grid gap-10 md:gap-12 items-center ${
            isSumaiya ? 'md:grid-cols-1 max-w-2xl mx-auto' : 'md:grid-cols-2'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: isSumaiya ? 0 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className={`space-y-6 ${isSumaiya ? 'text-center mb-4' : 'text-center md:text-left'}`}
          >
            <div className="space-y-2.5">
              <span className="inline-flex items-center gap-2 uppercase tracking-widest text-cyan-300 text-[11px] font-bold px-3.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/25">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                Get in touch
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide">
                Contact{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
                  {profileData?.name?.split(' ')[0] || 'Me'}
                </span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-gray-300 min-h-[44px]">
              {typed}
              <span className="inline-block w-0.5 h-5 bg-cyan-400 ml-1 animate-pulse align-middle" />
            </p>

            {!isSumaiya && <WhatsAppQuickForm phone={userPhone} />}

            <div className="pt-2">
              <SocialLinks
                socials={identity?.socials}
                socialLinks={identity?.socialLinks}
                className={`flex items-center ${isSumaiya ? 'justify-center' : 'justify-center md:justify-start'} gap-6 text-2xl`}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isSumaiya ? 0 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <GlassCard accent="cyan" className="p-6 sm:p-9">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Send a Message
                </h3>
                <span className="text-xs text-gray-400 flex items-center gap-1.5">
                  <FaShieldAlt className="text-cyan-400" /> Direct Inbox
                </span>
              </div>

              <form onSubmit={submit} className="space-y-5">
                <FloatingInput
                  label="Your Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
                <FloatingInput
                  label="Your Email"
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
                <FloatingInput
                  textarea
                  rows={4}
                  label="Your Message"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                />

                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-linear-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-bold transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  {!loading && <FaPaperPlane className="text-sm" />}
                </motion.button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* POPUP */}
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-white font-medium shadow-xl z-50 ${
              popup.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
            }`}
          >
            {popup.message}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;