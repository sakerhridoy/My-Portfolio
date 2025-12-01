import React from 'react';
import ThankYou from './Thankyou';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

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
        navigate('/thankyou'); // React Router redirect
      } else {
        alert('Something went wrong! Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error submitting form!');
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="py-20 bg-black text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Contact</h2>
        <div className="max-w-md mx-4 sm:mx-auto bg-gray-800 p-6 rounded shadow">
          <p className="mb-3">Phone: +8801743202274</p>
          <p className="mb-3">Email: sakerahmedhridoy@gmail.com</p>

          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="flex flex-col gap-4" >
            <input
              type="hidden"
              name="access_key"
              value="b3594110-667a-4be1-9940-35893c4b5cc2" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="p-3 bg-gray-700 rounded"
              required />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="p-3 bg-gray-700 rounded"
              required />
            <textarea
              name="message"
              placeholder="Your Message"
              className="p-3 bg-gray-700 rounded"
              rows="4" required>
            </textarea>
            <input
              type="hidden"
              name="redirect"
              value="http://localhost:5173/thankyou" /> <button type="submit" className="p-3 bg-cyan-400 rounded hover:bg-cyan-500 transition"> Send </button> </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
