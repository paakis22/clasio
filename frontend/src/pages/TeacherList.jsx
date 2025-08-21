// // src/components/TeacherList.jsx

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TeacherList = () => {
//   const [teachers, setTeachers] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/teachers')
//       .then(res => setTeachers(res.data))
//       .catch(err => console.error('Failed to load teachers:', err));
//   }, []);

//   return (
//     <div className="py-6 px-4">
//       <h2 className="text-xl font-semibold text-center mb-4">Available Teachers</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {teachers.map((teacher) => (
//           <div key={teacher._id} className="bg-white shadow rounded p-4 text-sm text-center">
//             <div className="w-24 h-24 mx-auto mb-2">
//               <img
//                 src={teacher.image?.url}
//                 alt={teacher.name}
//                 className="w-full h-full object-cover rounded-full border"
//               />
//             </div>
//             <h3 className="font-bold">{teacher.name}</h3>
//             <p>{teacher.email}</p>
//             <p>{teacher.gender}</p>
//             <p className="text-xs text-gray-600">{teacher.bio}</p>
//             {teacher.resume?.url && (
//               <a
//                 href={teacher.resume.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 underline block mt-2"
//               >
//                 View Resume
//               </a>
//             )}
//           </div>
//         ))}
//       </div>
//     </div> 
//   );
// };

// export default TeacherList;
