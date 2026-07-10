'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const G = '#C1FF1A'

const icons = {
  payout: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
  copy: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  gift: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 12v10H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>,
  box: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
  refresh: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>,
  calendar: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  link: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  moon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  users: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  alert: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  check: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
  plus: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('en-GH', { hour: '2-digit', minute: '2-digit' })
}

function txDescription(tx: any) {
  const types: Record<string, string> = {
    show_love: 'Gift received',
    product: 'Product sold',
    subscription: 'Subscription payment',
    booking: 'Booking confirmed',
  }
  return types[tx.type] || tx.type
}

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [subscriptions, setSubscriptions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState('')

  useEffect(() => {
    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }

      const [{ data: p }, { data: tx }, { data: subs }] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('transactions').select('*').eq('creator_id', user.id).order('created_at', { ascending: false }).limit(20),
        supabase.from('subscriptions').select('*').eq('creator_id', user.id),
      ])

      setProfile(p)
      setTransactions(tx || [])
      setSubscriptions(subs || [])
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

  // Metrics
  const now = new Date()
  const todayStart = new Date(now); todayStart.setHours(0,0,0,0)
  const overnightStart = new Date(now); overnightStart.setHours(0,0,0,0); overnightStart.setDate(overnightStart.getDate() - (now.getHours() < 6 ? 1 : 0))
  const overnightEnd = new Date(overnightStart); overnightEnd.setHours(6,0,0,0)

  const totalBalance = transactions.filter(t => t.status === 'paid').reduce((s, t) => s + Number(t.amount), 0)
  const overnightBag = transactions.filter(t => {
    const d = new Date(t.created_at)
    return d >= overnightStart && d <= overnightEnd && t.status === 'paid'
  }).reduce((s, t) => s + Number(t.amount), 0)

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const subTotal = transactions.filter(t => t.type === 'subscription' && t.status === 'paid' && new Date(t.created_at) >= monthStart).reduce((s, t) => s + Number(t.amount), 0)
  const activeMembers = transactions.filter(t => t.status === 'paid').map(t => t.buyer_email).filter((v, i, a) => a.indexOf(v) === i).length

  const firstName = profile?.full_name?.split(' ')[0] || 'Creator'
  const hasSubscriptions = subscriptions.length > 0

  // Feature completion
  const features = [
    { label: 'Send Me a Gift', done: !!profile?.show_love_active, href: '/dashboard/show-love' },
    { label: 'Digital Products', done: false, href: '/dashboard/products/new' },
    { label: 'Subscriptions', done: hasSubscriptions, href: '/dashboard/subscriptions' },
    { label: 'Bookings', done: false, href: '/dashboard/bookings' },
  ]
  const completedFeatures = features.filter(f => f.done).length
  const nextFeature = features.find(f => !f.done)

  return (
    <div className="p-5 max-w-3xl mx-auto">

      {/* GREETING */}
      <div className="mb-6">
        <h1 className="text-2xl font-black tracking-tight">{getGreeting()}, {firstName}</h1>
        {overnightBag > 0 && (
          <p className="text-zinc-400 text-sm mt-1">
            You made <span style={{ color: G }} className="font-bold">&#8373; {overnightBag.toFixed(2)}</span> while you were asleep.
          </p>
        )}
        {overnightBag === 0 && (
          <p className="text-zinc-500 text-sm mt-1">Here is how your Zonuru is doing.</p>
        )}
      </div>

      {/* TOP METRICS */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Balance */}
        <div className="bg-zinc-900 border border-zinc-800 p-5 col-span-2 flex items-center justify-between">
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Available balance</p>
            <p className="text-4xl font-black" style={{ color: G }}>&#8373; {totalBalance.toFixed(2)}</p>
          </div>
          <a
            href="/dashboard/payouts"
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-black hover:opacity-90 transition"
            style={{ backgroundColor: G }}
          >
            {icons.payout}
            Request payout
          </a>
        </div>

        {/* Overnight bag */}
        <div className="bg-zinc-900 border border-zinc-800 p-4">
          <div className="flex items-center gap-2 text-zinc-500 text-xs mb-3">
            {icons.moon}
            Overnight bag
          </div>
          <p className="text-2xl font-black">&#8373; {overnightBag.toFixed(2)}</p>
          <p className="text-zinc-600 text-xs mt-1">Made while sleeping</p>
        </div>

        {/* Active members */}
        <div className="bg-zinc-900 border border-zinc-800 p-4">
          <div className="flex items-center gap-2 text-zinc-500 text-xs mb-3">
            {icons.users}
            Active members
          </div>
          <p className="text-2xl font-black">{activeMembers}</p>
          <p className="text-zinc-600 text-xs mt-1">Paying customers</p>
        </div>

        {/* Coming in every month — only show if subscriptions exist */}
        {hasSubscriptions && (
          <div className="bg-zinc-900 border border-zinc-800 p-4 col-span-2">
            <div className="flex items-center gap-2 text-zinc-500 text-xs mb-3">
              {icons.refresh}
              Coming in every month
            </div>
            <p className="text-2xl font-black">&#8373; {subTotal.toFixed(2)}</p>
            <p className="text-zinc-600 text-xs mt-1">From active subscriptions this month</p>
          </div>
        )}
      </div>

      {/* DAILY OPERATIONS */}
      <div className="bg-zinc-900 border border-zinc-800 p-4 mb-3">
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Daily operations</p>
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center" style={{ color: G }}>
            {icons.check}
          </div>
          <p className="text-sm text-zinc-400">All clear. Nothing needs your attention today.</p>
        </div>
      </div>

      {/* FEATURE NUDGE */}
      {completedFeatures < 4 && nextFeature && (
        <a
          href={nextFeature.href}
          className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-4 mb-3 hover:border-zinc-600 transition"
        >
          <div>
            <p className="text-sm font-bold text-white">You are earning from {completedFeatures} of 4 features</p>
            <p className="text-zinc-500 text-xs mt-0.5">Set up {nextFeature.label} to unlock more income</p>
          </div>
          <div style={{ color: G }}>{icons.plus}</div>
        </a>
      )}

      {/* YOUR LINKS */}
      <div className="mb-3">
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Your links</p>
        <div className="flex flex-col gap-2">
          <div className="bg-zinc-900 border border-zinc-800 p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {icons.link}
              <div>
                <p className="text-xs text-zinc-500">Your page</p>
                <p className="text-sm font-medium">zonuru.com/{profile?.username}</p>
              </div>
            </div>
            <button
              onClick={() => copy(`https://zonuru.com/${profile?.username}`, 'page')}
              className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 border border-zinc-700 hover:border-white transition"
            >
              {icons.copy}
              {copied === 'page' ? 'Copied' : 'Copy'}
            </button>
          </div>

          {profile?.show_love_active && (
            <div className="bg-zinc-900 border border-zinc-800 p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {icons.gift}
                <div>
                  <p className="text-xs text-zinc-500">{profile.show_love_label}</p>
                  <p className="text-sm font-medium">zonuru.com/{profile?.username}/{profile?.show_love_slug}</p>
                </div>
              </div>
              <button
                onClick={() => copy(`https://zonuru.com/${profile?.username}/${profile?.show_love_slug}`, 'gift')}
                className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 border border-zinc-700 hover:border-white transition"
              >
                {icons.copy}
                {copied === 'gift' ? 'Copied' : 'Copy'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="mb-3">
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Quick actions</p>
        <div className="grid grid-cols-2 gap-2">
          <a href="/dashboard/products/new" className="bg-zinc-900 border border-zinc-800 p-3 hover:border-zinc-600 transition flex items-center gap-2">
            {icons.box}
            <span className="text-sm font-medium">Add product</span>
          </a>
          <a href="/dashboard/subscriptions" className="bg-zinc-900 border border-zinc-800 p-3 hover:border-zinc-600 transition flex items-center gap-2">
            {icons.refresh}
            <span className="text-sm font-medium">Add subscription</span>
          </a>
          <a href="/dashboard/bookings" className="bg-zinc-900 border border-zinc-800 p-3 hover:border-zinc-600 transition flex items-center gap-2">
            {icons.calendar}
            <span className="text-sm font-medium">Add booking</span>
          </a>
          <a href="/dashboard/show-love" className="bg-zinc-900 border border-zinc-800 p-3 hover:border-zinc-600 transition flex items-center gap-2">
            {icons.gift}
            <span className="text-sm font-medium">Send Me a Gift</span>
          </a>
        </div>
      </div>

      {/* ACTIVITY FEED */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Recent activity</p>
        {transactions.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 p-8 text-center">
            <p className="text-zinc-500 text-sm">No transactions yet.</p>
            <p className="text-zinc-600 text-xs mt-1">Share your link and start earning.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {transactions.slice(0, 10).map(tx => (
              <div key={tx.id} className="bg-zinc-900 border border-zinc-800 p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-zinc-600">
                    {tx.type === 'show_love' && icons.gift}
                    {tx.type === 'product' && icons.box}
                    {tx.type === 'subscription' && icons.refresh}
                    {tx.type === 'booking' && icons.calendar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{txDescription(tx)}</p>
                    <p className="text-xs text-zinc-500">{tx.buyer_email} · {formatTime(tx.created_at)}</p>
                  </div>
                </div>
                <p className="text-sm font-bold" style={{ color: G }}>+&#8373; {Number(tx.amount).toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
