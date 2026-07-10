export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center">

        <div className="text-4xl font-black tracking-tight mb-8">
          <span style={{ color: '#C1FF1A' }}>z</span>onuru
        </div>

        <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-6">
          Something big is coming<br />for African creators.
        </h1>

        <p className="text-zinc-400 text-base leading-relaxed mb-10">
          Sell digital products. Accept subscriptions. Take bookings. Get paid straight to your Mobile Money or bank account. Launching in Ghana soon.
        </p>

        <a
          href="https://early.zonuru.com"
          className="inline-block bg-white text-black font-bold text-sm tracking-wide px-8 py-4 hover:bg-gray-200 transition"
        >
          Get early access
        </a>

        <p className="text-zinc-700 text-xs mt-8">
          hello@zonuru.com
        </p>

      </div>
    </main>
  )
}
