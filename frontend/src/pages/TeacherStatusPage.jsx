import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherStatusPage = () => {
  const [status, setStatus] = useState('');
  const [hasPaid, setHasPaid] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTeacherStatus = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/teachers/status', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { status, hasPaid } = res.data;
        setStatus(status);
        setHasPaid(hasPaid);

        if (status === 'approved' && !hasPaid) {
          navigate('/payment'); // 💳 Go to payment form
        } else if (status === 'approved' && hasPaid) {
          navigate('/teacherdashboard'); // 🚀 All done, go to dashboard
        }

      } catch (err) {
        console.error('Error fetching teacher status:', err);
      }
    };

    fetchTeacherStatus();
  }, [navigate, token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        {status === 'pending' && (
          <>
            <h2 className="text-xl font-semibold text-gray-700">⏳ Waiting for Approval</h2>
            <p className="mt-2 text-gray-500">
              Your teacher profile is under review. Once approved, you’ll be redirected to complete payment.
            </p>
          </>
        )}

        {status === 'rejected' && (
          <>
            <h2 className="text-xl font-semibold text-red-600">❌ Rejected</h2>
            <p className="mt-2 text-gray-500">Sorry, your teacher application was not approved.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherStatusPage;
