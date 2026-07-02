import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

const G = '#C1FF1A'

export default async function CreatorPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (!profile) return notFound()

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('creator_id', profile.id)
    .eq('is_active', true)

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-4 py-16">

        <div className="text-center mb-12">
          <div
            className="w-20 h-20 flex items-center justify-center mx-auto mb-4 text-2xl font-black"
            style={{ backgroundColor: '#111', border: '1px solid #222', color: G }}
          >
            {profile.full_name?.[0] || profile.username?.[0] || 'G'}
          </div>
          <h1 className="text-2xl font-black">{profile.full_name || profile.username}</h1>
          <p className="text-zinc-500 text-sm mt-1">@{profile.username}</p>
          {profile.bio && (
            <p className="text-zinc-300 text-sm mt-3 max-w-sm mx-auto">{profile.bio}</p>
          )}
        </div>

        {profile.show_love_active && (
          <a
            href={`/${profile.username}/${profile.show_love_slug}`}
            className="block w-full py-4 text-center text-black font-bold text-base mb-8 hover:opacity-90 transition"
            style={{ backgroundColor: G }}
          >
            {profile.show_love_label}
          </a>
        )}

        {products && products.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Products</h2>
            <div className="flex flex-col gap-3">
              {products.map(p => (
                <a
                  key={p.id}
                  href={`/products/${p.id}`}
                  className="bg-zinc-900 border border-zinc-800 p-4 flex items-center justify-between hover:border-zinc-600 transition"
                >
                  <div>
                    <p className="font-bold text-white">{p.title}</p>
                    {p.description && (
                      <p className="text-zinc-400 text-xs mt-0.5">{p.description}</p>
                    )}
                  </div>
                  <p className="font-bold ml-4 shrink-0" style={{ color: G }}>
                    &#8373; {Number(p.price).toFixed(2)}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}

        <p className="text-center text-zinc-700 text-xs mt-16">
          Powered by <a href="/" className="text-zinc-500 hover:text-white transition">gonuru</a>
        </p>
      </div>
    </main>
  )
}
