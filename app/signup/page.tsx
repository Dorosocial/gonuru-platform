'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          username: username.toLowerCase().trim(),
        }
      }
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      window.location.href = '/dashboard'
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <a href="/" className="text-2xl font-black tracking-tight mb-8">gonuru</a>
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-2">Create your account</h1>
        <p className="text-zinc-400 text-sm mb-8">Start earning from your audience today.</p>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-white"
          />
          <input
            type="text"
            placeholder="Username (e.g. kofi)"
            value={username}
            onChange={e => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
            required
            className="bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-white"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="bg-zinc-900 border border-zinc.700 text-white px-4 py-3 text-sm focus:outline-none focus:border-white"
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            className="bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black py-3 font-bold text-sm tracking-wide hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <p className="text-zinc-400 text-sm mt-6 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-white underline">Sign in</a>
        </p>
      </div>
    </main>
  )
      }
