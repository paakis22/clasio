 
 
 
 
//  const [studentInfo, setStudentInfo] = useState(null);

// useEffect(() => {
//   // Replace with dynamic user email from auth (for now, hardcoded)
//   const email = 'student@example.com';

//   const fetchProfile = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/students/${email}`);
//       setStudentInfo(res.data);
//     } catch (err) {
//       console.error('Failed to fetch student profile', err);
//     }
//   };

//   fetchProfile();
// }, []);

 
//  <section className="text-center py-8">
//   <h2 className="text-xl md:text-2xl font-medium">
//     Learn on-the-go or right at home with <span className="font-bold text-[#1f1a3f]">clasio</span>
//   </h2>
// </section>

// {studentInfo ? (
//   <div className="px-6 py-4 bg-gray-100 shadow rounded-lg max-w-xl mx-auto mt-6 text-center">
//     <h3 className="text-lg font-semibold mb-4 text-gray-800">About Me</h3>
//     <p><strong>Name:</strong> {studentInfo.name}</p>
//     <p><strong>Email:</strong> {studentInfo.email}</p>
//     <p><strong>Gender:</strong> {studentInfo.gender}</p>
//     <p><strong>Address:</strong> {studentInfo.address}</p>
//   </div>
// ) : (
//   <p className="text-center mt-4 text-gray-500">Loading profile...</p>
// )}






// export default function AboutMe() 