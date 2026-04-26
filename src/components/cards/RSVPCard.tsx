import { useState, useRef } from "react";
import { useT } from "@/context/LanguageContext";
import { submitRsvp } from "@/services/rsvpService";
import {
  FocusInput,
  FocusTextarea,
  FocusSelect,
} from "@/components/FocusInput";
import { pickRandomColorIndex } from "@/config/cardColors";

interface FormData {
  name: string;
  attending: string;
  guests: string;
  message: string;
}

export default function RSVPCard() {
  const t = useT();
  const [form, setForm] = useState<FormData>({
    name: "",
    attending: "",
    guests: "1",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const assignedColorIndex = useRef<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await submitRsvp({
        name: form.name,
        attendance: form.attending as "yes" | "no",
        guests: Number(form.guests),
        message: form.message || undefined,
        isAnonymous,
        colorIndex: form.message.trim()
          ? (assignedColorIndex.current ?? undefined)
          : undefined,
      });
      setSubmitted(true);
      setIsAnonymous(false);
      assignedColorIndex.current = null;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-5xl mb-4">💌</div>
        <h3
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: "1.8rem",
            fontWeight: 500,
            color: "#2B2B2B",
          }}
        >
          {t.rsvp_thankYou(form.name)}
        </h3>
        <p
          className="mt-3 max-w-sm"
          style={{
            fontFamily: "Inter, sans-serif",
            color: "#6B7280",
            lineHeight: 1.7,
          }}
        >
          {form.attending === "yes" ? t.rsvp_confirmYes : t.rsvp_confirmNo}
        </p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: "0.875rem",
    color: "#2B2B2B",
    background: "rgba(255,255,255,0.8)",
    border: "1px solid rgba(175, 203, 255, 0.4)",
    borderRadius: "10px",
    padding: "10px 14px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontSize: "0.78rem",
    color: "#6B7280",
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
    display: "block",
    marginBottom: "6px",
  };

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
          {t.rsvp_subtitle}
        </p>
        <h2
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            fontWeight: 500,
            color: "#2B2B2B",
          }}
        >
          {t.rsvp_heading}
        </h2>
        <div
          className="mx-auto mt-3 w-12 h-0.5 rounded-full"
          style={{ background: "#AFCBFF" }}
        />
        <p
          className="mt-3 text-sm"
          style={{ fontFamily: "Inter, sans-serif", color: "#6B7280" }}
        >
          {t.rsvp_deadline}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto flex flex-col gap-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label style={labelStyle} htmlFor="rsvp-name">
              {t.rsvp_labelName}
            </label>
            <FocusInput
              id="rsvp-name"
              type="text"
              required
              placeholder={t.rsvp_placeholderName}
              style={inputStyle}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
        </div>

        {/* Attending */}
        <div>
          <label style={labelStyle}>{t.rsvp_labelAttending}</label>
          <div className="flex gap-3">
            {["yes", "no"].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setForm({ ...form, attending: val })}
                className="flex-1 py-2.5 rounded-xl font-medium text-sm transition-all"
                style={{
                  fontFamily: "Inter, sans-serif",
                  background:
                    form.attending === val
                      ? "#AFCBFF"
                      : "rgba(255,255,255,0.8)",
                  border: `1px solid ${form.attending === val ? "#AFCBFF" : "rgba(175, 203, 255, 0.4)"}`,
                  color: form.attending === val ? "#2B2B2B" : "#6B7280",
                  cursor: "pointer",
                }}
              >
                {val === "yes" ? t.rsvp_accept : t.rsvp_decline}
              </button>
            ))}
          </div>
        </div>

        {/* Guests */}
        {form.attending === "yes" && (
          <div>
            <label style={labelStyle} htmlFor="rsvp-guests">
              {t.rsvp_labelGuests}
            </label>
            <FocusSelect
              id="rsvp-guests"
              style={inputStyle}
              value={form.guests}
              onChange={(e) => setForm({ ...form, guests: e.target.value })}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? t.rsvp_guestSingular : t.rsvp_guestPlural}
                </option>
              ))}
            </FocusSelect>
          </div>
        )}

        {/* Message */}
        <div>
          <label style={labelStyle} htmlFor="rsvp-message">
            {t.rsvp_labelMessage}
          </label>
          <FocusTextarea
            id="rsvp-message"
            rows={3}
            placeholder={t.rsvp_placeholderMessage}
            style={{ ...inputStyle, resize: "none" }}
            value={form.message}
            onChange={(e) => {
              const val = e.target.value;
              // Assign a random color the first time user types a message
              if (val.trim() && assignedColorIndex.current === null) {
                assignedColorIndex.current = pickRandomColorIndex();
              } else if (!val.trim()) {
                assignedColorIndex.current = null;
              }
              setForm({ ...form, message: val });
            }}
          />
          {/* Anonymous toggle — only visible when message has content */}
          <div
            style={{
              overflow: "hidden",
              maxHeight: form.message.trim() ? "40px" : "0",
              opacity: form.message.trim() ? 1 : 0,
              transition: "max-height 0.25s ease, opacity 0.2s ease",
              marginTop: form.message.trim() ? "8px" : "0",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <span
                role="checkbox"
                aria-checked={isAnonymous}
                tabIndex={form.message.trim() ? 0 : -1}
                onClick={() => setIsAnonymous((v) => !v)}
                onKeyDown={(e) =>
                  (e.key === " " || e.key === "Enter") &&
                  setIsAnonymous((v) => !v)
                }
                style={{
                  width: "36px",
                  height: "20px",
                  borderRadius: "999px",
                  background: isAnonymous
                    ? "rgba(175, 203, 255, 0.75)"
                    : "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(175, 203, 255, 0.5)",
                  position: "relative",
                  flexShrink: 0,
                  transition: "background 0.2s",
                  display: "inline-block",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "2px",
                    left: isAnonymous ? "18px" : "2px",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: isAnonymous
                      ? "#fff"
                      : "rgba(175, 203, 255, 0.6)",
                    transition: "left 0.2s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                  }}
                />
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.78rem",
                  color: "#6B7280",
                }}
              >
                {t.rsvp_anonymous}
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={!form.name || !form.attending || loading}
          className="py-3 px-8 rounded-xl font-medium tracking-wide transition-all"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.9rem",
            background: "#AFCBFF",
            color: "#2B2B2B",
            border: "none",
            cursor:
              loading || !form.name || !form.attending
                ? "not-allowed"
                : "pointer",
            letterSpacing: "0.05em",
            opacity: !form.name || !form.attending || loading ? 0.5 : 1,
          }}
        >
          {loading ? "…" : t.rsvp_submit}
        </button>

        {error && (
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.8rem",
              color: "#E57373",
              textAlign: "center",
              marginTop: "4px",
            }}
          >
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
