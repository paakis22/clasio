
import React, { useState, useEffect } from 'react';
import st from '../assets/st.jpg';
import TeacherListFiltered from '../components/TeacherListFiltered';
import { Link, useNavigate } from 'react-router-dom';
import Footer from "../components/ Footer.jsx";
import axios from 'axios';

const StudentDashboard = () => {
  const [showCourses, setShowCourses] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [joinedClasses, setJoinedClasses] = useState([]);
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
const [showSchedule, setShowSchedule] = useState(false);

   const [classes, setClasses] = useState([]);
  const token = localStorage.getItem('token');



  
  // 🔁 Fetch all classes the student has joined
//   useEffect(() => {
//     const fetchJoinedClasses = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/class/joined', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setJoinedClasses(res.data || []);
//       } catch (err) {
//         console.error('Error fetching joined classes:', err);
//       }
//     };

//     if (token) fetchJoinedClasses();
//   }, [token]);
    
//   // 🔹 Fetch student profile on load
//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/student/profile', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStudent(res.data);
//       } catch (err) {
//         console.error('Error fetching student profile', err);
//       }
//     };
//     fetchStudent();
//   }, [token]);
//   // 🔹 Handle profile image upload
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

   
//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const res = await axios.put('http://localhost:5000/api/student/profile-picture', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       setStudent(res.data);
//       alert('✅ Profile picture updated!');
//     } catch (err) {
//       console.error('Upload failed', err);
//       alert('❌ Upload failed');
//     }
//   };
// useEffect(() => {
//   const fetchPaidClasses = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/class/paid', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setClasses(res.data); // 🔥 Now only paid class subjects will be shown
//     } catch (err) {
//       // 🔥 Add this detailed error logger here
//       console.error('❌ Error fetching paid classes:', {
//         message: err.message,
//         status: err.response?.status,
//         data: err.response?.data,
//       });
//     }
//   };
//   if (token) fetchPaidClasses();
// }, [token]);
useEffect(() => {
  const fetchJoinedClasses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/class/joined', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJoinedClasses(res.data || []);
    } catch (err) {
      console.error('Error fetching joined classes:', err);
      setJoinedClasses([]);  // fallback empty to avoid UI issues
    }
  };

  if (token) fetchJoinedClasses();
}, [token]);

useEffect(() => {
  const fetchStudent = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/student/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudent(res.data);
    } catch (err) {
      console.error('Error fetching student profile', err);
      setStudent(null);  // fallback null
    }
  };
  if (token) fetchStudent();
}, [token]);

useEffect(() => {
  const fetchPaidClasses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/class/paid', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(res.data);
    } catch (err) {
      console.error('Error fetching paid classes:', err);
      setClasses([]); // fallback empty
    }
  };
  if (token) fetchPaidClasses();
}, [token]);



  
// useEffect(() => {
//   const fetchStudentProfile = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/student/profile', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setStudent(res.data);
//     } catch (err) {
//       console.error("❌ Error fetching student profile:", err);
//     }
//   };

//   fetchStudentProfile();
// }, []);



   useEffect(() => {
  const fetchStudent = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/students/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setStudent(res.data);
    } catch (error) {
      console.error('Error fetching student profile:', error);
    }
  };

  fetchStudent();
}, []);





const fetchClasses = async () => {
  try {
    const endpoint =
      role === 'student'
        ? 'http://localhost:5000/api/class/student/classes'
        : role === 'teacher'
          ? 'http://localhost:5000/api/class/teacher/classes'
          : 'http://localhost:5000/api/class';

    const res = await axios.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setClasses(res.data);
  } catch (err) {
    console.error('❌ Error fetching paid classes:', {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
    });
  }
};
  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setShowCourses(false);
    navigate(`/courses/${subject}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ✅ NAVBAR */}
      <nav className="bg-[#224D62] text-white flex justify-center gap-6 py-4 text-sm md:text-base font-medium flex-wrap relative">
        <Link to="/student-profile">
          {/* <button className="hover:underline">Profile</button> */}
        </Link>
 <Link to="/student-class-view">
  <button
    className="hover:underline"
    onClick={() => {
      setShowCourses(false);
      setShowSchedule(true);
    }}
  >
    Schedule
  </button>
</Link>

  
        <div className="relative">
          <Link to="/courses">
          <button onClick={() => setShowCourses(!showCourses)} className="hover:underline">
            Courses ▾
          </button>
          </Link>
          {showCourses && (
            <div className="absolute top-full mt-1 left-0 bg-white text-black shadow-md rounded z-10 w-32">
              <ul className="text-sm">
                {['Maths', 'English', 'ICT'].map((subj) => (
                  <li
                    key={subj}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSubjectClick(subj)}
                  >
                    {subj}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Link to="/payment">
          <button className="hover:underline">Payment</button>
        </Link>

        {/* <button className="hover:underline">Module</button> */}
      </nav>

      {/* ✅ Teacher List by Subject (if selected) */}
      {selectedSubject ? (
        <TeacherListFiltered subject={selectedSubject} />
      ) : (
        <>
          {/* Dashboard landing view */}
          <section className="text-center py-8">
            <h2 className="text-xl md:text-2xl font-medium">
              Learn on-the-go or right<br />
              at home with <span className="font-bold text-[#1f1a3f]">clasio</span>
            </h2>
          </section>

          <div className="px-4 flex justify-center">
            <img
              src={st}
              alt="dashboard"
              className="w-full max-w-4xl rounded shadow"
            />
          </div>

          {/* <button
            className="mt-6 mx-auto block bg-[#053F5C] text-white px-6 py-2 text-xs rounded-md hover:brightness-110 transition duration-200 shadow"
            onClick={() => window.open("https://marketplace.zoom.us/", "_blank")}
          >
            Join Zoom
          </button> */}
        </>
      )}
      {/* ✅ Joined Classes List */}
    {/* update shedule here */}
    {showSchedule && (
  <div className="p-6 max-w-6xl mx-auto">
    <h1 className="text-2xl font-bold mb-4 text-center">🗓️ My Schedule</h1>
    {joinedClasses.length === 0 ? (
      <p className="text-center text-gray-500">You haven't joined any classes yet.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {joinedClasses.map((cls) => (
          <div key={cls._id} className="bg-white shadow p-4 rounded">
            {cls.image?.url && (
              <img
                src={cls.image.url}
                alt="class"
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}
            <h2 className="text-xl font-bold">{cls.title}</h2>
            <p><strong>Module:</strong> {cls.module}</p>
            <p><strong>Duration:</strong> {cls.duration}</p>
            <p><strong>Teacher:</strong> {cls.teacher?.name}</p>
            <p><strong>Email:</strong> {cls.teacher?.email}</p>
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
    )}
  </div>
)}

    end here 
    <div className="p-6 max-w-6xl mx-auto">
      {/* <h1 className="text-3xl font-bold mb-6 text-center">📚 Available Classes</h1> */}
      {classes.length === 0 ? (
        <p className="text-center text-gray-500">No classes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls) => (
            <div key={cls._id} className="bg-white shadow p-4 rounded">
              {cls.image?.url && (
                <img
                  src={cls.image.url}
                  alt="class"
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h2 className="text-xl font-bold">{cls.title}</h2>
              <p><strong>Module:</strong> {cls.module}</p>
              <p><strong>Duration:</strong> {cls.duration}</p>
              <p><strong>Teacher:</strong> {cls.teacher?.name}</p>
              <p><strong>Email:</strong> {cls.teacher?.email}</p>
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
      )}
    </div> 
    <div className="p-6 max-w-4xl mx-auto">
      {/* <h1 className="text-2xl font-bold mb-4">🎓 profile</h1> */}

      {student && (
        <div className="bg-white shadow p-4 rounded">
          {student.profileImage?.url ? (
            <img
              src={student.profileImage.url}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
          ) : (
            <p className="text-sm text-gray-500 mb-4">No profile picture uploaded.</p>
          )}
        <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Gender:</strong> {student.gender}</p>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Upload Profile Picture</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
        </div>
      )}
    </div>
      {/* ✅ Footer */}
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default StudentDashboard;






