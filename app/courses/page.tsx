"use client";

import { useEffect, useState } from "react";
import CourseCard from "@/components/CourseCard";
import CategoryFilter from "@/components/CategoryFilter";
import { mockCourses } from "@/lib/mockCourses";
import type { Course } from "@/lib/types";

export default function CoursesPage() {
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
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((course) => course.category === selectedCategory)
      );
    }
  }, [selectedCategory, courses]);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto p-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading courses...</p>
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
            Explore Our Course Catalog
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto text-pretty">
            Discover a wide range of expert-led courses designed to help you master new skills and advance your career
          </p>
          <div className="flex items-center justify-center space-x-6 text-blue-100">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">{courses.length}+</span>
              <span>Courses</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">50K+</span>
              <span>Students</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">95%</span>
              <span>Success Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-8">
        {/* Course Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Find Your Perfect Course
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Filter by category to find courses that match your interests and career goals
            </p>
          </div>

          <CategoryFilter
            categories={categories.filter((cat) => cat !== "All")}
            onSelectCategory={handleSelectCategory}
            selectedCategory={selectedCategory}
          />

          <div className="mt-8">
            {selectedCategory !== "All" && (
              <div className="mb-6">
                <p className="text-gray-600 text-lg">
                  Showing {filteredCourses.length} courses in{" "}
                  <span className="font-semibold text-blue-600">
                    {selectedCategory}
                  </span>
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <button
                    onClick={() => handleSelectCategory("All")}
                    className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View All Courses
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}