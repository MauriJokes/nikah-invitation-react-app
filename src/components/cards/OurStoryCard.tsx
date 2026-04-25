import { useT } from '@/context/LanguageContext'

export default function OurStoryCard() {
  const t = useT()
  const timelineEvents = t.story_events
  return (
    <div className="py-6 px-2">
      <div className="text-center mb-8">
        <p
          className="text-xs tracking-widest uppercase mb-2"
          style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', letterSpacing: '0.2em' }}
        >
          {t.story_subtitle}
        </p>
        <h2
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 500,
            color: '#2B2B2B',
          }}
        >
          {t.story_heading}
        </h2>
        <div className="mx-auto mt-3 w-12 h-0.5 rounded-full" style={{ background: '#AFCBFF' }} />
      </div>

      <div className="relative max-w-lg mx-auto">
        {/* Timeline line */}
        <div
          className="absolute left-16 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, transparent, #AFCBFF 15%, #AFCBFF 85%, transparent)' }}
        />

        <div className="flex flex-col gap-8">
          {timelineEvents.map((event) => (
            <div key={event.year} className="flex gap-6 items-start pl-2">
              {/* Year bubble */}
              <div
                className="relative shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: '#AFCBFF',
                  border: '3px solid #FFF8F0',
                  boxShadow: '0 0 0 2px #AFCBFF',
                }}
              >
                <span
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    color: '#2B2B2B',
                  }}
                >
                  {event.year}
                </span>
              </div>

              {/* Content */}
              <div className="pt-1 pb-2">
                <h3
                  className="mb-1"
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#2B2B2B',
                  }}
                >
                  {event.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                    color: '#6B7280',
                  }}
                >
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
