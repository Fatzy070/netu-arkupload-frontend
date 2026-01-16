import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const File = () => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchFiles = async () => {
      const token = localStorage.getItem('token')

      try {
        const res = await axios.get('https://netu-arkupload-backend.onrender.com/api/auth/files', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setFiles(res.data.files)
      } catch (err) {
        console.error('Error fetching files:', err)
        setError(err.response?.data.message || 'Failed to fetch files')
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [])

  if (loading) return <p className="text-center mt-10">Loading files...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">All Uploaded Files</h1>
      <Link to='/' className='underline text-blue-400'>Home</Link>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">File Name</th>
              <th className="px-4 py-2 border">Size (bytes)</th>
              <th className="px-4 py-2 border">MIME Type</th>
              <th className="px-4 py-2 border">User Email</th>
              <th className="px-4 py-2 border">User Role</th>
              <th className="px-4 py-2 border">File URL</th>
            </tr>
          </thead>
          <tbody>
            {files.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No files uploaded yet
                </td>
              </tr>
            ) : (
              files.map((file) => (
                <tr key={file._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{file.originalName}</td>
                  <td className="px-4 py-2 border">{file.size}</td>
                  <td className="px-4 py-2 border">{file.mimeType}</td>
                  <td className="px-4 py-2 border">{file.user?.email}</td>
                  <td className="px-4 py-2 border">{file.user?.role}</td>
                  <td className="px-4 py-2 border text-blue-600 hover:underline">
                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                      View File
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default File
