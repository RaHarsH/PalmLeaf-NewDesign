"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const tables = [
  "language", "granthatype", "granthadeck", "author", "location",
  "grantha", "granthalanguage", "storagemechanism", "physicalcondition",
  "conservationhistory", "scanningproperties", "scannedimage", "digitalfile",
  "bundle", "accesscontrol", "subworks"
];

const EditPage = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [data, setData] = useState([]);
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    if (selectedTable) {
      axios.get(`/api/get/${selectedTable}`)
        .then((res) => {
          console.log("Fetched Data:", res.data);
          setData(Array.isArray(res.data) ? res.data : []); // Ensure it's an array
        })
        .catch((err) => {
          console.error("Error fetching data", err);
          setData([]);
        });
    }
  }, [selectedTable]);

  const handleEdit = (row) => {
    setEditingRowId(row[`${selectedTable}_id`]);
    setEditedData({ ...row });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.post(`/api/update/${selectedTable}`, {
        id: editingRowId,
        data: editedData,
      });

      if (res.status === 200) {
        alert("Row updated!");
        setEditingRowId(null);
        // Update the local state instead of refetching the table
        setData(data.map(row => 
          row[`${selectedTable}_id`] === editingRowId ? editedData : row
        ));
      } else {
        alert("Failed to update row.");
      }
    } catch (error) {
      console.error("Error updating row", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Edit Database</h1>

      {/* Table Selection */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-600">Select a Table</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tables.map((table) => (
            <button
              key={table}
              className={`px-4 py-2 rounded-lg shadow-md text-white font-medium transition duration-300 ${
                selectedTable === table ? "bg-blue-600" : "bg-blue-400 hover:bg-blue-500"
              }`}
              onClick={() => setSelectedTable(table)}
            >
              {table.replace(/_/g, " ").toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Table Data Display */}
      {selectedTable && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Editing: {selectedTable.toUpperCase()}</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  {data.length > 0 &&
                    Object.keys(data[0]).map((key) => (
                      <th key={key} className="border border-gray-300 p-2 text-gray-700">{key}</th>
                    ))}
                  <th className="border border-gray-300 p-2 text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr
                    key={row[`${selectedTable}_id`]}
                    className="even:bg-gray-100"
                  >
                    {Object.keys(row).map((key) => (
                      <td key={key} className="border border-gray-300 p-2">
                        {editingRowId === row[`${selectedTable}_id`] ? (
                          <input
                            type="text"
                            value={editedData[key] || ""}
                            onChange={(e) =>
                              setEditedData({ ...editedData, [key]: e.target.value })
                            }
                            className="border px-2 py-1 rounded w-full"
                          />
                        ) : (
                          row[key]
                        )}
                      </td>
                    ))}
                    <td className="border border-gray-300 p-2">
                      {editingRowId === row[`${selectedTable}_id`] ? (
                        <button
                          onClick={handleUpdate}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(row)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPage;
