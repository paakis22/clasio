import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    gender: "",
    address: "",
    fee: "",
    subject: "",
    image: null,
    resume: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/subjects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubjects(res.data);
      } catch (err) {
        console.error("Failed to fetch subjects:", err);
      }
    };

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/teachers/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const teacher = res.data;
        setIsUpdating(true);
        setFormData({
          name: teacher.name || "",
          bio: teacher.bio || "",
          gender: teacher.gender || "",
          address: teacher.address || "",
          fee: teacher.fee || "",
          subject: teacher.subject?._id || "",
          image: null,
          resume: null,
        });
        setPreviewImage(teacher.image?.url || null);
      } catch (err) {
        // No existing profile, ignore
      }
    };

    fetchSubjects();
    fetchProfile();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" || name === "resume") {
      setFormData({ ...formData, [name]: files[0] });
      if (name === "image") {
        setPreviewImage(URL.createObjectURL(files[0]));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    }

    try {
  const url = isUpdating
    ? "http://localhost:5000/api/teachers/update"
    : "http://localhost:5000/api/teachers";

  const res = await axios.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  alert("Profile saved successfully");
   navigate("/approval-wait"); // your custom waiting screen
   toast.info("✅ Profile submitted. Wait for admin approval.");
  // navigate("/teacher/dashboard"); // ✅ redirect here
  

      setFormData({ name: '', email: '', address: '', gender: '', bio: '', subject: '' });
      setPreviewImage(null);
      setResumeFile(null);
      setImageFile(null);



} catch (err) {
  console.error("Error submitting profile:", err);
  alert(err.response?.data?.message || "Failed to save profile");
}
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">{isUpdating ? "Update" : "Create"} Teacher Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label>
          Name:
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-2 py-1 bg-gray-100 rounded"
            required
          />
        </label>

        <label>
          Bio:
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full px-2 py-1 bg-gray-100 rounded"
          />
        </label>

        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-2 py-1 bg-gray-100 rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Address:
          <input
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-2 py-1 bg-gray-100 rounded"
          />
        </label>

        <label>
          Fee (Rs.):
          <input
            name="fee"
            value={formData.fee}
            onChange={handleInputChange}
            type="number"
            className="w-full px-2 py-1 bg-gray-100 rounded"
            required
          />
        </label>

        <label>
          Subject:
          <select
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full px-2 py-1 bg-gray-100 rounded"
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option key={s._id} value={s._id}>
                {s.title}
              </option>
            ))}
          </select>
        </label>

        <label>
          Profile Image:
          <input name="image" type="file" accept="image/*" onChange={handleInputChange} />
          {previewImage && (
            <img src={previewImage} alt="Preview" className="w-32 h-32 mt-2 rounded object-cover" />
          )}
        </label>

        <label>
          Resume (PDF):
          <input name="resume" type="file" accept=".pdf" onChange={handleInputChange} />
        </label>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {isUpdating ? "Update Profile" : "Create Profile"}
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const CreateProfile = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     bio: '',
//     gender: '',
//     address: '',
//     subject: '',
//     fee: '',
//     imageFile: null,
//     resumeFile: null,
//   });
//   const [previewImage, setPreviewImage] = useState(null);
//   const [subjects, setSubjects] = useState([]);
//   const [isUpdating, setIsUpdating] = useState(false);

//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     fetchSubjects();
//     fetchExistingProfile();
//   }, []);

//   const fetchSubjects = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/subject');
//       setSubjects(res.data);
//     } catch (error) {
//       console.error('Error fetching subjects:', error);
//     }
//   };

//   const fetchExistingProfile = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/teacher/profile/me', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (res.data) {
//         setIsUpdating(true);
//         setFormData({
//           name: res.data.name || '',
//           bio: res.data.bio || '',
//           gender: res.data.gender || '',
//           address: res.data.address || '',
//           subject: res.data.subject || '',
//           fee: res.data.fee || '',
//           imageFile: null,
//           resumeFile: null,
//         });
//         setPreviewImage(res.data.image);
//       }
//     } catch (error) {
//       console.log('No existing profile found');
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'image') {
//       setFormData({ ...formData, imageFile: files[0] });
//       setPreviewImage(URL.createObjectURL(files[0]));
//     } else if (name === 'resume') {
//       setFormData({ ...formData, resumeFile: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append('name', formData.name);
//     data.append('bio', formData.bio);
//     data.append('gender', formData.gender);
//     data.append('address', formData.address);
//     data.append('subject', formData.subject);
//     data.append('fee', formData.fee);
//     if (formData.imageFile) data.append('image', formData.imageFile);
//     if (formData.resumeFile) data.append('resume', formData.resumeFile);

//     try {
//       if (isUpdating) {
//         await axios.put('http://localhost:5000/api/teacher/profile', data, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         alert('Profile updated successfully');
//       } else {
//         await axios.post('http://localhost:5000/api/teacher/profile', data, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         alert('Profile created successfully');
//       }
//       navigate('/teacher/dashboard');
//     } catch (error) {
//       console.error('Error submitting profile:', error);
//       alert('Something went wrong');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 bg-white p-10 rounded-2xl shadow-lg">
//       <h2 className="text-3xl font-bold mb-6 text-center text-[#053F5C]">
//         {isUpdating ? 'Update' : 'Create'} Teacher Profile
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block mb-1 font-medium">Name:</label>
//           <input
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             className="w-full px-4 py-2 bg-gray-100 border rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Bio:</label>
//           <textarea
//             name="bio"
//             value={formData.bio}
//             onChange={handleInputChange}
//             className="w-full px-4 py-2 bg-gray-100 border rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Gender:</label>
//           <select
//             name="gender"
//             value={formData.gender}
//             onChange={handleInputChange}
//             className="w-full px-4 py-2 bg-gray-100 border rounded-md"
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Address:</label>
//           <input
//             name="address"
//             value={formData.address}
//             onChange={handleInputChange}
//             className="w-full px-4 py-2 bg-gray-100 border rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Fee (Rs.):</label>
//           <input
//             name="fee"
//             value={formData.fee}
//             onChange={handleInputChange}
//             type="number"
//             className="w-full px-4 py-2 bg-gray-100 border rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Subject:</label>
//           <select
//             name="subject"
//             value={formData.subject}
//             onChange={handleInputChange}
//             className="w-full px-4 py-2 bg-gray-100 border rounded-md"
//             required
//           >
//             <option value="">Select Subject</option>
//             {subjects.map((s) => (
//               <option key={s._id} value={s._id}>
//                 {s.title}
//               </option>

              
//             ))}

//                    {/* <option value="male">M</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//            */}

//           </select>
//         </div>

//         <div>
//           <label className="block mb-2 font-medium">Profile Image:</label>
//           <div className="flex items-center gap-4">
//             <label className="cursor-pointer flex items-center justify-center w-32 h-32 rounded-full border-2 border-dashed border-gray-300 text-gray-500 bg-gray-100 hover:bg-gray-200 transition">
//               <input
//                 name="image"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleInputChange}
//                 className="hidden"
//               />
//               Upload
//             </label>
//             {previewImage && (
//               <img
//                 src={previewImage}
//                 alt="Preview"
//                 className="w-32 h-32 rounded-full object-cover border"
//               />
//             )}
//           </div>
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Resume (PDF):</label>
//           <input
//             name="resume"
//             type="file"
//             accept=".pdf"
//             onChange={handleInputChange}
//             className="w-full text-sm bg-gray-100 p-2 rounded border"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-[#053F5C] text-white py-3 rounded-md text-lg hover:bg-[#042c3e] transition"
//         >
//           {isUpdating ? 'Update Profile' : 'Create Profile'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateProfile;
