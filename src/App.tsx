import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Envelope from '@/components/Envelope'
import ScatteredLayout from '@/components/ScatteredLayout'
import BackgroundParticles from '@/components/BackgroundParticles'
import { LanguageProvider, useLang, useT } from '@/context/LanguageContext'

type AppState = 'envelope' | 'cards'

function AppInner() {
  const [appState, setAppState] = useState<AppState>('envelope')
  const t = useT()
  const { lang, setLang } = useLang()

  // ── Music ──────────────────────────────────────────────────────────────────
  // Place your audio file at public/music.mp3 (any royalty-free wedding track).
  // Audio is created lazily on the envelope click — satisfies browser autoplay policy.
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

  const handleEnvelopeOpen = () => {
    setAppState('cards')
    if (!audioRef.current) {
      const audio = new Audio('/music.mp3')
      audio.loop = true
      audio.volume = 0.45
      audioRef.current = audio
    }
    audioRef.current.play().catch(() => {
      // Autoplay blocked in strict browser settings — user can enable via toggle
    })
    setIsMusicPlaying(true)
  }

  const toggleMusic = () => {
    if (!audioRef.current) return
    if (isMusicPlaying) {
      audioRef.current.pause()
      setIsMusicPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setIsMusicPlaying(true)
    }
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #EEF3FA 0%, #F5EFE8 55%, #EAF0F7 100%)' }}
    >
      <BackgroundParticles />
      {/* Language toggle — floats above everything */}
      <button
        onClick={() => setLang(lang === 'ms' ? 'en' : 'ms')}
        style={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          zIndex: 300,
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.72rem',
          letterSpacing: '0.14em',
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(175, 203, 255, 0.45)',
          borderRadius: '999px',
          padding: '5px 14px',
          cursor: 'pointer',
          color: '#6B7280',
          display: 'flex',
          gap: '6px',
          alignItems: 'center',
        }}
        aria-label="Toggle language"
      >
        <span style={{ fontWeight: lang === 'ms' ? 700 : 400, color: lang === 'ms' ? '#2B2B2B' : '#9CA3AF' }}>BM</span>
        <span style={{ opacity: 0.35 }}>·</span>
        <span style={{ fontWeight: lang === 'en' ? 700 : 400, color: lang === 'en' ? '#2B2B2B' : '#9CA3AF' }}>EN</span>
      </button>

      {/* Music toggle — only shown after envelope opens */}
      <AnimatePresence>
        {appState === 'cards' && (
          <motion.button
            key="music-toggle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={toggleMusic}
            style={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              zIndex: 300,
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              background: isMusicPlaying
                ? 'rgba(175, 203, 255, 0.3)'
                : 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${isMusicPlaying ? 'rgba(175, 203, 255, 0.6)' : 'rgba(175, 203, 255, 0.35)'}`,
              borderRadius: '999px',
              padding: '6px 14px',
              cursor: 'pointer',
              color: '#6B7280',
              display: 'flex',
              gap: '6px',
              alignItems: 'center',
            }}
            aria-label={isMusicPlaying ? 'Mute music' : 'Unmute music'}
          >
            <span style={{ fontSize: '0.85rem', lineHeight: 1 }}>
              {isMusicPlaying ? '♪' : '♩'}
            </span>
            <span style={{ fontWeight: isMusicPlaying ? 600 : 400, color: isMusicPlaying ? '#2B2B2B' : '#9CA3AF' }}>
              {isMusicPlaying ? 'ON' : 'OFF'}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Subtle dot-grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(175, 203, 255, 0.25) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          zIndex: 0,
        }}
      />

      {/* Envelope screen */}
      <AnimatePresence>
        {appState === 'envelope' && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center"
            style={{ zIndex: 20 }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Top greeting */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                  fontStyle: 'italic',
                  color: '#6B7280',
                  letterSpacing: '0.05em',
                  whiteSpace: 'break-spaces',
                }}
              >
                {t.cordiallyInvited}
              </p>
              <h1
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                  fontWeight: 500,
                  color: '#2B2B2B',
                  marginTop: '0.25rem',
                  letterSpacing: '-0.02em',
                }}
              >
                Izyan &amp; Adam
              </h1>
            </motion.div>

            {/* Envelope */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Envelope onOpen={handleEnvelopeOpen} />
            </motion.div>

            {/* Bottom date teaser */}
            <motion.p
              className="mt-12 text-center"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.78rem',
                letterSpacing: '0.2em',
                color: '#9CA3AF',
                textTransform: 'uppercase',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {t.dateLocation}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scattered cards */}
      <ScatteredLayout visible={appState === 'cards'} />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  )
}
