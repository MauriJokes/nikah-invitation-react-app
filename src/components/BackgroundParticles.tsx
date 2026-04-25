import { memo, useMemo } from 'react'

// ─── Config ───────────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 28

const COLORS = [
  'rgba(175, 203, 255, VAR)', // pastel blue
  'rgba(175, 203, 255, VAR)', // pastel blue (weighted higher)
  'rgba(247, 232, 164, VAR)', // soft yellow
  'rgba(255, 248, 240, VAR)', // cream
]

// Petal-like SVG paths (simple rounded shapes) rendered as background-image
// We use simple CSS circles with border-radius for zero-dependency rendering
function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

interface Particle {
  id: number
  left: number       // vw %
  size: number       // px
  opacity: number
  duration: number   // s
  delay: number      // s
  drift: number      // px horizontal drift
  color: string
  borderRadius: string
}

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const opacity = rand(0.55, 0.82)
    const rawColor = pick(COLORS).replace('VAR', String(opacity.toFixed(2)))
    const size = rand(4, 11)
    const isElongated = Math.random() > 0.6
    const borderRadius = isElongated
      ? `${rand(40, 60)}% ${rand(40, 60)}% ${rand(40, 60)}% ${rand(40, 60)}%`
      : '50%'
    const duration = rand(12, 26)

    return {
      id: i,
      left: rand(0, 100),
      size,
      opacity,
      duration,
      // Negative delay = start mid-cycle so particles are visible immediately
      delay: -rand(0, duration),
      drift: rand(-60, 60),
      color: rawColor,
      borderRadius,
    }
  })
}

// ─── Keyframes injected once ──────────────────────────────────────────────────
// Each particle gets a unique animation name with its specific drift value so
// the horizontal float is per-particle without JS timers.
function buildKeyframes(particles: Particle[]): string {
  return particles
    .map(
      (p) => `
@keyframes fall_${p.id} {
  0%   { transform: translateY(-24px) translateX(0px) rotate(0deg); opacity: 0; }
  8%   { opacity: ${p.opacity}; }
  92%  { opacity: ${p.opacity * 0.6}; }
  100% { transform: translateY(110vh) translateX(${p.drift}px) rotate(${rand(-120, 120)}deg); opacity: 0; }
}`
    )
    .join('\n')
}

// ─── Component ────────────────────────────────────────────────────────────────
const BackgroundParticles = memo(function BackgroundParticles() {
  // Generate once — memo ensures this never re-runs on parent re-renders
  const particles = useMemo(() => generateParticles(), [])
  const keyframes = useMemo(() => buildKeyframes(particles), [particles])

  return (
    <>
      <style>{keyframes}</style>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              top: '-20px',
              left: `${p.left}vw`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: p.borderRadius,
              background: p.color,
              animation: `fall_${p.id} ${p.duration}s ${p.delay}s linear infinite`,
            }}
          />
        ))}
      </div>
    </>
  )
})

export default BackgroundParticles
