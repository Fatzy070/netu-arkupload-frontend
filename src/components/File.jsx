import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Residue = () => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchFiles = async () => {
      const token = localStorage.getItem('token')

      try {
        const res = await axios.get(
          'https://netu-arkupload-backend.onrender.com/api/auth/files',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        setFiles(res.data.files)
      } catch (err) {
        setError(err.response?.data.message || 'SYSTEM FAULT')
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center font-mono">
        COMPACTING CARBON…
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center font-mono">
        {error}
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white text-black font-mono">

      {/* TOP BAR */}
      <div className="flex justify-between border-b-2 border-black px-8 py-4">
        <span className="font-bold">SOOT</span>
        <Link to="/" className="uppercase underline">
          RETURN_TO_FURNACE
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 text-center border-b-2 border-black">
        <div className="py-6 border-r-2 border-black">
          <p className="text-xs">FILES DUMPED</p>
          <p className="text-2xl">{files.length}</p>
        </div>
        <div className="py-6 border-r-2 border-black">
          <p className="text-xs">TOTAL BYTES</p>
          <p className="text-2xl">
            {files.reduce((a, f) => a + f.size, 0).toLocaleString()}
          </p>
        </div>
        <div className="py-6">
          <p className="text-xs">STATE</p>
          <p className="text-2xl">ACTIVE</p>
        </div>
      </div>

      {/* LOG */}
      <div className="px-8 py-6 space-y-2 text-sm">
        {files.length === 0 ? (
          <p>Your hands are clean. Go get them dirty.</p>
        ) : (
          files.map((file) => (
            <p key={file._id}>
              {new Date(file.createdAt).toISOString().split('T')[0]}
              {' | '}
              {file.originalName}
              {' | '}
              {(file.size / 1024).toFixed(1)} KB
              {' | '}
              {file.user?.email}
            </p>
          ))
        )}
      </div>
    </main>
  )
}

export default Residue
