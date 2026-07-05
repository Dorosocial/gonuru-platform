'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const G = '#C1FF1A'

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState('')

  useEffect(() => {
    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }
      const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      const { data: t } = await supabase.from('transactions').select('*').eq('creator_id', user.id).order('created_at', { ascending: false }).limit(10)
      setProfile(p)
      setTransactions(t || [])
      setLoading(false)
    }
    getData()
  }, [])

  const copy = (url: string, key: string) => {
    navigator.clipboard.writeText(url)
    setCopied(key)
    setTimeout(() => setCopied(''), 2000)
  }

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-zinc-500 text-sm">Loading...</p>
    </div>
  )

  const total = transactions.reduce((s, t) => s + Number(t.amount), 0)
  const giftTotal = transactions.filter(t => t.type === 'show_love').reduce((s, t) => s + Number(t.amount), 0)
  const productTotal = transactions.filter(t => t.type === 'product').reduce((s, t) => s + Number(t.amount), 0)
  const subTotal = transactions.filter(t => t.type === 'subscription').reduce((s, t) => s + Number(t.amount), 0)
  const firstName = profile?.full_name?.split(' ')[0] || profile?.username || 'Creator'

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Welcome back, {firstName}</h1>
        <p className="text-zinc-500 text-sm mt-1">Here is how your Zonuru is doing</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-6 mb-6 flex items-center justify-between">
        <div>
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Total balance</p>
          <p className="text-4xl font-black" style={{ color: G }}>&#8373; {total.toFixed(2)}</p>
        </div>
        <a
          href="/dashboard/payouts"
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-black hover:opacity-90 transition"
          style={{ backgroundColor: G }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
          Request payout
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 p-4">
          <div className="flex items-center gap-2 text-zinc-400 text-xs mb-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2"><path d="M20 12v10H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
            Send Me a Gift
          </div>
          <p className="text-2xl font-black text-white">&#8373; {giftTotal.toFixed(0)}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-4">
          <div className="flex items-center gap-2 text-zinc-400 text-xs mb-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            Products
          </div>
          <p className="text-2xl font-black text-white">&#8373; {productTotal.toFixed(0)}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-4">
          <div className="flex items-center gap-2 text-zinc-400 text-xs mb-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
            Subscriptions
          </div>
          <p className="text-2xl font-black text-white">&#8373; {subTotal.toFixed(0)}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-4">
          <div className="flex items-center gap-2 text-zinc-400 text-xs mb-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            Transactions
          </div>
          <p className="text-2xl font-black text-white">{transactions.length}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Your links</h2>
        <div className="flex flex-col gap-2">
          <div className="bg-zinc-900 border border-zinc-800 p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-400 mb-0.5">Your page</p>
              <p className="text-sm font-semibold text-white">zonuru.com/{profile?.username}</p>
            </div>
            <button
              onClick={() => copy(`https://zonuru.com/${profile?.username}`, 'page')}
              className="text-xs font-bold px-3 py-1.5 border border-zinc-700 hover:border-white text-white transition"
            >
              {copied === 'page' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          {profile?.show_love_active && (
            <div className="bg-zinc-900 border border-zinc-800 p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400 mb-0.5">{profile.show_love_label} link</p>
                <p className="text-sm font-semibold text-white">zonuru.com/{profile?.username}/{profile?.show_love_slug}</p>
              </div>
              <button
                onClick={() => copy(`https://zonuru.com/${profile?.username}/${profile?.show_love_slug}`, 'gift')}
                className="text-xs font-bold px-3 py-1.5 border border-zinc-700 hover:border-white text-white transition"
              >
                {copied === 'gift' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Quick actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a href="/dashboard/products/new" className="bg-zinc-900 border border-zinc-800 p-4 hover:border-zinc-500 transition block">
            <p className="font-bold text-sm mb-1 text-white">Add digital product</p>
            <p className="text-zinc-400 text-xs">Upload a file and start selling instantly</p>
          </a>
          <a href="/dashboard/show-love" className="bg-zinc-900 border border-zinc-800 p-4 hover:border-zinc-500 transition block">
            <p className="font-bold text-sm mb-1 text-white">Set up Send Me a Gift</p>
            <p className="text-zinc-400 text-xs">Let your fans send you gifts directly</p>
          </a>
          <a href="/dashboard/subscriptions" className="bg-zinc-900 border border-zinc-800 p-4 hover:border-zinc-500 transition block">
            <p className="font-bold text-sm mb-1 text-white">Create subscription</p>
            <p className="text-zinc-400 text-xs">Earn monthly recurring income</p>
          </a>
          <a href="/dashboard/bookings" className="bg-zinc-900 border border-zinc-800 p-4 hover:border-zinc-500 transition block">
            <p className="font-bold text-sm mb-1 text-white">Set up bookings</p>
            <p className="text-zinc-400 text-xs">Let clients book and pay upfront</p>
          </a>
        </div>
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-3">Recent transactions</h2>
        {transactions.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 p-8 text-center">
            <p className="text-zinc-400 text-sm">No transactions yet.</p>
            <p className="text-zinc-600 text-xs mt-1">Share your link and start earning.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {transactions.map(tx => (
              <div key={tx.id} className="bg-zinc-900 border border-zinc-800 p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white capitalize">{tx.type.replace('_', ' ')}</p>
                  <p className="text-xs text-zinc-400">{tx.buyer_email}</p>
                </div>
                <p className="font-bold" style={{ color: G }}>+&#8373; {Number(tx.amount).toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
        }
