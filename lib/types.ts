// lib/types.ts
export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  imageUrl: string;
  price: number;
  // Add any other course-related fields here
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  description: string;
  completed: boolean;
}

export interface CourseReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
  content: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  maxPoints: number;
  instructions: string;
}