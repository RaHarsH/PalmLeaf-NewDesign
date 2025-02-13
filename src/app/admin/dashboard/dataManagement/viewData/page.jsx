"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ViewData = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const getDataFromApi = async () => {
    try {
        const response = await axios.get('/api/getFormData')

        const fetchedData = response.data

        if(fetchedData.length > 0) {
            setColumns(Object.keys(fetchedData[0])) // get all the column names dynamically
        }

        setData(fetchedData)
        setLoading(false)

        toast.success("Data fetched successfully!")
    } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        setLoading(false);
        toast.error('Failed to fetch data!')
    }
  }

  useEffect(() => {
    // call the function when the user visits this page or when refreshing
    // console.log(data)
    getDataFromApi()
  }, []);

  const filteredData = data.filter((item) =>
    ["user_id", "username", "grantha_name", "language_name", "grantha_type", "grantha_deck_type"].some((key) =>
      item[key]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="p-6 mt-14">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">
        View Data
      </h1>

      {/* Search Bar to filter the data */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by ID, Username, Grantha Name or language"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3"
        />
      </div>

      {/* Loading State: to show the loading */}
      {loading && <p className="text-center text-gray-600">Loading...</p>}

      {/* Error State: to show the errors when they occur */}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* Data Table */}
      {!loading && !error && filteredData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="px-10 py-4 border capitalize">
                    {column.replace("_", " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} className="bg-gray-100 hover:bg-gray-200 transition-all">
                  {columns.map((col, idx) => (
                    <td key={idx} className="p-3 border text-center">
                      {item[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p className="text-center text-gray-600">No data available</p>
      )}
    </div>
  );
};

export default ViewData;
