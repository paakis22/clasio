import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/ Footer';
import axios from 'axios';

const TeacherDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [requests, setRequests] = useState([]);
  const [classes, setClasses] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard'); // default to dashboard tab
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // Fetch teacher profile
      axios
        .get('http://localhost:5000/api/teachers/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setProfile(res.data))
        .catch((err) => console.error('Failed to load teacher profile:', err));

      // Fetch join requests for this teacher
      axios
        .get('http://localhost:5000/api/join-requests/teacher', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setRequests(res.data))
        .catch((err) => console.error('Failed to load join requests', err));
        
      // Fetch classes for this teacher
      axios
        .get('http://localhost:5000/api/class/teacher/classes', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setClasses(res.data))
        .catch((err) => console.error('Failed to load classes', err));
    }
  }, [token]);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/join-requests/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(res.data.message);
  
      // Refresh requests
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status } : req
        )
      );
    } catch (error) {
      console.error('❌ Status update failed:', error);
      alert('Something went wrong!');
    }
  };

  const handleEditProfile = () => {
    navigate('/create-profile');
  };

  const handleCreateSubject = () => {
    navigate('/create/subject');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-white rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Clasio Teacher Dashboard</h1>
                <p className="text-blue-200">Welcome back, {profile?.name || 'Teacher'}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {profile?.image?.url && (
                <img 
                  src={profile.image.url} 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full border-2 border-white object-cover"
                />
              )}
              <div className="text-right">
                <p className="font-semibold">{profile?.name || 'Loading...'}</p>
                <p className="text-sm text-blue-200">{profile?.email || ''}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-start">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-3 font-medium text-sm md:text-base ${activeTab === 'dashboard' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-4 py-3 font-medium text-sm md:text-base ${activeTab === 'requests' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10l6.5-7a1 1 0 011.5 0L17 10M3 21V10M17 21V10M12 21v-7" />
              </svg>
              Student Requests {requests.filter(req => req.status === 'pending').length > 0 && (
                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs ml-1">
                  {requests.filter(req => req.status === 'pending').length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('classes')}
              className={`px-4 py-3 font-medium text-sm md:text-base ${activeTab === 'classes' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10l6.5-7a1 1 0 011.5 0L17 10M3 21V10M17 21V10M12 21v-7" />
              </svg>
              My Classes
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-3 font-medium text-sm md:text-base ${activeTab === 'profile' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My Profile
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center">
                  <div className="rounded-full bg-blue-100 p-3 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Students</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center">
                  <div className="rounded-full bg-green-100 p-3 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10l6.5-7a1 1 0 011.5 0L17 10M3 21V10M17 21V10M12 21v-7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Active Classes</p>
                    <p className="text-2xl font-bold">{classes.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
                <div className="flex items-center">
                  <div className="rounded-full bg-yellow-100 p-3 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Pending Requests</p>
                    <p className="text-2xl font-bold">{requests.filter(req => req.status === 'pending').length}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Summary */}
              <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">My Profile</h3>
                  <button
                    onClick={handleEditProfile}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  {profile?.image?.url ? (
                    <img 
                      src={profile.image.url} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 mb-4"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  <h4 className="text-lg font-bold">{profile?.name || 'Loading...'}</h4>
                  <p className="text-gray-600">{profile?.email || ''}</p>
                  <div className="mt-4 w-full">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Subject</span>
                      <span className="text-sm font-medium">{profile?.subject?.title || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Status</span>
                      <span className="text-sm font-medium">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          profile?.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          profile?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {profile?.status || 'N/A'}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleCreateSubject}
                    className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-md hover:from-green-600 hover:to-green-700 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="font-semibold">Create Subject</span>
                  </button>
                  <button
                    onClick={() => navigate('/class')}
                    className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-md hover:from-purple-600 hover:to-purple-700 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold">Schedule Class</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('requests')}
                    className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl shadow-md hover:from-yellow-600 hover:to-yellow-700 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="font-semibold">View Requests</span>
                  </button>
                  <button
                    onClick={() => navigate('/Modules')}
                    className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl shadow-md hover:from-indigo-600 hover:to-indigo-700 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="font-semibold">Manage Modules</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Classes */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">My Recent Classes</h3>
                <button 
                  onClick={() => setActiveTab('classes')}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  View All
                </button>
              </div>
              {classes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {classes.slice(0, 3).map((cls) => (
                    <div key={cls._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-lg mb-1">{cls.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">Module: {cls.module}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Duration: {cls.duration}</span>
                        <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                          Rs. {cls.fee}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500">No classes scheduled yet</p>
                  <button
                    onClick={() => navigate('/class')}
                    className="mt-2 text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Schedule your first class
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* My Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                <div className="flex flex-col md:flex-row items-center">
                  {profile?.image?.url ? (
                    <img 
                      src={profile.image.url} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover border-4 border-white mb-4 md:mb-0 md:mr-6"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold">{profile?.name || 'Loading...'}</h2>
                    <p className="text-indigo-100">{profile?.email || ''}</p>
                    <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                      <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                        {profile?.subject?.title || 'No subject assigned'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        profile?.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        profile?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {profile?.status || 'N/A'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-auto">
                    <button
                      onClick={handleEditProfile}
                      className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Full Name</label>
                      <p className="mt-1 text-lg">{profile?.name || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Email Address</label>
                      <p className="mt-1 text-lg">{profile?.email || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Gender</label>
                      <p className="mt-1 text-lg capitalize">{profile?.gender || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Address</label>
                      <p className="mt-1 text-lg">{profile?.address || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Subject</label>
                      <p className="mt-1 text-lg">{profile?.subject?.title || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Fee (Rs.)</label>
                      <p className="mt-1 text-lg">Rs. {profile?.fee || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Status</label>
                      <p className="mt-1 text-lg">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          profile?.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          profile?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {profile?.status || 'N/A'}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Bio</label>
                      <p className="mt-1 text-lg">{profile?.bio || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                
                {profile?.resume?.url && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <label className="block text-sm font-medium text-gray-500 mb-2">Resume</label>
                    <a
                      href={profile.resume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View Resume
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* My Classes Tab */}
        {activeTab === 'classes' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">My Classes</h2>
              <button
                onClick={() => navigate('/class')}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Schedule New Class
              </button>
            </div>
            {classes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((cls) => (
                  <div key={cls._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    {cls.image?.url && (
                      <img
                        src={cls.image.url}
                        alt={cls.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{cls.title}</h3>
                      <div className="space-y-2 mb-4">
                        <p className="flex justify-between">
                          <span className="text-gray-600">Module:</span>
                          <span className="font-medium">{cls.module}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{cls.duration}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-600">Fee:</span>
                          <span className="font-medium">Rs. {cls.fee}</span>
                        </p>
                        {cls.zoomLink && (
                          <p className="flex justify-between">
                            <span className="text-gray-600">Zoom:</span>
                            <a
                              href={cls.zoomLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                              Join Meeting
                            </a>
                          </p>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <button
                          onClick={() => navigate('/class')}
                          className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                        >
                          Edit
                        </button>
                        <span className="text-xs text-gray-500">
                          Created: {new Date(cls.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Classes Scheduled</h3>
                <p className="text-gray-500 mb-6">You haven't created any classes yet.</p>
                <button
                  onClick={() => navigate('/class')}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all"
                >
                  Schedule Your First Class
                </button>
              </div>
            )}
          </div>
        )}

        {/* Join Requests Tab */}
        {activeTab === 'requests' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Student Requests</h2>
            {requests.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No Requests Yet</h3>
                <p className="text-gray-500">You don't have any student requests at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map((req) => (
                  <div
                    key={req._id}
                    className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500"
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-indigo-100 rounded-full p-2 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{req.student?.name}</h3>
                        <p className="text-gray-600 text-sm">{req.student?.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <p className="flex justify-between">
                        <span className="text-gray-600">Subject:</span>
                        <span className="font-medium">{req.subject?.title}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Gender:</span>
                        <span className="font-medium capitalize">{req.student?.gender}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className="font-medium">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            req.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                            req.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {req.status}
                          </span>
                        </span>
                      </p>
                    </div>
                    
                    {req.status === 'pending' && (
                      <div className="flex gap-2 mt-4">
                        <button
                          className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                          onClick={() => handleStatusChange(req._id, 'accepted')}
                        >
                          Accept
                        </button>
                        <button
                          className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                          onClick={() => handleStatusChange(req._id, 'rejected')}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default TeacherDashboard;
