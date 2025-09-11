// components/CourseCard.tsx
"use client"; // This is a client component
import Link from "next/link";
import Image from "next/image";
import type { Course } from "@/lib/types"; // Import your Course interface

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-100">
      <div className="relative">
        <Image
          src={course.imageUrl || "/placeholder.svg"}
          alt={course.title}
          width={400}
          height={192}
          className="w-full h-48 object-cover"
          style={{ objectFit: "cover" }}
          priority={true}
        />
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-3 py-1 rounded-full font-medium shadow-sm">
            {course.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.description.substring(0, 120)}...
        </p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-blue-600">
            ${course.price.toFixed(2)}
          </span>
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600">4.8 (234)</span>
          </div>
        </div>

        <Link
          href={`/courses/${course.id}`}
          className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg text-center font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Enroll Now
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;
