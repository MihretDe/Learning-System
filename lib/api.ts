// lib/api.ts - API service functions for instructor dashboard
import { Course } from "@/lib/types";

const API_BASE = '/api';

// Course API functions
export const courseAPI = {
  // Get all courses
  getAll: async () => {
    const response = await fetch(`${API_BASE}/courses`);
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    const data = await response.json();
    return data.courses;
  },

  // Get single course
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE}/courses/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch course');
    }
    return response.json();
  },

  // Create new course
  create: async (courseData: Omit<Course, "id">) => {
    const response = await fetch(`${API_BASE}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create course');
    }
    return response.json();
  },

  // Update course
  update: async (id: string, courseData: Omit<Course, "id">) => {
    const response = await fetch(`${API_BASE}/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update course');
    }
    return response.json();
  },

  // Delete course
  delete: async (id: string) => {
    const response = await fetch(`${API_BASE}/courses/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete course');
    }
    return response.json();
  }
};

// Lesson API functions
export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
  content: string;
}

export const lessonAPI = {
  // Get all lessons
  getAll: async () => {
    const response = await fetch(`${API_BASE}/lessons`);
    if (!response.ok) {
      throw new Error('Failed to fetch lessons');
    }
    const data = await response.json();
    return data.lessons;
  },

  // Get single lesson
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE}/lessons/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch lesson');
    }
    return response.json();
  },

  // Create new lesson
  create: async (lessonData: Omit<Lesson, "id">) => {
    const response = await fetch(`${API_BASE}/lessons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lessonData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create lesson');
    }
    return response.json();
  },

  // Update lesson
  update: async (id: string, lessonData: Omit<Lesson, "id">) => {
    const response = await fetch(`${API_BASE}/lessons/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lessonData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update lesson');
    }
    return response.json();
  },

  // Delete lesson
  delete: async (id: string) => {
    const response = await fetch(`${API_BASE}/lessons/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete lesson');
    }
    return response.json();
  }
};

// Assignment API functions
export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  maxPoints: number;
  instructions: string;
}

export const assignmentAPI = {
  // Get all assignments
  getAll: async () => {
    const response = await fetch(`${API_BASE}/assignments`);
    if (!response.ok) {
      throw new Error('Failed to fetch assignments');
    }
    const data = await response.json();
    return data.assignments;
  },

  // Get single assignment
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE}/assignments/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch assignment');
    }
    return response.json();
  },

  // Create new assignment
  create: async (assignmentData: Omit<Assignment, "id">) => {
    const response = await fetch(`${API_BASE}/assignments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assignmentData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create assignment');
    }
    return response.json();
  },

  // Update assignment
  update: async (id: string, assignmentData: Omit<Assignment, "id">) => {
    const response = await fetch(`${API_BASE}/assignments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assignmentData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update assignment');
    }
    return response.json();
  },

  // Delete assignment
  delete: async (id: string) => {
    const response = await fetch(`${API_BASE}/assignments/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete assignment');
    }
    return response.json();
  }
};