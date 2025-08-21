import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentSchedule = () => {
  const [joinedClasses, setJoinedClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchJoinedClasses = async () => {
      if (!token) {
        setError('No auth token found. Please login.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/class/classes/my-joined', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJoinedClasses(res.data || []);
      } catch (err) {
        console.error('Error fetching joined classes:', err);
        setError('Failed to load joined classes.');
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedClasses();
  }, [token]);

  if (loading) return <p>Loading your schedule...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (joinedClasses.length === 0) return <p>You have not joined any classes yet.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Joined Classes Schedule</h1>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {joinedClasses.map((cls) => (
          <div key={cls._id} className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold">{cls.title}</h2>
            <p><strong>Module:</strong> {cls.module}</p>
            <p><strong>Duration:</strong> {cls.duration}</p>
            <p><strong>Teacher:</strong> {cls.teacher?.name || 'Unknown'}</p>
            <p><strong>Email:</strong> {cls.teacher?.email || 'N/A'}</p>
            {cls.zoomLink && (
              <a
                href={cls.zoomLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-2 inline-block"
              >
                🔗 Join Zoom Class
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentSchedule;
