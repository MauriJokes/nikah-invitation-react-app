export type CardId = "hero" | "story" | "details" | "greeting" | "rsvp";

export type CardShape = "arch" | "diamond" | "ticket" | "circle" | "capsule";

export interface CardConfig {
  id: CardId;
  label: string;
  icon: string;
  shape: CardShape;
  /** Desktop: % of viewport */
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
  width: string;
  /** Mobile: % of viewport */
  mobileX: number;
  mobileY: number;
  mobileWidth: string;
  mobileRotation: number;
  /** Mobile only: extra translateY offset for overlap clustering */
  mobileOverlapY?: number;
}

export const CARD_LAYOUT: CardConfig[] = [
  {
    id: "hero",
    label: "Invitation",
    icon: "/hero.svg",
    shape: "arch",
    x: 32,
    y: 6,
    rotation: -1.5,
    zIndex: 5,
    width: "260px",
    mobileX: 12,
    mobileY: 4,
    mobileRotation: -1,
    mobileWidth: "74vw",
  },
  {
    id: "rsvp",
    label: "RSVP",
    icon: "/rsvp.svg",
    shape: "diamond",
    x: 68,
    y: 16,
    rotation: 2.5,
    zIndex: 9,
    width: "195px",
    mobileX: 45,
    mobileY: 45,
    mobileRotation: 2,
    mobileWidth: "40vw",
    mobileOverlapY: -40,
  },
  {
    id: "details",
    label: "Event Details",
    icon: "/event-details.svg",
    shape: "ticket",
    x: 6,
    y: 38,
    rotation: -2.5,
    zIndex: 10,
    width: "185px",
    mobileX: 6,
    mobileY: 40,
    mobileRotation: -2,
    mobileWidth: "40vw",
    mobileOverlapY: -30,
  },
  {
    id: "story",
    label: "Our Story",
    icon: "/our-story.svg",
    shape: "circle",
    x: 67,
    y: 55,
    rotation: 0,
    zIndex: 8,
    width: "175px",
    mobileX: 55,
    mobileY: 70,
    mobileRotation: 0,
    mobileWidth: "37vw",
  },
  {
    id: "greeting",
    label: "Greetings",
    icon: "/greetings.svg",
    shape: "capsule",
    x: 15,
    y: 68,
    rotation: -1.5,
    zIndex: 11,
    width: "170px",
    mobileX: 10,
    mobileY: 77,
    mobileRotation: -1,
    mobileWidth: "41vw",
  },
];
