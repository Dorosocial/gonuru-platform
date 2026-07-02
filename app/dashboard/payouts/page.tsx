'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const G = '#C1FF1A'

export default function PayoutsPage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [momoNumber, setMomoNumber] = useState('')
  const [network, setNetwork] = useState('MTN')
  const [requesting, setRequesting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }
      const { data } = await supabase.from('transactions').select('*').eq('creator_id', user.id).eq('status', 'completed')
      setTransactions(data || [])
      setLoading(false)
    }
    load()
  }, [])

  const total = transactions.reduce((s, t) => s + Number(t.amount), 0)

  const requestPayout = async () => {
    if (!momoNumber) return
    setRequesting(true)
    await new Promise(r => setTimeout(r, 1500))
    setRequesting(false)
    setSuccess(true)
  }

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-zinc-500 text-sm">Loading...</p>
    </div>
  )

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Payouts</h1>
        <p className="text-zinc-500 text-sm mt-1">Withdraw your earnings to MoMo or bank.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-6 mb-6">
        <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Available balance</p>
        <p className="text-4xl font-black" style={{ color: G }}>&#8373; {total.toFixed(2)}</p>
      </div>

      {success ? (
        <div className="bg-zinc-900 border p-6 text-center" style={{ borderColor: G }}>
          <p className="font-bold text-white mb-2">Payout request received</p>
          <p className="text-zinc-400 text-sm">We will process your payout to {network} MoMo {momoNumber} within 24 hours.</p>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-white mb-4">Request payout</p>

          <div className="mb-4">
            <label className="text-xs text-zinc-400 mb-2 block">Mobile network</label>
            <div className="flex gap-2">
              {['MTN', 'Vodafone', 'AirtelTigo'].map(n => (
                <button
                  key={n}
                  onClick={() => setNetwork(n)}
                  className="px-4 py-2 text-sm font-medium border transition"
                  style={network === n
                    ? { backgroundColor: G, color: '#000', borderColor: G, fontWeight: 700 }
                    : { backgroundColor: 'transparent', color: '#a1a1aa', borderColor: '#3f3f46' }
                  }
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="text-xs text-zinc-400 mb-2 block">MoMo number</label>
            <input
              type="tel"
              placeholder="e.g. 0244123456"
              value={momoNumber}
              onChange={e => setMomoNumber(e.target.value)}
              className="w-full bg-black border border-zinc-700 text-white px-4 py-3 text-sm focus:outline-none focus:border-white"
            />
          </div>

          <button
            onClick={requestPayout}
            disabled={requesting || !momoNumber || total === 0}
            className="w-full py-3 text-sm font-bold text-black transition hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: G }}
          >
            {requesting ? 'Submitting...' : `Request payout of &#8373; ${total.toFixed(2)}`}
          </button>

          {total === 0 && (
            <p className="text-zinc-500 text-xs mt-3 text-center">You have no balance to withdraw yet.</p>
          )}
        </div>
      )}
    </div>
  )
            }
