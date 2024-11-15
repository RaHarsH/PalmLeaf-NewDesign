'use client'

import { useState } from 'react'
import { Search, Menu, Plus, Eye, X } from 'lucide-react'

const mockData = [
  {
    id: 1,
    sNo: '001',
    bundleOrigin: 'SVM',
    bundleOwnerName: 'Sode Math',
    bundleNumber: '985',
    bundleReceivedDate: '8 Feb 2023',
    srivNumber: '1611',
    numbered: '17 Feb 2023',
    cleaned: '19 Feb 2023',
    scanningStartedDate: '12-03-23',
    scanningCompletedDate: '15 March 2023',
    script: 'Tulu',
    granthaName: 'Sudha Kundalagiriya -up to Anandamayadikarana, W1-Pramanalakshna vyakya (Aporna)',
    workedBy: 'SV/BI',
    grayscaleCompletedDate: '17-03-23',
    lengthCm: 34.2,
    widthCm: 5.9,
    remarks: 'Well preserved',
    totalLeaves: 192,
    totalImages: 382,
    folderSizeGB: 30.1,
    stitchNonStitch: 'Non Stitch',
    condition: 'Good',
    numberOfSubwork: 1,
    bundleSourceAddress: '',
    horizontalVerticalS: 'H-Scan',
    directory: 'SRIV_1611-SVM-985',
    bundleReturnedDate: '30-4-23',
  },
  {
    id: 2,
    sNo: '002',
    bundleOrigin: 'SVM',
    bundleOwnerName: 'Sode Math',
    bundleNumber: '985',
    bundleReceivedDate: '8 Feb 2023',
    srivNumber: '1611',
    numbered: '17 Feb 2023',
    cleaned: '19 Feb 2023',
    scanningStartedDate: '12-03-23',
    scanningCompletedDate: '15 March 2023',
    script: 'Tulu',
    granthaName: 'Sudha Kundalagiriya -up to Anandamayadikarana, W1-Pramanalakshna vyakya (Aporna)',
    workedBy: 'SV/BI',
    grayscaleCompletedDate: '17-03-23',
    lengthCm: 34.2,
    widthCm: 5.9,
    remarks: 'Well preserved',
    totalLeaves: 192,
    totalImages: 382,
    folderSizeGB: 30.1,
    stitchNonStitch: 'Non Stitch',
    condition: 'Good',
    numberOfSubwork: 1,
    bundleSourceAddress: '',
    horizontalVerticalS: 'H-Scan',
    directory: 'SRIV_1611-SVM-985',
    bundleReturnedDate: '30-4-23',
  },
]

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState(mockData)
  const [activeTab, setActiveTab] = useState('insert')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Form submitted')
  }

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="flex h-screen bg-gradient-to-br from-white to-blue-100 mt-10">
      {/* Sidebar for admin page */}
      <div className={`fixed mt-10 overflow-y-hidden inset-y-0 left-0 z-10 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-black">Admin Panel</h2>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-600 hover:text-black md:hidden">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 p-4">
            <button
              className={`w-full flex items-center justify-start mb-2 px-4 py-2 text-left ${activeTab === 'insert' ? 'bg-blue-100' : ''}`}
              onClick={() => setActiveTab('insert')}
            >
              <Plus className="mr-2 h-4 w-4" /> Insert Data
            </button>
            <button
              className={`w-full flex items-center justify-start px-4 py-2 text-left ${activeTab === 'view' ? 'bg-blue-100' : ''}`}
              onClick={() => setActiveTab('view')}
            >
              <Eye className="mr-2 h-4 w-4" /> View Data
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-6 w-6 mt-4" />
            </button>
          </div>
        </header>

        {/* Main content area to upload the data */}
        <main className="flex-1 overflow-x-hidden no-scrollbar  overflow-y-auto p-4">
          {activeTab === 'insert' ? (
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(mockData[0]).filter(key => key !== 'id').map((field) => (
                  <div key={field} className="space-y-2">
                    <label htmlFor={field} className="text-sm font-medium text-gray-700">
                      {field.split(/(?=[A-Z])/).join(" ")}
                    </label>
                    <input
                      id={field}
                      name={field}
                      type={field.includes('Date') ? 'date' : field.includes('Cm') || field.includes('GB') || field === 'totalLeaves' || field === 'totalImages' || field === 'numberOfSubwork' ? 'number' : 'text'}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                ))}
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200">
                Submit
              </button>
            </form>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="mb-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="h-[calc(100vh-200px)] w-full rounded-md border overflow-y-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr>
                      {Object.keys(mockData[0]).filter(key => key !== 'id').map((header) => (
                        <th key={header} className="px-8 py-2 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {header.split(/(?=[A-Z])/).join(" ")}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item) => (
                      <tr key={item.id}>
                        {Object.entries(item).filter(([key]) => key !== 'id').map(([key, value]) => (
                          <td key={key} className="px-4 py-2 whitespace-nowrap text-gray-900">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
