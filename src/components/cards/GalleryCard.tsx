// Placeholder couple photos using gradient tiles
const photos = [
  { caption: 'The Library', bg: 'linear-gradient(135deg, #AFCBFF 0%, #C8DEFF 100%)', emoji: '📚' },
  { caption: 'First Chai', bg: 'linear-gradient(135deg, #F7E8A4 0%, #F5DFA0 100%)', emoji: '☕' },
  { caption: 'Rooftop Sunset', bg: 'linear-gradient(135deg, #FFB5A7 0%, #FFC8BB 100%)', emoji: '🌅' },
  { caption: 'The Proposal', bg: 'linear-gradient(135deg, #B5EAD7 0%, #C8F0E2 100%)', emoji: '💍' },
  { caption: 'Family Day', bg: 'linear-gradient(135deg, #D4A8C7 0%, #E0C0D8 100%)', emoji: '👨‍👩‍👧‍👦' },
  { caption: 'Our favourite spot', bg: 'linear-gradient(135deg, #FFDAC1 0%, #FFE8D8 100%)', emoji: '🌸' },
]

export default function GalleryCard() {
  return (
    <div className="py-6 px-2">
      <div className="text-center mb-8">
        <p
          className="text-xs tracking-widest uppercase mb-2"
          style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', letterSpacing: '0.2em' }}
        >
          Moments we cherish
        </p>
        <h2
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 500,
            color: '#2B2B2B',
          }}
        >
          Our Gallery
        </h2>
        <div className="mx-auto mt-3 w-12 h-0.5 rounded-full" style={{ background: '#AFCBFF' }} />
      </div>

      <div
        className="grid gap-3 max-w-xl mx-auto"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
      >
        {photos.map((photo, i) => (
          <div
            key={i}
            className="relative rounded-xl overflow-hidden cursor-pointer group"
            style={{
              aspectRatio: i === 0 || i === 5 ? '1 / 1.3' : '1',
              background: photo.bg,
              gridRow: i === 0 || i === 5 ? 'span 1' : 'auto',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              border: '2px solid rgba(255,255,255,0.7)',
            }}
          >
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-1 transition-opacity"
              style={{ opacity: 1 }}
            >
              <span className="text-3xl">{photo.emoji}</span>
            </div>
            <div
              className="absolute inset-0 flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)' }}
            >
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.72rem',
                  color: 'white',
                  fontWeight: 500,
                }}
              >
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p
        className="text-center mt-6 text-sm italic"
        style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF' }}
      >
        More photos coming soon ✨
      </p>
    </div>
  )
}
