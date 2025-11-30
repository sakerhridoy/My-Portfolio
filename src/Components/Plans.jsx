import React from 'react'

const Plans = () => {
  const plans = [
    { title: 'Basic', price: '$50', desc: '1 Page Website' },
    { title: 'Standard', price: '$120', desc: '3 Pages + Responsive' },
    { title: 'Premium', price: '$250', desc: 'Full Website + Dashboard' },
  ];
  return (
    <>
      <section id="plans" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Plans</h2>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            {plans.map((p, i) => (
              <div key={i} className="bg-gray-800 p-6 rounded shadow">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="text-4xl font-bold my-4">{p.price}</p>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Plans