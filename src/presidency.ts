import type { State } from "./states";
import { formatNumber, formatPercent } from "./format";

export type Party = "dem" | "rep" | "other";
type StateElection = {
  ev: Record<Party, number>;
  votes: Record<Party, number>;
};
type PresidentialElection = Record<State, StateElection>;

/** Return the total number of votes cast in a state. */
export const totalVotes = (election: StateElection): number =>
  election.votes.dem + election.votes.rep + election.votes.other;

/** Return the total number of EV in a state. */
export const totalEV = (election: StateElection): number =>
  election.ev.dem + election.ev.rep + election.ev.other;

/** Return the number of electoral votes for a given state. */
export const votesPercent = (election: StateElection, party: Party): number =>
  election.votes[party] / totalVotes(election);

/** Return the winning party for a given state. */
export const winningParty = (election: StateElection): Party => {
  if (
    election.votes.dem > election.votes.rep &&
    election.votes.dem > election.votes.other
  )
    return "dem";
  if (
    election.votes.rep > election.votes.dem &&
    election.votes.rep > election.votes.other
  )
    return "rep";
  return "other";
};

/** Return the winning candidate for a given state. */
export const winner = (
  election: StateElection,
  candidates: Record<Party, string>
): string => candidates[winningParty(election)];

/** Return the absolute number of votes margin for the winner, ignoring "other". */
export const margin = (election: StateElection): number =>
  Math.abs(election.votes.dem - election.votes.rep);

/** Return a formatted absolute number of votes margin for the winner. */
export const formatMargin = (election: StateElection): string =>
  formatNumber(margin(election));

/** Return the percent of votes margin for the winner, ignoring "other". */
export const marginPercent = (election: StateElection): number =>
  margin(election) / totalVotes(election);

/** Return a formatted percent of votes margin for the winner. */
export const formatMarginPercent = (election: StateElection): string =>
  marginPercent(election) <= 0.01
    ? "<1%"
    : formatPercent(marginPercent(election));

/** Describe the margin using words. */
export const describeMargin = (election: StateElection): string => {
  const p = marginPercent(election);
  if (p < 0.01)
    return `a razor-thin margin of ${formatMargin(election)} votes (<1%)`;
  if (p < 0.05)
    return `a slim margin of ${formatMargin(election)} votes (${formatPercent(
      p
    )})`;
  if (p < 0.2)
    return `a fair margin of ${formatMargin(election)} votes (${formatPercent(
      p
    )})`;
  if (p < 0.5)
    return `a solid margin of ${formatMargin(election)} votes (${formatPercent(
      p
    )})`;
  return `a landslide of ${formatMargin(election)} votes (${formatPercent(p)})`;
};

/** 2020 Election candidates. */
export const CANDIDATES_2020: Record<Party, string> = {
  dem: "Biden",
  rep: "Trump",
  other: "Other",
};

/** 2020 Election data sourced from https://www.presidency.ucsb.edu/statistics/elections/2020 */
export const ELECTION_2020: PresidentialElection = {
  AL: {
    ev: { dem: 0, rep: 9, other: 0 },
    votes: { dem: 849_624, rep: 1_441_170, other: 32_488 },
  },
  AK: {
    ev: { dem: 0, rep: 3, other: 0 },
    votes: { dem: 153_778, rep: 189_951, other: 15_801 },
  },
  AZ: {
    ev: { dem: 11, rep: 0, other: 0 },
    votes: { dem: 1_672_143, rep: 1_661_686, other: 53_497 },
  },
  AR: {
    ev: { dem: 0, rep: 6, other: 0 },
    votes: { dem: 423_932, rep: 760_647, other: 34_490 },
  },
  CA: {
    ev: { dem: 55, rep: 0, other: 0 },
    votes: { dem: 11_110_250, rep: 6_006_429, other: 384_202 },
  },
  CO: {
    ev: { dem: 9, rep: 0, other: 0 },
    votes: { dem: 1_804_352, rep: 1_364_607, other: 87_993 },
  },
  CT: {
    ev: { dem: 7, rep: 0, other: 0 },
    votes: { dem: 1_080_680, rep: 715_291, other: 28_309 },
  },
  DE: {
    ev: { dem: 3, rep: 0, other: 0 },
    votes: { dem: 296_268, rep: 200_603, other: 7_139 },
  },
  DC: {
    ev: { dem: 3, rep: 0, other: 0 },
    votes: { dem: 317_323, rep: 18_586, other: 8_447 },
  },
  FL: {
    ev: { dem: 0, rep: 29, other: 0 },
    votes: { dem: 5_297_045, rep: 5_668_731, other: 101_680 },
  },
  GA: {
    ev: { dem: 0, rep: 16, other: 0 },
    votes: { dem: 2_473_633, rep: 2_461_854, other: 62_229 },
  },
  HI: {
    ev: { dem: 4, rep: 0, other: 0 },
    votes: { dem: 366_130, rep: 196_864, other: 11_475 },
  },
  ID: {
    ev: { dem: 0, rep: 4, other: 0 },
    votes: { dem: 287_021, rep: 554_119, other: 26_874 },
  },
  IL: {
    ev: { dem: 20, rep: 0, other: 0 },
    votes: { dem: 3_471_915, rep: 2_446_891, other: 114_938 },
  },
  IN: {
    ev: { dem: 0, rep: 11, other: 0 },
    votes: { dem: 1_242_416, rep: 1_729_519, other: 61_186 },
  },
  IA: {
    ev: { dem: 0, rep: 6, other: 0 },
    votes: { dem: 759_061, rep: 897_672, other: 34_138 },
  },
  KS: {
    ev: { dem: 0, rep: 6, other: 0 },
    votes: { dem: 570_323, rep: 771_406, other: 30_574 },
  },
  KY: {
    ev: { dem: 0, rep: 8, other: 0 },
    votes: { dem: 772_474, rep: 1_326_646, other: 37_648 },
  },
  LA: {
    ev: { dem: 0, rep: 8, other: 0 },
    votes: { dem: 856_034, rep: 1_255_776, other: 36_252 },
  },
  ME: {
    ev: { dem: 2, rep: 0, other: 0 },
    votes: { dem: 435_072, rep: 360_737, other: 23_652 },
  },
  MD: {
    ev: { dem: 10, rep: 0, other: 0 },
    votes: { dem: 1_985_023, rep: 976_414, other: 75_593 },
  },
  MA: {
    ev: { dem: 11, rep: 0, other: 0 },
    votes: { dem: 2_382_202, rep: 1_167_202, other: 81_999 },
  },
  MI: {
    ev: { dem: 16, rep: 0, other: 0 },
    votes: { dem: 2_804_040, rep: 2_649_852, other: 85_409 },
  },
  MN: {
    ev: { dem: 10, rep: 0, other: 0 },
    votes: { dem: 1_717_077, rep: 1_484_065, other: 76_029 },
  },
  MS: {
    ev: { dem: 0, rep: 6, other: 0 },
    votes: { dem: 539_398, rep: 756_764, other: 17_597 },
  },
  MO: {
    ev: { dem: 0, rep: 10, other: 0 },
    votes: { dem: 1_253_014, rep: 1_718_736, other: 54_212 },
  },
  MT: {
    ev: { dem: 0, rep: 3, other: 0 },
    votes: { dem: 244_786, rep: 343_602, other: 15_252 },
  },
  NE: {
    ev: { dem: 0, rep: 5, other: 0 },
    votes: { dem: 374_583, rep: 556_846, other: 20_283 },
  },
  NV: {
    ev: { dem: 6, rep: 0, other: 0 },
    votes: { dem: 703_486, rep: 669_890, other: 32_000 },
  },
  NH: {
    ev: { dem: 4, rep: 0, other: 0 },
    votes: { dem: 424_937, rep: 365_660, other: 15_608 },
  },
  NJ: {
    ev: { dem: 14, rep: 0, other: 0 },
    votes: { dem: 2_608_335, rep: 1_883_274, other: 57_744 },
  },
  NM: {
    ev: { dem: 5, rep: 0, other: 0 },
    votes: { dem: 501_614, rep: 401_894, other: 20_457 },
  },
  NY: {
    ev: { dem: 29, rep: 0, other: 0 },
    votes: { dem: 5_230_985, rep: 3_244_798, other: 119_043 },
  },
  NC: {
    ev: { dem: 0, rep: 15, other: 0 },
    votes: { dem: 2_684_292, rep: 2_758_775, other: 81_737 },
  },
  ND: {
    ev: { dem: 0, rep: 3, other: 0 },
    votes: { dem: 114_902, rep: 235_595, other: 11_322 },
  },
  OH: {
    ev: { dem: 0, rep: 18, other: 0 },
    votes: { dem: 2_679_165, rep: 3_154_834, other: 88_203 },
  },
  OK: {
    ev: { dem: 0, rep: 7, other: 0 },
    votes: { dem: 503_890, rep: 1_020_280, other: 36_529 },
  },
  OR: {
    ev: { dem: 7, rep: 0, other: 0 },
    votes: { dem: 1_340_383, rep: 958_448, other: 75_490 },
  },
  PA: {
    ev: { dem: 0, rep: 20, other: 0 },
    votes: { dem: 3_458_229, rep: 3_377_674, other: 79_380 },
  },
  RI: {
    ev: { dem: 4, rep: 0, other: 0 },
    votes: { dem: 307_486, rep: 199_922, other: 10_349 },
  },
  SC: {
    ev: { dem: 0, rep: 9, other: 0 },
    votes: { dem: 1_091_541, rep: 1_385_103, other: 36_685 },
  },
  SD: {
    ev: { dem: 0, rep: 3, other: 0 },
    votes: { dem: 150_471, rep: 261_043, other: 11_095 },
  },
  TN: {
    ev: { dem: 0, rep: 11, other: 0 },
    votes: { dem: 1_143_711, rep: 1_852_475, other: 57_665 },
  },
  TX: {
    ev: { dem: 0, rep: 38, other: 0 },
    votes: { dem: 5_259_126, rep: 5_890_347, other: 165_583 },
  },
  UT: {
    ev: { dem: 0, rep: 6, other: 0 },
    votes: { dem: 560_282, rep: 865_140, other: 62_867 },
  },
  VT: {
    ev: { dem: 3, rep: 0, other: 0 },
    votes: { dem: 242_820, rep: 112_704, other: 11_904 },
  },
  VA: {
    ev: { dem: 13, rep: 0, other: 0 },
    votes: { dem: 2_413_568, rep: 1_962_430, other: 84_526 },
  },
  WA: {
    ev: { dem: 12, rep: 0, other: 0 },
    votes: { dem: 2_369_612, rep: 1_584_651, other: 133_368 },
  },
  WV: {
    ev: { dem: 0, rep: 5, other: 0 },
    votes: { dem: 235_984, rep: 545_382, other: 13_286 },
  },
  WI: {
    ev: { dem: 10, rep: 0, other: 0 },
    votes: { dem: 1_630_866, rep: 1_610_184, other: 56_991 },
  },
  WY: {
    ev: { dem: 0, rep: 3, other: 0 },
    votes: { dem: 73_491, rep: 193_559, other: 9_715 },
  },
};

/** 2016 Election Candidates */
export const CANDIDATES_2016: Record<Party, string> = {
  dem: "Clinton",
  rep: "Trump",
  other: "Other",
};

/** 2016 Election data sourced from https://www.presidency.ucsb.edu/statistics/elections/2016 */
export const ELECTION_2016: PresidentialElection = {
  AL: {
    ev: { dem: 0, rep: 9, other: 0 },
    votes: { dem: 729_547, rep: 1_318_255, other: 44_467 },
  },
  AK: {
    ev: { dem: 0, rep: 3, other: 0 },
    votes: { dem: 116_454, rep: 163_387, other: 18_725 },
  },
  AZ: {
    ev: { dem: 0, rep: 11, other: 0 },
    votes: { dem: 1_161_167, rep: 1_252_401, other: 106_327 },
  },
  AR: {
    ev: { dem: 0, rep: 6, other: 0 },
    votes: { dem: 380_494, rep: 684_872, other: 29_829 },
  },
  CA: {
    ev: { dem: 55, rep: 0, other: 0 },
    votes: { dem: 8_753_788, rep: 4_483_810, other: 478_500 },
  },
  CO: {
    ev: { dem: 9, rep: 0, other: 0 },
    votes: { dem: 1_338_870, rep: 1_202_484, other: 144_121 },
  },
  CT: {
    ev: { dem: 7, rep: 0, other: 0 },
    votes: { dem: 897_572, rep: 673_215, other: 48_676 },
  },
  DE: {
    ev: { dem: 3, rep: 0, other: 0 },
    votes: { dem: 235_603, rep: 185_127, other: 14_757 },
  },
  DC: {
    ev: { dem: 3, rep: 0, other: 0 },
    votes: { dem: 282_830, rep: 12_723, other: 4_906 },
  },
  FL: {
    ev: { dem: 0, rep: 29, other: 0 },
    votes: { dem: 4_504_975, rep: 4_617_886, other: 207_043 },
  },
  GA: {
    ev: { dem: 0, rep: 16, other: 0 },
    votes: { dem: 1_877_963, rep: 2_089_104, other: 125_306 },
  },
  HI: {
    ev: { dem: 4, rep: 0, other: 0 },
    votes: { dem: 266_891, rep: 128_847, other: 15_954 },
  },
  ID: {
    ev: { dem: 0, rep: 4, other: 0 },
    votes: { dem: 189_765, rep: 409_055, other: 28_331 },
  },
  IL: {
    ev: { dem: 20, rep: 0, other: 0 },
    votes: { dem: 3_090_729, rep: 2_146_015, other: 209_596 },
  },
  IN: {
    ev: { dem: 0, rep: 11, other: 0 },
    votes: { dem: 1_033_126, rep: 1_557_286, other: 133_993 },
  },
  IA: {
    ev: { dem: 0, rep: 6, other: 0 },
    votes: { dem: 653_669, rep: 800_983, other: 59_186 },
  },
  KS: {
    ev: { dem: 0, rep: 6, other: 0 },
    votes: { dem: 427_005, rep: 671_018, other: 55_406 },
  },
  KY: {
    ev: { dem: 0, rep: 8, other: 0 },
    votes: { dem: 628_854, rep: 1_202_971, other: 53_752 },
  },
  LA: {
    ev: { dem: 0, rep: 8, other: 0 },
    votes: { dem: 780_154, rep: 1_178_638, other: 37_978 },
  },
  ME: {
    ev: { dem: 2, rep: 0, other: 0 },
    votes: { dem: 357_735, rep: 335_593, other: 38_105 },
  },
  MD: {
    ev: { dem: 10, rep: 0, other: 0 },
    votes: { dem: 1_677_928, rep: 943_169, other: 79_605 },
  },
  MA: {
    ev: { dem: 11, rep: 0, other: 0 },
    votes: { dem: 1_995_196, rep: 1_090_893, other: 138_018 },
  },
  MI: {
    ev: { dem: 16, rep: 0, other: 0 },
    votes: { dem: 2_268_839, rep: 2_279_543, other: 172_136 },
  },
  MN: {
    ev: { dem: 10, rep: 0, other: 0 },
    votes: { dem: 1_367_716, rep: 1_322_951, other: 112_972 },
  },
  MS: {
    ev: { dem: 0, rep: 6, other: 0 },
    votes: { dem: 485_131, rep: 700_714, other: 14_435 },
  },
  MO: {
    ev: { dem: 0, rep: 10, other: 0 },
    votes: { dem: 1_071_068, rep: 1_594_511, other: 97_359 },
  },
  MT: {
    ev: { dem: 0, rep: 3, other: 0 },
    votes: { dem: 177_709, rep: 279_240, other: 28_037 },
  },
  NE: {
    ev: { dem: 0, rep: 5, other: 0 },
    votes: { dem: 284_494, rep: 495_961, other: 38_946 },
  },
  NV: {
    ev: { dem: 6, rep: 0, other: 0 },
    votes: { dem: 539_260, rep: 512_058, other: 37_384 },
  },
  NH: {
    ev: { dem: 4, rep: 0, other: 0 },
    votes: { dem: 348_526, rep: 345_790, other: 30_777 },
  },
  NJ: {
    ev: { dem: 14, rep: 0, other: 0 },
    votes: { dem: 2_148_278, rep: 1_601_933, other: 72_477 },
  },
  NM: {
    ev: { dem: 5, rep: 0, other: 0 },
    votes: { dem: 385_234, rep: 319_666, other: 74_541 },
  },
  NY: {
    ev: { dem: 29, rep: 0, other: 0 },
    votes: { dem: 4_491_191, rep: 2_790_073, other: 174_951 },
  },
  NC: {
    ev: { dem: 0, rep: 15, other: 0 },
    votes: { dem: 2_189_316, rep: 2_362_631, other: 130_127 },
  },
  ND: {
    ev: { dem: 0, rep: 3, other: 0 },
    votes: { dem: 93_758, rep: 216_794, other: 21_434 },
  },
  OH: {
    ev: { dem: 0, rep: 18, other: 0 },
    votes: { dem: 2_394_164, rep: 2_841_005, other: 174_498 },
  },
  OK: {
    ev: { dem: 0, rep: 7, other: 0 },
    votes: { dem: 420_375, rep: 949_136, other: 83_481 },
  },
  OR: {
    ev: { dem: 7, rep: 0, other: 0 },
    votes: { dem: 1_002_106, rep: 782_403, other: 94_231 },
  },
  PA: {
    ev: { dem: 0, rep: 20, other: 0 },
    votes: { dem: 2_926_441, rep: 2_970_733, other: 146_715 },
  },
  RI: {
    ev: { dem: 4, rep: 0, other: 0 },
    votes: { dem: 252_525, rep: 180_543, other: 14_746 },
  },
  SC: {
    ev: { dem: 0, rep: 9, other: 0 },
    votes: { dem: 855_373, rep: 1_155_389, other: 49_204 },
  },
  SD: {
    ev: { dem: 0, rep: 3, other: 0 },
    votes: { dem: 117_442, rep: 227_701, other: 20_845 },
  },
  TN: {
    ev: { dem: 0, rep: 11, other: 0 },
    votes: { dem: 870_695, rep: 1_522_925, other: 70_397 },
  },
  TX: {
    ev: { dem: 0, rep: 38, other: 0 },
    votes: { dem: 3_877_868, rep: 4_685_047, other: 283_492 },
  },
  UT: {
    ev: { dem: 0, rep: 6, other: 0 },
    votes: { dem: 310_676, rep: 515_231, other: 39_608 },
  },
  VT: {
    ev: { dem: 3, rep: 0, other: 0 },
    votes: { dem: 178_573, rep: 95_369, other: 10_078 },
  },
  VA: {
    ev: { dem: 13, rep: 0, other: 0 },
    votes: { dem: 1_981_473, rep: 1_769_443, other: 118_274 },
  },
  WA: {
    ev: { dem: 12, rep: 0, other: 0 },
    votes: { dem: 1_742_718, rep: 1_221_747, other: 160_879 },
  },
  WV: {
    ev: { dem: 0, rep: 5, other: 0 },
    votes: { dem: 188_794, rep: 489_371, other: 23_004 },
  },
  WI: {
    ev: { dem: 10, rep: 0, other: 0 },
    votes: { dem: 1_382_536, rep: 1_405_284, other: 106_674 },
  },
  WY: {
    ev: { dem: 0, rep: 3, other: 0 },
    votes: { dem: 55_973, rep: 174_419, other: 13_287 },
  },
};

/** Number of electoral votes in the 2024 presidential election for each state. */
export const EV_2024: Record<State, number> = {
  AL: 9,
  AK: 3,
  AZ: 11,
  AR: 6,
  CA: 54,
  CO: 10,
  CT: 7,
  DC: 3,
  DE: 3,
  FL: 30,
  GA: 16,
  HI: 4,
  ID: 4,
  IL: 19,
  IN: 11,
  IA: 6,
  KS: 6,
  KY: 8,
  LA: 8,
  ME: 4,
  MD: 10,
  MA: 11,
  MI: 15,
  MN: 10,
  MS: 6,
  MO: 10,
  MT: 4,
  NE: 5,
  NV: 6,
  NH: 4,
  NJ: 14,
  NM: 5,
  NY: 28,
  NC: 16,
  ND: 3,
  OH: 17,
  OK: 7,
  OR: 8,
  PA: 19,
  RI: 4,
  SC: 9,
  SD: 3,
  TN: 11,
  TX: 40,
  UT: 6,
  VT: 3,
  VA: 13,
  WA: 12,
  WV: 4,
  WI: 10,
  WY: 3,
};
