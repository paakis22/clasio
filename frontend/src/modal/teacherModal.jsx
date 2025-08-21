import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SubjectTeachers = () => {
  const { subjectId } = useParams();
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch teachers by subject
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/teachers/subject/id/${subjectId}`);
        setTeachers(res.data);
      } catch (err) {
        console.error('❌ Failed to load teachers:', err);
      }
    };

    fetchTeachers();
  }, [subjectId]);

  // ✅ Handle Join Request
  const handleJoin = async (teacherId) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      alert('Please log in to join.');
      return navigate('/login');
    }

    if (role !== 'student') {
      return alert('Only students can join.');
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/join-requests',
        { teacherId, subjectId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      alert('✅ Join request sent!');
    } catch (err) {
      console.error('❌ Error sending join request:', err);
      alert(err.response?.data?.message || 'Failed to send join request.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6">Available Teachers</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher._id} className="bg-white shadow-lg rounded-xl p-4">
            {teacher.image?.url && (
              <img
                src={teacher.image.url}
                alt={teacher.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-xl font-bold">{teacher.name}</h3>
            <p className="text-gray-600 mb-2">{teacher.bio}</p>
            <p><strong>Gender:</strong> {teacher.gender}</p>
            <p><strong>Address:</strong> {teacher.address}</p>
            <p><strong>Fee:</strong> Rs. {teacher.fee}</p>
            <p><strong>Subject:</strong> {teacher.subject?.title}</p>

            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => handleJoin(teacher._id)}
            >
              Join Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectTeachers;
