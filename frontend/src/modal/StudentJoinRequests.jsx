import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentJoinRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          'http://localhost:5000/api/join-requests/student/requests',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRequests(res.data);
      } catch (err) {
        console.error('Failed to load requests:', err.response?.data || err.message);
      }
    };

    fetchRequests();
  }, []);

  const handlePay = (teacherId) => {
    navigate(`/payment?tid=${teacherId}&role=student`);
  };

  const handleJoinClass = (subjectId, teacherId) => {
    navigate(`/join-class?subjectId=${subjectId}&teacherId=${teacherId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">My Join Requests</h2>
      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req._id} className="bg-white p-4 rounded shadow">
            <p><strong>Teacher:</strong> {req.teacher?.name || 'N/A'}</p>
            <p><strong>Subject:</strong> {req.subject?.title || 'N/A'}</p>
            <p><strong>Status:</strong> {req.status}</p>

            {req.status === 'accepted' && req.teacher && !req.hasPaid && (
              <button
                onClick={() => handlePay(req.teacher._id)}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
              >
                Pay Now
              </button>
            )}

            {req.status === 'accepted' && req.teacher && req.hasPaid && (
              <button
                onClick={() => handleJoinClass(req.subject._id, req.teacher._id)}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Join Class
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentJoinRequests;
