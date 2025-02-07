"use client";

import axios from "axios";
import { ArrowRight, Eye, EyeOff, Trash, Save, Trash2, Pencil } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ArrowLeftCircle } from "react-feather";



const Page = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "", role: "" });
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState("add");

  const [fetchedUsers, setFetchedUsers] = useState([]);

  const [isEditable, setIsEditable] = useState({
    user_id: "",
    status: false,
  });
  const [editedUserRole, setEditedUserRole] = useState({
    user_id: "",
    role: "",
  });

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validatePassword(user.password)) {
      setError("Password must be at least 8 characters long and include letters, numbers, and special characters.");
      setLoading(false);
      return;
    }

    setError("");
    try {
      const response = await axios.post("/api/auth/signup", user, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        setSuccess("User added successfully!");
        setUser({ username: "", email: "", password: "", role: "" });
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users/getUsers");
      setFetchedUsers(response.data.allUsers.rows);

    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleSave = async ({user_id, role}) => {
    try {
      const response = await axios.put('/api/users/updateUser', { user_id, role });
  
      console.log(response.data);
  
      if(response.status >= 200) {
        console.log("Message from frontend: User role updated successfully!");
      }

      
      // setIsEditable({user_id, status: false});
      
    } catch (error) {
      console.error(error);
      
    } finally {
      setIsEditable({user_id, status: false});
      fetchUsers();
    }
     
  }

  const handleDelete = async ( user_id ) => {
    try {
      console.log("User with ID to be deleted: ", { user_id })
      const response = await axios.delete('/api/users/deleteUser', {data: { user_id }});

      console.log(response.data);

      if(response.status >= 200) {
        console.log("Message from frontend: User deleted successfully!");
      }

      // fetchUsers();
    } catch (error) {
      console.error(error);

    } finally {
      fetchUsers();
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 relative top-20">
      {/* Top Bar */}
      <div className="bg-white shadow-md p-4 flex justify-center items-center space-x-4">
        <button onClick={() => setSelectedSection("add")} className={`px-4 py-2 rounded-md font-semibold ${selectedSection === "add" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>
          Add Users
        </button>
        <button onClick={() => setSelectedSection("manage")} className={`px-4 py-2 rounded-md font-semibold ${selectedSection === "manage" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>
          Manage Users
        </button>

        <Link
          href="/admin/dashboard"
          className="text-blue-600 hover:underline text-xl text-center block ml-10"
        >
          <ArrowLeftCircle className="inline-block" /> Back to dashboard 
        </Link>

      </div>
      
      {/* Main Content */}

      {/* Adding Users */}
      <div className="p-6 flex justify-center">
        {selectedSection === "add" && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Add User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
              <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
                <button type="button" className="absolute inset-y-0 right-3" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <input type="text" placeholder="Role" value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center">
                {loading ? "Adding User..." : "Add User"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              {success && <p className="text-green-600 text-sm text-center">{success}</p>}
            </form>
          </div>
        )}


        {/* Manage Users */}

        {selectedSection === "manage" && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-7xl">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Manage Users</h2>
            {fetchedUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="border border-gray-300 p-3 text-center">User ID</th>
                      <th className="border border-gray-300 p-3 text-center">Username</th>
                      <th className="border border-gray-300 p-3 text-center">Email</th>
                      <th className="border border-gray-300 p-3 text-center">Role</th>
                      <th colSpan={2} className="border border-gray-300 p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetchedUsers.map((user) => (
                      <tr key={user.user_id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition">
                        <td className="border border-gray-300 p-3 text-center">{user.user_id}</td>
                        <td className="border border-gray-300 p-3 text-center">{user.username}</td>
                        <td className="border border-gray-300 p-3 text-center">{user.email}</td>
                        <td className="border border-gray-300 p-3 text-center">
                          <input
                            type="text"
                            value={isEditable.user_id === user.user_id ? editedUserRole.role : user.role}
                            disabled={isEditable.user_id !== user.user_id}
                            onChange={(e) => setEditedUserRole({ user_id: user.user_id, role: e.target.value })}
                            className={`w-full px-3 py-1 border rounded-md focus:outline-none ${
                              isEditable.user_id === user.user_id ? "border-blue-500 bg-white" : "bg-gray-100"
                            }`}
                          />
                        </td>
                        <td className="border border-gray-300 p-3 text-center">
                          <div className="w-full flex justify-center">
                            {isEditable.user_id === user.user_id ? (
                              <button
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 flex items-center rounded-md transition"
                                onClick={() => handleSave({user_id: user.user_id, role: editedUserRole.role})}
                              >
                                <Save className="mr-2 h-4 w-4" /> Save
                              </button>
                            ) : (
                              <button
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 flex items-center rounded-md transition"
                                onClick={() => setIsEditable({ user_id: user.user_id, status: true })}
                              >
                              <Pencil className="mr-2 h-4 w-4" /> Edit
                              </button>
                            )}
                          </div>
                        </td>

                        <td className="border border-gray-300 p-3 text-center flex justify-center">
                          <button 
                            onClick={() => handleDelete(user.user_id)}
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 flex items-center rounded-md transition">
                            <Trash2 className="mr-2 h-4 w-4" />Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-600">No users found</p>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Page;
