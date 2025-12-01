import React from 'react'

const Service = () => {
  const items = [
    {
      title: 'Frontend Development',
      desc: 'React.js, Tailwind CSS, Responsive UI',
    },
    {
      title: 'JavaScript Development',
      desc: 'ES6+, DOM, API Integration'
    },
  ];
  return (
    <>
      <section id="services" className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Services</h2>
          <div className="grid md:grid-cols-2 gap-6 mx-4 xl:mx-0">
            {items.map((item, i) => (
              <div key={i} className="p-6 bg-gray-800 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Service