// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Classmanagment = () => {
//   const [users, setUsers] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [error, setError] = useState('');

//   const user = JSON.parse(localStorage.getItem('user'));
//   const token = user?.token;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userRes = await axios.get('http://localhost:5000/api/admin/users', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUsers(userRes.data);

//         const classRes = await axios.get('http://localhost:5000/api/class', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setClasses(classRes.data);
//       } catch (err) {
//         setError('Error loading admin data');
//       }
//     };
//     fetchData();
//   }, [token]);

//   const deleteUser = async (id) => {
//     if (!window.confirm('Delete this user?')) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/user/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUsers(users.filter((u) => u._id !== id));
//     } catch (err) {
//       alert('Failed to delete user');
//     }
//   };

//   const deleteClass = async (id) => {
//     if (!window.confirm('Delete this class?')) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/class/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setClasses(classes.filter((cls) => cls._id !== id));
//     } catch (err) {
//       alert('Failed to delete class');
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-center mb-6">🛠️ Admin Dashboard</h1>

//       {error && <p className="text-red-600 text-center">{error}</p>}

//       {/* 👥 Users List */}
//       <div className="mb-12">
//         <h2 className="text-xl font-semibold mb-4">All Users</h2>
//         <div className="overflow-x-auto bg-white rounded shadow">
//           <table className="min-w-full table-auto">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="px-4 py-2">Name</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((u) => (
//                 <tr key={u._id} className="border-t">
//                   <td className="px-4 py-2">{u.name}</td>
//                   <td>{u.email}</td>
//                   <td>{u.role}</td>
//                   <td>
//                     <button
//                       onClick={() => deleteUser(u._id)}
//                       className="bg-red-600 text-white px-2 py-1 rounded text-sm"
//                     >
//                       🗑 Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {users.length === 0 && <tr><td colSpan="4" className="text-center py-4">No users found</td></tr>}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* 📚 Class List */}
//       <div>
//         <h2 className="text-xl font-semibold mb-4">All Classes</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {classes.map((cls) => (
//             <div key={cls._id} className="bg-white rounded shadow p-4">
//               <h3 className="text-lg font-bold">{cls.title}</h3>
//               <p><strong>Module:</strong> {cls.module}</p>
//               <p><strong>Duration:</strong> {cls.duration}</p>
//               <p><strong>Teacher:</strong> {cls.teacher?.name}</p>
//               <div className="mt-3">
//                 <button
//                   onClick={() => deleteClass(cls._id)}
//                   className="bg-red-600 text-white px-3 py-1 rounded"
//                 >
//                   🗑 Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//           {classes.length === 0 && <p>No classes available</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Classmanagment;









// import React, { useEffect, useState } from 'react';
// import axios from 'axios';


// const Classmanagment = () => {
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


// export default Classmanagment;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Classmanagment = () => {
  const [classes, setClasses] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/class', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(res.data);
      } catch (err) {
        console.error('❌ Error fetching classes:', err);
      }
    };
    fetch();
  }, [token]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">All Scheduled Classes</h2>
      
      <div className="overflow-x-auto shadow rounded-2xl bg-white p-4">
        <table className="min-w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Module</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Teacher</th>
              <th className="px-4 py-3">Zoom Link</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {classes.length > 0 ? (
              classes.map((cls) => (
                <tr key={cls._id} className="border-b hover:bg-gray-50 transition-all">
                  <td className="px-4 py-3">{cls.title}</td>
                  <td className="px-4 py-3">{cls.module}</td>
                  <td className="px-4 py-3">{cls.duration}</td>
                  <td className="px-4 py-3">{cls.teacher?.name || '—'}</td>
                  <td className="px-4 py-3">
                    {cls.zoomLink ? (
                      <a
                        href={cls.zoomLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        Join
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">Not available</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No classes scheduled.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Classmanagment;
