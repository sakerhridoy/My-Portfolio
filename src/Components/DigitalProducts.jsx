import React, { useState, useEffect, useRef } from 'react';
import { useSite } from '../site/SiteContext';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper/modules';
import {
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaShoppingCart,
  FaCopy,
  FaCheck,
} from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getEffectivePrice = p => {
  const price = Number(p?.price || 0);
  const discount = Number(p?.discountPrice || 0);
  return discount > 0 && discount < price ? discount : price;
};

const DigitalProducts = () => {
  const { slug } = useSite();
  const activeSlug = slug || 'saker';
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  const [data, setData] = useState({ products: [], bkashNumber: '' });
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    senderBkash: '',
    trxId: '',
    paymentScreenshot: '',
  });
  const [uploadingScreenshot, setUploadingScreenshot] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [downloadLink, setDownloadLink] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/digital-products/public?slug=${activeSlug}`)
      .then(res => res.json())
      .then(res =>
        setData({
          products: res.products || res.data || [],
          bkashNumber: res.bkashNumber || '',
        }),
      )
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeSlug]);

  if (!loading && data.products.length === 0) return null;

  const openModal = product => {
    setSelectedProduct(product);
    setFormData({
      name: '',
      email: '',
      contact: '',
      senderBkash: '',
      trxId: '',
      paymentScreenshot: '',
    });
    setError(null);
    setSuccess(null);
    setDownloadLink('');
    setModalOpen(true);
  };

  const handleCopyBkash = () => {
    if (!data.bkashNumber) return;
    navigator.clipboard?.writeText(data.bkashNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScreenshotUpload = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingScreenshot(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('image', file);
      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: fd,
      }).then(r => r.json());
      const url =
        res?.url ||
        res?.secure_url ||
        res?.data?.url ||
        res?.data?.secure_url ||
        '';
      if (url) {
        setFormData(prev => ({ ...prev, paymentScreenshot: url }));
      } else {
        setError('Screenshot upload failed. Please try again.');
      }
    } catch {
      setError('Failed to upload screenshot.');
    } finally {
      setUploadingScreenshot(false);
    }
  };

  const handleDownload = async e => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const targetId = selectedProduct?._id || selectedProduct?.id;
    try {
      const res = await fetch(
        `${API_BASE}/digital-products/free-download/${targetId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: targetId,
            ownerSlug: activeSlug,
            buyerName: formData.name,
            buyerEmail: formData.email,
            contactNumber: formData.contact,
          }),
        },
      ).then(r => r.json());

      if (res.success) {
        const url = res.pdfUrl || selectedProduct?.pdfUrl || '';
        setDownloadLink(url);
        if (url) {
          window.open(url, '_blank', 'noopener,noreferrer');
          setSuccess('Thank you! Your PDF download has started.');
        } else {
          setSuccess('Thank you! Your request has been recorded.');
        }
      } else {
        setError(res.message || 'Failed to process download');
      }
    } catch {
      setError('Failed to process download');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePay = async e => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const targetId = selectedProduct?._id || selectedProduct?.id;
    try {
      const res = await fetch(
        `${API_BASE}/digital-products/order/${targetId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productId: targetId,
            ownerSlug: activeSlug,
            buyerName: formData.name,
            buyerEmail: formData.email,
            senderBkashNumber: formData.senderBkash,
            bkashTrxId: formData.trxId,
            paymentScreenshot: formData.paymentScreenshot,
          }),
        },
      ).then(r => r.json());

      if (res.success !== false) {
        setSuccess(
          'Order submitted! You will receive your product after verification.',
        );
      } else {
        setError(res.message || 'Failed to submit order');
      }
    } catch {
      setError('Failed to submit order');
    } finally {
      setSubmitting(false);
    }
  };

  const isSelectedFree = selectedProduct
    ? getEffectivePrice(selectedProduct) === 0
    : true;

  return (
    <section
      id="digital-products"
      className="relative py-20 bg-linear-to-b from-black via-slate-950 to-black text-white overflow-hidden"
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-wide">
            Digital{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
              Products
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Explore premium resources, guides, and digital assets crafted for
            you.
          </p>
        </div>

        {/* 3D Coverflow Carousel + Left/Right Navigation Buttons */}
        <div className="relative max-w-6xl mx-auto px-2 sm:px-12">
          {/* Left Button */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous product"
            className="hidden sm:flex items-center justify-center w-11 h-11 rounded-full bg-slate-900/90 hover:bg-cyan-500 text-cyan-400 hover:text-white border border-white/15 hover:border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all duration-300 absolute left-0 top-1/2 -translate-y-1/2 z-30 cursor-pointer"
          >
            <FaChevronLeft />
          </button>

          {/* Right Button */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next product"
            className="hidden sm:flex items-center justify-center w-11 h-11 rounded-full bg-slate-900/90 hover:bg-cyan-500 text-cyan-400 hover:text-white border border-white/15 hover:border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all duration-300 absolute right-0 top-1/2 -translate-y-1/2 z-30 cursor-pointer"
          >
            <FaChevronRight />
          </button>

          <Swiper
            onSwiper={swiper => {
              swiperRef.current = swiper;
            }}
            modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={data.products.length > 2}
            autoplay={{ delay: 4500, disableOnInteraction: true }}
            coverflowEffect={{
              rotate: 18,
              stretch: 0,
              depth: 140,
              modifier: 1.15,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1.15, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 28 },
            }}
            className="pb-14 pt-4"
          >
            {data.products.map(p => {
              const pid = p._id || p.id;
              const effPrice = getEffectivePrice(p);
              const origPrice = Number(p?.price || 0);
              const detailsPath = `/${activeSlug === 'sumaiya' ? 'sumaiya/' : ''}products/${pid}`;

              return (
                <SwiperSlide key={pid} className="h-auto">
                  <div className="h-full flex flex-col justify-between p-5 sm:p-6 bg-[#0d1324]/90 backdrop-blur-xl rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group">
                    <div>
                      <div
                        onClick={() => navigate(detailsPath)}
                        className="relative overflow-hidden rounded-xl mb-4 cursor-pointer aspect-video bg-slate-800"
                      >
                        <img
                          src={p.coverImage?.url || p.coverImage}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span
                          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow ${
                            effPrice === 0
                              ? 'bg-emerald-500/90 text-white'
                              : 'bg-cyan-500/90 text-slate-950'
                          }`}
                        >
                          {effPrice === 0 ? 'FREE' : `৳${effPrice}`}
                        </span>
                      </div>

                      <h3
                        onClick={() => navigate(detailsPath)}
                        className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors cursor-pointer line-clamp-1"
                      >
                        {p.title}
                      </h3>

                      {p.description && (
                        <p className="text-gray-400 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                          {p.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/10">
                      <div className="flex items-baseline gap-2 mb-3">
                        {effPrice === 0 ? (
                          <span className="text-emerald-400 font-bold text-base">
                            Free Download
                          </span>
                        ) : (
                          <>
                            <span className="text-cyan-400 font-extrabold text-xl">
                              ৳{effPrice}
                            </span>
                            {origPrice > effPrice && (
                              <span className="text-gray-500 line-through text-sm">
                                ৳{origPrice}
                              </span>
                            )}
                          </>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => navigate(detailsPath)}
                          className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-gray-200 text-sm font-medium border border-white/10 transition cursor-pointer"
                        >
                          Details
                        </button>
                        <button
                          type="button"
                          onClick={() => openModal(p)}
                          className="py-2.5 px-3 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
                        >
                          {effPrice === 0 ? (
                            <>
                              <FaDownload className="text-xs" /> Download
                            </>
                          ) : (
                            <>
                              <FaShoppingCart className="text-xs" /> Buy Now
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Mobile Left/Right Controls */}
          <div className="flex sm:hidden items-center justify-center gap-4 mt-2">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous product"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-cyan-400 border border-white/15 active:scale-95 transition"
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next product"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-cyan-400 border border-white/15 active:scale-95 transition"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Free Download & Paid Checkout Modal */}
      {modalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form
            onSubmit={isSelectedFree ? handleDownload : handlePay}
            className="bg-[#0d1324] p-6 sm:p-8 rounded-2xl max-w-md w-full border border-white/15 shadow-2xl text-white max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold mb-1">
              {isSelectedFree ? 'Free Download' : 'Checkout'}
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              {selectedProduct.title}
            </p>

            {error && (
              <div className="bg-red-500/15 border border-red-500/40 text-red-300 text-sm p-3 rounded-xl mb-3">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-sm p-3 rounded-xl mb-3">
                <p>{success}</p>
                {downloadLink && (
                  <a
                    href={downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 underline font-semibold text-cyan-300"
                  >
                    Click here if PDF did not open automatically
                  </a>
                )}
              </div>
            )}

            {!isSelectedFree && (
              <div className="bg-slate-800/90 border border-cyan-400/30 p-3.5 rounded-xl mb-4 text-sm flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs text-gray-400">
                    Send ৳{getEffectivePrice(selectedProduct)} via bKash
                  </p>
                  <p className="font-mono font-bold text-cyan-400 text-base">
                    {data.bkashNumber || 'Number not configured'}
                  </p>
                </div>
                {data.bkashNumber && (
                  <button
                    type="button"
                    onClick={handleCopyBkash}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? <FaCheck /> : <FaCopy />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                )}
              </div>
            )}

            <input
              required
              value={formData.name}
              placeholder="Your Name"
              className="w-full p-3 mb-3 bg-slate-800/90 text-white placeholder-gray-400 border border-white/15 rounded-xl focus:outline-none focus:border-cyan-400"
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              required
              type="email"
              value={formData.email}
              placeholder="Email Address"
              className="w-full p-3 mb-3 bg-slate-800/90 text-white placeholder-gray-400 border border-white/15 rounded-xl focus:outline-none focus:border-cyan-400"
              onChange={e =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            {isSelectedFree ? (
              <input
                required
                value={formData.contact}
                placeholder="Contact Number"
                className="w-full p-3 mb-4 bg-slate-800/90 text-white placeholder-gray-400 border border-white/15 rounded-xl focus:outline-none focus:border-cyan-400"
                onChange={e =>
                  setFormData({ ...formData, contact: e.target.value })
                }
              />
            ) : (
              <>
                <input
                  required
                  value={formData.senderBkash}
                  placeholder="Sender bKash Number"
                  className="w-full p-3 mb-3 bg-slate-800/90 text-white placeholder-gray-400 border border-white/15 rounded-xl focus:outline-none focus:border-cyan-400"
                  onChange={e =>
                    setFormData({ ...formData, senderBkash: e.target.value })
                  }
                />
                <input
                  required
                  value={formData.trxId}
                  placeholder="Transaction ID (TrxID)"
                  className="w-full p-3 mb-3 bg-slate-800/90 text-white placeholder-gray-400 border border-white/15 rounded-xl focus:outline-none focus:border-cyan-400"
                  onChange={e =>
                    setFormData({ ...formData, trxId: e.target.value })
                  }
                />
                <div className="mb-4">
                  <label className="block text-xs text-gray-400 mb-1.5">
                    Payment Screenshot (Optional / Recommended)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleScreenshotUpload}
                    className="w-full text-xs text-gray-300 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30"
                  />
                  {uploadingScreenshot && (
                    <p className="text-xs text-cyan-400 mt-1">
                      Uploading screenshot...
                    </p>
                  )}
                  {formData.paymentScreenshot && (
                    <img
                      src={formData.paymentScreenshot}
                      alt="Payment proof"
                      className="mt-2 h-24 rounded-lg object-cover border border-white/15"
                    />
                  )}
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={submitting || uploadingScreenshot}
              className="w-full bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 py-3 rounded-xl font-semibold shadow-lg transition cursor-pointer"
            >
              {submitting
                ? 'Submitting...'
                : isSelectedFree
                  ? 'Download Now'
                  : 'Submit Order'}
            </button>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="w-full bg-slate-800 hover:bg-slate-700 py-2.5 mt-2.5 rounded-xl text-gray-300 text-sm transition cursor-pointer"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default DigitalProducts;