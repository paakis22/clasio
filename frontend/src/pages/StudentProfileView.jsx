// // pages/StudentProfileView.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Footer from '../components/ Footer';


// const StudentProfileView = () => {
//   const [profile, setProfile] = useState(null);

//   const email = JSON.parse(localStorage.getItem("user"))?.email;

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/students/${email}`);
//         setProfile(res.data);
//       } catch (err) {
//         console.error('Failed to load profile');
//       }
//     };
//     fetchProfile();
//   }, [email]);

//   if (!profile) return <p className="text-center mt-10">Loading profile...</p>;

//   return (
    
//     <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
//       <h2 className="text-2xl font-bold mb-4 text-[#1f1a3f]">Student Profile</h2>
//       <p><strong>Name:</strong> {profile.name}</p>
//       <p><strong>Email:</strong> {profile.email}</p>
//       <p><strong>Gender:</strong> {profile.gender}</p>
//       <p><strong>Address:</strong> {profile.address}</p>
//     </div>
//   );
// };
// <Footer/> 

// export default StudentProfileView;





// // pages/StudentProfileView.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Footer from '../components/ Footer';
// import { useNavigate } from 'react-router-dom';

// const StudentProfileView = () => {
//   const [profile, setProfile] = useState(null);
//   const navigate = useNavigate();

//   const email = JSON.parse(localStorage.getItem("user"))?.email;

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/students/${email}`);
//         setProfile(res.data);
//       } catch (err) {
//         console.error('Failed to load profile');
//       }
//     };
//     fetchProfile();
//   }, [email]);

//   if (!profile) return <p className="text-center mt-10">Loading profile...</p>;

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded flex flex-col items-center space-y-4">
//         <h2 className="text-2xl font-bold text-[#1f1a3f]">Student Profile</h2>
//         <p><strong>Name:</strong> {profile.name}</p>
//         <p><strong>Email:</strong> {profile.email}</p>
//         <p><strong>Gender:</strong> {profile.gender}</p>
//         <p><strong>Address:</strong> {profile.address}</p>

//         {/* ✅ Join Button */}
//         <button
//           onClick={() => navigate('/payment?role=student')}
//           className="mt-6 bg-[#1f1a3f] text-white px-6 py-2 rounded hover:bg-[#0e0b2a] text-sm transition"
//         >
//           Join
//         </button>
//       </div>

//       {/* ✅ Footer Section */}
//       <div className="mt-12">
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default StudentProfileView;
