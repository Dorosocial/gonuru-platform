'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const G = '#C1FF1A'

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState('')

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }
      const { data } = await supabase.from('products').select('*').eq('creator_id', user.id).order('created_at', { ascending: false })
      setProducts(data || [])
      setLoading(false)
    }
    load()
  }, [])

  const copy = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopied(id)
    setTimeout(() => setCopied(''), 2000)
  }

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-zinc-500 text-sm">Loading...</p>
    </div>
  )

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">Digital Products</h1>
          <p className="text-zinc-500 text-sm mt-1">Upload files, set prices, start selling.</p>
        </div>
        <a
          href="/dashboard/products/new"
          className="px-5 py-2.5 text-sm font-bold text-black"
          style={{ backgroundColor: G }}
        >
          + Add product
        </a>
      </div>

      {products.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 p-12 text-center">
          <p className="text-white font-bold mb-2">No products yet</p>
          <p className="text-zinc-400 text-sm mb-6">Upload your first file and start earning.</p>
          <a
            href="/dashboard/products/new"
            className="px-6 py-3 text-sm font-bold text-black inline-block"
            style={{ backgroundColor: G }}
          >
            Add your first product
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {products.map(p => (
            <div key={p.id} className="bg-zinc-900 border border-zinc-800 p-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">{p.title}</p>
                <p className="text-xs text-zinc-400 mt-0.5">&#8373; {Number(p.price).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs px-2 py-1 font-bold"
                  style={{ backgroundColor: p.is_active ? G : '#3f3f46', color: p.is_active ? '#000' : '#a1a1aa' }}
                >
                  {p.is_active ? 'Active' : 'Inactive'}
                </span>
                <button
                  onClick={() => copy(`https://gonuru.com/products/${p.id}`, p.id)}
                  className="text-xs font-bold px-3 py-1.5 border border-zinc-700 hover:border-white text-white transition"
                >
                  {copied === p.id ? 'Copied!' : 'Copy link'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
                                                                                                   }
