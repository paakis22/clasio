

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // ✅ for navigation

// const StudentProfile = () => {
//   const [form, setForm] = useState({ name: '', email: '', gender: '', address: '' });
//   const [studentData, setStudentData] = useState(null);
//   const navigate = useNavigate(); // ✅ initialize

//   const email = "sripaakis@gmail.com"; // Later: Get from localStorage/session

//   // 🟢 Fetch profile on load
//   // useEffect(() => {
//   //   const fetchProfile = async () => {
//   //     try {
//   //       const res = await axios.get(`http://localhost:5000/api/students/${email}`);
//   //       setStudentData(res.data);
//   //     } catch (err) {
//   //       setStudentData(null);
//   //     }
//   //   };
//   //   fetchProfile();
//   // }, []);



//     useEffect(() => {
//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/students', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setStudentData(res.data);
//     } catch (err) {
//       console.log('❌ Profile fetch error:', err.response?.data || err.message);
//       setStudentData(null);
//     }
//   };
//   fetchProfile();
// }, []);


//   // 🔁 Form Input Handling
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // // 📨 Form Submission
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     await axios.post('http://localhost:5000/api/profile', form);
      
//   //     alert('Student profile created!');
//   //     setStudentData(form);
//   //   } catch (err) {
//   //     alert(err.response?.data?.error || 'Submission failed');
//   //   }
//   // };


//     // 📨 Form Submission
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     await axios.post('http://localhost:5000/api/student', form);  // ✅ Submits form data to backend

//     alert('Student profile created!');
//     setStudentData(form);  // ✅ Optional: Store form data locally after creation
//   } catch (err) {
//     alert(err.response?.data?.error || 'Submission failed');  // ✅ Clear error message
//   }
// };


//   // // ✅ View-only Profile with Join button
//   // if (studentData) {
//   //   return (
//   //     <div className="p-6 bg-white max-w-lg mx-auto rounded shadow space-y-4 mt-6 text-center">
//   //       <h2 className="text-xl font-bold text-[#1f1a3f]">Your Profile</h2>
//   //       <p><strong>Name:</strong> {studentData.name}</p>
//   //       <p><strong>Email:</strong> {studentData.email}</p>
//   //       <p><strong>Gender:</strong> {studentData.gender}</p>
//   //       <p><strong>Address:</strong> {studentData.address}</p>

//   //       {/* ✅ Join Button */}
//   //       <button
//   //         className="mt-4 bg-[#1f1a3f] text-white px-6 py-2 rounded hover:bg-[#0e0b2a] transition"
//   //         onClick={() => navigate('/payment?role=student')}
//   //       >
//   //         Join
//   //       </button>
//   //     </div>
//   //   );


//   // 📝 Profile Form
//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white max-w-lg mx-auto rounded shadow mt-6">
//       <h2 className="text-lg font-bold mb-2 text-[#1f1a3f]">Create Student Profile</h2>
//       {['name', 'email', 'gender', 'address'].map((field) => (
//         <div key={field}>
//           <label className="block capitalize font-medium">{field}:</label>
//           <input
//             name={field}
//             value={form[field]}
//             onChange={handleChange}
//             className="border px-3 py-2 w-full rounded"
//             required
//           />
//         </div>
//       ))}
//       <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default StudentProfile;

``
