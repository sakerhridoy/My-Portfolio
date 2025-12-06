import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFacebook, FiGithub, FiInstagram } from 'react-icons/fi';
import { SlSocialLinkedin } from 'react-icons/sl';
import { BsTwitterX } from 'react-icons/bs';
import { TfiEmail } from 'react-icons/tfi';
import { PiPhoneCallLight } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

const TYPING_TEXT = "Let's Build Something Amazing Together";

const Contact = () => {
  const navigate = useNavigate();

  const [typed, setTyped] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, type: '', message: '' });

  // typing effect
  useEffect(() => {
    let index = 0;
    const type = () => {
      if (index <= TYPING_TEXT.length) {
        setTyped(TYPING_TEXT.slice(0, index));
        index++;
      } else {
        index = 0;
        setTyped('');
      }
    };
    const interval = setInterval(type, 100);
    return () => clearInterval(interval);
  }, []);

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: '', message: '' }), 2500);
  };

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const data = {
      access_key: 'b3594110-667a-4be1-9940-35893c4b5cc2', // your key
      ...formData,
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.success) {
        showPopup('success', 'Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => navigate('/thankyou'), 1400);
      } else showPopup('error', 'Something went wrong.');
    } catch (error) {
      showPopup('error', 'Network error! Try again.');
    }

    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="relative py-28 bg-black text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-cyan-500/10 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 blur-[150px] rounded-full"></div>

      <div className="container mx-auto max-w-6xl px-6 relative z-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            <h3 className="text-sm uppercase tracking-widest text-cyan-300">
              Get in touch
            </h3>

            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl font-extrabold tracking-wide"
            >
              Contact{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
                Me
              </span>
            </motion.h2>

            <p className="text-gray-300 text-xl">{typed}</p>

            {/* Social Icons Card */}
            <div className="p-1 rounded-2xl bg-linear-to-r from-cyan-500/40 to-blue-500/40">
              <div className="backdrop-blur-xl rounded-2xl px-8 py-6 bg-black/40">
                <p className="text-gray-300 mb-4">
                  Connect with me on socials:
                </p>

                <div className="flex gap-6 text-3xl">
                  {[
                    {
                      icon: <FiFacebook />,
                      link: 'https://facebook.com/sakerhridoy',
                    },
                    {
                      icon: <FiGithub />,
                      link: 'https://github.com/sakerhridoy',
                    },
                    {
                      icon: <SlSocialLinkedin />,
                      link: 'https://linkedin.com/in/sakerhridoy',
                    },
                    {
                      icon: <FiInstagram />,
                      link: 'https://instagram.com/imsakerhridoy',
                    },
                    {
                      icon: <BsTwitterX />,
                      link: 'https://x.com/imsakerhridoy',
                    },
                  ].map((item, i) => (
                    <motion.a
                      key={i}
                      href={item.link}
                      target="_blank"
                      whileHover={{ scale: 1.2, rotate: 6 }}
                      className="hover:text-cyan-400 transition"
                    >
                      {item.icon}
                    </motion.a>
                  ))}
                </div>

                <div className="mt-6 space-y-2 text-gray-300">
                  <div className="flex items-center gap-3">
                    <TfiEmail className="text-white text-xl" />
                    <a
                      href="mailto:sakerahmedhridoy@gmail.com"
                      className="text-white underline"
                    >
                      sakerahmedhridoy@gmail.com
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <PiPhoneCallLight className="text-white text-2xl" />
                    <span className="text-white">+880 1743202274</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE FORM */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full"
          >
            <div className="p-1 rounded-2xl bg-linear-to-r from-cyan-500/40 to-blue-500/40">
              <div className="backdrop-blur-xl bg-black/40 p-8 rounded-2xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className="w-full p-3 rounded-lg bg-black/50 border border-white/10 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
                    />

                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Your Email"
                      className="w-full p-3 rounded-lg bg-black/50 border border-white/10 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
                    />
                  </div>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Your Message"
                    className="w-full p-3 rounded-lg bg-black/50 border border-white/10 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
                  ></textarea>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-cyan-400 hover:bg-cyan-500 text-black font-semibold rounded-lg shadow-xl transition hover:-translate-y-1"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* POPUP */}
      <AnimatePresence>
        {popup.show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-white z-50 ${
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
