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
