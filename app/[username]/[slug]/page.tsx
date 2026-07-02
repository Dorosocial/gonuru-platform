'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const G = '#C1FF1A'

export default function GiftPage({ params }: { params: Promise<{ username: string, slug: string }> }) {
  const [profile, setProfile] = useState<any>(null)
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [slug, setSlug] = useState('')

  const PRESETS = [10, 20, 50, 100, 200, 500]

  useEffect(() => {
    const load = async () => {
      const { username: u, slug: s } = await params
      setUsername(u)
      setSlug(s)

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', u)
        .single()

      if (!data || !data.show_love_active || data.show_love_slug !== s) {
        window.location.href = '/'
        return
      }
      setProfile(data)
      setLoading(false)
    }
    load()
  }, [params])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || parseFloat(amount) < 1) { setError('Enter an amount'); return }
    if (!email) { setError('Enter your email'); return }
    setSubmitting(true)
    setError('')

    const { error: insertError } = await supabase.from('transactions').insert({
      creator_id: profile.id,
      buyer_email: email,
      amount: parseFloat(amount),
      type: 'show_love',
      status: 'pending',
      message,
    })

    if (insertError) { setError(insertError.message); setSubmitting(false); return }
    setDone(true)
  }

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-zinc-500 text-sm">Loading...</p>
    </div>
  )

  if (done) return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: G }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h1 className="text-2xl font-black mb-2">Gift sent!</h1>
        <p className="text-zinc-400 text-sm">
          Your gift of &#8373; {amount} has been sent to {profile.full_name || profile.username}. Thank you.
        </p>
        <a href={`/${username}`} className="block mt-8 text-sm text-zinc-500 hover:text-white transition">
          Back to profile
        </a>
      </div>
    </main>
  )

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl font-black" style={{ backgroundColor: '#111', border: '1px solid #222', color: G }}>
            {profile.full_name?.[0] || profile.username?.[0]}
          </div>
          <h1 className="text-xl font-black">{profile.full_name || profile.username}</h1>
          <p className="text-zinc-500 text-sm mt-1">@{profile.username}</p>
        </div>

        <h2 className="text-2xl font-black text-center mb-8">{profile.show_love_label}</h2>

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Choose amount (GHS)</p>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {PRESETS.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setAmount(String(p))}
                  className="py-2.5 text-sm font-bold border transition"
                  style={amount === String(p)
                    ? { backgroundColor: G, color: '#000', borderColor: G }
                    : { backgroundColor: 'transparent', color: '#fff', borderColor: '#3f3f46' }
                  }
                >
                  &#8373; {p}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Or enter your own amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              min="1"
              className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 block">Your email</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 block">Message (optional)</label>
            <textarea
              placeholder="Say something nice..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={3}
              className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-white resize-none"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 text-base font-bold text-black transition hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: G }}
          >
            {submitting ? 'Processing...' : `Send &#8373; ${amount || '0'}`}
          </button>
        </form>

        <p className="text-center text-zinc-700 text-xs mt-8">
          Powered by <a href="/" className="text-zinc-500 hover:text-white transition">gonuru</a>
        </p>
      </div>
    </main>
  )
            }
