import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'swiper/css';

const ProjectsSlider = ({ projects }) => {
  const [swiperRef, setSwiperRef] = useState(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  return (
    <div className="mt-20 relative w-full">
      {/* LEFT BUTTON */}
      <button
        onClick={() => swiperRef.slidePrev()}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 
          bg-transparent text-cyan-500 p-3 rounded-full shadow-xl border border-cyan-600 focus:bg-cyan-500 focus:text-white hover:text-white hover:bg-cyan-500 transition
          ${isAtStart ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <FaChevronLeft size={18} />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={() => swiperRef.slideNext()}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 
          bg-transparent text-cyan-500 p-3 rounded-full shadow-xl border border-cyan-600 focus:bg-cyan-500 focus:text-white hover:text-white hover:bg-cyan-500 transition
          ${isAtEnd ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <FaChevronRight size={18} />
      </button>

      {/* SWIPER */}
      <Swiper
        onSwiper={swiper => setSwiperRef(swiper)}
        onSlideChange={swiper => {
          setIsAtStart(swiper.isBeginning);
          setIsAtEnd(swiper.isEnd);
        }}
        spaceBetween={20}
        slidesPerView={4}
        grabCursor={true}
        className="py-10"
      >
        {projects.map(p => (
          <SwiperSlide key={p.id}>
            <div className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer shadow-lg hover:scale-105 duration-300">
              <img
                src={p.img}
                className="w-full h-48 object-cover"
                alt={p.title}
              />
              <div className="p-4 text-center">
                <p className="text-lg font-semibold">{p.title}</p>
                <span className="text-sm text-gray-400">{p.category}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProjectsSlider;