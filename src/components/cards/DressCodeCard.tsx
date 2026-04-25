import { useT } from '@/context/LanguageContext'

export default function DressCodeCard() {
  const t = useT()
  const dressCodes = t.dresscode_items
  return (
    <div className="py-6 px-2">
      <div className="text-center mb-8">
        <p
          className="text-xs tracking-widest uppercase mb-2"
          style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', letterSpacing: '0.2em' }}
        >
          {t.dresscode_subtitle}
        </p>
        <h2
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 500,
            color: '#2B2B2B',
          }}
        >
          {t.dresscode_heading}
        </h2>
        <div className="mx-auto mt-3 w-12 h-0.5 rounded-full" style={{ background: '#AFCBFF' }} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {dressCodes.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl p-5"
            style={{
              background: 'rgba(255, 248, 240, 0.8)',
              border: '1px solid rgba(175, 203, 255, 0.2)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{item.emoji}</span>
              <div>
                <p
                  style={{ fontFamily: '"Playfair Display", serif', fontSize: '0.95rem', fontWeight: 600, color: '#2B2B2B' }}
                >
                  {item.event}
                </p>
                <p
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#6B7280' }}
                >
                  {item.for}
                </p>
              </div>
            </div>

            {/* Colour swatches */}
            <div className="flex gap-1.5 mb-3">
              {item.palette.map((color) => (
                <div
                  key={color}
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: color, borderColor: 'rgba(0,0,0,0.1)' }}
                  title={color}
                />
              ))}
            </div>

            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif', color: '#2B2B2B' }}
            >
              {item.suggestion}
            </p>
            {item.avoid && (
              <p
                className="mt-2 text-xs"
                style={{ fontFamily: 'Inter, sans-serif', color: '#9CA3AF', fontStyle: 'italic' }}
              >
                {item.avoid}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
