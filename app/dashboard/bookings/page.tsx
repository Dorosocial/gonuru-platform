'use client'

const G = '#C1FF1A'

export default function BookingsPage() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Bookings</h1>
        <p className="text-zinc-500 text-sm mt-1">Let clients book one-on-one sessions and pay upfront.</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-8 text-center">
        <div className="w-12 h-12 border border-zinc-700 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
        <p className="text-white font-bold mb-2">Bookings coming soon</p>
        <p className="text-zinc-400 text-sm">Set your availability, price per session, and let clients book directly. Coming very soon.</p>
      </div>
    </div>
  )
}
