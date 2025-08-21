import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JoinedClasses = () => {
  const [classes, setClasses] = useState([]);
  const token = JSON.parse(localStorage.getItem('user'))?.token;

  useEffect(() => {
    const fetchJoined = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/class/joined/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(res.data);
      } catch (err) {
        console.error('Failed to fetch joined classes');
      }
    };
    fetchJoined();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-[#1f1a3f]">🎓 Your Joined Classes</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <div key={cls._id} className="border p-4 rounded shadow bg-white">
            <h3 className="text-lg font-bold">{cls.title}</h3>
            <p><strong>Module:</strong> {cls.module}</p>
            <p><strong>Duration:</strong> {cls.duration}</p>
            <p><strong>Teacher:</strong> {cls.teacher?.name}</p>
            <a href={cls.zoomLink} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              Zoom Link
            </a>
            {cls.image?.url && (
              <img src={cls.image.url} alt="class" className="w-full h-40 object-cover mt-2 rounded" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinedClasses;
