import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { CardId } from '@/config/cardLayout'
import { CARD_LAYOUT } from '@/config/cardLayout'
import { useT } from '@/context/LanguageContext'
import type { Translations } from '@/i18n/translations'

const LABEL_KEYS: Record<CardId, keyof Translations> = {
  hero: 'cardLabel_hero',
  story: 'cardLabel_story',
  details: 'cardLabel_details',
  dresscode: 'cardLabel_dresscode',
  greeting: 'cardLabel_greeting',
  rsvp: 'cardLabel_rsvp',
}
import HeroCard from './cards/HeroCard'
import OurStoryCard from './cards/OurStoryCard'
import EventDetailsCard from './cards/EventDetailsCard'
import DressCodeCard from './cards/DressCodeCard'
import GreetingCard from './cards/GreetingCard'
import RSVPCard from './cards/RSVPCard'

interface ExpandedCardProps {
  cardId: CardId | null
  onClose: () => void
}

const cardContent: Record<CardId, React.ReactNode> = {
  hero: <HeroCard />,
  story: <OurStoryCard />,
  details: <EventDetailsCard />,
  dresscode: <DressCodeCard />,
  greeting: <GreetingCard />,
  rsvp: <RSVPCard />,
}

export default function ExpandedCard({ cardId, onClose }: ExpandedCardProps) {
  const config = cardId ? CARD_LAYOUT.find((c) => c.id === cardId) : null
  const t = useT()
  const label = cardId ? (t[LABEL_KEYS[cardId]] as string) : ''

  return (
    <AnimatePresence>
      {cardId && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0"
            style={{ zIndex: 200 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(244, 248, 251, 0.85)', backdropFilter: 'blur(12px)' }}
            />
          </motion.div>

          {/* Expanded paper card */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 201, padding: '20px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
              style={{
                background: '#FFF8F0',
                boxShadow:
                  '0 25px 60px rgba(0,0,0,0.12), 0 10px 30px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid rgba(255,255,255,0.9)',
              }}
              initial={{ scale: 0.88, rotate: config?.rotation ?? 0, y: 40 }}
              animate={{ scale: 1, rotate: 0, y: 0 }}
              exit={{ scale: 0.88, rotate: config?.rotation ?? 0, y: 40 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Paper lines texture */}
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(transparent, transparent 35px, rgba(175, 203, 255, 0.08) 36px)',
                }}
              />

              {/* Header bar */}
              <div
                className="sticky top-0 flex items-center justify-between px-6 py-4 z-10"
                style={{
                  background: 'rgba(255, 248, 240, 0.95)',
                  backdropFilter: 'blur(8px)',
                  borderBottom: '1px solid rgba(175, 203, 255, 0.15)',
                  borderRadius: '1rem 1rem 0 0',
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{config?.icon}</span>
                  <span
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '0.95rem',
                      fontWeight: 500,
                      color: '#6B7280',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {label}
                  </span>
                </div>

                <button
                  onClick={onClose}
                  className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
                  style={{
                    background: 'rgba(175, 203, 255, 0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6B7280',
                  }}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="relative px-6 pb-8">
                {cardId && cardContent[cardId]}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
