// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';


// const TeacherListFiltered = ({ subject, viewMode = "student" }) => {
//   const [teachers, setTeachers] = useState([]);

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





// import React from 'react';
// import TeacherListFiltered from '../components/TeacherListFiltered';
// import { useParams } from 'react-router-dom';

// const Courses = () => {
//   const { subject } = useParams();

//   return (
//     <div className="min-h-screen bg-white py-10 px-6">
//       <TeacherListFiltered subject={subject} />
//     </div>
//   );
// };

// export default Courses;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeacherCard from './TeacherCard'; // reusable card for a teacher

const Courses = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('All');

  // 🔁 Fetch all teachers once
  useEffect(() => {
    axios.get('http://localhost:5000/api/teachers')
      .then((res) => {
        setTeachers(res.data);
        setFilteredTeachers(res.data);
      })
      .catch((err) => {
        console.error('Error fetching teachers:', err);
      });
  }, []);

  // 🎯 Handle filter on dropdown selection
  const handleSubjectChange = (e) => {
    const subject = e.target.value;
    setSelectedSubject(subject);

    if (subject === 'All') {
      setFilteredTeachers(teachers);
    } else {
      const filtered = teachers.filter(
        t => t.subject?.toLowerCase() === subject.toLowerCase()
      );
      setFilteredTeachers(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#1f1a3f]">Our Teachers</h2>

      <div className="mb-6 text-center">
        <select
          onChange={handleSubjectChange}
          value={selectedSubject}
          className="border px-4 py-2 rounded"
        >
          <option value="All">All Subjects</option>
          <option value="Maths">Maths</option>
          <option value="English">English</option>
          <option value="ICT">ICT</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((teacher) => (
            <TeacherCard key={teacher._id} teacher={teacher} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No teachers found.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;

