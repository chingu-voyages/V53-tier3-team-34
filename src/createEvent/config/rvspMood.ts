export type MoodType = "attending" | "maybe" | "regretfully";

export interface RSVPMood {
  name: string;
  value: MoodType;
  emoji: string;
}

export const rsvpMoods: RSVPMood[] = [
  {
    name: "Attending",
    value: "attending",
    emoji: "1f970",
  },
  {
    name: "Maybe",
    value: "maybe",
    emoji: "1f9d0",
  },
  {
    name: "Regretfully",
    value: "regretfully",
    emoji: "1f614",
  },
];
