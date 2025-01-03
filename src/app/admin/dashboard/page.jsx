'use client';

import { useState, useEffect } from 'react';
import { Search, Menu, Plus, Eye, X } from 'lucide-react';
import axios from 'axios';

export default function Page() {
  const [activeTab, setActiveTab] = useState('insert');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTable, setSelectedTable] = useState('useraccount');

  const tableSchemas = {
    useraccount: ['user_id', 'username', 'password', 'role'],
    accesscontrol: ['access_id', 'user_id', 'permission_level', 'grantha_id'],
    grantha: [
      'grantha_id',
      'grantha_name',
      'creation_date',
      'description',
      'grantha_deck_id',
      'grantha_type_id',
      'author_id',
      'location_id',
    ],
    granthadeck: ['grantha_deck_id', 'type_name'],
    granthatype: ['grantha_type_id', 'type_name'],
    author: ['author_id', 'name', 'birth_year', 'death_year', 'bio'],
    location: ['location_id', 'shelf_number', 'room_number'],
    bundle: [
      'grantha_id',
      'bundle_id',
      'bundle_origin',
      'bundle_owner_name',
      'bundle_number',
      'str_number',
      'bundle_received_date',
      'bundle_returned_date',
      'stitch_or_noStitch',
      'number_subworks',
      'length',
      'width',
      'total_leaves',
      'total_images',
    ],
    physicalcondition: ['condition_id', 'grantha_id', 'condition_notes', 'last_checked_date'],
    conservationhistory: ['conservation_id', 'grantha_id', 'conservation_date', 'description'],
    storagemechanism: [
      'storage_id',
      'grantha_id',
      'storage_type',
      'backup_location',
      'encryption_status',
      'storage_location',
      'last_backup_date',
      'access_url',
      'storage_notes',
    ],
    digitalfile: [
      'file_id',
      'grantha_id',
      'file_name',
      'file_path',
      'file_format',
      'folder_size_gb',
      'capture_time',
      'version_number',
      'thumbnail_url',
      'scan_id',
    ],
    scannedimage: ['image_id', 'grantha_id', 'image_url', 'capture_date'],
    scanningproperties: [
      'scan_id',
      'grantha_id',
      'scanner_model',
      'resolution_dpi',
      'technician_name',
      'lighting_conditions',
      'color_depth',
      'Grantha_Compiled_Date',
      'color_scanning',
      'notes',
      'scanning_start_date',
      'scanning_complete_date',
      'file_format',
      'page_count',
      'Horizontal_or_Vertical_Scan',
    ],
    granthalanguage: ['grantha_id', 'language_id'],
    language: ['language_id', 'language_name'],
  };

  const tableOptions = Object.keys(tableSchemas);

  useEffect(() => {
    if (activeTab === 'view') {
      fetchTableData(selectedTable);
    }
  }, [selectedTable, activeTab]);

  const getInputType = (fieldName) => {
    // Date fields
    if (fieldName.includes('date')) {
      return 'date';
    }
    
    // Number fields
    if (
      fieldName.includes('id') ||
      fieldName.includes('number') ||
      fieldName.includes('size') ||
      fieldName.includes('count') ||
      fieldName === 'length' ||
      fieldName === 'width' ||
      fieldName.includes('year') ||
      fieldName === 'resolution_dpi'
    ) {
      return 'number';
    }

    // Boolean fields
    if (fieldName === 'stitch_or_noStitch' || fieldName.includes('status')) {
      return 'select';
    }

    // Password field
    if (fieldName === 'password') {
      return 'password';
    }

    // Default to text
    return 'text';
  };

  // Helper function to get default value based on input type
  const getDefaultValue = (fieldName, inputType) => {
    if (inputType === 'date') {
      return '';
    }
    if (inputType === 'number') {
      return '';
    }
    return '';
  };

  const fetchTableData = async (tableName) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/fetchData?tableName=${tableName}`);
      setTableData(response.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert(`Failed to fetch data for table: ${tableName}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData.entries());

    // Format the data as expected by the API
    const data = {
      tableName: selectedTable,
      data: [formEntries] // Wrap the form data in an array as expected by the API
    };

    try {
      const response = await axios.post('/api/insertData', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.status === 200) {
        alert('Data inserted successfully!');
        event.target.reset();
        if (activeTab === 'view') {
          // Refresh the table data if we're in view mode
          fetchTableData(selectedTable);
        }
      } else {
        alert('Error inserting data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error inserting data: ' + (error.response?.data?.message || error.message));
    }
  }

  const handleUpdate = async (rowId) => {
    const updatedData = {
      tableName: selectedTable,
      data: [editRow], 
    };

    try {
      const response = await axios.put(`/api/updateData?tableName=${selectedTable}&rowId=${rowId}`, updatedData, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.status === 200) {
        alert('Data updated successfully!');
        fetchTableData(selectedTable);
        setEditRow(null);
      } else {
        alert('Error updating data');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Error updating data: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (rowId) => {
    // Handle the delete functionality
    try {
      const response = await axios.delete(`/api/deleteData?tableName=${selectedTable}&rowId=${rowId}`);
      if (response.status === 200) {
        alert('Data deleted successfully!');
        fetchTableData(selectedTable);
      } else {
        alert('Error deleting data');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      alert('Error deleting data: ' + (error.response?.data?.message || error.message));
    }
  };

  const filteredData = tableData.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const renderFormInput = (field) => {
    const inputType = getInputType(field);
    const defaultValue = getDefaultValue(field, inputType);

    if (inputType === 'select' && field === 'stitch_or_noStitch') {
      return (
        <select
          id={field}
          name={field}
          className="w-full p-2 border rounded-md"
          defaultValue=""
        >
          <option value="" disabled>Select option</option>
          <option value="stitch">Stitch</option>
          <option value="noStitch">No Stitch</option>
        </select>
      );
    }

    if (inputType === 'select' && field.includes('status')) {
      return (
        <select
          id={field}
          name={field}
          className="w-full p-2 border rounded-md"
          defaultValue=""
        >
          <option value="" disabled>Select status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      );
    }

    return (
      <input
        id={field}
        name={field}
        type={inputType}
        className="w-full p-2 border rounded-md"
        defaultValue={defaultValue}
        step={inputType === 'number' && field.includes('size') ? '0.01' : '1'}
        min={inputType === 'number' ? '0' : undefined}
      />
    );
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-white to-blue-100 mt-10">
      {/* Sidebar */}
      <div
        className={`fixed mt-10 overflow-y-hidden inset-y-0 left-0 z-10 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-black">Admin Panel</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-600 hover:text-black md:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <select
              className="w-full p-2 border rounded-md"
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
            >
              {tableOptions.map((table) => (
                <option key={table} value={table}>
                  {table}
                </option>
              ))}
            </select>
            <button
              className={`w-full flex items-center justify-start px-4 py-2 text-left ${
                activeTab === 'insert' ? 'bg-blue-100' : ''
              }`}
              onClick={() => setActiveTab('insert')}
            >
              <Plus className="mr-2 h-4 w-4" /> Insert Data
            </button>
            <button
              className={`w-full flex items-center justify-start px-4 py-2 text-left ${
                activeTab === 'view' ? 'bg-blue-100' : ''
              }`}
              onClick={() => setActiveTab('view')}
            >
              <Eye className="mr-2 h-4 w-4" /> View Data
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-6 w-6 mt-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          {activeTab === 'insert' ? (
           <form
           onSubmit={handleSubmit}
           className="bg-white shadow-md rounded-lg p-6 space-y-6"
         >
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {tableSchemas[selectedTable].map((field) => (
               <div key={field} className="space-y-2">
                 <label
                   htmlFor={field}
                   className="text-sm font-medium text-gray-700"
                 >
                   {field.replace(/_/g, ' ')}
                 </label>
                 {renderFormInput(field)}
               </div>
             ))}
           </div>
           <button
             type="submit"
             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
           >
             Submit
           </button>
         </form>
          ) : (
            <div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <table className="w-full bg-white border rounded-lg shadow-md">
                <thead>
                  <tr>
                    {tableSchemas[selectedTable].map((field) => (
                      <th
                        key={field}
                        className="p-2 border-b text-left text-sm font-medium text-gray-700"
                      >
                        {field.replace(/_/g, ' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, index) => (
                    <tr key={index}>
                      {tableSchemas[selectedTable].map((field) => (
                        <td
                          key={field}
                          className="p-2 border-b text-sm text-gray-600"
                        >
                          {row[field]}
                        </td>
                      ))}
                       <td className="px-4 py-2 border">
                          <button
                            onClick={() => setEditRow(row)}
                            className="mr-2 text-blue-600"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(row.id)}
                            className="text-red-600"
                          >
                            <X size={16} />
                          </button>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
// in this code handle the update functionality (when i click the eye icon it shhold show the cursor to change or update the fields ) provide me the entire code 