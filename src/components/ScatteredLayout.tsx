import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CARD_LAYOUT } from "@/config/cardLayout";
import type { CardId } from "@/config/cardLayout";
import Card from "./Card";
import ExpandedCard from "./ExpandedCard";
import Walkthrough from "./Walkthrough";
import {
  WALKTHROUGH_STEPS,
  WALKTHROUGH_STORAGE_KEY,
} from "../config/walkthrough";

interface ScatteredLayoutProps {
  visible: boolean;
  showWalkthrough: boolean;
  onWalkthroughDone: () => void;
}

export default function ScatteredLayout({
  visible,
  showWalkthrough,
  onWalkthroughDone,
}: ScatteredLayoutProps) {
  const [expandedCard, setExpandedCard] = useState<CardId | null>(null);
  const [focusedId, setFocusedId] = useState<CardId | null>(null);
  const [draggingId, setDraggingId] = useState<CardId | null>(null);

  // ── Walkthrough ────────────────────────────────────────────────────────────
  const [walkthroughStep, setWalkthroughStep] = useState(-1);
  const cardDivRefs = useRef<Partial<Record<CardId, HTMLDivElement | null>>>(
    {},
  );

  useEffect(() => {
    if (showWalkthrough) setWalkthroughStep(0);
  }, [showWalkthrough]);

  const handleWalkthroughNext = useCallback(() => {
    if (walkthroughStep >= WALKTHROUGH_STEPS.length - 1) {
      localStorage.setItem(WALKTHROUGH_STORAGE_KEY, "1");
      setWalkthroughStep(-1);
      onWalkthroughDone();
    } else {
      setWalkthroughStep(walkthroughStep + 1);
    }
  }, [walkthroughStep, onWalkthroughDone]);

  const handleWalkthroughSkip = useCallback(() => {
    localStorage.setItem(WALKTHROUGH_STORAGE_KEY, "1");
    onWalkthroughDone();
    setWalkthroughStep(-1);
  }, [onWalkthroughDone]);
  // Tracks drag order — each drag increments a counter so the last-dragged
  // card always sits above cards dragged earlier (bring-to-front on touch)
  const [dragRank, setDragRank] = useState<Partial<Record<CardId, number>>>({});
  const dragCounter = useRef(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  // Responsive detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax — desktop only
  useEffect(() => {
    if (isMobile) return;
    const handle = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMouse({ x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [isMobile]);

  const handleCardClick = (id: CardId) => {
    setFocusedId(id);
    setExpandedCard(id);
  };

  const handleClose = () => {
    setExpandedCard(null);
    setFocusedId(null);
  };

  // Z-index priority: focused/dragging (999) > recently dragged (50+rank) > base
  // During walkthrough, the spotlight card is raised to 110 (above the overlay at 100).
  const walkthroughCardId =
    walkthroughStep >= 0
      ? (WALKTHROUGH_STEPS[walkthroughStep]?.cardId ?? null)
      : null;
  const walkthroughIsDragStep =
    walkthroughStep >= 0 && !!WALKTHROUGH_STEPS[walkthroughStep]?.isDragStep;

  const getZIndex = (id: CardId, baseZ: number) => {
    if (focusedId === id || draggingId === id) return 999;
    // Lift spotlighted card above the walkthrough overlay (z:100)
    if (walkthroughCardId === id) return 110;
    const rank = dragRank[id];
    if (rank !== undefined) return 50 + rank;
    return baseZ;
  };

  return (
    <>
      <div className="fixed inset-0" style={{ zIndex: 10 }}>
        <AnimatePresence>
          {visible &&
            CARD_LAYOUT.map((config, i) => {
              const x = isMobile ? config.mobileX : config.x;
              const y = isMobile ? config.mobileY : config.y;
              const w = isMobile ? config.mobileWidth : config.width;
              const rot = isMobile ? config.mobileRotation : config.rotation;

              // Parallax offset — skip on mobile, skip if dragging
              const parallaxX = isMobile ? 0 : mouse.x * (config.zIndex * 1.2);
              const parallaxY = isMobile ? 0 : mouse.y * (config.zIndex * 0.8);

              const isSpotlight = walkthroughCardId === config.id;
              const isJiggle = isSpotlight && walkthroughIsDragStep;

              // Spotlight glow: use filter:drop-shadow so it traces the actual
              // rendered pixels of each card (including the diamond's rotate(45deg)).
              // No extra DOM elements needed — framer-motion animates the filter string.
              const GLOW_ON =
                "drop-shadow(0 0 8px rgba(175,203,255,0.9)) drop-shadow(0 0 22px rgba(175,203,255,0.6))";
              const GLOW_DIM =
                "drop-shadow(0 0 3px rgba(175,203,255,0.35)) drop-shadow(0 0 8px rgba(175,203,255,0.2))";

              return (
                <motion.div
                  key={config.id}
                  style={{
                    position: "absolute",
                    left: `${x}%`,
                    top: `${y}%`,
                    zIndex: getZIndex(config.id, config.zIndex),
                    x: parallaxX,
                    y: parallaxY,
                    width: w,
                  }}
                  animate={
                    isJiggle
                      ? {
                          rotate: [0, -3, 3, -2.5, 2.5, -1.5, 1.5, 0],
                          x: [
                            parallaxX,
                            parallaxX - 5,
                            parallaxX + 5,
                            parallaxX - 4,
                            parallaxX + 4,
                            parallaxX,
                          ],
                          // Keep glow visible during jiggle
                          filter: GLOW_ON,
                        }
                      : isSpotlight
                        ? { filter: [GLOW_ON, GLOW_DIM, GLOW_ON] }
                        : // Use a transparent drop-shadow so framer-motion can interpolate
                          // the filter value ("none" has no matching structure to tween from)
                          { filter: "drop-shadow(0 0 0px rgba(175,203,255,0))" }
                  }
                  transition={
                    isJiggle
                      ? {
                          duration: 0.75,
                          repeat: Infinity,
                          repeatDelay: 1.6,
                          ease: "easeInOut",
                        }
                      : isSpotlight
                        ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                        : // Spring for x/y parallax; short fade for filter
                          {
                            filter: { duration: 0.5, ease: "easeOut" },
                            default: {
                              type: "spring",
                              stiffness: 90,
                              damping: 28,
                            },
                          }
                  }
                >
                  <Card
                    ref={(el) => {
                      cardDivRefs.current[config.id] = el;
                    }}
                    config={{ ...config, rotation: rot, width: w }}
                    index={i}
                    isActive={focusedId === config.id}
                    onClick={handleCardClick}
                    onDragStart={(id) => {
                      dragCounter.current += 1;
                      setDragRank((prev) => ({
                        ...prev,
                        [id]: dragCounter.current,
                      }));
                      setDraggingId(id);
                    }}
                    onDragEnd={() => setDraggingId(null)}
                    isMobile={isMobile}
                  />
                </motion.div>
              );
            })}
        </AnimatePresence>

        {/* Walkthrough lives INSIDE this stacking context (zIndex:10) so the
            overlay (local z:100) dims cards (local z:5-11) but not the
            spotlight card (local z:110). Lang/music toggles at global z:300
            are unaffected since they're outside this container entirely. */}
        {walkthroughStep >= 0 &&
          (() => {
            const stepCardId = WALKTHROUGH_STEPS[walkthroughStep]?.cardId;
            const stepShape = stepCardId
              ? CARD_LAYOUT.find((c) => c.id === stepCardId)?.shape
              : undefined;
            return (
              <Walkthrough
                key={walkthroughStep}
                step={walkthroughStep}
                cardRef={
                  stepCardId ? (cardDivRefs.current[stepCardId] ?? null) : null
                }
                cardShape={stepShape}
                onNext={handleWalkthroughNext}
                onSkip={handleWalkthroughSkip}
              />
            );
          })()}
      </div>

      <ExpandedCard cardId={expandedCard} onClose={handleClose} />
    </>
  );
}
