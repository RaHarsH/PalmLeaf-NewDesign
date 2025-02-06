"use client";

import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        role: "",
    })

    const [success, setSuccess] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("/api/auth/signup", user, {
                headers: {
                  'Content-Type': 'application/json',
                }
            })
    
            console.log('====================================');
            console.log(response.data);
            console.log('====================================');
    
            
          if (response.status === 200) {
            setSuccess('User added successfully!');
            setUser({ username: '', email: '', password: '', role: '' });
          }

        } catch (error) {
            console.error(error)
        }
    }
  return (
    <>
        <div className='w-full h-[90vh] mt-10 flex flex-col justify-center items-center'>
            <h1>User Management</h1>
            <Link href={`/admin/dashboard`}>Back to dashboard</Link>

            {/* add Users */}

            <form onSubmit={handleSubmit} className='space-y-4 flex flex-col justify-center items-center gsap-5'>
                <div>
                    <input 
                        type="text" 
                        placeholder='username'
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                    />
                </div>
                <div>
                    <input 
                        type="email" 
                        placeholder='email'
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                </div>
                <div>
                    <input 
                        type="password" 
                        placeholder='password'
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                    />
                </div>
                <div>
                    <input 
                        type="text" 
                        placeholder='role'
                        value={user.role}
                        onChange={(e) => setUser({...user, role: e.target.value})}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
                >
                    Add User
                    <ArrowRight className="ml-2 h-5 w-5" />
                </button>
            </form>


            {/* edit existing Users */}
        </div>
    </>
  )
}

export default page