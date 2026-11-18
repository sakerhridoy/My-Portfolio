import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight, FaStar } from 'react-icons/fa';
import { useSite } from '../site/SiteContext';
import mahdiTahsan from '../assets/MahdiTahsan.jpg';
import sumaiya from '../assets/sumaiya.jpg';
import sifatUllah from '../assets/sifatUllah.jpg';
import api from '../admin/api';
import { useOwnedList } from '../site/useOwnedList';

const FALLBACK_TESTIMONIALS = [
  {
    name: 'Mahadi Tahsan',
    role: 'Sr faculty , Creative IT Institute',
    image: mahdiTahsan,
    review:
      'Working with Saker was an incredible experience. His attention to detail, creativity, and problem-solving skills brought our product to life beautifully.',
    rating: 5,
  },
  {
    name: 'Sumaiya Tazeen',
    role: 'Ui/Ux Designer, Cleverlyy and Edupy Academy',
    image: sumaiya,
    review:
      'The animations, UI design, and overall quality exceeded our expectations. Highly recommended for front-end development.',
    rating: 5,
  },
  {
    name: 'Md Sifat Ullah',
    role: "Founder & CEO, Touter's Home Tuition Media",
    image: sifatUllah,
    review:
      'Super smooth communication and fast delivery. Saker transformed our ideas into a modern, elegant and high-performing user interface.',
    rating: 5,
  },
];

const Testimonials = () => {
  const { slug, profileData } = useSite();
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    review: '',
  });

  const items = useOwnedList(FALLBACK_TESTIMONIALS, () =>
    api.testimonials
      .list({ limit: 100, sort: 'order' })
      .then(({ items: fetched }) => fetched),
  );

  const handleSubmit = async e => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      alert('Please enter a valid Google email address.');
      return;
    }

    const isSumaiya =
      window.location.pathname.toLowerCase().includes('sumaiya') ||
      String(slug || profileData?.slug || '').toLowerCase() === 'sumaiya';
    const targetTenant = isSumaiya
      ? 'sumaiya'
      : slug || profileData?.slug || 'root';

    setSubmitting(true);
    try {
      const baseUrl =
        import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${baseUrl}/testimonials/public`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-site-slug': targetTenant,
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          role: formData.role.trim(),
          rating,
          quote: formData.review.trim(),
          ownerSlug: targetTenant,
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(result.message || 'Failed to submit review');

      setSuccess(true);
      setFormData({ name: '', email: '', role: '', review: '' });
      setRating(5);
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
      }, 2800);
    } catch (err) {
      alert(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const approvedItems = items.filter(
    item =>
      !item.status || item.status === 'approved' || item.status === 'published',
  );

  return (
    <section
      id="testimonials"
      className="relative py-24 bg-linear-to-b from-black via-gray-900 to-black text-white overflow-hidden"
    >
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.12),transparent_70%)] pointer-events-none"
      />

      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="absolute top-20 left-10 w-52 h-52 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-16 right-16 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.05 }}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-6"
        >
          What{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
            Clients Say
          </span>
        </motion.h2>

        <div className="text-center mb-12 sm:mb-16">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/25 transition font-semibold text-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <FaStar /> Write a Review
          </button>
        </div>

        {approvedItems.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {approvedItems.map((item, index) => {
              const image =
                item.avatar?.url ||
                FALLBACK_TESTIMONIALS[index % FALLBACK_TESTIMONIALS.length]
                  .image;
              const starCount = Math.min(
                5,
                Math.max(1, Number(item.rating) || 5),
              );

              return (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  viewport={{ once: true, amount: 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl shadow-xl hover:shadow-cyan-400/30 transition cursor-pointer flex flex-col h-full"
                >
                  <FaQuoteLeft className="absolute top-6 left-6 text-cyan-400 text-lg opacity-40 sm:opacity-60" />
                  <FaQuoteRight className="absolute bottom-6 right-6 text-cyan-400 text-lg opacity-40 sm:opacity-60" />

                  <div className="flex justify-center mb-5">
                    <img
                      src={image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-white/20 object-cover shadow-md"
                    />
                  </div>

                  <p className="text-gray-300 text-center text-sm sm:text-base leading-relaxed mb-6 flex-1">
                    {item.review || item.quote}
                  </p>

                  <div className="mt-auto">
                    <h3 className="text-lg sm:text-xl text-center font-semibold text-cyan-400">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-center text-gray-400">
                      {item.role}
                    </p>

                    <div className="flex justify-center gap-1 mt-3 sm:mt-4">
                      {[...Array(starCount)].map((_, i) => (
                        <FaStar
                          key={i}
                          className="text-yellow-400 text-xs sm:text-sm"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Review Submission Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0b1120]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-6 sm:p-8 w-full max-w-lg shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              Write a Review
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Share your feedback with your Google email. Reviews appear after
              approval.
            </p>

            {success ? (
              <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-xl text-sm">
                Thank you! Your review has been submitted for approval.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2 justify-center py-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <FaStar
                      key={s}
                      className={`cursor-pointer text-2xl transition ${
                        (hover || rating) >= s
                          ? 'text-amber-400 scale-110'
                          : 'text-gray-600'
                      }`}
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHover(s)}
                      onMouseLeave={() => setHover(0)}
                    />
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white placeholder-gray-500 outline-none focus:border-cyan-400"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <input
                  type="email"
                  placeholder="Google Email (e.g. yourname@gmail.com) *"
                  required
                  className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white placeholder-gray-500 outline-none focus:border-cyan-400"
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Role / Company (Optional)"
                  className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white placeholder-gray-500 outline-none focus:border-cyan-400"
                  value={formData.role}
                  onChange={e =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                />

                <textarea
                  placeholder="Write your review message... *"
                  required
                  className="w-full bg-white/5 border border-white/10 p-3 rounded-lg text-white placeholder-gray-500 h-28 resize-none outline-none focus:border-cyan-400"
                  value={formData.review}
                  onChange={e =>
                    setFormData({ ...formData, review: e.target.value })
                  }
                />

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2.5 bg-white/10 hover:bg-white/15 rounded-lg text-white font-medium transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded-lg transition disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
