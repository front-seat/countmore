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
  home: (homeSt: string, __: string) =>
    `You should vote in your home state, ${US_STATES[homeSt]}.`,
  school: (_: string, schoolSt: string) =>
    `You should vote in your school state, ${US_STATES[schoolSt]}.`,
  tossup: (_: string, __: string) =>
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

/** Return the vote.gov URL for a state */
const voteGovUrl = (st: string): string =>
  `https://vote.gov/register/${st.toLowerCase()}/`;

/** A React component with two dropdowns containing states; shows which one to use. */
const More: React.FC = () => {
  const [homeSt, setHomeSt] = useState<string>("");
  const [schoolSt, setSchoolSt] = useState<string>("");

  const selection = stateSelection(homeSt, schoolSt);

  return (
    <div className="flex flex-col space-y-12">
      <h2 className="text-3xl font-medium">
        Enter your home state and school state to learn where your vote counts
        more:
      </h2>

      {/* Dropdown for home state */}
      <div className="flex flex-row space-x-4">
        <label className="text-normal font-medium w-[40%]" htmlFor="home-state">
          Your home state:
        </label>
        <select
          id="home-state"
          className="flex-grow"
          value={homeSt}
          onChange={(e) => setHomeSt(e.target.value)}
        >
          <option value="">Select a state</option>
          {Object.entries(US_STATES).map(([st, name]) => (
            <option key={st} value={st}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown for school state */}
      <div className="flex flex-row space-x-4">
        <label
          className="text-normal font-medium w-[40%]"
          htmlFor="school-state"
        >
          Your school state:
        </label>
        <select
          id="school-state"
          className="flex-grow"
          value={schoolSt}
          onChange={(e) => setSchoolSt(e.target.value)}
        >
          <option value="">Select a state</option>
          {Object.entries(US_STATES).map(([st, name]) => (
            <option key={st} value={st}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Show the result */}
      <p className="text-2x font-bold">
        {homeSt && schoolSt
          ? SELECTION_DESCRIPTION[selection](homeSt, schoolSt)
          : "(choose your states)"}
      </p>

      {/* Link (or links) to vote.gov */}
      <div className="flex flex-col text-2x font-normal pt-8 space-y-8">
        {homeSt && schoolSt && selection !== "school" && (
          <p>
            <a
              className="text-blue-500 hover:text-blue-700 underline"
              href={voteGovUrl(homeSt)}
              target="_blank"
              rel="noreferrer"
            >
              Register to vote or check your registration status in{" "}
              {US_STATES[homeSt]}
            </a>
          </p>
        )}
        {homeSt && schoolSt && selection !== "home" && (
          <p>
            <a
              className="text-blue-500 hover:text-blue-700 underline"
              href={voteGovUrl(schoolSt)}
              target="_blank"
              rel="noreferrer"
            >
              Register to vote or check your registration status in{" "}
              {US_STATES[schoolSt]}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default More;
