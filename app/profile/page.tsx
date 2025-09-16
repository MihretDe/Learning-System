"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";

export default function ProfilePage() {
  const [user] = useAuthState(auth);
  const [courses, setCourses] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserCourses = async () => {
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setCourses(userDoc.data().enrolledCourses || []);
      }
    };
    fetchUserCourses();
  }, [user]);

  if (!user) return <p className="text-center mt-10">⚠️ Please login to view profile.</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p className="mb-2">👤 <strong>Email:</strong> {user.email}</p>

      <h2 className="mt-4 font-semibold">📚 Enrolled Courses:</h2>
      {courses.length === 0 ? (
        <p className="text-gray-500 mt-2">You are not enrolled in any courses yet.</p>
      ) : (
        <ul className="list-disc ml-6 mt-2">
          {courses.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
