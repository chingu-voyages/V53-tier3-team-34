import { MoodType } from "@prisma/client";

export interface RSVPMood {
  name: string;
  value: MoodType;
  emoji: string | null;
}

export const rsvpMoods: RSVPMood[] = [
  {
    name: "Attending",
    value: MoodType.ATTENDING,
    emoji: "1f970",
  },
  {
    name: "Maybe",
    value: MoodType.MAYBE,
    emoji: "1f9d0", // thinking face emoji
  },
  {
    name: "Regretfully",
    value: MoodType.REGRETFULLY,
    emoji: "1f614", // pensive face emoji
  },
];

// Default values without the "name" property
export const defaultFormValuesRSVPMoods: Omit<RSVPMood, "name">[] = [
  {
    value: MoodType.ATTENDING,
    emoji: null,
  },
  {
    value: MoodType.MAYBE,
    emoji: "1f9d0",
  },
  {
    value: MoodType.REGRETFULLY,
    emoji: "1f614",
  },
];
