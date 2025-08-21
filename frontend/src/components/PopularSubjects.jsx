
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';

const PopularSubjects = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/subjects'); // adjust for your backend base URL
        setSubjects(res.data);
      } catch (err) {
        console.error('Error fetching subjects:', err);
      }
    };

    fetchSubjects();
  }, []);

  // Optional static fallback UI data (merged in)
  const fallbackMeta = {
    "O/L Mathematics": {
      badge: "Most Popular",
      badgeColor: "bg-blue-100 text-blue-700",
      rating: 4.8,
      lessons: 45,
      students: "2,500+"
    },
    "English Language": {
      badge: "Essential",
      badgeColor: "bg-green-100 text-green-700",
      rating: 4.9,
      lessons: 38,
      students: "3,200+"
    },
    "ICT & Technology": {
      badge: "Trending",
      badgeColor: "bg-purple-100 text-purple-700",
      rating: 4.7,
      lessons: 52,
      students: "1,800+"
    },
    "A/L Mathematics": {
      badge: "Advanced",
      badgeColor: "bg-orange-100 text-orange-700",
      rating: 4.9,
      lessons: 67,
      students: "1,200+"
    }
  };

  return (
    <section className="py-20 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#053F5C] mb-4">Popular Subjects</h2>
          <p className="text-lg text-gray-600">
            Explore our comprehensive course offerings designed for O/L and A/L success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {subjects.map((subject) => {
            const meta = fallbackMeta[subject.name] || {};
            return (
              <div
                key={subject._id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Image or Icon */}
                <div className="w-16 h-16 rounded-xl bg-gray-100 mb-4 flex items-center justify-center">
                  {subject.image ? (
                    <img src={subject.image} alt={subject.name} className="w-10 h-10" />
                  ) : (
                    <span className="text-2xl">📘</span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-[#053F5C] mb-1">{subject.name}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {subject.description?.slice(0, 80) || 'No description available'}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < Math.round(meta.rating || 5)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-700 ml-1">{meta.rating || '5.0'}</span>
                </div>

                {/* Badge + Lessons */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      meta.badgeColor || 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {meta.badge || 'Popular'}
                  </span>
                  <span className="text-sm text-gray-500">{meta.lessons || 30} lessons</span>
                </div>

                {/* Students + Button */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#053F5C]">
                    {meta.students || '+100 students'}
                  </span>
                  <button className="bg-[#053F5C] text-white text-sm px-4 py-2 rounded-full hover:bg-opacity-90 transition">
                    Enroll Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularSubjects;
