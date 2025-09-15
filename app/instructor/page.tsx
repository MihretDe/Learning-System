"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, BookOpen, FileText, Users, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import type { Course } from "@/lib/types";
import { courseAPI, lessonAPI, assignmentAPI, type Lesson, type Assignment } from "@/lib/api";

// Dynamic imports to avoid SSR issues
const CourseForm = dynamic(() => import("@/components/instructor/CourseForm"), { ssr: false });
const LessonForm = dynamic(() => import("@/components/instructor/LessonForm"), { ssr: false });
const AssignmentForm = dynamic(() => import("@/components/instructor/AssignmentForm"), { ssr: false });

// Import interfaces from api.ts

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "lessons" | "assignments">("overview");
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  
  // Loading states
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  
  // Edit states
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);

  // Load data from Firebase API
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [coursesData, lessonsData, assignmentsData] = await Promise.all([
        courseAPI.getAll(),
        lessonAPI.getAll(),
        assignmentAPI.getAll()
      ]);
      
      setCourses(coursesData || []);
      setLessons(lessonsData || []);
      setAssignments(assignmentsData || []);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = () => {
    setEditingCourse(null);
    setShowCourseForm(true);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setShowCourseForm(true);
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (confirm("Are you sure you want to delete this course? This will also delete all related lessons and assignments.")) {
      try {
        setActionLoading(true);
        await courseAPI.delete(courseId);
        
        // Remove from local state
        setCourses(courses.filter(c => c.id !== courseId));
        setLessons(lessons.filter(l => l.courseId !== courseId));
        setAssignments(assignments.filter(a => a.courseId !== courseId));
      } catch (err) {
        console.error('Error deleting course:', err);
        alert('Failed to delete course. Please try again.');
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleSaveCourse = async (courseData: Omit<Course, "id">) => {
    try {
      setActionLoading(true);
      
      if (editingCourse) {
        // Update existing course
        const updatedCourse = await courseAPI.update(editingCourse.id, courseData);
        setCourses(courses.map(c => 
          c.id === editingCourse.id 
            ? { ...courseData, id: editingCourse.id }
            : c
        ));
      } else {
        // Create new course
        const newCourse = await courseAPI.create(courseData);
        setCourses([...courses, { ...courseData, id: newCourse.id }]);
      }
      
      setShowCourseForm(false);
      setEditingCourse(null);
    } catch (err) {
      console.error('Error saving course:', err);
      alert('Failed to save course. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddLesson = () => {
    setEditingLesson(null);
    setShowLessonForm(true);
  };

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setShowLessonForm(true);
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (confirm("Are you sure you want to delete this lesson?")) {
      try {
        setActionLoading(true);
        await lessonAPI.delete(lessonId);
        setLessons(lessons.filter(l => l.id !== lessonId));
      } catch (err) {
        console.error('Error deleting lesson:', err);
        alert('Failed to delete lesson. Please try again.');
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleSaveLesson = async (lessonData: Omit<Lesson, "id">) => {
    try {
      setActionLoading(true);
      
      if (editingLesson) {
        // Update existing lesson
        await lessonAPI.update(editingLesson.id, lessonData);
        setLessons(lessons.map(l => 
          l.id === editingLesson.id 
            ? { ...lessonData, id: editingLesson.id }
            : l
        ));
      } else {
        // Create new lesson
        const newLesson = await lessonAPI.create(lessonData);
        setLessons([...lessons, { ...lessonData, id: newLesson.id }]);
      }
      
      setShowLessonForm(false);
      setEditingLesson(null);
    } catch (err) {
      console.error('Error saving lesson:', err);
      alert('Failed to save lesson. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddAssignment = () => {
    setEditingAssignment(null);
    setShowAssignmentForm(true);
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setShowAssignmentForm(true);
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    if (confirm("Are you sure you want to delete this assignment?")) {
      try {
        setActionLoading(true);
        await assignmentAPI.delete(assignmentId);
        setAssignments(assignments.filter(a => a.id !== assignmentId));
      } catch (err) {
        console.error('Error deleting assignment:', err);
        alert('Failed to delete assignment. Please try again.');
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleSaveAssignment = async (assignmentData: Omit<Assignment, "id">) => {
    try {
      setActionLoading(true);
      
      if (editingAssignment) {
        // Update existing assignment
        await assignmentAPI.update(editingAssignment.id, assignmentData);
        setAssignments(assignments.map(a => 
          a.id === editingAssignment.id 
            ? { ...assignmentData, id: editingAssignment.id }
            : a
        ));
      } else {
        // Create new assignment
        const newAssignment = await assignmentAPI.create(assignmentData);
        setAssignments([...assignments, { ...assignmentData, id: newAssignment.id }]);
      }
      
      setShowAssignmentForm(false);
      setEditingAssignment(null);
    } catch (err) {
      console.error('Error saving assignment:', err);
      alert('Failed to save assignment. Please try again.');
    } finally {
      setActionLoading(false);
    }
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

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading Dashboard...</h2>
          <p className="text-gray-600">Please wait while we load your courses, lessons, and assignments.</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-800 mb-2">Error Loading Dashboard</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadAllData}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Instructor Dashboard</h1>
          <p className="text-gray-600">Manage your courses, lessons, and assignments</p>
          {actionLoading && (
            <div className="mt-2 flex items-center text-blue-600">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span>Processing...</span>
            </div>
          )}
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