import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/payments', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setPayments(res.data);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent Payments</h2>
      <table className="w-full border text-sm table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th>User</th><th>Amount</th><th>Date</th><th>Name</th><th>subject</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p._id} className="text-center border-b">
              <td>{p.user}</td>
              <td>₹{p.amount}</td>
              <td>{new Date(p.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;












