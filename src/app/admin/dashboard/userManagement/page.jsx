"use client";

import axios from "axios";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      setLoading(true)

    if (!validatePassword(user.password)) {
        setError("Password must be at least 8 characters long and include letters, numbers, and special characters.");
        return;
    } else {
        setError("");
    }

    try {
      const response = await axios.post("/api/auth/signup", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);

      if (response.status === 201) {
        setSuccess("User added successfully!");
        setUser({ username: "", email: "", password: "", role: "" });

        setLoading(false);
      }
    } catch (error) {
      console.error(error);

      setUser({ username: "", email: "", password: "", role: "" });
    }
  };

  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setFetchLoading(true);
      try {
        const response = await axios.get("/api/users/getUsers");

        console.log("All users response: ", response.data.allUsers)

        setFetchedUsers(response.data.allUsers.rows);

        console.log("Fetched Users: ", fetchedUsers);
        
      } catch (err) {
        setFetchError("Failed to fetch users");
        console.error(err);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="mt-20 w-full min-h-screen flex flex-col justify-center items-center p-4 bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">User Management</h1>

        <Link
          href="/admin/dashboard"
          className="text-blue-600 hover:underline text-sm text-center block mb-4"
        >
          Back to dashboard
        </Link>

        {/* Add users section */}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
            </button>
          </div>

          {/* Show error message for password validation */}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div>
            <input
              type="text"
              placeholder="Role"
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
          >
            {
                loading ? "Adding User" : "Add User"
            }
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>

          {success && <p className="text-green-600 text-sm text-center">{success}</p>}
        </form>

      </div>


        {/* Edit users section and also delete existing users */}


        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mt-10">
          <h1 className="text-xl font-bold mb-4">Manage Users</h1>

          {loading && <p>Loading users...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div>
            {fetchedUsers.length > 0 ? (
              <ul className="space-y-2">
                {fetchedUsers.map((user) => (
                  <li key={user.user_id} className="p-2 border rounded-md">
                    <p>
                      <strong>{user.username}</strong> ({user.email}) - {user.role}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              !loading && <p>No users found</p>
            )}
          </div>
        </div>
    </div>
  );
};

export default Page;
