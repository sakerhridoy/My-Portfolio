import React from 'react'

const Project = () => {
  const projects = [
    {
      id: 1,
      img: '/src/assets/eCommerceProject02.png',
      title: 'E-commerce Website',
      link: 'https://bangla-library.vercel.app/',
    },
    {
      id: 2,
      img: '/src/assets/portfolioProject.png',
      title: 'Portfolio Website',
      link: 'https://portfolio-pi-five-xrwdo3lot2.vercel.app/',
    },
    {
      id: 3,
      img: '/src/assets/landingPage.png',
      title: 'Landing Page',
      link: 'https://pro-cleaning-web-landing-page-desig.vercel.app/',
    },
  ];
  return (
    <>
      <section id="projects" className="py-20 bg-black text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map(p => (
              <a
                key={p.id}
                href={p.link}
                target="_blank"
                className="block bg-gray-800 rounded overflow-hidden"
              >
                <img src={p.img} className="w-full h-48 object-cover" />
                <div className="p-4 text-center">{p.title}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Project