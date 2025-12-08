import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight, FaStar } from 'react-icons/fa';
import mahdiTahsan from '../assets/MahdiTahsan.jpg'
import sumaiya from '../assets/sumaiya.jpg'
import sifatUllah from '../assets/sifatUllah.jpg'

const testimonials = [
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
  return (
    <section
      id="testimonials"
      className="relative py-24 bg-linear-to-b from-black via-gray-900 to-black text-white overflow-hidden"
    >
      {/* Background Glow Follow Effect */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.12),transparent_70%)] pointer-events-none"
      />

      {/* Floating Blobs */}
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="absolute top-20 left-10 w-52 h-52 bg-cyan-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-16 right-16 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-5xl font-extrabold text-center mb-16"
        >
          What{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
            Clients Say
          </span>
        </motion.h2>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-xl hover:shadow-cyan-400/30 transition cursor-pointer"
            >
              {/* Quotation Icons */}
              <FaQuoteLeft className="absolute top-6 left-6 text-cyan-400 text-xl opacity-60" />
              <FaQuoteRight className="absolute bottom-6 right-6 text-cyan-400 text-xl opacity-60" />

              {/* Reviewer Image */}
              <div className="flex justify-center mb-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-full border border-white/20 object-cover shadow-md"
                />
              </div>

              {/* Review Text */}
              <p className="text-gray-300 text-center leading-relaxed mb-6">
                {item.review}
              </p>

              {/* Name + Role */}
              <h3 className="text-xl text-center font-semibold text-cyan-400">
                {item.name}
              </h3>
              <p className="text-sm text-center text-gray-400">{item.role}</p>

              {/* Rating Stars */}
              <div className="flex justify-center mt-4">
                {[...Array(item.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
