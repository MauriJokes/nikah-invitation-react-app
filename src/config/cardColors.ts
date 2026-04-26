export interface CardColor {
  bg: string;
  border: string;
}

// Ordered by hue: beige first → warm pinks → peach → gold → green → sky → blue → lavender
export const CARD_COLORS: CardColor[] = [
  { bg: "rgba(240, 220, 200, 0.22)", border: "rgba(210, 185, 160, 0.55)" }, // warm beige   ~30°
  { bg: "rgba(255, 200, 200, 0.22)", border: "rgba(255, 200, 200, 0.55)" }, // soft pink    ~0°
  { bg: "rgba(255, 220, 180, 0.22)", border: "rgba(255, 200, 140, 0.55)" }, // warm peach   ~30°
  { bg: "rgba(247, 232, 164, 0.22)", border: "rgba(247, 232, 164, 0.55)" }, // soft gold    ~50°
  { bg: "rgba(185, 230, 200, 0.22)", border: "rgba(185, 230, 200, 0.55)" }, // muted green  ~139°
  { bg: "rgba(200, 230, 240, 0.22)", border: "rgba(160, 210, 230, 0.55)" }, // sky mist     ~199°
  { bg: "rgba(175, 203, 255, 0.22)", border: "rgba(175, 203, 255, 0.55)" }, // pastel blue  ~218°
  { bg: "rgba(220, 200, 255, 0.22)", border: "rgba(220, 200, 255, 0.55)" }, // lavender     ~263°
];

// Solid swatch preview colors — same order as CARD_COLORS
export const SWATCH_COLORS: string[] = [
  "#F0DCC8", // warm beige   ~30°
  "#FFC8C8", // soft pink    ~0°
  "#FFDCB4", // warm peach   ~30°
  "#F7E8A4", // soft gold    ~50°
  "#B9E6C8", // muted green  ~139°
  "#C8E6F0", // sky mist     ~199°
  "#AFCBFF", // pastel blue  ~218°
  "#DCC8FF", // lavender     ~263°
];

export function pickRandomColorIndex(): number {
  return Math.floor(Math.random() * CARD_COLORS.length);
}

export function pickRandomColor(): CardColor {
  return CARD_COLORS[pickRandomColorIndex()];
}
