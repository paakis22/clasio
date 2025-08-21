import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    module: '',
    duration: '',
    fee: '',
    zoomLink: '',
    imageFile: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  // Fetch classes when component mounts
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/class/teacher/classes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(res.data);
    } catch (err) {
      console.error('Error fetching classes:', err);
      alert('Failed to load classes');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, imageFile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('title', formData.title);
    form.append('module', formData.module);
    form.append('duration', formData.duration);
    form.append('fee', formData.fee);
    form.append('zoomLink', formData.zoomLink);
    if (formData.imageFile) {
      form.append('image', formData.imageFile);
    }

    try {
      if (editingId) {
        // Update existing class
        const res = await axios.put(`http://localhost:5000/api/class/${editingId}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        
        // Update class in state
        setClasses(classes.map(cls => cls._id === editingId ? res.data.classroom : cls));
        alert('Class updated successfully!');
      } else {
        // Create new class
        const res = await axios.post('http://localhost:5000/api/class', form, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        
        // Add new class to state
        setClasses([...classes, res.data]);
        alert('Class created successfully!');
      }

      // Reset form
      setFormData({
        title: '',
        module: '',
        duration: '',
        fee: '',
        zoomLink: '',
        imageFile: null,
      });
      setEditingId(null);
    } catch (err) {
      console.error('Error saving class:', err.response?.data || err.message);
      alert('Failed to save class.');
    }
  };

  const handleEdit = (cls) => {
    setFormData({
      title: cls.title,
      module: cls.module,
      duration: cls.duration,
      fee: cls.fee,
      zoomLink: cls.zoomLink || '',
      imageFile: null,
    });
    setEditingId(cls._id);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this class?')) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/class/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Remove class from state
      setClasses(classes.filter(cls => cls._id !== id));
      alert('Class deleted successfully!');
    } catch (err) {
      console.error('Error deleting class:', err);
      alert('Failed to delete class.');
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      title: '',
      module: '',
      duration: '',
      fee: '',
      zoomLink: '',
      imageFile: null,
    });
    setEditingId(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">📚 Class Management</h2>
      
      {/* Create/Edit Class Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">
          {editingId ? '✏️ Edit Class' : '➕ Create New Class'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Class Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Class Title"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Module</label>
              <input
                type="text"
                name="module"
                value={formData.module}
                onChange={handleChange}
                placeholder="Module"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Duration"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Fee (Rs.)</label>
              <input
                type="number"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                placeholder="Fee"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Zoom Link</label>
              <input
                type="text"
                name="zoomLink"
                value={formData.zoomLink}
                onChange={handleChange}
                placeholder="Zoom Link (e.g. https://zoom.us/...)"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Class Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {editingId ? 'Update Class' : 'Create Class'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Classes List */}
      <div>
        <h3 className="text-2xl font-bold mb-4">My Classes</h3>
        {loading ? (
          <p className="text-center py-4">Loading classes...</p>
        ) : classes.length === 0 ? (
          <p className="text-center py-4 text-gray-500">No classes scheduled yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <div key={cls._id} className="bg-white shadow rounded-lg p-4">
                {cls.image?.url && (
                  <img
                    src={cls.image.url}
                    alt={cls.title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <h4 className="text-lg font-bold">{cls.title}</h4>
                <p><strong>Module:</strong> {cls.module}</p>
                <p><strong>Duration:</strong> {cls.duration}</p>
                <p><strong>Fee:</strong> Rs. {cls.fee}</p>
                {cls.zoomLink && (
                  <p>
                    <strong>Zoom:</strong>{' '}
                    <a
                      href={cls.zoomLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Join Meeting
                    </a>
                  </p>
                )}
                
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(cls)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cls._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassManagement;
