import { forwardRef, useRef } from "react";
import { motion } from "framer-motion";
import type { CardConfig, CardId, CardShape } from "@/config/cardLayout";
import { useT } from "@/context/LanguageContext";
import type { Translations } from "@/i18n/translations";

const LABEL_KEYS: Record<CardId, keyof Translations> = {
  hero: "cardLabel_hero",
  story: "cardLabel_story",
  details: "cardLabel_details",
  greeting: "cardLabel_greeting",
  rsvp: "cardLabel_rsvp",
};

const PREVIEW_KEYS: Partial<Record<CardId, keyof Translations>> = {
  hero: "cardLabel_hero_preview",
  details: "cardLabel_details_preview",
};

// ─── Shape-specific outer container styles ────────────────────────────────────
function getShapeStyles(
  shape: CardShape,
  width: string,
  isActive: boolean,
): React.CSSProperties {
  const activeShadow =
    "0 12px 40px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.08)";
  const idleShadow = "0 6px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.05)";

  switch (shape) {
    case "arch":
      return {
        width,
        minHeight: "330px",
        position: "relative",
        overflow: "hidden",
        borderTopLeftRadius: "50% 160px",
        borderTopRightRadius: "50% 160px",
        borderBottomLeftRadius: "20px",
        borderBottomRightRadius: "20px",
        background: "#02084B",
        border: isActive
          ? "1.5px solid rgba(212,175,55,0.85)"
          : "1.5px solid rgba(212,175,55,0.35)",
        boxShadow: isActive
          ? "0 18px 55px rgba(2,8,75,0.4), 0 6px 18px rgba(0,0,0,0.15), 0 0 0 2px rgba(212,175,55,0.15)"
          : "0 10px 36px rgba(2,8,75,0.28), 0 4px 10px rgba(0,0,0,0.1)",
      };

    // Rounded square rotated 45°—diamond shape
    case "diamond":
      return {
        width,
        height: width,
        position: "relative",
        overflow: "hidden",
        borderRadius: "22px",
        transform: "rotate(45deg)",
        background: "#FFF8F0",
        border: isActive
          ? "1.5px solid rgba(175,203,255,0.75)"
          : "1px solid rgba(175,203,255,0.35)",
        boxShadow: isActive
          ? "0 14px 44px rgba(2,8,75,0.18), 0 4px 14px rgba(0,0,0,0.1)"
          : "0 8px 28px rgba(2,8,75,0.1), 0 2px 8px rgba(0,0,0,0.07)",
      };

    // Tall vertical ticket — portrait 5:8 ratio with notched sides
    case "ticket":
      return {
        width,
        minHeight: "260px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "14px",
        background: "linear-gradient(170deg, #FFFDF8 0%, #F5F0E8 100%)",
        border: isActive
          ? "1.5px solid rgba(212,175,55,0.6)"
          : "1px solid rgba(212,175,55,0.25)",
        boxShadow: isActive ? activeShadow : idleShadow,
      };

    // Circle with glow
    case "circle":
      return {
        width,
        height: width,
        position: "relative",
        overflow: "hidden",
        borderRadius: "50%",
        // willChange:transform creates an isolated stacking context which fixes
        // an iOS/Safari bug where overflow:hidden + border-radius on a child
        // prevents pointer events from reaching the parent drag handler
        willChange: "transform",
        background: "linear-gradient(135deg, #FFF8F0 0%, #EEF0FF 100%)",
        border: isActive
          ? "1.5px solid rgba(175,203,255,0.75)"
          : "1px solid rgba(175,203,255,0.4)",
        boxShadow: isActive
          ? `0 0 0 6px rgba(175,203,255,0.12), ${activeShadow}`
          : `0 0 0 4px rgba(175,203,255,0.08), ${idleShadow}`,
      };

    // Pill / capsule
    case "capsule":
      return {
        width,
        position: "relative",
        overflow: "hidden",
        borderRadius: "999px",
        background: "#FDFAF5",
        border: isActive
          ? "1.5px solid rgba(175,203,255,0.7)"
          : "1px solid rgba(175,203,255,0.3)",
        boxShadow: isActive ? activeShadow : idleShadow,
      };

    default:
      return {
        width,
        position: "relative",
        overflow: "hidden",
        borderRadius: "16px",
        background: "#FFF8F0",
        border: isActive
          ? "1.5px solid rgba(175,203,255,0.65)"
          : "1px solid rgba(255,255,255,0.8)",
        boxShadow: isActive ? activeShadow : idleShadow,
      };
  }
}

// ─── Corner fold ──────────────────────────────────────────────────────────────
function CornerFold() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "22px",
        height: "22px",
        background: "linear-gradient(225deg, #EDE7DC 45%, transparent 45%)",
        opacity: 0.75,
        pointerEvents: "none",
      }}
    />
  );
}

// ─── Arch / hero card content ─────────────────────────────────────────────────
function ArchContent({
  icon,
  label,
  hint,
  preview,
}: {
  icon: string;
  label: string;
  hint: string;
  preview: string;
}) {
  return (
    <div
      style={{
        height: "100%",
        minHeight: "330px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        paddingTop: "76px",
        paddingBottom: "28px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      {/* Gold top ornament circle */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "18px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          border: "1.5px solid rgba(212,175,55,0.55)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(212,175,55,0.08)",
        }}
      >
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          style={{ width: "22px", height: "22px", objectFit: "contain" }}
        />
      </div>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1px",
          height: "18px",
          background:
            "linear-gradient(to bottom, rgba(212,175,55,0.5), transparent)",
        }}
      />
      <p
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: "1.15rem",
          fontWeight: 600,
          color: "#F0E8CC",
          letterSpacing: "0.03em",
          lineHeight: 1.3,
          marginBottom: "10px",
        }}
      >
        {label}
      </p>
      <div
        aria-hidden="true"
        style={{
          width: "44px",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, #D4AF37, transparent)",
          marginBottom: "10px",
        }}
      />
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.58rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(175,203,255,0.65)",
          marginBottom: "auto",
        }}
      >
        {preview}
      </p>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.62rem",
          color: "rgba(212,175,55,0.65)",
          letterSpacing: "0.06em",
          marginTop: "16px",
        }}
      >
        {hint}
      </p>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: "20%",
          right: "20%",
          height: "2px",
          borderRadius: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(212,175,55,0.6), transparent)",
        }}
      />
    </div>
  );
}

// ─── Diamond (RSVP) card content — counter-rotate to keep text upright ────────
function DiamondContent({
  icon,
  label,
  hint,
}: {
  icon: string;
  label: string;
  hint: string;
}) {
  return (
    // Counter-rotate -45deg so content is upright inside the rotated container
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: "rotate(-45deg)",
        padding: "12px",
        gap: "4px",
        textAlign: "center",
      }}
    >
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        style={{ width: "26px", height: "26px", objectFit: "contain" }}
      />
      <p
        style={{
          fontFamily: '"Playfair Display", serif',
          color: "#2B2B2B",
          fontSize: "0.85rem",
          fontWeight: 600,
          lineHeight: 1.2,
        }}
      >
        {label}
      </p>
      <div
        aria-hidden="true"
        style={{
          width: "20px",
          height: "1.5px",
          borderRadius: "1px",
          background: "rgba(175,203,255,0.8)",
          margin: "2px 0",
        }}
      />
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.6rem",
          color: "#9CA3AF",
          letterSpacing: "0.04em",
        }}
      >
        {hint}
      </p>
    </div>
  );
}

// ─── Ticket (Event Details) card content ─────────────────────────────────────
function TicketContent({
  icon,
  label,
  hint,
  preview,
}: {
  icon: string;
  label: string;
  hint: string;
  preview: string;
}) {
  return (
    <>
      <CornerFold />
      {/* Top section */}
      <div
        style={{
          padding: "18px 16px 14px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          style={{ width: "26px", height: "26px", objectFit: "contain" }}
        />
        <p
          style={{
            fontFamily: '"Playfair Display", serif',
            color: "#2B2B2B",
            fontSize: "0.92rem",
            fontWeight: 500,
            lineHeight: 1.25,
          }}
        >
          {label}
        </p>
        <div
          aria-hidden="true"
          style={{
            width: "24px",
            height: "1.5px",
            borderRadius: "1px",
            background: "#D4AF37",
            opacity: 0.7,
          }}
        />
      </div>

      {/* Perforation line */}
      <div
        aria-hidden="true"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 10px",
          position: "relative",
          height: "16px",
        }}
      >
        {/* Left notch */}
        <div
          style={{
            position: "absolute",
            left: "-8px",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "rgba(244,248,251,0.9)",
            border: "1px solid rgba(212,175,55,0.25)",
          }}
        />
        {/* Dashed line */}
        <div
          style={{
            flex: 1,
            height: "1px",
            background:
              "repeating-linear-gradient(to right, rgba(212,175,55,0.4) 0px, rgba(212,175,55,0.4) 5px, transparent 5px, transparent 9px)",
          }}
        />
        {/* Right notch */}
        <div
          style={{
            position: "absolute",
            right: "-8px",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            background: "rgba(244,248,251,0.9)",
            border: "1px solid rgba(212,175,55,0.25)",
          }}
        />
      </div>

      {/* Bottom stub */}
      <div
        style={{
          padding: "12px 16px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.58rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#9CA3AF",
          }}
        >
          {preview}
        </p>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.68rem",
            color: "#6B7280",
            letterSpacing: "0.04em",
          }}
        >
          {hint}
        </p>
      </div>
    </>
  );
}

// ─── Circle (Our Story) card content — with inner ring & glow ────────────────
function CircleContent({
  icon,
  label,
  hint,
}: {
  icon: string;
  label: string;
  hint: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        gap: "5px",
        position: "relative",
      }}
    >
      {/* Inner ring */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "10px",
          borderRadius: "50%",
          border: "1px solid rgba(175,203,255,0.25)",
          pointerEvents: "none",
        }}
      />
      {/* Soft glow overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 35%, rgba(255,248,240,0.6) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        style={{
          width: "30px",
          height: "30px",
          objectFit: "contain",
          position: "relative",
        }}
      />
      <p
        style={{
          fontFamily: '"Playfair Display", serif',
          color: "#2B2B2B",
          fontSize: "0.82rem",
          fontWeight: 500,
          textAlign: "center",
          lineHeight: 1.3,
          position: "relative",
        }}
      >
        {label}
      </p>
      <div
        aria-hidden="true"
        style={{
          width: "22px",
          height: "1.5px",
          borderRadius: "1px",
          background: "rgba(175,203,255,0.7)",
          position: "relative",
        }}
      />
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.50rem",
          color: "#6B7280",
          letterSpacing: "0.04em",
        }}
      >
        {hint}
      </p>
    </div>
  );
}

// ─── Capsule (Greetings) card content ────────────────────────────────────────
function CapsuleContent({
  icon,
  label,
  hint,
}: {
  icon: string;
  label: string;
  hint: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "14px 20px",
      }}
    >
      <img
        src={icon}
        alt=""
        aria-hidden="true"
        style={{
          width: "22px",
          height: "22px",
          objectFit: "contain",
          flexShrink: 0,
        }}
      />
      <div>
        <p
          style={{
            fontFamily: '"Playfair Display", serif',
            color: "#2B2B2B",
            fontSize: "0.85rem",
            fontWeight: 500,
            lineHeight: 1.2,
          }}
        >
          {label}
        </p>
        <div
          aria-hidden="true"
          style={{
            marginTop: "4px",
            width: "18px",
            height: "1.5px",
            borderRadius: "1px",
            background: "rgba(175,203,255,0.7)",
          }}
        />
        <p
          style={{
            marginTop: "4px",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.50rem",
            color: "#6B7280",
            letterSpacing: "0.04em",
          }}
        >
          {hint}
        </p>
      </div>
    </div>
  );
}

// ─── Main Card component ──────────────────────────────────────────────────────
interface CardProps {
  config: CardConfig;
  index: number;
  isActive: boolean;
  onClick: (id: CardId) => void;
  onDragStart: (id: CardId) => void;
  onDragEnd: () => void;
  isMobile: boolean;
}

export default forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    config,
    index,
    isActive,
    onClick,
    onDragStart: notifyDragStart,
    onDragEnd: notifyDragEnd,
    isMobile,
  },
  ref,
) {
  const { id, icon, rotation, width, shape, mobileOverlapY } = config;
  const t = useT();
  const label = t[LABEL_KEYS[id]] as string;
  const previewKey = PREVIEW_KEYS[id];
  const preview = previewKey ? (t[previewKey] as string) : "";
  const hint = t.cardClickHint as string;

  // Diamond cards need extra wrapper space to avoid clipping during rotate
  const isDiamond = shape === "diamond";
  const isCircle = shape === "circle";
  const overlapTranslateY = isMobile && mobileOverlapY ? mobileOverlapY : 0;

  // Track drag distance to prevent accidental open during drag
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);
  const wasDragged = useRef(false);

  return (
    <motion.div
      ref={ref}
      key={id}
      className="cursor-pointer"
      style={{
        // Diamond: extra space so rotated corners aren't clipped
        // Circle: explicit height so drag hitbox matches the visual circle
        width: isDiamond ? `calc(${width} * 1.42)` : width,
        height: isDiamond
          ? `calc(${width} * 1.42)`
          : isCircle
            ? width
            : undefined,
        transformOrigin: "center center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "auto",
      }}
      initial={{
        opacity: 0,
        scale: 0.65,
        rotate: rotation + (Math.random() > 0.5 ? 12 : -12),
        y: 60 - overlapTranslateY,
      }}
      animate={{
        opacity: 1,
        scale: isActive ? 1.03 : 1,
        rotate: rotation,
        y: overlapTranslateY,
      }}
      exit={{ opacity: 0, scale: 0.7, y: 30 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 22,
        delay: 0.08 * index,
      }}
      // Desktop: hover lifts card. Mobile: disabled — iOS fires a synthetic
      // mouseover ~300ms after touchend (hover ghost) which would stick the
      // card in a scaled-up state with no mouseleave to recover it.
      whileHover={
        isMobile
          ? undefined
          : {
              scale: 1.06,
              rotate: rotation * 0.3,
              y: overlapTranslateY - 8,
              transition: { type: "spring", stiffness: 380, damping: 18 },
            }
      }
      // Mobile press feedback replaces hover
      whileTap={isMobile ? { scale: 0.96 } : undefined}
      drag={true}
      dragMomentum={false}
      dragElastic={0.08}
      whileDrag={{ scale: 1.08, cursor: "grabbing" }}
      onDragStart={(_e, info) => {
        dragStartPos.current = { x: info.point.x, y: info.point.y };
        wasDragged.current = false;
        notifyDragStart(id);
      }}
      onDrag={(_e, info) => {
        if (dragStartPos.current) {
          const dx = info.point.x - dragStartPos.current.x;
          const dy = info.point.y - dragStartPos.current.y;
          if (Math.sqrt(dx * dx + dy * dy) > 6) wasDragged.current = true;
        }
      }}
      onDragEnd={() => {
        notifyDragEnd();
        requestAnimationFrame(() => {
          wasDragged.current = false;
        });
      }}
      onTap={() => {
        if (!wasDragged.current) onClick(id);
      }}
    >
      <div style={getShapeStyles(shape, width, isActive)}>
        {shape === "arch" && (
          <ArchContent
            icon={icon}
            label={label}
            hint={hint}
            preview={preview}
          />
        )}
        {shape === "diamond" && (
          <DiamondContent icon={icon} label={label} hint={hint} />
        )}
        {shape === "ticket" && (
          <TicketContent
            icon={icon}
            label={label}
            hint={hint}
            preview={preview}
          />
        )}
        {shape === "circle" && (
          <CircleContent icon={icon} label={label} hint={hint} />
        )}
        {shape === "capsule" && (
          <CapsuleContent icon={icon} label={label} hint={hint} />
        )}
      </div>
    </motion.div>
  );
});
