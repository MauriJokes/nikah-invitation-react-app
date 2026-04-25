import { useT } from '@/context/LanguageContext'

export default function HeroCard() {
  const t = useT()
  return (
    <div className="flex flex-col items-center text-center py-8 px-4 max-w-lg mx-auto">

      {/* Salutation */}
      <p
        className="tracking-widest uppercase mb-1"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.72rem',
          letterSpacing: '0.22em',
          color: '#6B7280',
        }}
      >
        {t.hero_salutation}
      </p>

      {/* Grace line */}
      <p
        className="mb-5 leading-relaxed"
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '0.9rem',
          fontStyle: 'italic',
          color: '#6B7280',
        }}
      >
        {t.hero_grace}
      </p>

      {/* Parent names */}
      <div className="flex flex-col gap-1 mb-6">
        {t.hero_parents.map((name) => (
          <p
            key={name}
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(0.78rem, 2vw, 0.9rem)',
              color: '#4B5563',
              lineHeight: 1.5,
            }}
          >
            {name}
          </p>
        ))}
      </div>

      {/* Invite paragraph */}
      <p
        className="mb-7 leading-relaxed max-w-sm"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.78rem',
          color: '#6B7280',
          fontStyle: 'italic',
        }}
      >
        {t.hero_invite}
      </p>

      {/* Divider */}
      <div className="flex items-center gap-4 w-full max-w-xs mb-6">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #AFCBFF)' }} />
        <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.4rem', fontStyle: 'italic', color: '#AFCBFF' }}>
          ♡
        </span>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, #AFCBFF)' }} />
      </div>

      {/* Couple names */}
      <div className="flex flex-col items-center gap-2 mb-7">
        <h1
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.4rem, 4vw, 2.1rem)',
            fontWeight: 500,
            color: '#2B2B2B',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}
        >
          {t.hero_bride}
        </h1>
        <span
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.6rem',
            fontStyle: 'italic',
            color: '#AFCBFF',
          }}
        >
          &amp;
        </span>
        <h1
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.4rem, 4vw, 2.1rem)',
            fontWeight: 500,
            color: '#2B2B2B',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
          }}
        >
          {t.hero_groom}
        </h1>
      </div>

      {/* Date pill */}
      <div
        className="px-6 py-3 rounded-full"
        style={{
          background: 'rgba(175, 203, 255, 0.2)',
          border: '1px solid rgba(175, 203, 255, 0.4)',
        }}
      >
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.85rem',
            color: '#2B2B2B',
            letterSpacing: '0.08em',
          }}
        >
          {t.hero_date}
        </p>
      </div>

      {/* Floral decoration */}
      <div className="mt-7 flex gap-3 text-2xl opacity-60">
        <span>🌸</span>
        <span>💐</span>
        <span>🌸</span>
      </div>

      {/* Quote */}
      <p
        className="mt-6 max-w-sm leading-relaxed"
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '0.88rem',
          fontStyle: 'italic',
          color: '#6B7280',
          textAlign: 'center',
        }}
      >
        {t.hero_quote}
      </p>
    </div>
  )
}
