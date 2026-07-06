export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <a href="/" className="text-xl font-black tracking-tight">
          <span style={{ color: '#C1FF1A' }}>z</span>onuru
        </a>
        <div className="flex items-center gap-6">
          <a href="/login" className="text-zinc-400 text-sm font-medium hover:text-white transition">Sign in</a>
          <a href="/signup" className="bg-white text-black px-5 py-2 text-sm font-bold hover:bg-gray-200 transition">
            Start earning
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <div className="inline-block bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8">
            Built for Africa. Starting in Ghana.
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6">
            Get paid by<br />your audience.<br />
            <span style={{ color: '#C1FF1A' }}>Finally.</span>
          </h1>
          <p className="text-zinc-400 text-lg mb-10 max-w-md leading-relaxed">
            Zonuru is the easiest way for African creators to sell digital products, accept subscriptions, and get paid straight to your Mobile Money or bank account.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <a href="/signup" className="bg-white text-black px-8 py-4 font-bold text-sm tracking-wide hover:bg-gray-200 transition text-center">
              Start earning free
            </a>
            <a href="/signup" className="border border-zinc-700 text-zinc-400 px-8 py-4 font-bold text-sm tracking-wide hover:border-white hover:text-white transition text-center">
              See how it works
            </a>
          </div>
          <p className="text-zinc-600 text-xs">Free to start. 5% only when you earn.</p>
        </div>

        <div className="flex-1 flex justify-end">
          <div className="bg-zinc-900 border border-zinc-800 p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Total balance</p>
                <p className="text-4xl font-black" style={{ color: '#C1FF1A' }}>&#8373; 4,350</p>
              </div>
              <div className="bg-zinc-800 px-3 py-1 text-xs font-bold text-zinc-500">This month</div>
            </div>
            <div className="flex flex-col gap-0 mb-6">
              {[
                { label: 'Aaron subscribed', amount: '+&#8373; 150' },
                { label: 'Recipe eBook sold', amount: '+&#8373; 80' },
                { label: 'Gift received', amount: '+&#8373; 50' },
                { label: 'Session booked', amount: '+&#8373; 300' },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-zinc-800">
                  <p className="text-sm text-zinc-400">{tx.label}</p>
                  <p className="text-sm font-bold" style={{ color: '#C1FF1A' }} dangerouslySetInnerHTML={{ __html: tx.amount }} />
                </div>
              ))}
            </div>
            <div className="w-full py-3 text-sm font-bold text-black text-center" style={{ backgroundColor: '#C1FF1A' }}>
              Request payout
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-t border-b border-zinc-800 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 gap-8">
          {[
            { number: '5%', label: 'Platform fee — only when you earn' },
            { number: 'GHS 0', label: 'To get started' },
            { number: 'Direct', label: 'Payouts to Mobile Money or bank' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-black mb-2" style={{ color: '#C1FF1A' }}>{stat.number}</p>
              <p className="text-zinc-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Everything you need</p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-16 max-w-xl">
          Four ways to earn.<br />One link to share.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Digital Products',
              desc: 'Upload any file — PDF, audio, video, zip. Set a price. Share a link. Buyers pay and receive it automatically.',
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C1FF1A" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            },
            {
              title: 'Subscriptions',
              desc: 'Set a monthly price. Share your access link. Subscribers pay every month and get access to your exclusive content.',
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C1FF1A" strokeWidth="2"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
            },
            {
              title: 'Send Me a Gift',
              desc: 'Let your fans support you directly. Any amount, any time. Rename it to Give, Sow a Seed, Buy Me a Beat — whatever fits your world.',
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C1FF1A" strokeWidth="2"><path d="M20 12v10H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
            },
            {
              title: 'Bookings',
              desc: 'Set your availability and price per session. Clients book and pay upfront. You just show up.',
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C1FF1A" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            },
          ].map((item, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 p-8 hover:border-zinc-600 transition">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-black mb-3">{item.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-zinc-800 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Simple by design</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-16">
            Up and earning<br />in 3 minutes.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create your page', desc: 'Sign up, add your bio and social links. Your page is live at zonuru.com/yourname.' },
              { step: '02', title: 'Set up what you sell', desc: 'Upload a product, set up a subscription, or activate Send Me a Gift. Takes 2 minutes.' },
              { step: '03', title: 'Share and get paid', desc: 'Share your link anywhere. Fans pay. Money goes straight to your Mobile Money or bank account.' },
            ].map((step, i) => (
              <div key={i}>
                <p className="text-5xl font-black mb-4" style={{ color: '#C1FF1A' }}>{step.step}</p>
                <h3 className="text-lg font-black mb-3">{step.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-zinc-800 py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Your audience is ready.<br />
            <span style={{ color: '#C1FF1A' }}>Are you?</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-10">Join creators across Ghana earning from their audience on Zonuru.</p>
          <a href="/signup" className="inline-block bg-white text-black px-10 py-4 font-bold text-sm tracking-wide hover:bg-gray-200 transition">
            Start earning free
          </a>
          <p className="text-zinc-600 text-xs mt-6">Free to start. 5% only when you earn. Paid to Mobile Money or bank.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
          <a href="/" className="text-lg font-black tracking-tight">
            <span style={{ color: '#C1FF1A' }}>z</span>onuru
          </a>
          <p className="text-zinc-600 text-xs">© 2026 Zonuru. Built for Africa.</p>
          <div className="flex gap-6">
            <a href="mailto:hello@zonuru.com" className="text-zinc-500 text-xs hover:text-white transition">hello@zonuru.com</a>
            <a href="/signup" className="text-zinc-500 text-xs hover:text-white transition">Get started</a>
            <a href="/login" className="text-zinc-500 text-xs hover:text-white transition">Sign in</a>
          </div>
        </div>
      </footer>

    </main>
  )
      }
