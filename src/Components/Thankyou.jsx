import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg">Your message has been sent successfully.</p>
      <p className="mt-2 text-sm">Redirecting to home page...</p>
    </div>
  );
};

export default ThankYou;
