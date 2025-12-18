import React, { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

/* ===================== CONSTANTS ===================== */
const WHATSAPP_PHONE = '8801743202274';
const TYPING_TEXT = "Let's Build Something Amazing Together";

/* ===================== UTILS ===================== */
const sendWhatsApp = ({ name, project, budget }) => {
  const msg = `Hello, my name is ${name}.

Project: ${project}
Estimated Budget: ${budget}

Please guide me further.`;

  window.open(
    `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`,
    '_blank',
    'noopener,noreferrer'
  );
};

/* ===================== GLASS CARD ===================== */
const GlassCard = ({ children, className = '' }) => (
  <div className="relative p-px rounded-2xl bg-linear-to-br from-cyan-400/50 via-blue-500/40 to-purple-600/50">
    <div
      className={`rounded-2xl bg-black/55 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_60px_rgba(0,255,255,0.12)] ${className}`}
    >
      {children}
    </div>
  </div>
);
const GlassSelect = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="floating-input flex items-center justify-between"
      >
        <span>{value}</span>
        <span className="text-green-500">▾</span>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute z-50 mt-2 w-full rounded-xl overflow-hidden
                       bg-black/80 backdrop-blur-xl border border-cyan-400/30
                       shadow-[0_0_30px_rgba(0,255,255,0.2)]"
          >
            {options.map(option => (
              <li
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className="px-4 py-3 cursor-pointer text-white
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
const WhatsAppQuickForm = memo(() => {
  const [data, setData] = useState({
    name: '',
    project: 'Website Development',
    budget: '$100 – $300',
  });

  return (
    <GlassCard className="p-5 space-y-4">
      <h3 className="text-lg font-semibold text-green-400">
        Quick WhatsApp Inquiry
      </h3>

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

      <button
        disabled={!data.name}
        onClick={() => sendWhatsApp(data)}
        className="w-full py-3 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-600 transition"
      >
        Send via WhatsApp <FaWhatsapp className="inline ml-1" />
      </button>
    </GlassCard>
  );
});

/* ===================== MAIN ===================== */
const Contact = () => {
  const navigate = useNavigate();
  const [typed, setTyped] = useState('');
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(TYPING_TEXT.slice(0, i));
      i = i === TYPING_TEXT.length ? 0 : i + 1;
    }, 150);
    return () => clearInterval(t);
  }, []);

  const showPopup = (type, message) => {
    setPopup({ type, message });
    setTimeout(() => setPopup(null), 2500);
  };

  const submit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          ...form,
        }),
      });
      const r = await res.json();
      if (!r.success) throw new Error();
      showPopup('success', 'Message sent!');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => navigate('/thankyou'), 1400);
    } catch {
      showPopup('error', 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <section id='contact' className="relative py-24 md:py-32 bg-black text-white overflow-hidden">
      {/* Neon glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/30 blur-[200px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/30 blur-[200px]" />

      <div className="relative max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-2 gap-12 items-baseline-last">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5 text-center md:text-left"
          >
            <h3 className="uppercase tracking-widest text-cyan-300 text-sm">
              Get in touch
            </h3>
            <h2 className="text-4xl md:text-5xl font-extrabold">
              Contact <span className="text-cyan-400">Me</span>
            </h2>
            <p className="text-lg text-gray-300">{typed}</p>

            <WhatsAppQuickForm />
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-6">
              <form onSubmit={submit} className="space-y-4">
                <FloatingInput
                  label="Your Name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
                <FloatingInput
                  label="Your Email"
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
                <FloatingInput
                  textarea
                  rows={4}
                  label="Your Message"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                />

                <button
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
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
            className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-white z-50 ${
              popup.type === 'success' ? 'bg-green-600' : 'bg-red-600'
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
