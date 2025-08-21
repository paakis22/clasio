import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/admin', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    fetchUsers();
  };

  const handleUpdate = async (id, role) => {
    await axios.put(`http://localhost:5000/api/admin/${id}`, { role }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    fetchUsers();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <table className="w-full table-auto border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="text-center border-b">
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select value={user.role} onChange={(e) => handleUpdate(user._id, e.target.value)} className="p-1 border">
                  <option>student</option>
                  <option>teacher</option>
                  <option>admin</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(user._id)} className="text-red-500 hover:underline px-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
  
       
