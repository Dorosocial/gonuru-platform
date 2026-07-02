'use client'

const G = '#C1FF1A'

export default function SubscriptionsPage() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Subscriptions</h1>
        <p className="text-zinc-500 text-sm mt-1">Earn monthly recurring income from your audience.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-8 text-center">
        <div className="w-12 h-12 border border-zinc-700 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="17 1 21 5 17 9"/>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
            <polyline points="7 23 3 19 7 15"/>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
          </svg>
        </div>
        <p className="text-white font-bold mb-2">Subscriptions coming soon</p>
        <p className="text-zinc-400 text-sm">We are building the subscription and private feed feature. You will be notified when it is ready.</p>
      </div>
    </div>
  )
}
