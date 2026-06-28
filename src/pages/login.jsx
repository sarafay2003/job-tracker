import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      navigate('/dashboard')
    }
  }

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
    } else {
      alert('Account created! You can now log in.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Job Tracker</h1>
        <p className="text-gray-500 mb-6">Track your job applications in one place</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          className="border rounded p-2 w-full mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border rounded p-2 w-full mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 mb-3">
          Login
        </button>
        <button onClick={handleSignup} className="bg-gray-100 text-gray-700 w-full py-2 rounded hover:bg-gray-200">
          Sign Up
        </button>
      </div>
    </div>
  )
}

export default Login