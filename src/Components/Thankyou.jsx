import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSite } from '../site/SiteContext';

const ThankYou = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { slug: contextSlug } = useSite();

  const handleBack = () => {
    const finalSlug = slug || contextSlug;
    const path = finalSlug ? `/${finalSlug}` : '/';
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg">Your message has been sent successfully.</p>
      <button 
        onClick={handleBack}
        className="mt-8 px-8 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition"
      >
        Back to Portfolio
      </button>
    </div>
  );
};

export default ThankYou;
