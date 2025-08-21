import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/teachers/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTeacher(res.data);
        setLoading(false);
      } catch (err) {
        console.error('❌ Failed to load profile:', err);
        setTeacher(null); // no profile yet
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (teacher) {
    // ✅ Profile already exists - show it
    return (
      <div className="py-6 px-4">
        <h2 className="text-xl font-semibold text-center mb-4">My Profile</h2>
        <div className="max-w-md mx-auto bg-white shadow p-4 rounded">
          <div className="w-24 h-24 mx-auto mb-4">
            <img
              src={teacher.image?.url}
              alt={teacher.name}
              className="w-full h-full object-cover rounded-full border"
            />
          </div>
          <p><strong>Name:</strong> {teacher.name}</p>
          <p><strong>Email:</strong> {teacher.email}</p>
          <p><strong>Gender:</strong> {teacher.gender}</p>
          <p><strong>Address:</strong> {teacher.address}</p>
          <p><strong>Subject:</strong> {teacher.subject}</p>
          <p><strong>Bio:</strong> {teacher.bio}</p>
          {teacher.resume?.url && (
            <p>
              <a href={teacher.resume.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Resume</a>
            </p>
          )}
        </div>
      </div>
    );
  }

  // ❌ No profile yet - show form
  return <ProfileForm />;
};

export default TeacherProfile;
