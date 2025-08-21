// // src/components/Navbar.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import log from '../assets/log.png'; 



// const Navbar = () => {
//   return (
//     <div className=" bg-[#E99858]   font-sans"> 

//       {/* Navbar */}
//       <nav className="{bg-#8B786D} py-3 px-6 md:px-12 flex items-center justify-between shadow-md">
//         {/* Logo */}
//         <div className="flex items-center">
//           {/* If you have a logo image: */}
//           <img src={log} alt="Clasio Logo" className="h-15 w-auto mr-4" />
//           {/* <span className="text-xl font-bold text-blue-800">C<span className="text-gray-700">lasio</span></span> */}
//         </div>

//         {/* Navigation Links */}
//         <div className="hidden md:flex space-x-8 text-gray-700 font-medium ">
//           <Link to="/" className="text-[#053F5C]  transition duration-300">Home</Link>
          
//           <Link to="/#service" className="text-[#053F5C]  transition duration-300">service</Link>
//           <Link to="/#contact" className="text-[#053F5C]  transition duration-300">contact</Link>
//         </div>

//         {/* Login Button */}
//         <Link to="/login">
//           <button className="px-6 py-2 bg-[#053F5C]  text-white rounded-md hover:bg-[#0e0b2a] transition duration-300 shadow-md">
//             login
//           </button>
//         </Link>
//       </nav> 
//      </div>
//     ) ;
//     }

// export default Navbar;

// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import log from '../assets/log.png';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token'); // check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('teacherId');
    localStorage.removeItem('studentId');
    localStorage.removeItem('pendingTeacherId');
    localStorage.removeItem('pendingRole');
    navigate('/login');
  };

  return (
    <div className="bg-[#E99858] font-sans">
      {/* Navbar */}
      <nav className="bg-[#E99858] py-3 px-6 md:px-12 flex items-center justify-between shadow-md">
        {/* Logo */}
        <div className="flex items-center">
          <img src={log} alt="Clasio Logo" className="h-15 w-auto mr-4" />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link to="/" className="text-[#053F5C] transition duration-300">Home</Link>
          <a href="/#service" className="text-[#053F5C] transition duration-300">Service</a>
          <a href="/#contact" className="text-[#053F5C] transition duration-300">Contact</a>
        </div>

        {/* Login/Logout Button */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 shadow-md"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="px-6 py-2 bg-[#053F5C] text-white rounded-md hover:bg-[#0e0b2a] transition duration-300 shadow-md">
              Login
            </button>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;


 
