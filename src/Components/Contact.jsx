import React from 'react';
import ThankYou from './Thankyou';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-black text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Contact</h2>
        <div className="max-w-md mx-4 sm:mx-auto bg-gray-800 p-6 rounded shadow">
          <p className="mb-3">Phone: +8801743202274</p>
          <p className="mb-3">Email: sakerahmedhridoy@gmail.com</p>

          <form
            className="grid gap-4 mt-4"
            action="https://api.web3forms.com/submit"
            method="POST"
          >
            {/* 1️⃣ API Key */}
            <input
              type="hidden"
              name="access_key"
              value="b3594110-667a-4be1-9940-35893c4b5cc2"
            />

            <input
              type="hidden"
              name="email_to"
              value="sakerahmedhridoy@gmail.com"
            />

            {/* 3️⃣ Optional: Success redirect */}
            <input
              type="hidden"
              name="redirect"
              value="http://localhost:5173/thankyou"
            />

            {/* Visible Input Fields */}
            <input
              className="p-3 bg-gray-700 rounded"
              name="name"
              placeholder="Your Name"
              required
            />
            <input
              className="p-3 bg-gray-700 rounded"
              name="email"
              type="email"
              placeholder="Your Email"
              required
            />
            <input
              type="hidden"
              name="redirect"
              value="https://my-portfolio-nine-mauve.vercel.app/thankyou"
            />
            <textarea
              className="p-3 bg-gray-700 rounded"
              name="message"
              rows="4"
              placeholder="Your Message"
              required
            ></textarea>
            <button
              type="submit"
              className="p-3 text-center bg-cyan-400 hover:bg-cyan-600 rounded font-semibold"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
