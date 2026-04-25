export type CardId =
  | 'hero'
  | 'story'
  | 'details'
  | 'dresscode'
  | 'greeting'
  | 'rsvp'

export interface CardConfig {
  id: CardId
  label: string
  icon: string
  /** Desktop: % of viewport */
  x: number
  y: number
  rotation: number
  zIndex: number
  width: string
  /** Mobile: % of viewport (2-col staggered) */
  mobileX: number
  mobileY: number
  mobileWidth: string
  mobileRotation: number
}

export const CARD_LAYOUT: CardConfig[] = [
  {
    id: 'hero',
    label: 'Invitation',
    icon: '💍',
    x: 28, y: 14, rotation: -2.5, zIndex: 10, width: '280px',
    mobileX: 3, mobileY: 5, mobileRotation: -2, mobileWidth: '44vw',
  },
  {
    id: 'story',
    label: 'Our Story',
    icon: '✨',
    x: 62, y: 10, rotation: 3, zIndex: 8, width: '240px',
    mobileX: 52, mobileY: 8, mobileRotation: 2.5, mobileWidth: '44vw',
  },
  {
    id: 'details',
    label: 'Event Details',
    icon: '🕌',
    x: 8, y: 40, rotation: -4, zIndex: 9, width: '220px',
    mobileX: 3, mobileY: 36, mobileRotation: -2.5, mobileWidth: '44vw',
  },
  {
    id: 'dresscode',
    label: 'Dress Code',
    icon: '👗',
    x: 62, y: 44, rotation: 5, zIndex: 7, width: '200px',
    mobileX: 52, mobileY: 39, mobileRotation: 3, mobileWidth: '44vw',
  },
  {
    id: 'greeting',
    label: 'Greetings',
    icon: '💌',
    x: 32, y: 55, rotation: -2, zIndex: 11, width: '250px',
    mobileX: 3, mobileY: 66, mobileRotation: -1.5, mobileWidth: '44vw',
  },
  {
    id: 'rsvp',
    label: 'RSVP',
    icon: '📋',
    x: 70, y: 22, rotation: 1.5, zIndex: 6, width: '240px',
    mobileX: 52, mobileY: 69, mobileRotation: 2, mobileWidth: '44vw',
  },
]
