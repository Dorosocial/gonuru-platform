'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const G = '#C1FF1A'

export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null)
  const [fullName, setFullName] = useState('')
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(data)
      setFullName(data?.full_name || '')
      setBio(data?.bio || '')
      setLoading(false)
    }
    load()
  }, [])

  const save = async () => {
    setSaving(true)
    await supabase.from('profiles').update({ full_name: fullName, bio }).eq('id', profile.id)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-zinc-500 text-sm">Loading...</p>
    </div>
  )

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Settings</h1>
        <p className="text-zinc-500 text-sm mt-1">Update your profile information.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-6 flex flex-col gap-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 block">Full name</label>
          <input
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            className="w-full bg-black border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-white"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 block">Username</label>
          <input
            type="text"
            value={profile?.username || ''}
            disabled
            className="w-full bg-black border border-zinc-800 text-zinc-500 px-4 py-3 text-sm cursor-not-allowed"
          />
          <p className="text-zinc-600 text-xs mt-1">Username cannot be changed.</p>
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 block">Bio</label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={3}
            placeholder="Tell your audience who you are"
            className="w-full bg-black border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-white resize-none"
          />
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="py-3 text-sm font-bold text-black transition hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: G }}
        >
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save changes'}
        </button>
      </div>
    </div>
  )
        }
