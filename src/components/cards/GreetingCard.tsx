import { useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from 'framer-motion'
import { FocusInput, FocusTextarea } from '@/components/FocusInput'
import type { MotionValue } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useT } from '@/context/LanguageContext'
import { fetchGreetings, submitGreeting } from '@/services/greetingService'
import type { Greeting } from '@/services/greetingService'

const CARD_COLORS: { bg: string; border: string }[] = [
  { bg: 'rgba(175, 203, 255, 0.22)', border: 'rgba(175, 203, 255, 0.55)' },
  { bg: 'rgba(247, 232, 164, 0.22)', border: 'rgba(247, 232, 164, 0.55)' },
  { bg: 'rgba(185, 230, 200, 0.22)', border: 'rgba(185, 230, 200, 0.55)' },
  { bg: 'rgba(255, 200, 200, 0.22)', border: 'rgba(255, 200, 200, 0.55)' },
  { bg: 'rgba(220, 200, 255, 0.22)', border: 'rgba(220, 200, 255, 0.55)' },
]

// Card geometry constants
const CARD_W = 168
const CARD_H = 242
const CARD_SPACING = 188

interface DeckCardProps {
  greeting: Greeting
  index: number
  deckOffset: MotionValue<number>
  colorScheme: { bg: string; border: string }
  wishLabel: string
  onClick: () => void
}

function DeckCard({ greeting, index, deckOffset, colorScheme, wishLabel, onClick }: DeckCardProps) {
  const rotateY = useTransform(deckOffset, (offset) => {
    const t = (index * CARD_SPACING + offset) / CARD_SPACING
    return Math.max(-58, Math.min(58, -t * 30))
  })

  const x = useTransform(deckOffset, (offset) => {
    const t = (index * CARD_SPACING + offset) / CARD_SPACING
    if (t === 0) return 0
    return Math.sign(t) * Math.pow(Math.abs(t), 0.78) * 120
  })

  const cardScale = useTransform(deckOffset, (offset) => {
    const dist = Math.abs((index * CARD_SPACING + offset) / CARD_SPACING)
    return Math.max(0.62, 1 - dist * 0.12)
  })

  const cardOpacity = useTransform(deckOffset, (offset) => {
    const dist = Math.abs((index * CARD_SPACING + offset) / CARD_SPACING)
    return dist > 3.8 ? 0 : Math.max(0.18, 1 - dist * 0.25)
  })

  const zIndex = useTransform(deckOffset, (offset) => {
    const dist = Math.abs((index * CARD_SPACING + offset) / CARD_SPACING)
    return Math.round(Math.max(1, 30 - dist * 5))
  })

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: `${-(CARD_W / 2)}px`,
        marginTop: `${-(CARD_H / 2)}px`,
        width: `${CARD_W}px`,
        height: `${CARD_H}px`,
        x,
        rotateY,
        scale: cardScale,
        opacity: cardOpacity,
        zIndex,
        transformOrigin: 'center center',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '12px',
          padding: '16px 14px',
          background: colorScheme.bg,
          border: `1.5px solid ${colorScheme.border}`,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)',
          backdropFilter: 'blur(6px)',
          backfaceVisibility: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontFamily: 'serif', fontSize: '1.1rem', color: 'rgba(175, 203, 255, 0.9)', lineHeight: 1 }}>
            ♡
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', color: '#9CA3AF', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            {wishLabel}
          </span>
        </div>

        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: '#6B7280', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '8px' }}>
          {greeting.name}
        </p>

        <div style={{ height: '1px', background: colorScheme.border, marginBottom: '10px', opacity: 0.7 }} />

        <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '0.82rem', fontStyle: 'italic', color: '#2B2B2B', lineHeight: 1.6, flex: 1, overflow: 'hidden' }}>
          &ldquo;{greeting.message}&rdquo;
        </p>

        <div style={{ textAlign: 'center', paddingTop: '8px' }}>
          <span style={{ fontSize: '0.72rem', color: 'rgba(175, 203, 255, 0.35)' }}>♡</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function GreetingCard() {
  const t = useT()
  const [greetings, setGreetings] = useState<Greeting[]>([])
  const [fetchState, setFetchState] = useState<'loading' | 'error' | 'done'>('loading')
  const [activeIndex, setActiveIndex] = useState(0)
  const [form, setForm] = useState({ name: '', message: '' })
  const [toastVisible, setToastVisible] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const deckOffset = useMotionValue(0)
  const total = greetings.length

  // ── Fetch on mount ────────────────────────────────────────────────────────
  useEffect(() => {
    fetchGreetings()
      .then((data) => {
        setGreetings(data)
        setFetchState('done')
      })
      .catch(() => setFetchState('error'))
  }, [])

  const goTo = (index: number) => {
    const target = Math.max(0, Math.min(total - 1, index))
    setActiveIndex(target)
    animate(deckOffset, -target * CARD_SPACING, {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) return

    setSubmitting(true)
    setSubmitError(null)

    // Optimistic update
    const optimistic: Greeting = {
      id: `optimistic-${Date.now()}`,
      name: form.name.trim(),
      message: form.message.trim(),
    }
    setGreetings((prev) => [optimistic, ...prev])
    setActiveIndex(0)
    animate(deckOffset, 0, { type: 'spring', stiffness: 300, damping: 30 })
    setForm({ name: '', message: '' })

    try {
      const confirmed = await submitGreeting({
        name: optimistic.name,
        message: optimistic.message,
      })
      // Replace optimistic entry with server-confirmed one (real id)
      setGreetings((prev) =>
        prev.map((g) => (g.id === optimistic.id ? confirmed : g))
      )
      setToastVisible(true)
      setTimeout(() => setToastVisible(false), 3000)
    } catch (err) {
      // Roll back optimistic entry
      setGreetings((prev) => prev.filter((g) => g.id !== optimistic.id))
      setSubmitError(err instanceof Error ? err.message : 'Could not send. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.875rem',
    color: '#2B2B2B',
    background: 'rgba(255,255,255,0.8)',
    border: '1px solid rgba(175, 203, 255, 0.4)',
    borderRadius: '10px',
    padding: '10px 14px',
    width: '100%',
    outline: 'none',
  }

  return (
    <div className="py-6 px-2">
      {/* Heading */}
      <div className="text-center mb-8">
        <p
          className="text-xs tracking-widest uppercase mb-2"
          style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', letterSpacing: '0.2em' }}
        >
          {t.greeting_subtitle}
        </p>
        <h2
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 500,
            color: '#2B2B2B',
          }}
        >
          {t.greeting_heading}
        </h2>
        <div className="mx-auto mt-3 w-12 h-0.5 rounded-full" style={{ background: '#AFCBFF' }} />
      </div>

      {/* 3D Deck stage */}
      <div
        style={{
          position: 'relative',
          height: `${CARD_H + 40}px`,
          perspective: '1400px',
          marginBottom: '8px',
        }}
      >
        {fetchState === 'loading' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: '#9CA3AF', fontStyle: 'italic' }}>
              …
            </p>
          </div>
        )}

        {fetchState === 'error' && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: '#E57373', textAlign: 'center' }}>
              Could not load greetings.
            </p>
          </div>
        )}

        {fetchState === 'done' && total === 0 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '0.9rem', color: '#9CA3AF', fontStyle: 'italic' }}>
              Be the first to leave a wish 💌
            </p>
          </div>
        )}

        {fetchState === 'done' && total > 0 && (
          <>
            {/* Transparent pan-capture layer — catches drags even between cards */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 50,
                cursor: 'grab',
                touchAction: 'none',
              }}
              whileTap={{ cursor: 'grabbing' }}
              onPan={(_, info) => {
                const next = deckOffset.get() + info.delta.x
                const min = -(total - 1) * CARD_SPACING * 1.15
                const max = CARD_SPACING * 0.35
                deckOffset.set(Math.max(min, Math.min(max, next)))
              }}
              onPanEnd={(_, info) => {
                const fractional = -deckOffset.get() / CARD_SPACING
                const velocityContrib = -info.velocity.x / (CARD_SPACING * 4)
                const projected = fractional + velocityContrib
                const target = Math.round(Math.max(0, Math.min(total - 1, projected)))
                goTo(target)
              }}
            />

            {greetings.map((greeting, i) => (
              <DeckCard
                key={greeting.id}
                greeting={greeting}
                index={i}
                deckOffset={deckOffset}
                colorScheme={CARD_COLORS[i % CARD_COLORS.length]}
                wishLabel={t.greeting_wish_label}
                onClick={() => goTo(i)}
              />
            ))}
          </>
        )}
      </div>

      {/* Navigation row */}
      <div className="flex items-center justify-center gap-6 mb-4">
        <button
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0 || total === 0}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(175, 203, 255, 0.2)',
            border: '1px solid rgba(175, 203, 255, 0.4)',
            cursor: activeIndex === 0 || total === 0 ? 'not-allowed' : 'pointer',
            color: '#6B7280',
            opacity: activeIndex === 0 || total === 0 ? 0.35 : 1,
            transition: 'opacity 0.2s',
          }}
          aria-label={t.greeting_prev}
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex gap-1.5 flex-wrap justify-center" style={{ maxWidth: '200px' }}>
          {greetings.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full"
              style={{
                width: i === activeIndex ? '20px' : '6px',
                height: '6px',
                background: i === activeIndex ? '#AFCBFF' : 'rgba(175, 203, 255, 0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s',
              }}
              aria-label={`Go to greeting ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === total - 1}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(175, 203, 255, 0.2)',
            border: '1px solid rgba(175, 203, 255, 0.4)',
            cursor: activeIndex === total - 1 ? 'not-allowed' : 'pointer',
            color: '#6B7280',
            opacity: activeIndex === total - 1 ? 0.35 : 1,
            transition: 'opacity 0.2s',
          }}
          aria-label={t.greeting_next}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <p
        className="text-center mb-8"
        style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#9CA3AF' }}
      >
        {t.greeting_counter(activeIndex + 1, total)}
      </p>

      {/* Section divider */}
      <div className="flex items-center gap-4 max-w-md mx-auto mb-6">
        <div className="flex-1 h-px" style={{ background: 'rgba(175, 203, 255, 0.3)' }} />
        <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '0.8rem', color: '#9CA3AF', fontStyle: 'italic' }}>
          {t.greeting_divider}
        </p>
        <div className="flex-1 h-px" style={{ background: 'rgba(175, 203, 255, 0.3)' }} />
      </div>

      {/* Success toast */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#6B7280', fontStyle: 'italic' }}>
              {t.greeting_toast}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wish form */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-4">
        <FocusInput
          type="text"
          placeholder={t.greeting_namePlaceholder}
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
        />
        <FocusTextarea
          placeholder={t.greeting_messagePlaceholder}
          required
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          style={{ ...inputStyle, resize: 'none' }}
        />
        <button
          type="submit"
          disabled={!form.name.trim() || !form.message.trim() || submitting}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            background: '#AFCBFF',
            color: '#2B2B2B',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 24px',
            cursor: !form.name.trim() || !form.message.trim() || submitting ? 'not-allowed' : 'pointer',
            letterSpacing: '0.04em',
            opacity: !form.name.trim() || !form.message.trim() || submitting ? 0.5 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {submitting ? '…' : t.greeting_submit}
        </button>

        {submitError && (
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#E57373', textAlign: 'center' }}>
            {submitError}
          </p>
        )}
      </form>
    </div>
  )
}
