'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const G = '#C1FF1A'

const LABELS = [
  'Send Me a Gift',
  'Give',
  'Show Love',
  'Sow a Seed',
  'Tip Me',
  'Support',
  'Buy Me a Beat',
  'Buy Me a Meal',
  'Fuel My Grind',
  'Partner with Me',
]

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export default function ShowLovePage() {
  const [profile, setProfile] = useState<any>(null)
  const [label, setLabel] = useState('Send Me a Gift')
  const [custom, setCustom] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(data)
      if (data?.show_love_label) setLabel(data.show_love_label)
      setLoading(false)
    }
    load()
  }, [])

  const isCustom = !LABELS.includes(label)
  const finalLabel = isCustom ? custom : label
  const finalSlug = slugify(finalLabel || 'gift')

  const save = async () => {
    if (!finalLabel) { setError('Please enter a label'); return }
    setSaving(true)
    setError('')
    const { error: e } = await supabase.from('profiles').update({
      show_love_label: finalLabel,
      show_love_slug: finalSlug,
      show_love_active: true,
    }).eq('id', profile.id)
    if (e) { setError(e.message); setSaving(false); return }
    setSaved(true)
    setSaving(false)
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
        <h1 className="text-2xl font-black text-white">Send Me a Gift</h1>
        <p className="text-zinc-500 text-sm mt-1">Let your fans send you gifts. Rename it to fit your world.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-6 mb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-white mb-4">Choose your button label</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {LABELS.map(l => (
            <button
              key={l}
              onClick={() => { setLabel(l); setCustom('') }}
              className="px-3 py-2.5 text-sm font-medium border transition text-left"
              style={label === l && !isCustom
                ? { backgroundColor: G, color: '#000', borderColor: G, fontWeight: 700 }
                : { backgroundColor: 'transparent', color: '#a1a1aa', borderColor: '#3f3f46' }
              }
            >
              {l}
            </button>
          ))}
          <button
            onClick={() => setLabel('custom')}
            className="px-3 py-2.5 text-sm font-medium border transition text-left"
            style={isCustom
              ? { backgroundColor: G, color: '#000', borderColor: G, fontWeight: 700 }
              : { backgroundColor: 'transparent', color: '#a1a1aa', borderColor: '#3f3f46' }
            }
          >
            Other
          </button>
        </div>

        {isCustom && (
          <input
            type="text"
            placeholder="Type your own label"
            value={custom}
            onChange={e => setCustom(e.target.value)}
            className="w-full bg-black border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-white mb-4"
          />
        )}

        {finalLabel && (
          <div className="bg-black border border-zinc-800 p-4 mb-4">
            <p className="text-xs text-zinc-400 mb-1">Your link will be</p>
            <p className="text-sm font-semibold text-white">gonuru.com/{profile?.username}/{finalSlug}</p>
          </div>
        )}

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button
          onClick={save}
          disabled={saving || !finalLabel}
          className="w-full py-3 text-sm font-bold text-black transition hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: G }}
        >
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save and activate'}
        </button>
      </div>

      {profile?.show_love_active && (
        <div className="bg-zinc-900 border border-zinc-800 p-4">
          <p className="text-xs text-zinc-400 mb-1">Active link</p>
          <p className="text-sm font-semibold text-white">gonuru.com/{profile?.username}/{profile?.show_love_slug}</p>
          <p className="text-xs text-zinc-500 mt-2">Share this with your audience. They can send you any amount directly.</p>
        </div>
      )}
    </div>
  )
        }
