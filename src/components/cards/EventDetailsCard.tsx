import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useT } from "@/context/LanguageContext";
import { useLang } from "@/context/LanguageContext";

// ─── Countdown hook ───────────────────────────────────────────────────────────
function useCountdown(isoDate: string) {
  const target = new Date(isoDate).getTime();

  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return null;
    const totalSeconds = Math.floor(diff / 1000);
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [isoDate]);

  return time;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// ─── Single unit box ─────────────────────────────────────────────────────────
function CountUnit({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
        padding: "10px 4px 8px",
        borderRadius: "10px",
        background: "rgba(255,255,255,0.72)",
        border: "1px solid rgba(175,203,255,0.3)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        minWidth: 0,
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: "clamp(1.3rem, 4vw, 1.9rem)",
            fontWeight: 600,
            color: "#2B2B2B",
            lineHeight: 1,
          }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.58rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#9CA3AF",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── ICS helpers ─────────────────────────────────────────────────────────────
function generateICS(ev: {
  title: string;
  isoDate: string;
  venue: string;
  address: string;
}): string {
  const dt = new Date(ev.isoDate);
  const start = dt.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const end =
    new Date(dt.getTime() + 3 * 60 * 60 * 1000)
      .toISOString()
      .replace(/[-:]/g, "")
      .split(".")[0] + "Z";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    `SUMMARY:${ev.title}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `LOCATION:${ev.venue}, ${ev.address}`,
    `DESCRIPTION:${ev.title}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadICS(ev: {
  title: string;
  isoDate: string;
  venue: string;
  address: string;
}) {
  const blob = new Blob([generateICS(ev)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${ev.title.replace(/\s+/g, "-")}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─── Mini Calendar ────────────────────────────────────────────────────────────
const DAY_ABBR = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function MiniCalendar({ isoDate }: { isoDate: string }) {
  const { lang } = useLang();
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const eventDay = date.getDate();

  const monthName = date.toLocaleString(lang === "ms" ? "ms-MY" : "en-US", {
    month: "long",
    year: "numeric",
  });

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.5)",
        border: "1px solid rgba(175,203,255,0.25)",
        borderRadius: "14px",
        padding: "14px 12px 10px",
      }}
    >
      {/* Month / year header */}
      <p
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: "0.82rem",
          fontWeight: 500,
          color: "#2B2B2B",
          textAlign: "center",
          marginBottom: "10px",
          letterSpacing: "0.03em",
        }}
      >
        {monthName}
      </p>

      {/* Day-of-week headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "2px",
          marginBottom: "4px",
        }}
      >
        {DAY_ABBR.map((d) => (
          <div
            key={d}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.08em",
              color: "#9CA3AF",
              textAlign: "center",
              textTransform: "uppercase",
              padding: "2px 0",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "2px",
        }}
      >
        {cells.map((cell, idx) => {
          const isEvent = cell === eventDay;
          return (
            <div
              key={idx}
              style={{
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: isEvent ? "rgba(175,203,255,0.85)" : "transparent",
                boxShadow: isEvent ? "0 0 0 2px rgba(175,203,255,0.4)" : "none",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.68rem",
                fontWeight: isEvent ? 700 : 400,
                color: isEvent ? "#1A2B5C" : cell ? "#4B5563" : "transparent",
                transition: "background 0.15s",
              }}
            >
              {cell ?? "·"}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Event timeline ───────────────────────────────────────────────────────────
const DOT_COLORS = [
  "#AFCBFF", // pastel blue
  "#F7E8A4", // soft gold
  "#AFCBFF",
  "#AFCBFF",
  "#F7E8A4",
  "#AFCBFF",
  "#AFCBFF",
  "#AFCBFF",
  "#F7E8A4",
];

function EventTimeline({
  items,
  heading,
}: {
  items: readonly string[];
  heading: string;
}) {
  return (
    <div className="mt-6">
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="flex-1 h-px"
          style={{
            background:
              "linear-gradient(to right, rgba(175,203,255,0.5), transparent)",
          }}
        />
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#9CA3AF",
            whiteSpace: "nowrap",
          }}
        >
          {heading}
        </p>
        <div
          className="flex-1 h-px"
          style={{
            background:
              "linear-gradient(to left, rgba(175,203,255,0.5), transparent)",
          }}
        />
      </div>

      {/* Timeline */}
      <div className="relative pl-6">
        {/* Vertical line */}
        <div
          className="absolute left-[9px] top-2 bottom-2"
          style={{
            width: "1px",
            background:
              "linear-gradient(to bottom, #AFCBFF 0%, rgba(175,203,255,0.15) 100%)",
          }}
        />

        {items.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 * i }}
            className="relative flex items-start gap-3 group"
            style={{ marginBottom: i < items.length - 1 ? "18px" : 0 }}
          >
            {/* Dot */}
            <div
              className="absolute -left-6 mt-[5px] flex items-center justify-center"
              style={{ width: "18px", height: "18px" }}
            >
              <div
                style={{
                  width: i === 0 ? "10px" : "7px",
                  height: i === 0 ? "10px" : "7px",
                  borderRadius: "50%",
                  background: DOT_COLORS[i % DOT_COLORS.length],
                  boxShadow:
                    i === 0 ? `0 0 0 3px rgba(175,203,255,0.25)` : "none",
                  transition: "transform 0.2s",
                }}
              />
            </div>

            {/* Label */}
            <p
              style={{
                fontFamily:
                  i === 0 ? '"Playfair Display", serif' : "Inter, sans-serif",
                fontSize: i === 0 ? "0.88rem" : "0.8rem",
                fontWeight: i === 0 ? 500 : 400,
                color: i === 0 ? "#2B2B2B" : "#4B5563",
                lineHeight: 1.45,
              }}
            >
              {item}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Flip countdown ───────────────────────────────────────────────────────────
function FlipCountdown({ isoDate }: { isoDate: string }) {
  const t = useT();
  const time = useCountdown(isoDate);
  const units = t.details_units;

  if (!time) {
    return (
      <p
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: "1rem",
          fontStyle: "italic",
          color: "#AFCBFF",
          textAlign: "center",
          padding: "8px 0",
        }}
      >
        {t.details_expired}
      </p>
    );
  }

  return (
    <div>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#9CA3AF",
          textAlign: "center",
          marginBottom: "10px",
        }}
      >
        {t.details_countdownLabel}
      </p>
      <div style={{ display: "flex", gap: "6px" }}>
        <CountUnit value={pad(time.days)} label={units.days} />
        <CountUnit value={pad(time.hours)} label={units.hours} />
        <CountUnit value={pad(time.minutes)} label={units.minutes} />
        <CountUnit value={pad(time.seconds)} label={units.seconds} />
      </div>
    </div>
  );
}

// ─── Main card ────────────────────────────────────────────────────────────────
export default function EventDetailsCard() {
  const t = useT();
  const events = t.details_events;
  return (
    <div className="py-6 px-2">
      <div className="text-center mb-8">
        <p
          className="text-xs tracking-widest uppercase mb-2"
          style={{
            fontFamily: "Inter, sans-serif",
            color: "#6B7280",
            letterSpacing: "0.2em",
          }}
        >
          {t.details_subtitle}
        </p>
        <h2
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 500,
            color: "#2B2B2B",
          }}
        >
          {t.details_heading}
        </h2>
        <div
          className="mx-auto mt-3 w-12 h-0.5 rounded-full"
          style={{ background: "#AFCBFF" }}
        />
      </div>

      <div className="flex flex-col gap-6 max-w-lg mx-auto">
        {events.map((event) => (
          <div
            key={event.title}
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{
              background: "rgba(175, 203, 255, 0.12)",
              border: "1px solid rgba(175, 203, 255, 0.3)",
            }}
          >
            {/* Corner accent */}
            <div
              className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
              style={{
                background: "linear-gradient(to bottom, #AFCBFF, #F7E8A4)",
              }}
            />

            <div className="pl-3">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{event.icon}</span>
                <h3
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#2B2B2B",
                  }}
                >
                  {event.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-start gap-3">
                  <span className="text-sm mt-0.5">📅</span>
                  <div>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.875rem",
                        color: "#2B2B2B",
                        fontWeight: 500,
                      }}
                    >
                      {event.date}
                    </p>
                    {/* <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.8rem",
                        color: "#6B7280",
                      }}
                    >
                      {event.time}
                    </p> */}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-sm mt-0.5">📍</span>
                  <div>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.875rem",
                        color: "#2B2B2B",
                        fontWeight: 500,
                      }}
                    >
                      {event.venue}
                    </p>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.8rem",
                        color: "#6B7280",
                      }}
                    >
                      {event.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mini calendar + Add to Calendar */}
              <div className="mt-5">
                <MiniCalendar isoDate={event.isoDate} />
                <button
                  onClick={() =>
                    downloadICS({
                      title: event.title_ics,
                      isoDate: event.isoDate,
                      venue: event.venue,
                      address: event.address,
                    })
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    width: "100%",
                    marginTop: "10px",
                    padding: "9px 16px",
                    borderRadius: "10px",
                    background: "rgba(247,232,164,0.18)",
                    border: "1px solid rgba(212,175,55,0.35)",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    color: "#7A6010",
                    transition: "background 0.18s, border-color 0.18s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(247,232,164,0.35)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "rgba(212,175,55,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(247,232,164,0.18)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "rgba(212,175,55,0.35)";
                  }}
                >
                  <span style={{ fontSize: "0.9rem" }}>📅</span>
                  Add to Calendar
                </button>
              </div>

              {/* Flip countdown */}
              <div
                className="mt-5 py-4 px-3 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.5)",
                  border: "1px solid rgba(175,203,255,0.25)",
                }}
              >
                <FlipCountdown isoDate={event.isoDate} />
              </div>

              {event.schedule && event.schedule.length > 0 && (
                <EventTimeline
                  items={event.schedule}
                  heading={t.details_scheduleHeading}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Dress Code section ──────────────────────────────────────── */}
      <div className="mt-10 max-w-lg mx-auto">
        {/* Section heading */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(to right, rgba(175,203,255,0.4), transparent)",
            }}
          />
          <div className="text-center">
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#9CA3AF",
              }}
            >
              {t.dresscode_subtitle}
            </p>
            <p
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: "1rem",
                fontWeight: 500,
                color: "#2B2B2B",
                marginTop: "2px",
              }}
            >
              {t.dresscode_heading}
            </p>
          </div>
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(to left, rgba(175,203,255,0.4), transparent)",
            }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.dresscode_items.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-4"
              style={{
                background: "rgba(255,248,240,0.7)",
                border: "1px solid rgba(175,203,255,0.2)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{item.emoji}</span>
                <div>
                  <p
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#2B2B2B",
                    }}
                  >
                    {item.event}
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.72rem",
                      color: "#6B7280",
                    }}
                  >
                    {item.for}
                  </p>
                </div>
              </div>

              {/* Colour swatches */}
              <div className="flex gap-1.5 mb-3">
                {item.palette.map((color) => (
                  <div
                    key={color}
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      backgroundColor: color,
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                    title={color}
                  />
                ))}
              </div>

              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.82rem",
                  color: "#2B2B2B",
                  lineHeight: 1.5,
                }}
              >
                {item.suggestion}
              </p>
              {item.avoid && (
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.72rem",
                    color: "#9CA3AF",
                    fontStyle: "italic",
                    marginTop: "6px",
                  }}
                >
                  {item.avoid}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
