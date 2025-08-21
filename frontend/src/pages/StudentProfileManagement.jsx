import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentProfileManagement = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/students');
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this student?')) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        setStudents(students.filter((s) => s._id !== id));
      } catch (err) {
        alert('Failed to delete student');
      }
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h2 className="text-lg font-bold mb-4 text-center">Student Management</h2>
      {students.length === 0 ? (
        <p className="text-center">No students found.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td className="border p-2">{s.name}</td>
                <td className="border p-2">{s.email}</td>
                <td className="border p-2">{s.gender}</td>
                <td className="border p-2">{s.address}</td>
                <td className="border p-2 text-center">
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded text-xs"
                    onClick={() => handleDelete(s._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentProfileManagement;
