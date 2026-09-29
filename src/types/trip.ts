export type Language = "en" | "ko";

export type LocalizedText = {
  en: string;
  ko: string;
};

export type HelpTopic =
  | "entry"
  | "stay"
  | "destination"
  | "transit"
  | "rental-car"
  | "delivery";

export interface SolutionStep {
  title: LocalizedText;
  description: LocalizedText;
  tip?: LocalizedText;
}

export interface SolutionGuide {
  slug: HelpTopic;
  stage: "before-trip" | "in-korea" | "both";
  title: LocalizedText;
  shortDescription: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  keywords: string[];
  estimatedMinutes: number;
  conciergeAvailable: boolean;
  badge: LocalizedText;
  steps: SolutionStep[];
  checklist: LocalizedText[];
  quickAction?: {
    label: LocalizedText;
    actionType: "visa-check" | "concierge" | "destination-picker";
  };
}

export interface HelpRequestDraft {
  topic: HelpTopic | "other";
  travelDate: string;
  city: string;
  contactMethod: "email" | "whatsapp" | "kakao" | "";
  contactInfo: string;
  details: string;
}

export interface DestinationItem {
  id: string;
  name: LocalizedText;
  subtitle: LocalizedText;
  tags: LocalizedText[];
  image: string;
  imageAlt: LocalizedText;
  bestFor: LocalizedText;
}
