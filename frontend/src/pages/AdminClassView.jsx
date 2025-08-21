


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';


// const AdminClassView = () => {
//   const [classes, setClasses] = useState([]);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const fetch = async () => {
//       const res = await axios.get('http://localhost:5000/api/class', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setClasses(res.data); 
//     };
//     fetch();
//   }, [token]);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">All Scheduled Classes</h2>
//       <table className="w-full table-auto border text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th>Title</th>
//             <th>Module</th>
//             <th>Duration</th>
//             <th>Teacher</th>
//             <th>Zoom</th>
//           </tr>
//         </thead>
//         <tbody>
//           {classes.map(cls => (
//             <tr key={cls._id} className="text-center border-t">
//               <td>{cls.title}</td>
//               <td>{cls.module}</td>
//               <td>{cls.duration}</td>
//               <td>{cls.teacher?.name}</td>
//               <td><a href={cls.zoomLink} className="text-blue-600 underline">Link</a></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };


// export default AdminClassView;