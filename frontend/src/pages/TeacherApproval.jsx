// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TeacherApproval = () => {
//   const [pendingTeachers, setPendingTeachers] = useState([]);

//   const fetchPending = async () => {
//     const res = await axios.get('http://localhost:5000/api/teachers');
//     const pendingOnly = res.data.filter(teacher => teacher.status === 'pending');
//     setPendingTeachers(pendingOnly);
//   };

//   const approveTeacher = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/api/admin/approve/${id}`, {}, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       alert('Teacher approved!');
//       fetchPending();
//     } catch (err) {
//       alert('Approval failed.');
//     }
//   };

//   useEffect(() => {
//     fetchPending();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Pending Teacher Approvals</h2>
//       {pendingTeachers.length === 0 ? (
//         <p>No pending teachers found.</p>
//       ) : (
//         <ul className="space-y-3">
//           {pendingTeachers.map((t) => (
//             <li key={t._id} className="p-4 bg-gray-100 rounded shadow flex justify-between items-center">
//               <div>
//                 <p><strong>{t.name}</strong> ({t.email})</p>
//                 <p className="text-sm text-gray-600">{t.bio}</p>
//               </div>
//               <button
//                 onClick={() => approveTeacher(t._id)}
//                 className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
//               >
//                 Approve
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TeacherApproval;














// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TeacherApproval = () => {
//   const [pendingTeachers, setPendingTeachers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const token = localStorage.getItem('token');

//   const fetchPending = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/teachers', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const pendingOnly = res.data.filter((teacher) => teacher.status === 'pending');
//       setPendingTeachers(pendingOnly);
//     } catch (err) {
//       console.error('Error fetching teachers:', err);
//       setMessage('❌ Failed to load teachers');
//     }
//   };

//   const approveTeacher = async (id) => {
//     setLoading(true);
//     setMessage('');
//     try {
//       const res = await axios.put(
//         `http://localhost:5000/api/admin/approve/${id}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setMessage(res.data.message || '✅ Teacher approved!');
//       fetchPending(); // refresh list
//     } catch (err) {
//       console.error('Approval error:', err);
//       setMessage(err.response?.data?.error || '❌ Approval failed.');
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchPending();
//   }, []);

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center">👩‍🏫 Pending Teacher Approvals</h2>

//       {message && (
//         <div className="mb-4 text-center text-sm font-semibold text-blue-800 bg-blue-100 p-2 rounded">
//           {message}
//         </div>
//       )}

//       {pendingTeachers.length === 0 ? (
//         <p className="text-center text-gray-600">✅ No pending teachers found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {pendingTeachers.map((t) => (
//             <li
//               key={t._id}
//               className="p-4 bg-gray-100 rounded shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
//             >
//               <div>
//                 <p className="text-lg font-semibold">{t.name} ({t.email})</p>
//                 <p className="text-sm text-gray-600">{t.bio}</p>
//                 {t.resume?.url && (
//                   <a
//                     href={t.resume.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline text-sm mt-1 inline-block"
//                   >
//                     📄 View Resume
//                   </a>
//                 )}
//               </div>
//               <div className="mt-3 sm:mt-0">
//                 <button
//                   onClick={() => approveTeacher(t._id)}
//                   className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
//                   disabled={loading}
//                 >
//                   {loading ? 'Processing...' : 'Approve'}
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TeacherApproval;







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const TeacherApproval = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const token = localStorage.getItem('token');

//   // 🔍 Debug role in browser console
//   useEffect(() => {
//     if (token) {
//       try {
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         console.log('🧠 Logged in role:', payload.role);
//       } catch (err) {
//         console.warn('Invalid token');
//       }
//     }
//   }, [token]);

//   // 📦 Fetch all teachers
//   const fetchTeachers = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/teachers', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTeachers(res.data);
//     } catch (err) {
//       console.error('❌ Error fetching teachers:', err);
//       setMessage('❌ Failed to load teachers');
//     }
//   };

//   useEffect(() => {
//     fetchTeachers();
//   }, []);

//   // ✅ Approve or reject
//   const handleStatusChange = async (id, action) => {
//     setLoading(true);
//     setMessage('');

//     try {
//       const cleanId = id.replace(/^:/, ''); // Clean if colon present
//       const res = await axios.put(
//         `http://localhost:5000/api/admin/${action}/${cleanId}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setMessage(res.data.message || `✅ Teacher ${action}ed!`);
//       await fetchTeachers(); // Refresh updated list
//     } catch (err) {
//       console.error(`${action} error:`, err);
//       setMessage(err.response?.data?.error || `❌ ${action} failed.`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center">👩‍🏫 Teacher Profiles</h2>

//       {message && (
//         <div className="mb-4 text-center text-sm font-semibold text-blue-800 bg-blue-100 p-2 rounded">
//           {message}
//         </div>
//       )}

//       {teachers.length === 0 ? (
//         <p className="text-center text-gray-600">No teachers found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {teachers.map((t) => (
//             <li
//               key={t._id}
//               className="p-4 bg-gray-100 rounded shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
//             >
//               <div>
//                 <p className="text-lg font-semibold">
//                   {t.name} ({t.email})
//                 </p>
//                 <p className="text-sm text-gray-600 mb-1">{t.bio}</p>
//                 {t.resume?.url && (
//                   <a
//                     href={t.resume.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline text-sm"
//                   >
//                     📄 View Resume
//                   </a>
//                 )}
//                 <p className="mt-2">
//                   <strong>Status:</strong>{' '}
//                   <span
//                     className={
//                       t.status === 'approved'
//                         ? 'text-green-700'
//                         : t.status === 'rejected'
//                         ? 'text-red-600'
//                         : 'text-yellow-700'
//                     }
//                   >
//                     {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
//                   </span>
//                 </p>
//               </div>

//               <div className="mt-3 sm:mt-0 space-x-2">
//                 {t.status === 'pending' ? (
//                   <>
//                     <button
//                       onClick={() => handleStatusChange(t._id, 'approve')}
//                       className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
//                       disabled={loading}
//                     >
//                       {loading ? 'Processing…' : 'Approve'}
//                     </button>
//                     <button
//                       onClick={() => handleStatusChange(t._id, 'reject')}
//                       className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
//                       disabled={loading}
//                     >
//                       {loading ? 'Processing…' : 'Reject'}
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     className={`px-4 py-2 rounded cursor-default ${
//                       t.status === 'approved'
//                         ? 'bg-green-200 text-green-800'
//                         : 'bg-red-200 text-red-800'
//                     }`}
//                     disabled
//                   >
//                     {t.status === 'approved' ? 'Approved' : 'Rejected'}
//                   </button>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TeacherApproval;





import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeacherApproval = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  // Debug: Log user role from token
  // useEffect(() => {
  //   if (token) {
  //     try {
  //       const payload = JSON.parse(atob(token.split('.')[1]));
  //       console.log('🧠 Logged-in role:', payload.role);
  //     } catch (err) {
  //       console.warn('Invalid token');
  //     }
  //   }
  // }, [token]);




  useEffect(() => {
  if (token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      // console.log('🧠 Logged-in role:', payload?.role);
    } catch (err) {
      console.warn('⚠️ Invalid token format or decoding error:', err.message);
    }
  } else {
    console.warn('⚠️ No token found in localStorage');
  }
}, [token]);

  // Fetch all teachers
  const fetchTeachers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/teachers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeachers(res.data);
    } catch (err) {
      console.error('❌ Error fetching teachers:', err);
      setMessage('❌ Failed to load teachers');
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Approve or reject teacher
  const handleStatusChange = async (id, action) => {
    setLoading(true);
    setMessage('');

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role !== 'admin') {
        setMessage('❌ Access denied: Only admins can approve/reject teachers');
        setLoading(false);
        return;
      }

      const cleanId = id.replace(/^:/, '');

      const res = await axios.put(
        `http://localhost:5000/api/admin/${action}/${cleanId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(res.data.message || `✅ Teacher ${action}ed successfully`);
      await fetchTeachers();

    

    } catch (err) {
      console.error(`${action} error:`, err);
      if (err.response?.status === 403) {
        setMessage('❌ Forbidden: You do not have admin privileges');
      } else if (err.response?.status === 404) {
        setMessage('❌ Teacher not found');
      } else {
        setMessage(err.response?.data?.error || `❌ ${action} failed`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">👩‍🏫 Teacher Profiles</h2>

      {message && (
        <div className="mb-4 text-center text-sm font-semibold text-blue-800 bg-blue-100 p-2 rounded">
          {message}
        </div>
      )}

      {teachers.length === 0 ? (
        <p className="text-center text-gray-600">No teachers found.</p>
      ) : (
        <ul className="space-y-4">
          {teachers.map((t) => (
            <li
              key={t._id}
              className="p-4 bg-gray-100 rounded shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div>
                <p className="text-lg font-semibold">
                  {t.name} ({t.email})
                </p>
                <p className="text-sm text-gray-600 mb-1">{t.bio}</p>
                {t.resume?.url && (
                  <a
                    href={t.resume.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    📄 View Resume
                  </a>
                )}
                <p className="mt-2">
                  <strong>Status:</strong>{' '}
                  <span
                    className={
                      t.status === 'approved'
                        ? 'text-green-700'
                        : t.status === 'rejected'
                        ? 'text-red-600'
                        : 'text-yellow-700'
                    }
                  >
                    {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                  </span>
                </p>
              </div>

              <div className="mt-3 sm:mt-0 space-x-2">
                {t.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => handleStatusChange(t._id, 'approve')}
                      className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                      disabled={loading}
                    >
                      {loading ? 'Processing…' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleStatusChange(t._id, 'reject')}
                      className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
                      disabled={loading}
                    >
                      {loading ? 'Processing…' : 'Reject'}
                    </button>
                  </>
                ) : (
                  <button
                    className={`px-4 py-2 rounded cursor-default ${
                      t.status === 'approved'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                    }`}
                    disabled
                  >
                    {t.status === 'approved' ? 'Approved' : 'Rejected'}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TeacherApproval;
