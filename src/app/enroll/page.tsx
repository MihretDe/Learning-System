"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export default function EnrollPage() {
  const [courseId, setCourseId] = useState("");
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  const handleEnroll = async () => {
    if (!user) {
      alert("⚠️ Please login first!");
      return;
    }

    setLoading(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        enrolledCourses: arrayUnion(courseId),
      });
      alert(`✅ Enrolled in course: ${courseId}`);
      setCourseId("");
    } catch (error: any) {
      alert("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="text-center mt-10">⚠️ Please login to enroll.</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Enroll in a Course</h1>
      <input
        className="border p-2 w-full mb-2"
        placeholder="Enter Course ID"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
      />
      <button
        onClick={handleEnroll}
        disabled={!courseId || loading}
        className="bg-purple-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Enrolling..." : "Enroll"}
      </button>
    </div>
  );
}
