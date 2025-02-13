"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";

export default function AdminDashboardPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("addUsers");

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await axios.get("/api/auth/me");
        const user = response.data.decodedToken;

        if (!user || user.role.toUpperCase() !== "ADMIN") {
          router.push(user ? "/profile" : "/auth/signin");
          toast.info("Unauthorized access");
          return;
        }
        else {
          toast.success("User Authorized.Welcome Admin!");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Error fetching user!");
        router.push("/auth/signin");
      }
    };

    checkUserRole();
  }, [router]);


  if (loading)
    return (
      <div className="h-screen w-full flex justify-center items-center bg-gradient-to-br from-gray-100 to-blue-200">
        <p className="text-center text-lg font-semibold text-gray-700">
          Loading...
        </p>
      </div>
    );

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-blue-200 p-6">
      {/* Dashboard Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-8 drop-shadow-lg">
        Admin Dashboard
      </h1>

      {/* Glassmorphic Card Container */}
      <div className="w-full max-w-lg p-8 bg-white/50 backdrop-blur-lg shadow-xl rounded-3xl border border-gray-300 flex flex-col items-center gap-6">
        {/* User Management Button */}
        <button
          className={`w-full py-4 rounded-xl text-xl font-semibold transition-all duration-300 ${
            activeSection === "addUsers"
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-white text-gray-800 border border-gray-300 hover:bg-blue-100"
          }`}
          onClick={() => setActiveSection("addUsers")}
        >
          <Link href="/admin/dashboard/userManagement">User Management</Link>
        </button>

        {/* Data Management Button */}
        <button
          className={`w-full py-4 rounded-xl text-xl font-semibold transition-all duration-300 ${
            activeSection === "dataManagement"
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-white text-gray-800 border border-gray-300 hover:bg-blue-100"
          }`}
          onClick={() => setActiveSection("dataManagement")}
        >
          <Link href="/admin/dashboard/dataManagement">Data Management</Link>
        </button>
      </div>
    </div>
  );
}
