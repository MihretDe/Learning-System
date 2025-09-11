// app/page.tsx
"use client"; // This is a client component

import { useEffect, useState } from "react";
import CourseCard from "@/components/CourseCard";
import CategoryFilter from "@/components/CategoryFilter";
import { mockCourses } from "@/lib/mockCourses";
import type { Course } from "@/lib/types"; // Import your Course interface

export default function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      const coursesData: Course[] = mockCourses;
      setCourses(coursesData);
      setFilteredCourses(coursesData);
      // Extract unique categories
      const uniqueCategories = [
        "All",
        ...new Set(coursesData.map((course) => course.category)),
      ];
      setCategories(uniqueCategories);
    } catch {
      setError("Failed to load courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []); // Fetch courses on component mount

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((course) => course.category === selectedCategory)
      );
    }
  }, [selectedCategory, courses]); // Re-filter when category or courses change

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto p-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading amazing courses...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto p-8">
          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 text-lg font-medium">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-8 text-center">
          <h1 className="text-5xl font-bold mb-4 text-balance">
            Unlock Your Potential with Expert-Led Courses
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto text-pretty">
            Join thousands of learners advancing their careers with our
            comprehensive online courses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Browse Courses
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 -mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {courses.length}+
            </div>
            <div className="text-gray-600">Expert Courses</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
            <div className="text-gray-600">Active Students</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
        </div>

        {/* Course Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Explore Our Courses
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover courses designed by industry experts to help you master
              new skills and advance your career
            </p>
          </div>

          <CategoryFilter
            categories={categories.filter((cat) => cat !== "All")}
            onSelectCategory={handleSelectCategory}
            selectedCategory={selectedCategory}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📚</div>
                <p className="text-gray-600 text-xl">
                  No courses found in this category.
                </p>
                <p className="text-gray-500 mt-2">
                  Try selecting a different category or browse all courses.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
