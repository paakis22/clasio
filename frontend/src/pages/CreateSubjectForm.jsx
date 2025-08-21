// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateSubjectForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
     
//   });

//   const [success, setSuccess] = useState('');
//   const [error, setError] = useState('');

//   const token = localStorage.getItem('token');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSuccess('');
//     setError('');

//     try {
//       const res = await axios.post(
//         'http://localhost:5000/api/subject',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setSuccess('✅ Subject created successfully!');
//       setFormData({ name: '', description: '', });
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to create subject');
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
//       <h2 className="text-2xl font-bold text-center mb-6 text-[#053F5C]">Create New Subject</h2>

//       {success && <p className="text-green-600 text-center mb-4">{success}</p>}
//       {error && <p className="text-red-600 text-center mb-4">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-semibold mb-1">Subject Name</label>
//           <input
//             type="text"
//             name="name"
//             required
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block font-semibold mb-1">Description</label>
//           <textarea
//             name="description"
//             rows="3"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           ></textarea>
//         </div>
// {/* 
//         <div>
//           <label className="block font-semibold mb-1">Image URL</label>
//           <input
//             type="text"
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//             placeholder="https://example.com/image.jpg"
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div> */}

//         <button
//           type="submit"
//           className="w-full bg-[#053F5C] text-white py-2 px-4 rounded-lg hover:bg-[#042c40] transition"
//         >
//           Create Subject
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateSubjectForm;





import React, { useState } from 'react';
import axios from 'axios';

const CreateSubjectForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      if (imageFile) {
        data.append('image', imageFile);
      }

      const res = await axios.post('http://localhost:5000/api/subject', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('✅ Subject created successfully!');
      setFormData({ name: '', description: '' });
      setImageFile(null);
    } catch (err) {
      console.error("❌ Error:", err);
      setError(err.response?.data?.error || 'Failed to create subject');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#053F5C]">Create New Subject</h2>

      {success && <p className="text-green-600 text-center mb-4">{success}</p>}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Subject Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold mb-1">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#053F5C] text-white py-2 px-4 rounded-lg hover:bg-[#042c40] transition"
        >
          Create Subject
        </button>
      </form>
    </div>
  );
};

export default CreateSubjectForm;



// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateSubjectForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
    
//   });

//   const [success, setSuccess] = useState('');
//   const [error, setError] = useState('');

//   const token = localStorage.getItem('token');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSuccess('');
//     setError('');

//     try {
//       const res = await axios.post(
//         'http://localhost:5000/api/subject',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       setSuccess('✅ Subject created successfully!');
//       setFormData({ name: '', description: '' });
//     } catch (err) {
//       console.error('❌ Error:', err);
//       setError(err.response?.data?.error || 'Failed to create subject');
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
//       <h2 className="text-2xl font-bold text-center mb-6 text-[#053F5C]">Create New Subject</h2>

//       {success && <p className="text-green-600 text-center mb-4">{success}</p>}
//       {error && <p className="text-red-600 text-center mb-4">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-semibold mb-1">Subject Name</label>
//           <input
//             type="text"
//             name="name"
//             required
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block font-semibold mb-1">Description</label>
//           <textarea
//             name="description"
//             rows="3"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           ></textarea>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-[#053F5C] text-white py-2 px-4 rounded-lg hover:bg-[#042c40] transition"
//         >
//           Create Subject
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateSubjectForm;
