"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, BookOpen, FileText, Users } from "lucide-react";
import dynamic from "next/dynamic";
import type { Course } from "@/lib/types";

// Dynamic imports to avoid SSR issues
const CourseForm = dynamic(() => import("@/components/instructor/CourseForm"), { ssr: false });
const LessonForm = dynamic(() => import("@/components/instructor/LessonForm"), { ssr: false });
const AssignmentForm = dynamic(() => import("@/components/instructor/AssignmentForm"), { ssr: false });

interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
  content: string;
}

interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  maxPoints: number;
  instructions: string;
}

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "lessons" | "assignments">("overview");
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  
  // Modal states
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  
  // Edit states
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);

  useEffect(() => {
    // Load initial data (mock data for now)
    setCourses([
      {
        id: "1",
        title: "React Fundamentals",
        description: "Learn the basics of React development",
        category: "Programming",
        instructor: "John Doe",
        imageUrl: "/placeholder.svg",
        price: 99.99,
      },
    ]);

    setLessons([
      {
        id: "1",
        courseId: "1",
        title: "Introduction to React",
        description: "Getting started with React",
        duration: "30 min",
        content: "React is a JavaScript library...",
      },
    ]);

    setAssignments([
      {
        id: "1",
        courseId: "1",
        title: "Build a Todo App",
        description: "Create a simple todo application using React",
        dueDate: "2024-02-15",
        maxPoints: 100,
        instructions: "Build a todo app with add, edit, and delete functionality",
      },
    ]);
  }, []);

  const handleAddCourse = () => {
    setEditingCourse(null);
    setShowCourseForm(true);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setShowCourseForm(true);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(c => c.id !== courseId));
      setLessons(lessons.filter(l => l.courseId !== courseId));
      setAssignments(assignments.filter(a => a.courseId !== courseId));
    }
  };

  const handleSaveCourse = (courseData: Omit<Course, "id">) => {
    if (editingCourse) {
      setCourses(courses.map(c => 
        c.id === editingCourse.id 
          ? { ...courseData, id: editingCourse.id }
          : c
      ));
    } else {
      const newCourse: Course = {
        ...courseData,
        id: Date.now().toString(),
      };
      setCourses([...courses, newCourse]);
    }
    setShowCourseForm(false);
    setEditingCourse(null);
  };

  const handleAddLesson = () => {
    setEditingLesson(null);
    setShowLessonForm(true);
  };

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setShowLessonForm(true);
  };

  const handleDeleteLesson = (lessonId: string) => {
    if (confirm("Are you sure you want to delete this lesson?")) {
      setLessons(lessons.filter(l => l.id !== lessonId));
    }
  };

  const handleSaveLesson = (lessonData: Omit<Lesson, "id">) => {
    if (editingLesson) {
      setLessons(lessons.map(l => 
        l.id === editingLesson.id 
          ? { ...lessonData, id: editingLesson.id }
          : l
      ));
    } else {
      const newLesson: Lesson = {
        ...lessonData,
        id: Date.now().toString(),
      };
      setLessons([...lessons, newLesson]);
    }
    setShowLessonForm(false);
    setEditingLesson(null);
  };

  const handleAddAssignment = () => {
    setEditingAssignment(null);
    setShowAssignmentForm(true);
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setShowAssignmentForm(true);
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    if (confirm("Are you sure you want to delete this assignment?")) {
      setAssignments(assignments.filter(a => a.id !== assignmentId));
    }
  };

  const handleSaveAssignment = (assignmentData: Omit<Assignment, "id">) => {
    if (editingAssignment) {
      setAssignments(assignments.map(a => 
        a.id === editingAssignment.id 
          ? { ...assignmentData, id: editingAssignment.id }
          : a
      ));
    } else {
      const newAssignment: Assignment = {
        ...assignmentData,
        id: Date.now().toString(),
      };
      setAssignments([...assignments, newAssignment]);
    }
    setShowAssignmentForm(false);
    setEditingAssignment(null);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-3xl font-bold text-blue-600">{courses.length}</p>
            </div>
            <BookOpen className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Lessons</p>
              <p className="text-3xl font-bold text-green-600">{lessons.length}</p>
            </div>
            <FileText className="h-12 w-12 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assignments</p>
              <p className="text-3xl font-bold text-purple-600">{assignments.length}</p>
            </div>
            <Users className="h-12 w-12 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <span className="text-gray-700">Course "React Fundamentals" was updated</span>
            <span className="text-sm text-gray-500 ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <FileText className="h-5 w-5 text-green-600" />
            <span className="text-gray-700">New lesson "Introduction to React" was added</span>
            <span className="text-sm text-gray-500 ml-auto">1 day ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
            <Users className="h-5 w-5 text-purple-600" />
            <span className="text-gray-700">Assignment "Build a Todo App" was created</span>
            <span className="text-sm text-gray-500 ml-auto">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
        <button
          onClick={handleAddCourse}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Course</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="w-full h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
              <BookOpen className="h-16 w-16 text-white opacity-50" />
            </div>
            {/* <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-48 object-cover"
            /> */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">${course.price}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit Course"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Course"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLessons = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Lessons</h2>
        <button
          onClick={handleAddLesson}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Lesson</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lessons.map((lesson) => {
                const course = courses.find(c => c.id === lesson.courseId);
                return (
                  <tr key={lesson.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{lesson.title}</div>
                      <div className="text-sm text-gray-500">{lesson.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course?.title || "Unknown Course"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lesson.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditLesson(lesson)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit Lesson"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLesson(lesson.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Lesson"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAssignments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Assignments</h2>
        <button
          onClick={handleAddAssignment}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Assignment</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assignments.map((assignment) => {
                const course = courses.find(c => c.id === assignment.courseId);
                return (
                  <tr key={assignment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{assignment.title}</div>
                      <div className="text-sm text-gray-500">{assignment.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {course?.title || "Unknown Course"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(assignment.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {assignment.maxPoints}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditAssignment(assignment)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit Assignment"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAssignment(assignment.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Assignment"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Instructor Dashboard</h1>
          <p className="text-gray-600">Manage your courses, lessons, and assignments</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                { id: "overview" as const, label: "Overview", icon: BookOpen },
                { id: "courses" as const, label: "Courses", icon: BookOpen },
                { id: "lessons" as const, label: "Lessons", icon: FileText },
                { id: "assignments" as const, label: "Assignments", icon: Users },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === "overview" && renderOverview()}
            {activeTab === "courses" && renderCourses()}
            {activeTab === "lessons" && renderLessons()}
            {activeTab === "assignments" && renderAssignments()}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCourseForm && (
        <CourseForm
          course={editingCourse}
          onSave={handleSaveCourse}
          onCancel={() => {
            setShowCourseForm(false);
            setEditingCourse(null);
          }}
        />
      )}

      {showLessonForm && (
        <LessonForm
          lesson={editingLesson}
          courses={courses}
          onSave={handleSaveLesson}
          onCancel={() => {
            setShowLessonForm(false);
            setEditingLesson(null);
          }}
        />
      )}

      {showAssignmentForm && (
        <AssignmentForm
          assignment={editingAssignment}
          courses={courses}
          onSave={handleSaveAssignment}
          onCancel={() => {
            setShowAssignmentForm(false);
            setEditingAssignment(null);
          }}
        />
      )}
    </div>
  );
}