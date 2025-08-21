// // src/components/SubjectList.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const SubjectList = () => {
//   const [subjects, setSubjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/subjects');
//         setSubjects(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching subjects:', error);
//         setLoading(false);
//       }
//     };

//     fetchSubjects();
//   }, []);

//   if (loading) return <p>Loading subjects...</p>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
//       {subjects.map((subject) => (
//         <div key={subject._id} className="bg-white shadow-md rounded-lg p-4">
//           <img src={subject.image} alt={subject.name} className="w-full h-48 object-cover rounded" />
//           <h2 className="text-xl font-semibold mt-2">{subject.name}</h2>
//           <p className="text-gray-600">{subject.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SubjectList;
