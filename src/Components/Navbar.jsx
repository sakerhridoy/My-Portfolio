import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav className="fixed top-0 w-full bg-[#072135]/70 backdrop-blur-md shadow z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-2">
          <h1 className="text-white text-xl font-semibold">Saker Hridoy</h1>
          <ul className="flex gap-6 text-white text-sm">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#plans">Plans</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar