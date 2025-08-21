
// import React, { useState } from 'react';
// import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';

// const StripePaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const location = useLocation();

//        const query = new URLSearchParams(location.search);

// // get role and teacherId from query or fallback to localStorage
// let role = query.get('role') || localStorage.getItem('role');
// let teacherId = query.get('tid') || localStorage.getItem('teacherId');

// // ✅ Store them for later use (like after refresh)
// if (query.get('role')) localStorage.setItem('role', role);
// if (query.get('tid')) localStorage.setItem('teacherId', teacherId);

// console.log('Role after payment:', role); // Debug
  

//   const [form, setForm] = useState({
//     name: '',
//     amount: '',
//     subject: '',
//     currency: 'lkr',
//   });

//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
// const token = localStorage.getItem('token');

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setLoading(true);

//     try {
//       // const { data } = await axios.post('http://localhost:5000/api/payment/create-payment-intent', form);
//       const { data } = await axios.post('http://localhost:5000/api/payment/create-payment-intent', form, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         }
//       });

//       const result = await stripe.confirmCardPayment(data.clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: { name: form.name },
//         },
//       });

//       if (result.error) {
//         setMessage(result.error.message);
//       } else if (result.paymentIntent.status === 'succeeded') {
//         setMessage('✅ Payment successful!');


//   //         try {
//   //   await axios.post('http://localhost:5000/api/payment/mark-paid', 
//   //     { role }, // send role if needed
//   //     { headers: { Authorization: `Bearer ${token}` } }
//   //   );
//   // } catch (err) {
//   //   console.error('Failed to update payment status:', err);
//   // }


//         setTimeout(() => {
//           // if (role === 'student') {
//           //   navigate('/student/dashboard');
//           // } else if (role === 'teacher') {
//           //   navigate('/student/dashboard');
           
//         if (role === 'student') {
//           navigate('/student/dashboard');
//           } else if (role === 'teacher') {
//            navigate('/teacher/dashboard'); // ✅ Correct
//             } else {
//               navigate('/');
//          }

//         }, 1500);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage('Payment failed');
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-8">
//       <h2 className="text-xl font-semibold text-center">Stripe Payment</h2>
//       {['name', 'amount', 'subject'].map((field) => (
//         <div key={field}>
//           <label className="block text-sm capitalize">{field}:</label>
//           <input
//             type={field === 'amount' ? 'number' : 'text'}
//             name={field}
//             value={form[field]}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
//       ))}

//       <div>
//         <label className="block text-sm mb-1">Card Details:</label>
//         <div className="p-2 border rounded">
//           <CardElement />
//         </div>
//       </div>

//       {message && <p className="text-center text-red-500">{message}</p>}

//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="w-full bg-[#053F5C] text-white py-2 rounded hover:bg-[#E99858]"
//       >
//         {loading ? 'Processing...' : 'Pay'}
//       </button>
//     </form>
//   );
// };

// export default StripePaymentForm;







import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const StripePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const role = query.get('role') || localStorage.getItem('role');
  // const teacherId = query.get('tid') || localStorage.getItem('teacherId');
  const token = localStorage.getItem('token');

  // Store in localStorage for refresh support
  if (query.get('role')) localStorage.setItem('role', role);
  if (query.get('tid')) localStorage.setItem('teacherId', teacherId);

  const [form, setForm] = useState({
    name: '',
    amount: '',
    subject: '',
    currency: 'lkr',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // // 🔁 Fetch teacher details
  // useEffect(() => {
  //   const fetchTeacher = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:5000/api/teachers/${teacherId}`, {
  //         headers: { Authorization: `Bearer ${token}` }
  //       });

  //       const teacher = res.data;

  //       setForm(prev => ({
  //         ...prev,
  //         name: teacher.name || '',
  //         subject: teacher.subject || '',
  //         amount: teacher.fee || '', // ✅ fee from teacher model
  //       }));
  //     } catch (err) {
  //       console.error('Failed to load teacher data:', err);
  //       setMessage('❌ Failed to load teacher info');
  //     }
  //   };

  //   if (teacherId && token) {
  //     fetchTeacher();
  //   }
  // }, [teacherId, token]);

  // 🔒 Optional: Disable editing of fetched fields
  const readOnlyFields = ['name', 'subject', 'amount'];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/payment/create-payment-intent',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: form.name },
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        setMessage('✅ Payment successful!');

        // Optional: Update hasPaid status on backend
        // await axios.post('http://localhost:5000/api/payment/mark-paid', { role }, {
        //   headers: { Authorization: `Bearer ${token}` }
        // });

        setTimeout(() => {
          if (role === 'student') {
            navigate('/student/dashboard');
          } else if (role === 'teacher') {
            navigate('/teacher/dashboard');
          } else {
            navigate('/');
          }
        }, 1500);
      }
    } catch (err) {
      // console.error(err);
      // setMessage('❌ Payment failed');
      console.error('❌ Axios Error:', err.response?.data || err.message || err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-8">
      <h2 className="text-xl font-semibold text-center">Stripe Payment</h2>

      {['name', 'amount', 'subject'].map((field) => (
        <div key={field}>
          <label className="block text-sm capitalize">{field}:</label>
          <input
            type={field === 'amount' ? 'number' : 'text'}
            name={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
            // readOnly={readOnlyFields.includes(field)} // ✅ make prefilled fields readonly
          />
        </div>
      ))}

      <div>
        <label className="block text-sm mb-1">Card Details:</label>
        <div className="p-2 border rounded">
          <CardElement />
        </div>
      </div>

      {message && <p className="text-center text-red-500">{message}</p>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-[#053F5C] text-white py-2 rounded hover:bg-[#E99858]"
      >
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

export default StripePaymentForm;



