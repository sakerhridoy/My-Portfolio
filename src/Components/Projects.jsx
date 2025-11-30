import React from 'react'
import eCommerceProject from '../assets/eCommerceProject02.png';
import portfolioProject from '../assets/portfolioProject.png';
import landingPage from '../assets/landingPage.png';
import homePage from '../assets/homePage.png';
import todos from '../assets/todoList.png';
import ludo from '../assets/ludo.png';
import landingPage02 from '../assets/landingPage02.png';
import landingPage03 from '../assets/landingPage03.png';
import landingPage04 from '../assets/landingPage04.png';
import landingPage05 from '../assets/landingPage05.png';
import landingPage06 from '../assets/landingPage06.png';
import landingPage07 from '../assets/landingPage07.png';
import portfolio02 from '../assets/portfolio02.png';
import studentsPortal from '../assets/studentPortal.png'
import moonAnimation from '../assets/moonAnimation.png'
import registrationForm from '../assets/registrationForm.png'

const Project = () => {
  const projects = [
    {
      id: 1,
      img: portfolioProject,
      title: 'Portfolio Website',
      link: 'https://github.com/sakerhridoy/My-Portfolio',
    },
    {
      id: 2,
      img: eCommerceProject,
      title: 'E-commerce Website',
      link: 'https://github.com/sakerhridoy/Bangla-Library',
    },
    {
      id: 3,
      img: landingPage,
      title: 'Landing Page Design',
      link: 'https://github.com/sakerhridoy/ProCleaning-web-Landing-page-design-with-React',
    },
    {
      id: 4,
      img: homePage,
      title: 'Landing Page Design',
      link: 'https://github.com/sakerhridoy/ProCleaning-web-Landing-page-design-with-React',
    },
    {
      id: 5,
      img: todos,
      title: 'Todo List Website',
      link: 'https://github.com/sakerhridoy/Todo-List-using-Redux-and-Firebase',
    },
    {
      id: 6,
      img: ludo,
      title: 'Ludo Disc Roll',
      link: 'https://github.com/sakerhridoy/Ludo-Dice-Roll',
    },
    {
      id: 7,
      img: landingPage02,
      title: 'Landing Page Design',
      link: 'https://github.com/sakerhridoy/Nexcent---tailwind-Project',
    },
    {
      id: 8,
      img: portfolio02,
      title: 'Portfolio Website',
      link: 'https://github.com/sakerhridoy/Portfolio',
    },
    {
      id: 9,
      img: studentsPortal,
      title: 'Students Portal Website',
      link: 'https://github.com/sakerhridoy/Student-Portal-React-Tailwind-CSS',
    },
    {
      id: 10,
      img: moonAnimation,
      title: 'Moon Animation',
      link: 'https://github.com/sakerhridoy/Moon-Animation',
    },
    {
      id: 11,
      img: registrationForm,
      title: 'Registration Form',
      link: 'https://github.com/sakerhridoy/Registration-Form--React-Project',
    },
    {
      id: 12,
      img: landingPage03,
      title: 'Landing Page Design',
      link: 'https://github.com/sakerhridoy/Bootstrap-Project-3',
    },
    {
      id: 13,
      img: landingPage04,
      title: 'Landing Page Design',
      link: 'https://github.com/sakerhridoy/Bootstrap-Project-2',
    },
    {
      id: 14,
      img: landingPage05,
      title: 'Landing Page Design',
      link: 'https://github.com/sakerhridoy/Bootstrap-Project',
    },
    {
      id: 15,
      img: landingPage06,
      title: 'Landing Page Design',
      link: 'https://github.com/sakerhridoy/html-and-css-2',
    },
    {
      id: 16,
      img: landingPage07,
      title: 'Landing Page Design',
      link: 'https://github.com/sakerhridoy/html-and-css-only',
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