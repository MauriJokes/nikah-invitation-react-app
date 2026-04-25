import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CARD_LAYOUT } from '@/config/cardLayout'
import type { CardId } from '@/config/cardLayout'
import Card from './Card'
import ExpandedCard from './ExpandedCard'

interface ScatteredLayoutProps {
  visible: boolean
}

export default function ScatteredLayout({ visible }: ScatteredLayoutProps) {
  const [expandedCard, setExpandedCard] = useState<CardId | null>(null)
  const [focusedId, setFocusedId] = useState<CardId | null>(null)
  const [hoveredId, setHoveredId] = useState<CardId | null>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const containerRef = useRef<HTMLDivElement>(null)

  // Responsive detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Parallax — desktop only
  useEffect(() => {
    if (isMobile) return
    const handle = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      setMouse({ x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy })
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [isMobile])

  const handleCardClick = (id: CardId) => {
    setFocusedId(id)
    setExpandedCard(id)
  }

  const handleClose = () => {
    setExpandedCard(null)
    setFocusedId(null)
  }

  // Z-index: focused > hovered > base
  const getZIndex = (id: CardId, baseZ: number) => {
    if (focusedId === id) return 999
    if (hoveredId === id) return 50
    return baseZ
  }

  return (
    <>
      <div ref={containerRef} className="fixed inset-0" style={{ zIndex: 10 }}>
        <AnimatePresence>
          {visible &&
            CARD_LAYOUT.map((config, i) => {
              const x = isMobile ? config.mobileX : config.x
              const y = isMobile ? config.mobileY : config.y
              const w = isMobile ? config.mobileWidth : config.width
              const rot = isMobile ? config.mobileRotation : config.rotation

              // Parallax offset — skip on mobile, skip if dragging
              const parallaxX = isMobile ? 0 : mouse.x * (config.zIndex * 1.2)
              const parallaxY = isMobile ? 0 : mouse.y * (config.zIndex * 0.8)

              return (
                <motion.div
                  key={config.id}
                  style={{
                    position: 'absolute',
                    left: `${x}%`,
                    top: `${y}%`,
                    zIndex: getZIndex(config.id, config.zIndex),
                    x: parallaxX,
                    y: parallaxY,
                    width: w,
                  }}
                  animate={{
                    zIndex: getZIndex(config.id, config.zIndex),
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 90,
                    damping: 28,
                  }}
                >
                  <Card
                    config={{ ...config, rotation: rot, width: w }}
                    index={i}
                    isActive={focusedId === config.id}
                    onClick={handleCardClick}
                    onHoverStart={(id) => setHoveredId(id)}
                    onHoverEnd={() => setHoveredId(null)}
                  />
                </motion.div>
              )
            })}
        </AnimatePresence>
      </div>

      <ExpandedCard cardId={expandedCard} onClose={handleClose} />
    </>
  )
}
