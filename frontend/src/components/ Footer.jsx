

// // src/components/Footer.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   return (
//     <footer className="bg-[#8B786D] text-black py-6 px-8">
//       <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap">
        
//         {/* Left side links */}
//         <div className="space-y-2 text-sm">
//           <p><Link to="/">Home</Link></p>
//           <p><Link to="/service">service</Link></p>
//           <p><Link to="/contact">contact</Link></p>
//         </div>

//         {/* Center copyright */}
//         <div className="text-center w-full mt-4 text-sm text-blue-900 font-medium">
//           @ 2025 <span className="font-semibold">clasio</span>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="bg-[#2E2B2F] text-gray-300 px-6 py-3 ">
//       <div className="text-center mb-10">
//         <h2 className="text-2xl font-bold text-white">Clasio</h2>
//         <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base">
//           Empowering students and teachers with innovative educational technology. Your one-stop platform for quality education and meaningful learning experiences.
//         </p>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm sm:text-base text-center sm:text-left max-w-5xl mx-auto">
//         {/* Quick Links */}
//         <div>
//           <h3 className="font-semibold text-white mb-3">Quick Links</h3>
//           <ul className="space-y-2">
//             <li><a href="#" className="hover:text-white">Home</a></li>
//             <li><a href="#" className="hover:text-white">Subjects</a></li>
//             <li><a href="#" className="hover:text-white">About</a></li>
//             <li><a href="#" className="hover:text-white">Contact</a></li>
//           </ul>
//         </div>

//         {/* Subjects */}
//         <div>
//           <h3 className="font-semibold text-white mb-3">Subjects</h3>
//           <ul className="space-y-2">
//             <li><a href="#" className="hover:text-white">Mathematics</a></li>
//             <li><a href="#" className="hover:text-white">English</a></li>
//             <li><a href="#" className="hover:text-white">ICT</a></li>
//             <li><a href="#" className="hover:text-white">Science</a></li>
//           </ul>
//         </div>

//         {/* Support */}
//         <div>
//           <h3 className="font-semibold text-white mb-3">Support</h3>
//           <ul className="space-y-2">
//             <li><a href="#" className="hover:text-white">Help Center</a></li>
//             <li><a href="#" className="hover:text-white">24/7 Support</a></li>
//             <li><a href="#" className="hover:text-white">Contact Us</a></li>
//             <li><a href="#" className="hover:text-white">FAQ</a></li>
//           </ul>
//         </div>

//         {/* Legal */}
//         <div>
//           <h3 className="font-semibold text-white mb-3">Legal</h3>
//           <ul className="space-y-2">
//             <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
//             <li><a href="#" className="hover:text-white">Terms of Service</a></li>
//             <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
//             <li><a href="#" className="hover:text-white">GDPR</a></li>
//           </ul>
//         </div>
//       </div>

//       <hr className="my-8 border-gray-600" />

//       <p className="text-center text-sm text-gray-400">
//         © 2024 Clasio <span className="text-red-500"></span> for education.
//       </p>
//     </footer>
//   );
// };

// export default Footer;






import React from 'react';
import { BookOpen, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#053F5C] text-white ">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen size={32} className="text-[#E99858]" />
              <h3 className="text-2xl font-bold">Clasio</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Sri Lanka's premier online education platform, empowering students to achieve academic excellence through innovative learning methods.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#E99858] bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30 transition-colors">
                <span className="text-[#E99858]">📘</span>
              </div>
              <div className="w-10 h-10 bg-[#E99858] bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30 transition-colors">
                <span className="text-[#E99858]">📱</span>
              </div>
              <div className="w-10 h-10 bg-[#E99858] bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30 transition-colors">
                <span className="text-[#E99858]">📺</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#E99858]">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight size={14} />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight size={14} />
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight size={14} />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight size={14} />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#E99858]">Popular Subjects</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/subjects/ol-maths" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight size={14} />
                  O/L Mathematics
                </Link>
              </li>
              <li>
                <Link to="/subjects/english" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight size={14} />
                  English Language
                </Link>
              </li>
              <li>
                <Link to="/subjects/ict" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight size={14} />
                  ICT & Technology
                </Link>
              </li>
              <li>
                <Link to="/subjects/al-maths" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                  <ArrowRight size={14} />
                  A/L Mathematics
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#E99858]">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#E99858] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Thirunalvely, Jaffna</p>
                  <p className="text-gray-300">Sri Lanka</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#E99858] flex-shrink-0" />
                <p className="text-gray-300">+94 77 339 7819</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#E99858] flex-shrink-0" />
                <p className="text-gray-300">sripaakis@gmail.com</p>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-8">
              <h5 className="font-semibold mb-3">Stay Updated</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-full bg-white bg-opacity-10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-[#E99858]"
                />
                <button className="bg-[#E99858] px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Clasio Education Platform. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/support" className="text-gray-400 hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
