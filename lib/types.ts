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