"use client";
import { useState } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

function Navbar() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await signOut(auth);
    setIsProfileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-white bg-opacity-10 p-2 rounded-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">LearnHub</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/courses"
                className="text-white hover:text-blue-200 transition-colors"
              >
                Courses
              </Link>
              <Link
                href="/my-learning"
                className="text-white hover:text-blue-200 transition-colors"
              >
                My Learning
              </Link>
              <Link
                href="/instructor"
                className="text-white hover:text-blue-200 transition-colors"
              >
                Teach
              </Link>

              {!user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/auth/register"
                    className="text-white hover:text-blue-200 transition-colors"
                  >
                    Register
                  </Link>
                  <Link
                    href="/auth/login"
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    Login
                  </Link>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors"
                  >
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center border-2 border-white border-opacity-20">
                      {user.displayName
                        ? user.displayName[0]
                        : user.email?.[0]?.toUpperCase()}
                    </div>
                    <span className="hidden lg:block">
                      {user.displayName || user.email}
                    </span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-medium text-gray-900">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:text-blue-200 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-blue-700 border-t border-blue-500">
            <div className="px-4 py-2 space-y-2">
              <Link
                href="/courses"
                className="block text-white hover:text-blue-200 py-2"
              >
                Courses
              </Link>
              <Link
                href="/my-learning"
                className="block text-white hover:text-blue-200 py-2"
              >
                My Learning
              </Link>
              <Link
                href="/instructor"
                className="block text-white hover:text-blue-200 py-2"
              >
                Teach
              </Link>

              <div className="border-t border-blue-500 pt-2">
                {!user ? (
                  <>
                    <Link
                      href="/auth/register"
                      className="block text-white hover:text-blue-200 py-2"
                    >
                      Register
                    </Link>
                    <Link
                      href="/auth/login"
                      className="block text-white hover:text-blue-200 py-2"
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="py-2 border-b border-blue-500">
                      <p className="text-white font-medium">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-blue-200 text-sm">{user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="block text-white hover:text-blue-200 py-2"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block text-white hover:text-blue-200 py-2"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left text-red-300 hover:text-red-200 py-2"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {isProfileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileMenuOpen(false)}
        />
      )}
    </>
  );
}

export default Navbar;
