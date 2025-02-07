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


  if (loading) return 
  <>
  <div className="h-[80vh] w-full flex justify-center items-center">
    <p className="text-center text-lg">Loading...</p>;
  </div>
  </> 
  

  return (
    <div className="container h-[80vh] w-full flex flex-col justify-center items-center mx-auto p-4 max-w-3xl mt-14">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6">Admin Dashboard</h1>
      <div className="flex flex-col justify-center gap-8 mb-6 mt-10 font-semibold">
        <button className={`px-5 py-4 rounded-xl text-2xl ${activeSection === "addUsers" ? "bg-blue-500 text-white" : "bg-gray-300"}`} onClick={() => setActiveSection("addUsers")}>
          <Link href="/admin/dashboard/userManagement">User Management</Link>
        </button>
        <button className={`px-5 py-4 rounded-xl text-2xl ${activeSection === "dataManagement" ? "bg-blue-500 text-white" : "bg-gray-300"}`} onClick={() => setActiveSection("dataManagement")}>
          <Link href="/admin/dashboard/dataManagement">Data Management</Link>
        </button>
      </div>
    </div>
  );
}
