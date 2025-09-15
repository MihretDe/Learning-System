"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function SettingsPage() {
  const [user] = useAuthState(auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(user.displayName || "");
        setEmail(user.email || "");
      }
    };

    fetchUserData();
  }, [user]);

  const handleUpdate = async () => {
    if (!user) return;
    setLoading(true);

    try {
      await updateProfile(user, { displayName: name });
      await updateEmail(user, email);

      if (password) {
        await updatePassword(user, password);
      }

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { name, email });

      alert("✅ Settings updated successfully!");
      setPassword("");
    } catch (error: any) {
      alert("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="p-6">Please login to access settings.</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <label className="block mb-2">Name</label>
      <input
        className="border p-2 w-full mb-4 text-black placeholder-gray-400"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="block mb-2">Email</label>
      <input
        className="border p-2 w-full mb-4 text-black placeholder-gray-400"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="block mb-2">New Password</label>
      <input
        className="border p-2 w-full mb-4 text-black placeholder-gray-400"
        type="password"
        placeholder="Leave blank to keep current password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Updating..." : "Update Settings"}
      </button>
    </div>
  );
}
