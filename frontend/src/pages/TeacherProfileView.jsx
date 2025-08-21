import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TeacherProfileView = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/teachers/${id}`)
      .then(res => setTeacher(res.data))
      .catch(() => alert('Error loading profile'));
  }, [id]);

  if (!teacher) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Teacher Profile</h2>

      <div className="flex justify-center mb-4">
        <img
          src={teacher.image?.url}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border"
        />
      </div>

      <div className="space-y-2 text-sm">
        <p><strong>Name:</strong> {teacher.name}</p>
        <p><strong>Email:</strong> {teacher.email}</p>
        <p><strong>Gender:</strong> {teacher.gender}</p>
        <p><strong>Address:</strong> {teacher.address}</p>
        <p><strong>Subject:</strong> {teacher.subject}</p>
        <p><strong>Status:</strong> 
          <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
            teacher.status === 'approved' ? 'bg-green-200 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {teacher.status}
          </span>
        </p>
        <p><strong>Bio:</strong> {teacher.bio}</p>

        {teacher.resume?.url && (
          <p>
            <a
              href={teacher.resume.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Resume
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default TeacherProfileView;
