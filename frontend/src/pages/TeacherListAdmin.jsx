// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const TeacherListAdmin = () => {
//   const [teachers, setTeachers] = useState([]);

//   const fetchTeachers = async () => {
//     const res = await axios.get('http://localhost:5000/api/teachers');
//     setTeachers(res.data);
//   };

//   useEffect(() => {
//     fetchTeachers();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">All Teachers</h2>
//       <table className="w-full table-auto border text-sm">
//         <thead className="bg-gray-200">
//           <tr>
//             <th>Name</th><th>Email</th><th>Subject</th><th>Status</th><th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {teachers.map((t) => (
//             <tr key={t._id} className="text-center border-b">
//               <td>{t.name}</td>
//               <td>{t.email}</td>
//               <td>{t.subject || '—'}</td>
//               <td>
//                 <span className={`px-2 py-1 rounded text-xs font-semibold ${
//                   t.status === 'approved' ? 'bg-green-200 text-green-700' : 'bg-yellow-100 text-yellow-700'
//                 }`}>
//                   {t.status}
//                 </span>
//               </td>
//               <td>
//                 <Link
//                   to={`/admin/teacher/${t._id}`}
//                   className="text-blue-600 underline hover:text-blue-800"
//                 >
//                   View Profile
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TeacherListAdmin;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TeacherListAdmin = () => {
  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/teachers');
      setTeachers(res.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Registered Teachers</h2>

      <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
        <table className="min-w-full table-auto text-sm text-left border">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 border">Name</th>
              <th className="px-6 py-3 border">Email</th>
              <th className="px-6 py-3 border">Subject</th>
              <th className="px-6 py-3 border">Status</th>
              <th className="px-6 py-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {teachers.map((t, index) => (
              <tr key={t._id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <td className="px-6 py-4 border font-medium text-gray-900">{t.name}</td>
                <td className="px-6 py-4 border text-gray-700">{t.email}</td>
                <td className="px-6 py-4 border">{t.subject || <span className="text-gray-400 italic">Not Assigned</span>}</td>
                <td className="px-6 py-4 border">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    t.status === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-6 py-4 border">
                  <Link
                    to={`/admin/teacher/${t._id}`}
                    className="text-indigo-600 hover:underline hover:text-indigo-800 font-medium"
                  >
                    View Profile
                  </Link>
                </td>
              </tr>
            ))}

            {teachers.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No teachers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherListAdmin;
