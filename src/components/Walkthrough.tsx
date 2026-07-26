import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/context/LanguageContext";
import type { CardShape } from "@/config/cardLayout";
import { WALKTHROUGH_STEPS } from "../config/walkthrough";
import type { WalkthroughStep } from "../config/walkthrough";

const STEP_DURATION = 10000;

interface TooltipPos {
  x: number;
  top: number;
  above: boolean;
}

interface WalkthroughProps {
  /** Step index (0-based). Pass the same value as key to reset timer on change. */
  step: number;
  cardRef: HTMLDivElement | null;
  /** Shape of the spotlighted card — used to correct midX for diamond cards. */
  cardShape?: CardShape;
  onNext: () => void;
  onSkip: () => void;
}

export default function Walkthrough({
  step,
  cardRef,
  cardShape,
  onNext,
  onSkip,
}: WalkthroughProps) {
  const t = useT();
  const [progress, setProgress] = useState(0);
  const [tooltipPos, setTooltipPos] = useState<TooltipPos>({
    x: window.innerWidth / 2,
    top: window.innerHeight * 0.6,
    above: false,
  });
  const rafRef = useRef<number | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const currentStep = WALKTHROUGH_STEPS[step] as WalkthroughStep;
  const isLastStep = step === WALKTHROUGH_STEPS.length - 1;

  // ── Progress timer (resets on each remount via key={step}) ────────────────
  useEffect(() => {
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - start) / STEP_DURATION, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        onNext();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // onNext is stable (useCallback in parent) so it's safe here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Tooltip positioning ────────────────────────────────────────────────────
  useEffect(() => {
    if (!cardRef) return;

    const TOOLTIP_W = 210;
    // Initial estimate; will be corrected by a second pass once the element is rendered.
    const TOOLTIP_H_ESTIMATE = 175;

    const compute = (tooltipH: number) => {
      const rect = cardRef.getBoundingClientRect();
      const midX = rect.left + rect.width / 2;

      const halfW = TOOLTIP_W / 2;
      const clampedX = Math.max(
        halfW + 8,
        Math.min(midX, window.innerWidth - halfW - 8),
      );

      const spaceBelow = window.innerHeight - rect.bottom;
      const above = spaceBelow < tooltipH + 20;

      let top = above ? rect.top - tooltipH - 14 : rect.bottom + 14;

      top = Math.max(8, Math.min(top, window.innerHeight - tooltipH - 8));

      setTooltipPos({ x: clampedX, top, above });
    };

    const update = () => {
      // First pass: use estimate
      compute(TOOLTIP_H_ESTIMATE);
      // Second pass after render: use actual rendered height
      const frame = requestAnimationFrame(() => {
        const h = tooltipRef.current?.getBoundingClientRect().height;
        if (h && h > 0) compute(h);
      });
      return frame;
    };

    let rFrame = update();
    const onResize = () => {
      cancelAnimationFrame(rFrame);
      rFrame = update();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rFrame);
    };
  }, [cardRef, cardShape]);

  const circumference = 2 * Math.PI * 16; // r=16 → ~100.5
  const dashOffset = circumference * (1 - progress);

  const handleNext = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    onNext();
  };

  // Welcome step: no card ref means we render a centered panel instead of a tooltip
  const isWelcome = !cardRef;

  return (
    <AnimatePresence>
      <>
        {/* ── Dim overlay (pointer-events captures tap-to-skip) ── */}
        <motion.div
          key="wt-overlay"
          className="fixed inset-0"
          style={{ zIndex: 100, pointerEvents: "auto" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onSkip}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(8, 12, 28, 0.65)",
              backdropFilter: "blur(3px)",
            }}
          />
        </motion.div>

        {/* ── Step dot indicators ──────────────────────────────────── */}
        <motion.div
          key="wt-dots"
          style={{
            position: "fixed",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 120,
            display: "flex",
            gap: "7px",
            alignItems: "center",
            pointerEvents: "none",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {WALKTHROUGH_STEPS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === step ? "18px" : "6px",
                height: "6px",
                borderRadius: "999px",
                background: i === step ? "#AFCBFF" : "rgba(255,255,255,0.3)",
                transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          ))}
        </motion.div>

        {/* ── Welcome panel (no card ref) OR tooltip bubble ─────── */}
        {isWelcome ? (
          <motion.div
            key={`wt-welcome-${step}`}
            style={{
              position: "fixed",
              left: "calc(50% - 130px)",
              top: "50%",
              zIndex: 125,
              width: "260px",
              pointerEvents: "auto",
            }}
            initial={{ opacity: 0, y: "-40%", scale: 0.88 }}
            animate={{ opacity: 1, y: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: "-58%", scale: 0.92 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                background: "rgba(255,248,240,0.97)",
                backdropFilter: "blur(16px)",
                borderRadius: "20px",
                padding: "26px 22px 20px",
                border: "1px solid rgba(175,203,255,0.4)",
                boxShadow:
                  "0 12px 36px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.12)",
                textAlign: "center",
              }}
            >
              <motion.div
                style={{
                  fontSize: "2.2rem",
                  marginBottom: "12px",
                  display: "block",
                }}
                animate={{ scale: [1, 1.18, 1] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                💌
              </motion.div>
              <p
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#2B2B2B",
                  marginBottom: "8px",
                  lineHeight: 1.3,
                }}
              >
                {t[currentStep.titleKey] as string}
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.72rem",
                  color: "#6B7280",
                  lineHeight: 1.6,
                }}
              >
                {t[currentStep.hintKey] as string}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "18px",
                }}
              >
                <button
                  style={{
                    position: "relative",
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={handleNext}
                  aria-label={t.walkthrough_next as string}
                >
                  <svg
                    style={{
                      position: "absolute",
                      inset: 0,
                      transform: "rotate(-90deg)",
                    }}
                    viewBox="0 0 36 36"
                    width="42"
                    height="42"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="rgba(175,203,255,0.2)"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="#AFCBFF"
                      strokeWidth="2.5"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    style={{
                      position: "relative",
                      zIndex: 1,
                      fontSize: "0.9rem",
                      color: "#4B6CB7",
                      lineHeight: 1,
                    }}
                  >
                    →
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ── Tooltip bubble ─────────────────────────────────────── */
          <motion.div
            key={`wt-tooltip-${step}`}
            ref={tooltipRef}
            style={{
              position: "fixed",
              // Pre-subtract half the tooltip width so framer-motion's own
              // transform pipeline (y, scale) doesn't clobber a CSS translateX.
              left: tooltipPos.x - 105,
              top: tooltipPos.top,
              zIndex: 125,
              width: "210px",
              pointerEvents: "auto",
            }}
            initial={{
              opacity: 0,
              y: tooltipPos.above ? 10 : -10,
              scale: 0.88,
            }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Arrow pointing to card */}
            <div
              style={{
                position: "absolute",
                [tooltipPos.above ? "bottom" : "top"]: -7,
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "7px solid transparent",
                borderRight: "7px solid transparent",
                ...(tooltipPos.above
                  ? { borderTop: "7px solid rgba(210,200,190,0.95)" }
                  : { borderBottom: "7px solid rgba(210,200,190,0.95)" }),
              }}
            />

            {/* Card */}
            <div
              style={{
                background: "rgba(255,248,240,0.97)",
                backdropFilter: "blur(16px)",
                borderRadius: "16px",
                padding: "14px 16px 12px",
                border: "1px solid rgba(175,203,255,0.4)",
                boxShadow:
                  "0 12px 36px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.12)",
                textAlign: "center",
              }}
            >
              {/* Icon for drag step */}
              {currentStep.isDragStep && (
                <motion.div
                  style={{
                    fontSize: "1.4rem",
                    marginBottom: "6px",
                    display: "block",
                  }}
                  animate={{ rotate: [-8, 8, -8] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ✋
                </motion.div>
              )}

              <p
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  color: "#2B2B2B",
                  marginBottom: "5px",
                  lineHeight: 1.3,
                }}
              >
                {t[currentStep.titleKey] as string}
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.68rem",
                  color: "#6B7280",
                  lineHeight: 1.55,
                }}
              >
                {t[currentStep.hintKey] as string}
              </p>

              {/* Next/Done button with circular progress ring */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "12px",
                }}
              >
                <button
                  style={{
                    position: "relative",
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={handleNext}
                  aria-label={
                    isLastStep
                      ? (t.walkthrough_done as string)
                      : (t.walkthrough_next as string)
                  }
                >
                  {/* Progress ring */}
                  <svg
                    style={{
                      position: "absolute",
                      inset: 0,
                      transform: "rotate(-90deg)",
                    }}
                    viewBox="0 0 36 36"
                    width="42"
                    height="42"
                  >
                    {/* Track */}
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="rgba(175,203,255,0.2)"
                      strokeWidth="2.5"
                    />
                    {/* Progress */}
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="#AFCBFF"
                      strokeWidth="2.5"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Icon */}
                  <span
                    style={{
                      position: "relative",
                      zIndex: 1,
                      fontSize: "0.9rem",
                      color: "#4B6CB7",
                      lineHeight: 1,
                    }}
                  >
                    {isLastStep ? "✓" : "→"}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </>
    </AnimatePresence>
  );
}
