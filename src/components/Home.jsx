import { useEffect, useState , useRef } from 'react'
import axios from 'axios'
import { Link ,  useNavigate  } from 'react-router-dom'

const Hopper = () => {
  const [file, setFile] = useState(null)
  const [queue, setQueue] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const fileInputRef = useRef()

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        'https://netu-arkupload-backend.onrender.com/api/auth/me',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setUser(res.data.user)
    }

    fetchUser()
  }, [])

   const handleFile = (selectedFile) => {
    if (!selectedFile) return
    setFile(selectedFile)
    setQueue((prev) => [...prev, `${selectedFile.name} .......... QUEUED`])
  }

  const handleClickUploadArea = () => {
    fileInputRef.current?.click() 
  }

  const handleInputChange = (e) => {
    handleFile(e.target.files[0])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files[0]
    if (!dropped) return

    setFile(dropped)
    setQueue((prev) => [
      ...prev,
      `${dropped.name} .......... QUEUED`
    ])
    setDragging(false)
  }

  const handleUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    setLoading(true)

    try {
      await axios.post(
        'https://netu-arkupload-backend.onrender.com/api/auth/upload',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setQueue((prev) =>
        prev.map((q) =>
          q.includes(file.name)
            ? q.replace('QUEUED', 'BURNED')
            : q
        )
      )

      setFile(null)
    } catch {
      setQueue((prev) =>
        prev.map((q) =>
          q.includes(file.name)
            ? q.replace('QUEUED', 'REJECTED')
            : q
        )
      )
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
      localStorage.removeItem('token')
      navigate('/login')
  }

  return (
    <main className="min-h-screen bg-white text-black font-mono relative">

      <div className="flex justify-between border-b-2 border-black px-8 py-4">
        <span className="font-bold">SOOT</span>
        {user && (
          <div className="uppercase text-sm">
            USER: {user.email}
            {user.role === 'admin' && (
              <Link to="/files" className="ml-6 underline">
                FILES
              </Link>
            )}
            <span 
            onClick={() => handleLogout()}
            className='pl-1'
            >LOGOUT</span>
          </div>
        )}
        
      </div>

     
      <h1 className="px-8 py-6 text-2xl">
         FEED_THE_FURNACE
      </h1>

      
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={handleClickUploadArea}
        className={`mx-8 h-[60vh] flex flex-col items-center justify-center
        border-4 border-dashed text-center px-1 border-black
        ${dragging ? 'bg-black text-white' : ''}`}
      >
        <p className="uppercase text-lg">
          Drag raw text, code, or archives here.
        </p>
        <p className="text-sm mt-2">
          Accepting .txt, .py, .jsonl, and 40+ others.
        </p>
        <input
         type="file"
         ref={fileInputRef}
         className='hidden'
         onChange={(e) => handleInputChange(e)}
         />
      </div>

      
      <div className="px-8 mt-6 space-y-1 text-sm">
        {queue.map((line, i) => (
          <p key={i}>{'> ' + line}</p>
        ))}
      </div>

      
      <button
        onClick={handleUpload}
        disabled={loading}
        className="fixed bottom-6 right-6
                   border-2 border-black px-8 py-3 uppercase
                   hover:bg-black hover:text-white"
      >
        {loading ? 'COMPACTING CARBON…' : 'BURN'}
      </button>
    </main>
  )
}

export default Hopper
