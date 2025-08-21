




// pages/ApprovalWait.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ApprovalWait = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.info('⏳ Please wait for admin approval', { autoClose: 5000 });

    const interval = setInterval(async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/teachers/approval-status/id', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { status, hasPaid } = res.data;

        // ✅ Redirect only if approved and not yet paid
        if (status === 'approved' && !hasPaid) {
          toast.success('✅ Approved! Redirecting to payment...', { autoClose: 3000 });
          clearInterval(interval);
          setTimeout(() => navigate('/payment?role=teacher'), 2000);
        }

        // ✅ Optional: if already paid, redirect to teacher dashboard
        if (status === 'approved' && hasPaid) {
          toast.success('🎉 Approved and payment done! Redirecting to dashboard...', { autoClose: 3000 });
          clearInterval(interval);
          setTimeout(() => navigate('/teacher/dashboard'), 2000);
        }

      } catch (err) {
        console.error('Error checking approval status:', err.message);
        
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center p-4">
      <h2 className="text-2xl font-semibold mb-4">👋 Thank you for submitting your profile!</h2>
      <p className="text-lg">We're reviewing your application. You'll be redirected once approved.</p>
    </div>
  );
};

export default ApprovalWait;






