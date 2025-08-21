
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const TeacherClasses = () => {
//   const { id } = useParams(); // ✅ declare first
//   const [classes, setClasses] = useState([]);
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     // console.log("✅ Teacher ID:", id);
//     const fetchTeacherClasses = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/api/class/teacher/${id}/classes`);
//         setClasses(res.data);
//       } catch (err) {
//         console.error('❌ Error fetching teacher classes:', err.response?.data || err.message);
//       }
//     };
//     if (id) fetchTeacherClasses();
//   }, [id, token]);

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">👨‍🏫 Teacher's Classes</h2>
//       {classes.map(cls => (
//         <div key={cls._id} className="p-4 bg-gray-100 mb-3 rounded shadow">
//           <h3 className="font-semibold">{cls.title}</h3>
//           <p>Module: {cls.module}</p>
//           <p>Duration: {cls.duration}</p>
//           <p>Fee: {cls.fee}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TeacherClasses;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeacherClasses = () => {
  const { id } = useParams(); // teacher ID from URL
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classRes, teacherRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/class/teacher/${id}/classes`),
          axios.get(`http://localhost:5000/api/teachers/${id}/public`)
        ]);
        setClasses(classRes.data);
        setTeacher(teacherRes.data);
      } catch (err) {
        console.error('❌ Error fetching teacher/classes:', err.response?.data || err.message);
      }
    };

    if (id) fetchData();
  }, [id]);

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate('/courses')}
        className="mb-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
      >
        ← Back to Teachers
      </button>

      {/* 👨‍🏫 Teacher Info */}
      {teacher && (
        <div className="mb-8 text-center">
          <div className="w-24 h-24 mx-auto mb-2">
            <img
              src={teacher.image?.url}
              alt={teacher.name}
              className="w-full h-full object-cover rounded-full border"
            />
          </div>
          <h2 className="text-2xl font-bold text-[#1f1a3f]">{teacher.name}</h2>
          <p className="text-sm text-gray-600">{teacher.email}</p>
          <p className="text-sm text-gray-600 capitalize">{teacher.gender}</p>
          <p className="mt-2 text-gray-700">{teacher.bio}</p>
        </div>
      )}

      {/* 📚 Class List */}
      <h3 className="text-xl font-semibold mb-4 text-[#1f1a3f]">Available Classes</h3>

      {classes.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {classes.map(cls => (
            <div key={cls._id} className="p-4 bg-white rounded shadow">
              <h4 className="text-lg font-semibold mb-1">{cls.title}</h4>
              <p><strong>Module:</strong> {cls.module}</p>
              <p><strong>Duration:</strong> {cls.duration}</p>
              <p><strong>Fee:</strong> ₹{cls.fee}</p>
              {/* You can add a "Join" or "Pay" button here */}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">No classes available for this teacher.</p>
      )}
    </div>
  );
};

export default TeacherClasses;



