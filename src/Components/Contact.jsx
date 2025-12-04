import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const [popup, setPopup] = useState({
    show: false,
    type: '',
    message: '',
  });

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });

    setTimeout(() => {
      setPopup({ show: false, type: '', message: '' });
    }, 2500);
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const data = {
      access_key: 'b3594110-667a-4be1-9940-35893c4b5cc2',
      ...formData,
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        showPopup('success', 'Message sent successfully!');
        setTimeout(() => navigate('/thankyou'), 1500);
      } else {
        showPopup('error', 'Something went wrong! Try again.');
      }
    } catch (error) {
      showPopup('error', 'Network error! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-black text-white">
      <div className="container mx-auto max-w-lg px-6">
         <motion.h2
                  initial={{ opacity: 0, y: -30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl font-bold text-center mb-14"
                >
                  Contact <span className="text-cyan-400">Me</span>
                </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-6 rounded-xl shadow-xl flex flex-col gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Floating Input */}
          <div className="relative">
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-800 p-3 rounded text-white peer focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <label className="absolute left-3 top-3 text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-cyan-300 peer-valid:-top-4 peer-valid:text-sm">
              Your Name
            </label>
          </div>

          {/* Floating Email */}
          <div className="relative">
            <input
              type="email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-800 p-3 rounded text-white peer focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <label className="absolute left-3 top-3 text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-cyan-300 peer-valid:-top-4 peer-valid:text-sm">
              Your Email
            </label>
          </div>

          {/* Floating Message */}
          <div className="relative">
            <textarea
              required
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-gray-800 p-3 rounded text-white peer focus:outline-none focus:ring-2 focus:ring-cyan-400"
            ></textarea>
            <label className="absolute left-3 top-3 text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-sm peer-focus:text-cyan-300 peer-valid:-top-4 peer-valid:text-sm">
              Your Message
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-600 transition p-3 rounded font-semibold shadow-lg"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>

        {/* POPUP NOTIFICATION */}
        <AnimatePresence>
          {popup.show && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white font-medium ${
                popup.type === 'success' ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {popup.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Contact;
