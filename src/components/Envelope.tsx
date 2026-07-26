import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useT } from "@/context/LanguageContext";
import logo from "@/assets/logo.png";

interface EnvelopeProps {
  onOpen: () => void;
}

// 5 cards fan out from inside the envelope after the flap lifts
// xOffset: horizontal spread from envelope center (110px)
// yBoost: extra upward lift for the arc shape
// rotation: final resting tilt
// delay: stagger offset in seconds
const EMERGING_CARDS = [
  { xOffset: -74, yBoost: 0, rotation: -16, delay: 0.05 },
  { xOffset: -34, yBoost: 10, rotation: -7, delay: 0.13 },
  { xOffset: 4, yBoost: 14, rotation: 1, delay: 0.19 },
  { xOffset: 42, yBoost: 10, rotation: 8, delay: 0.27 },
  { xOffset: 79, yBoost: 0, rotation: 15, delay: 0.35 },
];

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const t = useT();

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Start cards after flap has visibly lifted (~350ms)
    setTimeout(() => setShowCards(true), 350);
    // Give cards time to settle before transition to scattered layout
    // Delay must exceed fade-out end time (1250ms delay + 550ms duration = 1800ms)
    setTimeout(onOpen, 1900);
  };

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div
          className="flex flex-col items-center gap-6 cursor-pointer select-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleClick}
        >
          {/* Envelope SVG — overflow:visible prevents flap path from being clipped */}
          <div className="relative">
            <motion.svg
              width="300"
              height="218"
              viewBox="0 0 220 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              overflow="visible"
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                filter: "drop-shadow(0 20px 40px rgba(2, 8, 75, 0.5))",
                overflow: "visible",
                willChange: "transform",
              }}
            >
              {/* Envelope body — all corners pointy */}
              <path
                d="M2,2 L218,2 L218,158 L2,158 Z"
                fill="#02084B"
                stroke="#1A3A8F"
                strokeWidth="1.5"
              />

              {/* Inner envelope lighter shade */}
              <path
                d="M8,8 L212,8 L212,152 L8,152 Z"
                fill="#0A1660"
                opacity="0.4"
              />

              {/* Bottom fold left */}
              <path d="M2 152 L110 90 L2 40" fill="#1A3A8F" opacity="0.5" />
              {/* Bottom fold right */}
              <path d="M218 152 L110 90 L218 40" fill="#1A3A8F" opacity="0.5" />

              {/* Center V flap (closed) */}
              <path
                d="M2 12 L110 88 L218 12"
                fill="#02084B"
                stroke="#1A3A8F"
                strokeWidth="1.5"
              />

              {/* Wax seal */}
              <circle
                cx="110"
                cy="90"
                r="18"
                fill="#D4AF37"
                stroke="#B8960C"
                strokeWidth="1.5"
              />
              <image
                href={logo}
                x="92"
                y="72"
                width="36"
                height="36"
                preserveAspectRatio="xMidYMid meet"
                style={{ pointerEvents: "none" }}
              />
            </motion.svg>
          </div>

          {/* Label */}
          <motion.div
            className="text-center"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <p
              className="text-base tracking-widest uppercase"
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#6B7280",
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
              }}
            >
              {t.tapToOpen}
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Opening animation */}
      {isOpening && (
        <motion.div
          // Explicit size matches the SVG so absolute card positions are predictable
          style={{ position: "relative", width: "300px", height: "218px" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.55, delay: 1.25 }}
        >
          {/* ── Emerging invitation cards ─────────────────────────── */}
          <AnimatePresence>
            {showCards &&
              EMERGING_CARDS.map((card, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: "absolute",
                    // Center in container (110px) + spread, adjusted for card half-width (27px)
                    left: `${150 + card.xOffset - 27}px`,
                    // Start anchored near top of envelope body
                    top: "52px",
                    width: "54px",
                    height: "76px",
                    zIndex: 3 + i,
                    transformOrigin: "bottom center",
                    pointerEvents: "none",
                  }}
                  initial={{
                    y: 75,
                    opacity: 0,
                    rotate: card.rotation * 0.4,
                    scale: 0.88,
                  }}
                  animate={{
                    y: -112 - card.yBoost,
                    opacity: 1,
                    rotate: card.rotation,
                    scale: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 155,
                    damping: 17,
                    delay: card.delay,
                  }}
                >
                  {/* Paper invitation card — poker-card proportions */}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "6px",
                      background:
                        "linear-gradient(160deg, #FFF8F0 0%, #FFF3E8 100%)",
                      border: "1px solid rgba(175, 203, 255, 0.45)",
                      boxShadow:
                        "0 4px 14px rgba(0,0,0,0.13), 0 1px 3px rgba(0,0,0,0.07)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "3px",
                      padding: "8px 6px",
                    }}
                  >
                    {/* Decorative lines suggesting invitation text */}
                    <div
                      style={{
                        width: "68%",
                        height: "1.5px",
                        background: "rgba(175,203,255,0.55)",
                        borderRadius: "2px",
                      }}
                    />
                    <div
                      style={{
                        width: "48%",
                        height: "1px",
                        background: "rgba(175,203,255,0.35)",
                        borderRadius: "2px",
                      }}
                    />
                    <div
                      style={{
                        width: "58%",
                        height: "1px",
                        background: "rgba(175,203,255,0.4)",
                        borderRadius: "2px",
                      }}
                    />
                    <div
                      style={{
                        width: "36%",
                        height: "1px",
                        background: "rgba(247,232,164,0.65)",
                        borderRadius: "2px",
                        marginTop: "3px",
                      }}
                    />
                    <div
                      style={{
                        width: "28%",
                        height: "1px",
                        background: "rgba(247,232,164,0.45)",
                        borderRadius: "2px",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>

          {/* ── Opening envelope SVG ──────────────────────────────── */}
          {/*  overflow="visible" + style overflow:visible are both needed:
               - SVG attribute controls rendering
               - CSS property controls layout/clipping by the browser         */}
          <motion.svg
            width="300"
            height="218"
            viewBox="0 0 220 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            overflow="visible"
            initial={{ scale: 1, rotate: 0, y: 0 }}
            animate={{ scale: 1.15, rotate: -3, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              overflow: "visible",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 2,
              willChange: "transform",
            }}
          >
            <path
              d="M2,2 L218,2 L218,158 L2,158 Z"
              fill="#02084B"
              stroke="#1A3A8F"
              strokeWidth="1.5"
            />
            <path
              d="M8,8 L212,8 L212,152 L8,152 Z"
              fill="#0A1660"
              opacity="0.4"
            />
            <path d="M2 152 L110 90 L2 40" fill="#1A3A8F" opacity="0.5" />
            <path d="M218 152 L110 90 L218 40" fill="#1A3A8F" opacity="0.5" />
            {/* Flap — animates from closed (V-down) to open (V-up), path exits viewBox so overflow:visible is essential */}
            <motion.path
              d="M2 12 L110 88 L218 12"
              fill="#02084B"
              stroke="#1A3A8F"
              strokeWidth="1.5"
              initial={{ d: "M2 12 L110 88 L218 12" }}
              animate={{ d: "M2 12 L110 -30 L218 12" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            <circle
              cx="110"
              cy="90"
              r="18"
              fill="#D4AF37"
              stroke="#B8960C"
              strokeWidth="1.5"
            />
            <image
              href={logo}
              x="92"
              y="72"
              width="36"
              height="36"
              preserveAspectRatio="xMidYMid meet"
              style={{ pointerEvents: "none" }}
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
