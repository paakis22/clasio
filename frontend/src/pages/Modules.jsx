import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Module = () => {
  const [modules, setModules] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [activeTab, setActiveTab] = useState('modules');
  const [newModule, setNewModule] = useState({ title: '', description: '' });
  const [newAssignment, setNewAssignment] = useState({ title: '', moduleId: '', dueDate: '' });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    fetchModules();
    fetchAssignments();
  }, []);

  const fetchModules = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/modules', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setModules(res.data);
    } catch (err) {
      console.error('Failed to fetch modules:', err);
    }
  };

  const fetchAssignments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/assignments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssignments(res.data);
    } catch (err) {
      console.error('Failed to fetch assignments:', err);
    }
  };

  const handleCreateModule = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/modules', newModule, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setModules([...modules, res.data]);
      setNewModule({ title: '', description: '' });
      alert('Module created successfully!');
    } catch (err) {
      console.error('Failed to create module:', err);
      alert('Failed to create module');
    }
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/assignments', newAssignment, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssignments([...assignments, res.data]);
      setNewAssignment({ title: '', moduleId: '', dueDate: '' });
      alert('Assignment created successfully!');
    } catch (err) {
      console.error('Failed to create assignment:', err);
      alert('Failed to create assignment');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Learning Modules & Assignments</h1>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setActiveTab('modules')}
            className={`px-6 py-2 rounded-l ${activeTab === 'modules' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
          >
            Modules
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-6 py-2 rounded-r ${activeTab === 'assignments' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
          >
            Assignments
          </button>
        </div>

        {/* Modules Tab */}
        {activeTab === 'modules' && (
          <div>
            {/* Create Module Form */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h2 className="text-xl font-bold mb-4">Create New Module</h2>
              <form onSubmit={handleCreateModule} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Module Title</label>
                  <input
                    type="text"
                    value={newModule.title}
                    onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Description</label>
                  <textarea
                    value={newModule.description}
                    onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                    className="w-full p-2 border rounded"
                    rows="3"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Create Module
                </button>
              </form>
            </div>

            {/* Modules List */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Existing Modules</h2>
              {modules.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {modules.map((module) => (
                    <div key={module._id} className="bg-white p-6 rounded-lg shadow">
                      <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                      <p className="text-gray-600 mb-4">{module.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Created: {new Date(module.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => navigate(`/module/${module._id}/edit`)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center">No modules created yet.</p>
              )}
            </div>
          </div>
        )}

        {/* Assignments Tab */}
        {activeTab === 'assignments' && (
          <div>
            {/* Create Assignment Form */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
              <h2 className="text-xl font-bold mb-4">Create New Assignment</h2>
              <form onSubmit={handleCreateAssignment} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Assignment Title</label>
                  <input
                    type="text"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Module</label>
                  <select
                    value={newAssignment.moduleId}
                    onChange={(e) => setNewAssignment({ ...newAssignment, moduleId: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="">Select Module</option>
                    {modules.map((module) => (
                      <option key={module._id} value={module._id}>
                        {module.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Due Date</label>
                  <input
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Create Assignment
                </button>
              </form>
            </div>

            {/* Assignments List */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Existing Assignments</h2>
              {assignments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {assignments.map((assignment) => (
                    <div key={assignment._id} className="bg-white p-6 rounded-lg shadow">
                      <h3 className="text-xl font-bold mb-2">{assignment.title}</h3>
                      <p className="text-gray-600 mb-2">
                        <strong>Module:</strong> {assignment.module?.title || 'N/A'}
                      </p>
                      <p className="text-gray-600 mb-4">
                        <strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Created: {new Date(assignment.createdAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => navigate(`/assignment/${assignment._id}/edit`)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center">No assignments created yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Module;
