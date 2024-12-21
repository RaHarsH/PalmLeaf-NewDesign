'use client'

import { useState } from 'react'
import axios from 'axios';

const mockData = [
  {
    id: 1,
    username: 'John Doe',
    uid: '12345',
  },
  {
    id: 2,
    username: 'Jane Smith',
    uid: '67890',
  },
]

export default function Page() {
  const [username, setUsername] = useState('');
  const [uid, setUid] = useState('');
  const [data, setData] = useState(mockData);
  const [activeTab, setActiveTab] = useState('insert');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = { username, uid };

    try {
      // Send data as JSON
      const response = await axios.post('/api/insertData', formData, {
        headers: {
          'Content-Type': 'application/json', // Ensure it's set to 'application/json'
        },
      });
  
      if (response.status === 200) {
        console.log('Data inserted successfully');
        setUsername('');
        setUid('');
        // Optionally update the data state to reflect the new data
        setData((prevData) => [...prevData, { id: prevData.length + 1, username, uid }]);
      } else {
        console.log('Error inserting data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex flex-col mt-10">
      {/* Insert Data Tab */}
      {activeTab === 'insert' ? (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="uid" className="text-sm font-medium text-gray-700">UID</label>
              <input
                id="uid"
                name="uid"
                type="text"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200">
            Submit
          </button>
        </form>
      ) : (
        <div>
          <h2>View Data</h2>
          {/* Your view data logic goes here */}
        </div>
      )}
    </div>
  );
}
