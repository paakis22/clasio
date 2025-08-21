

import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { BookOpen, Users, Clock, Award, MapPin, Phone, Mail, Star, ArrowRight, Menu, X, Play, CheckCircle, TrendingUp } from "lucide-react";
import Footer from "../components/ Footer";

const Home = () => {
  const [showRegisterOptions, setShowRegisterOptions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
    
 const [subjects, setSubjects] = useState([]);
useEffect(() => {
  const fetchSubjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/subjects");
      setSubjects(res.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  fetchSubjects();
}, []);


  const features = [
    {
      icon: Clock,
      title: "Flexible Learning",
      desc: "Learn at your own pace with lifetime access to all courses",
      color: "text-blue-600"
    },
    {
      icon: Users,
      title: "Expert Instructors",
      desc: "Learn from qualified teachers with years of experience",
      color: "text-green-600"
    },
    {
      icon: BookOpen,
      title: "Complete Curriculum",
      desc: "Comprehensive syllabus covering all essential topics",
      color: "text-purple-600"
    },
    {
      icon: Award,
      title: "Certified Learning",
      desc: "Get certificates upon successful course completion",
      color: "text-orange-600"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Students", icon: Users },
    { number: "500+", label: "Expert Teachers", icon: Award },
    { number: "50+", label: "Courses Available", icon: BookOpen },
    { number: "98%", label: "Success Rate", icon: TrendingUp }
  ];

  return (
    <div className="bg-white text-gray-900 font-sans overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-orange-50 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#E99858] bg-opacity-10 text-[#E99858] px-4 py-2 rounded-full text-sm font-semibold border border-[#E99858] border-opacity-20">
                <Star size={16} fill="currentColor" />
                Sri Lanka's #1 Online Learning Platform
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Transform Your
                <span className="block bg-gradient-to-r from-[#E99858] to-[#053F5C] bg-clip-text text-transparent">
                  Learning Journey
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Join over 10,000 students mastering O/L and A/L subjects with Sri Lanka's most trusted online education platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
            // onClick={() => setShowRegisterOptions(!showRegisterOptions)}
            onClick={() => navigate("/register?role=teacher")}
            className="bg-[#053F5C] hover:bg-[#E99858] transition-all px-6 py-2 rounded-full text-white flex items-center gap-2 font-semibold"
          > 
             As teacher <ArrowRight size={19} /> 
         </button> 
  <button
            onClick={() => navigate("/courses")}
            className="bg-[#053F5C] hover:bg-[#E99858] transition-all px-6 py-2 rounded-full text-white  flex items-center gap-2 font-semibold"
          > 
             Explore Courses <ArrowRight size={19} /> 
         </button>  
            {showRegisterOptions && (
            <div className="absolute top-180 left-80 bg-white rounded-xl shadow-xl border text-gray-800 overflow-hidden z-50">
              {/* <button
                onClick={() => navigate("/register?role=student")}
                className="px-6 py-3 w-full text-left hover:bg-gray-100"
              >
                Join as Student
              </button> */}
              {/* <button
               
                className="px-6 py-3 w-full text-left hover:bg-gray-100"
              >
                Teach with Us
              </button> onClick={() => navigate("/register?role=teacher")} */}
            </div> 
           )} 
        </div>


              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-[#053F5C]">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#E99858] to-[#053F5C] rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                  alt="Students learning together"
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </div>
              
              {/* Floating Achievement Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={24} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-[#053F5C]">98% Pass Rate</div>
                    <div className="text-sm text-gray-600">A/L & O/L Success</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Award size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-[#053F5C]">500+ Teachers</div>
                    <div className="text-sm text-gray-600">Expert Instructors</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* Popular Subjects */}
        <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[#053F5C]">
              Popular Subjects
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive course offerings designed for O/L and A/L success
            </p>
          </div>

          {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 group cursor-pointer border border-gray-100"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${subject.bgGradient} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {subject.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-[#053F5C] group-hover:text-[#E99858] transition-colors">
                  {subject.label}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  {subject.desc}
                </p>
                
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(subject.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">{subject.rating}</span>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${subject.badgeColor}`}>
                    {subject.badge}
                  </span>
                  <span className="text-sm text-gray-500">{subject.lessons} lessons</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#053F5C]">{subject.students} students</span>
                  <button className="bg-[#053F5C] text-white px-4 py-2 rounded-full text-sm hover:bg-opacity-90 transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div> */}
          {subjects.map((subject, index) => (
  <div
    key={index}
    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 group cursor-pointer border border-gray-100"
  >
    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
      📘
    </div>
    
    <h3 className="text-xl font-bold mb-3 text-[#053F5C] group-hover:text-[#E99858] transition-colors">
      {subject.name}
    </h3>
    
    <p className="text-gray-600 mb-4 leading-relaxed text-sm">
      {subject.description}
    </p>
    
    <div className="flex items-center justify-between mb-6">
      <span className="text-sm text-gray-500">Learn More</span>
    <Link to={`/subject/${subject._id}/teachers`}>
  <button className="btn">Enroll Now</button>
</Link>
    </div>
  </div>
))}
        </div>
      </section>  

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[#053F5C]">
                Why Choose Clasio?
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                We're revolutionizing education in Sri Lanka with cutting-edge technology, experienced teachers, and proven methodologies.
              </p>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-6 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100"
                  >
                    <div className={`p-4 bg-white rounded-2xl shadow-md ${feature.color} flex-shrink-0`}>
                      <feature.icon size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#053F5C] mb-2 text-lg">{feature.title}</h4>
                      <p className="text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#053F5C] to-[#E99858] rounded-3xl p-8 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=800&q=80"
                  alt="Online learning platform"
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </div>
              
              {/* Success Stories Floating Card */}
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#053F5C] mb-1">98%</div>
                  <div className="text-sm text-gray-600 mb-3">Student Success Rate</div>
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-r from-[#E99858] to-[#053F5C] rounded-full border-2 border-white"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-[#053F5C] to-[#E99858] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Get In Touch</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Ready to start your educational journey? Contact us today!
            </p>
          </div>


           


          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="bg-gray bg-opacity-10 backdrop-blur-lg rounded-3xl p-10 border border-white border-opacity-20">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-gray-500 bg-opacity-20 rounded-2xl">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Our Location</h4>
                    <p className="opacity-90">Thirunalvely, Jaffna, Sri Lanka</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-gray-500 bg-opacity-20 rounded-2xl">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Phone Number</h4>
                    <p className="opacity-90">+94 77 339 7819</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-gray-500 bg-opacity-20 rounded-2xl">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Email Address</h4>
                    <p className="opacity-90">sripaakis@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
{/* 
            <div className="space-y-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20">
                <h4 className="text-xl font-bold mb-4">Quick Enrollment</h4>
                <p className="mb-6 opacity-90">Join thousands of successful students today!</p>
                <button className="bg-white text-[#053F5C] px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300 w-full">
                  Start Your Free Trial
                </button>
              </div> */}
              
              {/* <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20">
                <h4 className="text-xl font-bold mb-4">Follow Us</h4>
                <p className="mb-6 opacity-90">Stay updated with latest courses and success stories</p>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30 transition-colors">
                    <span className="text-xl">📘</span>
                  </div>
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30 transition-colors">
                    <span className="text-xl">📱</span>
                  </div>
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30 transition-colors">
                    <span className="text-xl">📺</span>
                  </div> */}
                {/* </div> */}
              {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[CCD0D2] text-blue py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Excel in Your Studies?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join over 10,000 students who have transformed their academic performance with Clasio's proven learning system.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register">
              <button className="bg-[#E99858] text-white px-10 py-4 rounded-full font-bold hover:shadow-xl transition-all duration-300 text-lg">
                Start Learning Today
              </button>
            </Link>
            <Link to="/login">
              <button className="border-2 border-[#E99858] text-[#E99858] px-10 py-4 rounded-full font-bold hover:bg-[#E99858] hover:text-white transition-all duration-300 text-lg">
                Login to Continue
              </button>
            </Link>
          </div>
        </div>
      </section>



            

      <Footer />
    
    </div>
  );
};

export default Home;
