import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-[#021622] flex justify-between items-center">
      <div className="logo flex items-center">
        <img
          src="https://stock-note.netlify.app/media/Logo.png"
          alt="Stock Tasks"
          className="w-[100px] h-[80px]"
        />
      </div>
      <ul className="flex space-x-8">
        <li>
          <a
            href="#"
            className="text-white text-lg hover:text-[#37FF8B] transition duration-300"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-white text-lg hover:text-[#37FF8B] transition duration-300"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-white text-lg hover:text-[#37FF8B] transition duration-300"
          >
            Contact
          </a>
        </li>
      </ul>
      <button
        data-text="Awesome"
        id="hireme"
        className='text-white mr-10'
      >
          Hire Me
      </button>
    </nav>
  );
};

export default Navbar;
