// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';

// const TeacherListFiltered = ({ subject, viewMode = "student" }) => {
//   const [teachers, setTeachers] = useState([]);
//   const { subject } = useParams();

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/teachers')
//       .then(res => {
//         const filtered = res.data.filter(
//           t => t.subject?.toLowerCase() === subject.toLowerCase()
//         );
//         setTeachers(filtered);
//       })
//       .catch(err => console.error('Failed to load teachers:', err));
//   }, [subject]);

//   const handleViewProfile = (teacher) => {
//     alert(`You clicked on ${teacher.name}'s profile`);
//   };

//   return (
//     <div className="py-6 px-4">
//       <h2 className="text-xl font-semibold text-center mb-4">
//         {subject} Teachers
//       </h2>

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

//             {/* ✅ Resume only for non-student views */}
//             {viewMode !== 'student' && teacher.resume?.url && (
//               <a
//                 href={teacher.resume.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 underline block mt-2"
//               >
//                 View Resume
//               </a>
//             )}

//             {/* ✅ Join Button */}


//             <Link to="/payment">
//             <button
//               onClick={() => handleViewProfile(teacher)}
//               className="mt-3 bg-[#1f1a3f] text-white px-4 py-1 rounded hover:bg-[#0e0b2a] text-xs"
//             >
//               Join
//             </button>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TeacherListFiltered;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const TeacherListFiltered = ({ viewMode = "student" }) => {
  const [teachers, setTeachers] = useState([]);
  const { subject } = useParams(); // ✅ Use subject only from params

  useEffect(() => {
    axios.get('http://localhost:5000/api/teachers')
      .then(res => {
        const filtered = res.data.filter(
          t => t.subject?.toLowerCase() === subject.toLowerCase()
        );
        setTeachers(filtered);
      })
      .catch(err => console.error('Failed to load teachers:', err));
  }, [subject]);

  const handleViewProfile = (teacher) => {
    alert(`You clicked on ${teacher.name}'s profile`);
  };

  return (
    <div className="py-6 px-4">
      <h2 className="text-xl font-semibold text-center mb-4">
        {subject} Teachers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher._id} className="bg-white shadow rounded p-4 text-sm text-center">
            <div className="w-24 h-24 mx-auto mb-2">
              <img
                src={teacher.image?.url}
                alt={teacher.name}
                className="w-full h-full object-cover rounded-full border"
              />
            </div>

            <h3 className="font-bold">{teacher.name}</h3>
            <p>{teacher.email}</p>
            <p>{teacher.gender}</p>
            <p className="text-xs text-gray-600">{teacher.bio}</p>

            {viewMode !== 'student' && teacher.resume?.url && (
              <a
                href={teacher.resume.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block mt-2"
              >Log
                View Resume
              </a>
            )}

            <Link to="/payment">
              <button
                onClick={() => handleViewProfile(teacher)}
                className="mt-3 bg-[#1f1a3f] text-white px-4 py-1 rounded hover:bg-[#0e0b2a] text-xs"
              >
                Join
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherListFiltered;
