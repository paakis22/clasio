import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // REDIRECT BASED ON ROLE & STATUS
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user.role === 'teacher') {
        // Check if teacher has paid
        if (user.hasPaid) {
          navigate('/teacher/dashboard');
        } else {
          // Check if teacher has a profile
          if (user.profile) {
            // If profile exists but not paid, redirect to payment
            navigate('/payment?role=teacher');
          } else {
            // If no profile, redirect to create profile
            navigate('/teacher/dashboard');
          }
        }
      } else if (user.role === 'student') {
        if (user.hasPaid) {
          navigate('/student/dashboard');
        } else {
          navigate('/payment?role=student');
        }
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="w-full border p-2 mb-4"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="w-full border p-2 mb-4"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
};

export default Login;
