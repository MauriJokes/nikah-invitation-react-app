import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useT } from '@/context/LanguageContext'

// ─── Countdown hook ───────────────────────────────────────────────────────────
function useCountdown(isoDate: string) {
  const target = new Date(isoDate).getTime()

  const calc = () => {
    const diff = target - Date.now()
    if (diff <= 0) return null
    const totalSeconds = Math.floor(diff / 1000)
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    }
  }

  const [time, setTime] = useState(calc)

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [isoDate])

  return time
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

// ─── Single unit box ─────────────────────────────────────────────────────────
function CountUnit({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
        padding: '10px 4px 8px',
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.72)',
        border: '1px solid rgba(175,203,255,0.3)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        minWidth: 0,
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.3rem, 4vw, 1.9rem)',
            fontWeight: 600,
            color: '#2B2B2B',
            lineHeight: 1,
          }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.58rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: '#9CA3AF',
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ─── Event timeline ───────────────────────────────────────────────────────────
const DOT_COLORS = [
  '#AFCBFF', // pastel blue
  '#F7E8A4', // soft gold
  '#AFCBFF',
  '#AFCBFF',
  '#F7E8A4',
  '#AFCBFF',
  '#AFCBFF',
  '#AFCBFF',
  '#F7E8A4',
]

function EventTimeline({ items, heading }: { items: readonly string[]; heading: string }) {
  return (
    <div className="mt-6">
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(175,203,255,0.5), transparent)' }} />
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.6rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#9CA3AF',
            whiteSpace: 'nowrap',
          }}
        >
          {heading}
        </p>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, rgba(175,203,255,0.5), transparent)' }} />
      </div>

      {/* Timeline */}
      <div className="relative pl-6">
        {/* Vertical line */}
        <div
          className="absolute left-[9px] top-2 bottom-2"
          style={{
            width: '1px',
            background: 'linear-gradient(to bottom, #AFCBFF 0%, rgba(175,203,255,0.15) 100%)',
          }}
        />

        {items.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.05 * i }}
            className="relative flex items-start gap-3 group"
            style={{ marginBottom: i < items.length - 1 ? '18px' : 0 }}
          >
            {/* Dot */}
            <div
              className="absolute -left-6 mt-[5px] flex items-center justify-center"
              style={{ width: '18px', height: '18px' }}
            >
              <div
                style={{
                  width: i === 0 ? '10px' : '7px',
                  height: i === 0 ? '10px' : '7px',
                  borderRadius: '50%',
                  background: DOT_COLORS[i % DOT_COLORS.length],
                  boxShadow: i === 0 ? `0 0 0 3px rgba(175,203,255,0.25)` : 'none',
                  transition: 'transform 0.2s',
                }}
              />
            </div>

            {/* Label */}
            <p
              style={{
                fontFamily: i === 0 ? '"Playfair Display", serif' : 'Inter, sans-serif',
                fontSize: i === 0 ? '0.88rem' : '0.8rem',
                fontWeight: i === 0 ? 500 : 400,
                color: i === 0 ? '#2B2B2B' : '#4B5563',
                lineHeight: 1.45,
                fontStyle: i === 0 ? 'italic' : 'normal',
              }}
            >
              {item}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Flip countdown ───────────────────────────────────────────────────────────
function FlipCountdown({ isoDate }: { isoDate: string }) {
  const t = useT()
  const time = useCountdown(isoDate)
  const units = t.details_units

  if (!time) {
    return (
      <p
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '1rem',
          fontStyle: 'italic',
          color: '#AFCBFF',
          textAlign: 'center',
          padding: '8px 0',
        }}
      >
        {t.details_expired}
      </p>
    )
  }

  return (
    <div>
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.62rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#9CA3AF',
          textAlign: 'center',
          marginBottom: '10px',
        }}
      >
        {t.details_countdownLabel}
      </p>
      <div style={{ display: 'flex', gap: '6px' }}>
        <CountUnit value={pad(time.days)} label={units.days} />
        <CountUnit value={pad(time.hours)} label={units.hours} />
        <CountUnit value={pad(time.minutes)} label={units.minutes} />
        <CountUnit value={pad(time.seconds)} label={units.seconds} />
      </div>
    </div>
  )
}

// ─── Main card ────────────────────────────────────────────────────────────────
export default function EventDetailsCard() {
  const t = useT()
  const events = t.details_events
  return (
    <div className="py-6 px-2">
      <div className="text-center mb-8">
        <p
          className="text-xs tracking-widest uppercase mb-2"
          style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', letterSpacing: '0.2em' }}
        >
          {t.details_subtitle}
        </p>
        <h2
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 500,
            color: '#2B2B2B',
          }}
        >
          {t.details_heading}
        </h2>
        <div className="mx-auto mt-3 w-12 h-0.5 rounded-full" style={{ background: '#AFCBFF' }} />
      </div>

      <div className="flex flex-col gap-6 max-w-lg mx-auto">
        {events.map((event) => (
          <div
            key={event.title}
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{
              background: 'rgba(175, 203, 255, 0.12)',
              border: '1px solid rgba(175, 203, 255, 0.3)',
            }}
          >
            {/* Corner accent */}
            <div
              className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
              style={{ background: 'linear-gradient(to bottom, #AFCBFF, #F7E8A4)' }}
            />

            <div className="pl-3">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{event.icon}</span>
                <h3
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#2B2B2B',
                  }}
                >
                  {event.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-start gap-3">
                  <span className="text-sm mt-0.5">📅</span>
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#2B2B2B', fontWeight: 500 }}>{event.date}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#6B7280' }}>{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-sm mt-0.5">📍</span>
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#2B2B2B', fontWeight: 500 }}>{event.venue}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#6B7280' }}>{event.address}</p>
                  </div>
                </div>
              </div>

              {/* Flip countdown */}
              <div
                className="mt-5 py-4 px-3 rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(175,203,255,0.25)',
                }}
              >
                <FlipCountdown isoDate={event.isoDate} />
              </div>

              {event.schedule && event.schedule.length > 0 && (
                <EventTimeline items={event.schedule} heading={t.details_scheduleHeading} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
