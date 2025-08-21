import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentClassview = () => {
  const [classes, setClasses] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/class', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(res.data);
      } catch (err) {
        console.error('Error fetching classes:', err);
      }
    };
    fetchClasses();
  }, [token]);





  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📘 Available Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <div key={cls._id} className="bg-gray-300 shadow rounded p-8">
              

               {cls.image?.url ? (
              <img
                src={cls.image.url}
                alt="Class Visual"
                className="w-40 h-40 object-cover rounded mb-3"
              />
            ) : (
              <p className="text-gray-500 text-sm italic">No image available</p>
            )}

            <h3 className="font-bold text-lg">{cls.title}</h3>
            <p><strong>Module:</strong> {cls.module}</p>
            <p><strong>Duration:</strong> {cls.duration}</p>
            <p><strong>Fee:</strong> {cls.fee}</p>
{/* 
             <p><strong>Teacher:</strong> {cls.teacher?.name}</p>
            <a href={cls.zoomLink} target="_blank" className="text-blue-600 underline">
              🔗 Zoom Link
            </a>  */}
              
               <Link to ="/cls.zoomLink">
              <button
    onClick={() => handleJoin(cls._id)}
    className="mt-3 px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
  >
    ✅ Join
      </button> 
       </Link> 
{/*         


            <button
              onClick={() => handleJoin(cls.zoomLink)}
              className="mt-4 px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              ✅ Join Now
            </button> */}

          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentClassview;
