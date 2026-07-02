'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const G = '#C1FF1A'

export default function NewProduct() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/login'; return }

    let file_url = ''

    if (file) {
      const ext = file.name.split('.').pop()
      const filename = `${user.id}/${Date.now()}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filename, file)

      if (uploadError) {
        setError(uploadError.message)
        setLoading(false)
        return
      }

      const { data: urlData } = supabase.storage.from('products').getPublicUrl(filename)
      file_url = urlData.publicUrl
    }

    const { error: insertError } = await supabase.from('products').insert({
      creator_id: user.id,
      title,
      description,
      price: parseFloat(price),
      file_url,
      is_active: true,
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    window.location.href = '/dashboard/products'
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Add digital product</h1>
        <p className="text-zinc-500 text-sm mt-1">Upload a file, set a price, share the link.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 block">Product title</label>
          <input
            type="text"
            placeholder="e.g. Forex Signals PDF, Recipe eBook"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-white"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 block">Description (optional)</label>
          <textarea
            placeholder="What will the buyer get?"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-white resize-none"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 block">Price (GHS)</label>
          <input
            type="number"
            placeholder="e.g. 50"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
            min="1"
            step="0.01"
            className="w-full bg-zinc-900 border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-white"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 block">Upload file</label>
          <input
            type="file"
            onChange={e => setFile(e.target.files?.[0] || null)}
            className="w-full bg-zinc-900 border border-zinc-700 text-zinc-400 px-4 py-3 text-sm focus:outline-none file:mr-4 file:py-1 file:px-3 file:border-0 file:text-xs file:font-bold file:bg-white file:text-black"
          />
          <p className="text-zinc-600 text-xs mt-1">PDF, MP3, MP4, ZIP, or any file up to 50MB</p>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="py-3 text-sm font-bold text-black transition hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: G }}
        >
          {loading ? 'Uploading...' : 'Add product'}
        </button>
      </form>
    </div>
  )
      }
