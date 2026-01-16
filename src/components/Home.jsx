import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [ user , setUser ] = useState('')

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

    const token = localStorage.getItem('token')
  useEffect(() => {
    const fetchUser = async () => {
        try {
            const res = await axios.get('https://netu-arkupload-backend.onrender.com/api/auth/me' , {
            headers: {
                Authorization: `Bearer ${token}`
             }
            })

            setUser(res.data.user)
        } catch (error) {
            console.error('error' , error)
            setMessage(error.response?.data.message || 'Something went wrong')
        }
    }
    fetchUser()
  },[])

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) {
      setMessage('Please select a file first')
      return
    }


    const formData = new FormData()
    formData.append('file', file)

    try {
      setLoading(true)
      setMessage('')
      const res = await axios.post(
        'https://netu-arkupload-backend.onrender.com/api/auth/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      )

      setUploadedFile(res.data.file)
      setMessage(res.data.message)
      setFile(null)
    } catch (error) {
      console.error('Upload error:', error)
      setMessage(error.response?.data.message || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen px-3 flex items-center justify-center bg-gray-100">
   <section>
         {user.role === 'admin' && (
        <Link
        to='/files'
        className='text-blue-400 underline'
        >
            uploaded files
        </Link>
    )}
    <div >
        
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Upload File</h1>
    

        {message && (
          <p
            className={`text-center mb-4 ${
              uploadedFile ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>

        {uploadedFile && (
          <div className="mt-6 p-4 border rounded bg-gray-50">
            <p>
              <strong>File Name:</strong> {uploadedFile.originalName}
            </p>
            <p>
              <strong>File Size:</strong> {uploadedFile.size} bytes
            </p>
            <p>
              <strong>File URL:</strong>{' '}
              <a
                href={uploadedFile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View File
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
   </section>
    </main>
  )
}

export default Home
