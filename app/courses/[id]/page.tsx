"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { mockCourses } from "@/lib/mockCourses";
import type { Course, CourseModule } from "@/lib/types";

const mockModules: CourseModule[] = [
  {
    id: "1",
    title: "Introduction and Setup",
    duration: "15 min",
    completed: false,
    description:
      "Get started with the course fundamentals. Learn about the tools and environment setup required for the course. We'll cover installation procedures, workspace configuration, and initial project setup to ensure you're ready for the learning journey ahead.",
  },
  {
    id: "2",
    title: "Core Concepts",
    duration: "45 min",
    completed: false,
    description:
      "Dive deep into the essential concepts that form the foundation of this subject. Understand the key principles, terminology, and theoretical framework that will guide your practical work throughout the course.",
  },
  {
    id: "3",
    title: "Hands-on Practice",
    duration: "60 min",
    completed: false,
    description:
      "Apply what you've learned through guided exercises and practical examples. Work through real-world scenarios and build your first project components while reinforcing the core concepts from previous lessons.",
  },
  {
    id: "4",
    title: "Advanced Techniques",
    duration: "30 min",
    completed: false,
    description:
      "Explore advanced strategies and optimization techniques used by professionals in the field. Learn best practices, performance considerations, and advanced patterns that will elevate your skills to the next level.",
  },
  {
    id: "5",
    title: "Final Project",
    duration: "90 min",
    completed: false,
    description:
      "Put everything together in a comprehensive final project. Design, build, and deploy a complete solution that demonstrates your mastery of all course concepts. Includes project planning, implementation, testing, and presentation.",
  },
];

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<CourseModule[]>(mockModules);
  const [activeTab, setActiveTab] = useState<
    "overview" | "lessons" | "reviews"
  >("overview");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const courseId = params.id as string;
    const foundCourse = mockCourses.find((c) => c.id === courseId);

    if (foundCourse) {
      setCourse(foundCourse);
    }
    setLoading(false);
  }, [params.id]);

  const handleEnroll = () => {
    setIsEnrolled(true);
    // Here you would typically make an API call to enroll the user
  };

  const toggleModuleCompletion = (moduleId: string) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? { ...module, completed: !module.completed }
          : module
      )
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  const toggleLessonExpansion = (moduleId: string) => {
    setExpandedLessons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Course Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The course you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors hover:cursor-pointer"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const completedModules = modules.filter((m) => m.completed).length;
  const progressPercentage = (completedModules / modules.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-8 py-12">
          <button
            onClick={() => router.push("/")}
            className="mb-6 flex items-center text-blue-100 hover:text-white transition-colors"
          >
            <span className="mr-2">←</span> Back to Courses
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full mb-4">
                {course.category}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
                {course.title}
              </h1>
              <p className="text-xl text-blue-100 mb-6 text-pretty">
                {course.description}
              </p>

              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    👨‍🏫
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">Instructor</p>
                    <p className="font-semibold">{course.instructor}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  {renderStars(5)}
                  <span className="ml-2 text-blue-100">4.8 (234 reviews)</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold">${course.price}</span>
                {!isEnrolled ? (
                  <button
                    onClick={handleEnroll}
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                  >
                    Enroll Now
                  </button>
                ) : (
                  <div className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold">
                    ✓ Enrolled
                  </div>
                )}
              </div>
            </div>

            <div className="relative">
              <Image
                src={
                  course.imageUrl ||
                  "/placeholder.svg?height=400&width=600&query=course preview" ||
                  "/placeholder.svg"
                }
                alt={course.title}
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                style={{ objectFit: "cover" }}
              />
              {isEnrolled && (
                <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                  <button className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                    ▶ Continue Learning
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar (only show if enrolled) */}
      {isEnrolled && (
        <div className="bg-white border-b">
          <div className="container mx-auto px-8 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Course Progress
              </span>
              <span className="text-sm text-gray-600">
                {completedModules}/{modules.length} modules completed
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-8 py-12">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                {
                  id: "overview" as const,
                  label: "Overview",
                },
                {
                  id: "lessons" as const,
                  label: "Lessons",
                },
                {
                  id: "reviews" as const,
                  label: "Reviews",
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors hover:cursor-pointer ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    What You&apos;ll Learn
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        text: "Master the fundamentals and core concepts",
                      },
                      {
                        text: "Build real-world projects from scratch",
                      },
                      {
                        text: "Learn industry best practices and standards",
                      },
                      {
                        text: "Get hands-on experience with practical exercises",
                      },
                      {
                        text: "Understand advanced techniques and optimization",
                      },
                      {
                        text: "Prepare for professional certification",
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-600 text-sm">✓</span>
                        </div>
                        <span className="text-gray-700">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Course Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <div className="text-blue-600 text-2xl mb-2">🎯</div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        Skill Level
                      </h3>
                      <p className="text-gray-600">Beginner to Intermediate</p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg">
                      <div className="text-green-600 text-2xl mb-2">⏱️</div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        Duration
                      </h3>
                      <p className="text-gray-600">4 hours of content</p>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-lg">
                      <div className="text-purple-600 text-2xl mb-2">🏆</div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        Certificate
                      </h3>
                      <p className="text-gray-600">Upon completion</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Lessons Tab */}
            {activeTab === "lessons" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Course Lessons
                </h2>
                <div className="space-y-4">
                  {modules.map((module, index) => {
                    const isExpanded = expandedLessons.has(module.id);
                    return (
                      <div
                        key={module.id}
                        className={`border rounded-lg transition-all duration-200 ${
                          module.completed
                            ? "bg-green-50 border-green-200"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        <div
                          className={`p-4 cursor-pointer hover:shadow-md transition-all duration-200 ${
                            isExpanded ? "border-b border-gray-200" : ""
                          }`}
                          onClick={() => toggleLessonExpansion(module.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                  module.completed
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                  isEnrolled &&
                                    toggleModuleCompletion(module.id);
                                }}
                              >
                                {module.completed ? "✓" : index + 1}
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-800">
                                  {module.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {module.duration}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              {isEnrolled && (
                                <div className="text-gray-400 text-sm">
                                  {module.completed
                                    ? "Completed"
                                    : "Not started"}
                                </div>
                              )}
                              <div
                                className={`transform transition-transform duration-200 text-gray-400 ${
                                  isExpanded ? "rotate-180" : ""
                                }`}
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6 9L12 15L18 9"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="px-4 pb-4">
                            <div className="pl-12">
                              <p className="text-gray-700 leading-relaxed">
                                {module.description}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Student Reviews
                  </h2>
                  <div className="flex items-center space-x-2">
                    {renderStars(5)}
                    <span className="text-lg font-semibold text-gray-800">
                      4.8
                    </span>
                    <span className="text-gray-600">(234 reviews)</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      id: "1",
                      userName: "Sarah Chen",
                      rating: 5,
                      comment:
                        "Excellent course! The instructor explains everything clearly and the projects are very practical.",
                      date: "2024-01-15",
                    },
                    {
                      id: "2",
                      userName: "Mike Rodriguez",
                      rating: 4,
                      comment:
                        "Great content and well-structured. Would recommend to anyone starting out.",
                      date: "2024-01-10",
                    },
                    {
                      id: "3",
                      userName: "Emily Johnson",
                      rating: 5,
                      comment:
                        "This course exceeded my expectations. The hands-on approach really helped me understand the concepts.",
                      date: "2024-01-08",
                    },
                  ].map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 pb-6 last:border-b-0"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {review.userName.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">
                              {review.userName}
                            </h4>
                            <span className="text-sm text-gray-500">
                              {review.date}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 mb-3">
                            {renderStars(review.rating)}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
