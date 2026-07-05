export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-7xl font-black tracking-tight mb-4">zonuru</h1>
      <p className="text-zinc-400 text-lg mb-10">Earn from your audience, finally.</p>
      <div className="flex gap-4">
        <a
          href="/signup"
          className="bg-white text-black px-8 py-3 font-bold text-sm tracking-wide hover:bg-gray-200 transition"
        >
          Start earning
        </a>
        <a
          href="/login"
          className="border border-white text-white px-8 py-3 font-bold text-sm tracking-wide hover:bg-white hover:text-black transition"
        >
          Sign in
        </a>
      </div>
      <p className="text-zinc-600 text-xs mt-16">Built for Africa. Starting in Ghana.</p>
    </main>
  )
}
