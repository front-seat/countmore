import type { State } from "./states";

/** Countmore power rankings */
const POWER_RANKINGS: Record<string, number> = {
  AZ: 40,
  GA: 40,
  MI: 40,
  NV: 40,
  PA: 40,
  WI: 40,
  NC: 20,
  // FL: 10,
  // ME: 10,
  // MN: 10,
  // NH: 10,
  // TX: 10,
  // NE: 10,
  // everyone else gets 0
  // See https://docs.google.com/spreadsheets/d/1ST7LSXFAVyXs2Kbqs7MCrVyVArXOwd0VvKVL5e_14oc/edit#gid=1670074123
};

/** Return the power ranking for a state */
export const powerRanking = (st: State): number => POWER_RANKINGS[st] || 0;

/** Return true if the state is one of the key battleground states. */
export const isBattleground = (st: State): boolean => powerRanking(st) > 0;

/** The possible selection outcomes. */
export type StateSelection = "home" | "school" | "toss-up" | "same";

/** Return the state selection for a state */
export const stateSelection = (
  homeSt: State,
  schoolSt: State
): StateSelection => {
  if (homeSt === schoolSt) return "same";
  const homeRank = powerRanking(homeSt);
  const schoolRank = powerRanking(schoolSt);
  if (homeRank > schoolRank) {
    return "home";
  } else if (homeRank < schoolRank) {
    return "school";
  } else {
    return "toss-up";
  }
};
