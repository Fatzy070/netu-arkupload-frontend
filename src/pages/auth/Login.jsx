import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Gate = () => {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const endpoint =
      mode === 'login'
        ? '/api/auth/login'
        : '/api/auth/signup'

    try {
      const res = await axios.post(
        `https://netu-arkupload-backend.onrender.com${endpoint}`,
        { email, password }
      )

      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'UNCOMBUSTIBLE INPUT')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-2 font-mono">
      
     
      <div className="bg-black text-white flex flex-col justify-center px-16">
        <h1 className="text-6xl font-bold mb-4">SOOT</h1>
        <p className="uppercase tracking-wide">
          Raw material for the Crayon engine.
        </p>
      </div>

      
      <div className="bg-white text-black flex flex-col justify-center px-16">
        
        
        <div className="flex gap-6 mb-10 uppercase text-sm">
          <button
            onClick={() => setMode('login')}
            className={`border-b-2 ${
              mode === 'login' ? 'border-black' : 'border-transparent'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`border-b-2 ${
              mode === 'signup' ? 'border-black' : 'border-transparent'
            }`}
          >
            Join
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

         
          <div>
            <input
              type="email"
              placeholder="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border-b-2 border-black outline-none py-2 placeholder-black uppercase"
            />
          </div>

        
          <div>
            <input
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border-b-2 border-black outline-none py-2 placeholder-black uppercase"
            />
          </div>

        
          {error && (
            <p className="uppercase text-sm">
              {error}
            </p>
          )}

          
          <button
            type="submit"
            disabled={loading}
            className="w-full border-2 border-black py-3 uppercase
                       hover:bg-black hover:text-white transition-none"
          >
            {loading ? 'COMPACTING CARBON…' : 'IGNITE'}
          </button>
        </form>

        <p className="mt-8 text-xs uppercase">
          We don’t want your cookies. We want your data.
        </p>
      </div>
    </div>
  )
}

export default Gate
