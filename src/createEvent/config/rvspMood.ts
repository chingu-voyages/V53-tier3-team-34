export type MoodType = "attending" | "maybe" | "regretfully";

export interface RSVPMood {
  name: string;
  value: MoodType;
  emoji: string | null;
}

export const rsvpMoods: RSVPMood[] = [
  {
    name: "Attending",
    value: "attending",
    emoji: null,
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

export const defaultFormValuesRSVPMoods: Omit<RSVPMood, "name">[] = [
  {
    value: "attending",
    emoji: null,
  },
  {
    value: "maybe",
    emoji: "1f9d0",
  },
  {
    value: "regretfully",
    emoji: "1f614",
  },
];
