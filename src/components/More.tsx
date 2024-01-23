import { useState } from "react";

/** The fifty nifty United States (from the original thirteen colonies!) */
const US_STATES: { [st: string]: string } = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

/** Countmore power rankings */
const POWER_RANKINGS: { [st: string]: number } = {
  AZ: 40,
  GA: 40,
  MI: 40,
  NV: 40,
  PA: 40,
  WI: 40,
  NC: 20,
  FL: 10,
  ME: 10,
  MN: 10,
  NH: 10,
  TX: 10,
  // everyone else gets 0
  // See https://docs.google.com/spreadsheets/d/1ST7LSXFAVyXs2Kbqs7MCrVyVArXOwd0VvKVL5e_14oc/edit#gid=1670074123
};

/** Return the power ranking for a state */
const powerRanking = (st: string): number => POWER_RANKINGS[st] || 0;

/** Which state is most impactful to vote in for the 2024 presidential election? */
type StateSelection = "home" | "school" | "tossup";

/** Selection description */
const SELECTION_DESCRIPTION: {
  [sel in StateSelection]: (homeSt: string, schoolSt: string) => string;
} = {
  home: (homeSt: string, schoolSt: string) =>
    `You should vote in your home state, ${US_STATES[homeSt]}.`,
  school: (homeSt: string, schoolSt: string) =>
    `You should vote in your school state, ${US_STATES[schoolSt]}.`,
  tossup: (homeSt: string, schoolSt: string) =>
    "It's a tossup where you vote. Take your pick.",
};

/** Return the state selection for a state */
const stateSelection = (homeSt: string, schoolSt: string): StateSelection => {
  const homeRank = powerRanking(homeSt);
  const schoolRank = powerRanking(schoolSt);
  if (homeRank > schoolRank) {
    return "home";
  } else if (homeRank < schoolRank) {
    return "school";
  } else {
    return "tossup";
  }
};

/** A React component with two dropdowns containing states; shows which one to use. */
const More: React.FC = () => {
  const [homeSt, setHomeSt] = useState<string>("");
  const [schoolSt, setSchoolSt] = useState<string>("");

  const selection = stateSelection(homeSt, schoolSt);

  return (
    <div className="flex flex-col space-y-12 pt-12">
      <div className="flex flex-row space-x-16">
        {/* Dropdown for home state */}
        <div className="flex flex-col space-y-4">
          <label className="text-3xl font-bold" htmlFor="home-state">
            Home state
          </label>
          <select
            id="home-state"
            value={homeSt}
            onChange={(e) => setHomeSt(e.target.value)}
          >
            <option value="">Select your home state</option>
            {Object.entries(US_STATES).map(([st, name]) => (
              <option key={st} value={st}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown for school state */}
        <div className="flex flex-col space-y-4">
          <label className="text-3xl font-bold" htmlFor="school-state">
            School state
          </label>
          <select
            id="school-state"
            value={schoolSt}
            onChange={(e) => setSchoolSt(e.target.value)}
          >
            <option value="">Select your school state</option>
            {Object.entries(US_STATES).map(([st, name]) => (
              <option key={st} value={st}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Show the result */}
      <p className="text-2x font-bold">
        {homeSt && schoolSt
          ? SELECTION_DESCRIPTION[selection](homeSt, schoolSt)
          : "(choose your states)"}
      </p>
    </div>
  );
};

export default More;
