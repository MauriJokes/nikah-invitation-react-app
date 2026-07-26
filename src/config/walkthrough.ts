import type { Translations } from "@/i18n/translations";
import type { CardId } from "@/config/cardLayout";

export const WALKTHROUGH_STORAGE_KEY = "nikah_tour_v1_seen";

export interface WalkthroughStep {
  /** Undefined for the welcome/intro step — no card is spotlighted. */
  cardId?: CardId;
  titleKey: keyof Translations;
  hintKey: keyof Translations;
  isDragStep?: boolean;
}

export const WALKTHROUGH_STEPS: WalkthroughStep[] = [
  {
    // Welcome step — no cardId, renders as a centered panel
    titleKey: "walkthrough_welcome_title",
    hintKey: "walkthrough_welcome_hint",
  },
  {
    cardId: "hero",
    titleKey: "walkthrough_hero_title",
    hintKey: "walkthrough_hero_hint",
  },
  {
    cardId: "rsvp",
    titleKey: "walkthrough_rsvp_title",
    hintKey: "walkthrough_rsvp_hint",
  },
  {
    cardId: "story",
    titleKey: "walkthrough_story_title",
    hintKey: "walkthrough_story_hint",
  },
  {
    cardId: "details",
    titleKey: "walkthrough_details_title",
    hintKey: "walkthrough_details_hint",
  },
  {
    cardId: "greeting",
    titleKey: "walkthrough_greeting_title",
    hintKey: "walkthrough_greeting_hint",
  },
  {
    cardId: "hero",
    titleKey: "walkthrough_drag_title",
    hintKey: "walkthrough_drag_hint",
    isDragStep: true,
  },
];
