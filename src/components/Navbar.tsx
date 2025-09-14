"use client"; // MUST be a Client Component

import Link from "next/link";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      {/* Left side: Logo/Home */}
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-lg font-bold hover:underline">
          LMS Home
        </Link>
      </div>

      {/* Right side: Links */}
      <div className="space-x-4">
        {!user ? (
          <>
            <Link href="/register" className="hover:underline">Register</Link>
            <Link href="/login" className="hover:underline">Login</Link>
          </>
        ) : (
          <>
            <Link href="/enroll" className="hover:underline">Enroll</Link>
            <Link href="/profile" className="hover:underline">Profile</Link>
            <button onClick={handleLogout} className="ml-2 bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
