import { motion } from 'framer-motion'
import type { CardConfig, CardId } from '@/config/cardLayout'
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

interface CardProps {
  config: CardConfig
  index: number
  isActive: boolean
  onClick: (id: CardConfig['id']) => void
  onHoverStart: (id: CardConfig['id']) => void
  onHoverEnd: () => void
}

export default function Card({ config, index, isActive, onClick, onHoverStart, onHoverEnd }: CardProps) {
  const { id, icon, rotation, width } = config
  const t = useT()
  const label = t[LABEL_KEYS[id]] as string

  return (
    <motion.div
      key={id}
      className="cursor-pointer"
      style={{
        width,
        transformOrigin: 'center center',
        // z-index managed by ScatteredLayout wrapper
      }}
      initial={{
        opacity: 0,
        scale: 0.6,
        rotate: rotation + (Math.random() > 0.5 ? 15 : -15),
        y: 60,
      }}
      animate={{
        opacity: 1,
        scale: isActive ? 1.04 : 1,
        rotate: rotation,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.7,
        y: 30,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 22,
        delay: 0.08 * index,
      }}
      whileHover={{
        scale: 1.07,
        rotate: rotation * 0.3,
        y: -10,
        transition: {
          type: 'spring',
          stiffness: 380,
          damping: 18,
        },
      }}
      drag
      dragMomentum={false}
      dragElastic={0.08}
      whileDrag={{ scale: 1.08, cursor: 'grabbing' }}
      onHoverStart={() => onHoverStart(id)}
      onHoverEnd={onHoverEnd}
      onClick={() => onClick(id)}
    >
      {/* Card face */}
      <div
        className="rounded-xl p-5 relative overflow-hidden transition-shadow duration-300"
        style={{
          background: '#FFF8F0',
          boxShadow: isActive
            ? '0 8px 16px rgba(0,0,0,0.06), 0 20px 45px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)'
            : '0 4px 6px rgba(0,0,0,0.04), 0 10px 25px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
          border: isActive
            ? '1.5px solid rgba(175, 203, 255, 0.6)'
            : '1px solid rgba(255,255,255,0.8)',
        }}
      >
        {/* Corner fold */}
        <div
          className="absolute top-0 right-0 w-8 h-8 pointer-events-none"
          style={{ background: 'linear-gradient(225deg, #F0EBE3 45%, transparent 45%)', opacity: 0.8 }}
        />

        {/* Ruled paper lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(175, 203, 255, 0.12) 28px)',
            borderRadius: 'inherit',
          }}
        />

        <div className="relative z-10">
          <div className="text-2xl mb-2">{icon}</div>
          <p
            className="font-medium tracking-wide"
            style={{
              fontFamily: '"Playfair Display", serif',
              color: '#2B2B2B',
              fontSize: '1rem',
            }}
          >
            {label}
          </p>
          <div className="mt-3 h-0.5 w-8 rounded-full" style={{ background: '#AFCBFF' }} />
          <p
            className="mt-2 text-xs"
            style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', letterSpacing: '0.05em' }}
          >
            {t.cardClickHint}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
