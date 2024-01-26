import { useState, useEffect } from "react";
import type { ReactNode } from "react";

import { bestRegistrationUrl } from "../vote_gov";
import { ArrowDown, CornerDownLeft } from "./Icons";

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
type StateSelection = "home" | "school" | "toss-up";

/** Selection description */
const SELECTION_DESCRIPTION: {
  [sel in StateSelection]: (homeSt: string, schoolSt: string) => ReactNode;
} = {
  home: (homeSt: string, __: string) => (
    <div>
      <div className="text-4xl font-black">
        Your vote counts more in{" "}
        <span className="text-red-500">{US_STATES[homeSt]}</span>.
      </div>
      <p className="py-8">Put some explanatory text here.</p>
      {bestRegistrationUrl(homeSt) && (
        <a
          className="inline-block g-black py-4 px-8 text-white text-xl font-bold hover:bg-red-500"
          href={bestRegistrationUrl(homeSt)!}
          target="_blank"
        >
          Register to vote
        </a>
      )}
    </div>
  ),
  school: (_: string, schoolSt: string) => (
    <div>
      <div className="text-4xl font-black">
        You vote counts more in{" "}
        <span className="text-red-500">{US_STATES[schoolSt]}</span>.
      </div>
      <p className="py-8">Put some explanatory text here.</p>
      {bestRegistrationUrl(schoolSt) && (
        <a
          className="inline-block bg-black py-4 px-8 text-white text-xl font-bold hover:bg-red-500"
          href={bestRegistrationUrl(schoolSt)!}
          target="_blank"
        >
          Register to vote
        </a>
      )}
    </div>
  ),
  "toss-up": (homeSt: string, schoolSt: string) => (
    <div>
      <div className="text-4xl font-black">
        Your vote counts the same in{" "}
        <span className="text-red-500">{US_STATES[homeSt]}</span> and{" "}
        <span className="text-red-500">{US_STATES[schoolSt]}</span>.
      </div>
      <p className="py-8">Put some explanatory text here.</p>
      {bestRegistrationUrl(homeSt) && (
        <a
          className="inline-block bg-black mb-8 py-4 px-8 text-white text-xl font-bold hover:bg-red-500"
          href={bestRegistrationUrl(homeSt)!}
          target="_blank"
        >
          Register to vote in {US_STATES[homeSt]}
        </a>
      )}{" "}
      {bestRegistrationUrl(schoolSt) && (
        <a
          className="inline-block bg-black py-4 px-8 text-white text-xl font-bold hover:bg-red-500"
          href={bestRegistrationUrl(schoolSt)!}
          target="_blank"
        >
          Register to vote in {US_STATES[schoolSt]}
        </a>
      )}
    </div>
  ),
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
    return "toss-up";
  }
};

/** A state selection result. */
interface StateSelectionResult {
  /** The state selection */
  selection: StateSelection;

  /** The home state */
  homeSt: string;

  /** The school state */
  schoolSt: string;
}

/** Return the vote.gov URL for a state */
const voteGovUrl = (st: string): string =>
  `https://vote.gov/register/${st.toLowerCase()}/`;

/** A React component with two dropdowns containing states; shows which one to use. */
const SelectStates: React.FC<{
  onSelect: (result: StateSelectionResult) => void;
}> = ({ onSelect }) => {
  const [homeSt, setHomeSt] = useState<string>("");
  const [schoolSt, setSchoolSt] = useState<string>("");

  return (
    <div className="flex flex-col space-y-12">
      <h2 className="font-extrabold text-[24px] leading-[33.6px]">
        Choose your home state and school state to learn where your vote counts
        more:
      </h2>

      {/* Dropdown for home state */}
      <div className="flex flex-col space-y-4">
        <label
          className="font-satoshi text-normal font-black uppercase text-[14px] leading-[20px]"
          htmlFor="home-state"
        >
          Home state
        </label>
        <div className="block relative">
          <select
            id="home-state"
            className="text-black invalid:text-gray-400 w-full rounded-none flex-grow font-cabinet font-extrabold text-[24px] leading-[32px] appearance-none bg-transparent border-b-2 border-black"
            value={homeSt}
            required
            onChange={(e) => setHomeSt(e.target.value)}
          >
            <option value="" disabled selected>
              choose...
            </option>
            {Object.entries(US_STATES).map(([st, name]) => (
              <option key={st} value={st}>
                {name}
              </option>
            ))}
          </select>
          <ArrowDown className="block w-8 h-8 absolute right-0 top-0 pointer-events-none text-black" />
        </div>
      </div>

      {/* Dropdown for school state */}
      <div className="flex flex-col space-y-4">
        <label
          className="font-satoshi text-normal font-black uppercase text-[14px] leading-[20px]"
          htmlFor="school-state"
        >
          School state
        </label>
        <div className="block relative">
          <select
            id="school-state"
            className="text-black invalid:text-gray-400 w-full rounded-none flex-grow font-cabinet font-extrabold text-[24px] leading-[32px] appearance-none bg-transparent border-b-2 border-black focus:ring-hover"
            value={schoolSt}
            required
            onChange={(e) => setSchoolSt(e.target.value)}
          >
            <option value="" disabled selected>
              choose...
            </option>
            {Object.entries(US_STATES).map(([st, name]) => (
              <option key={st} value={st}>
                {name}
              </option>
            ))}
          </select>
          <ArrowDown className="block w-8 h-8 absolute right-0 top-0 pointer-events-none text-black" />
        </div>
      </div>

      {/* Enter button */}
      <div className="flex flex-row">
        <div className="flex-grow">&nbsp;</div>
        <button
          className="bg-point disabled:bg-gray-400 inline text-white font-cabinet rounded-md py-[18px] px-[28px] font-extrabold hover:bg-press text-[20px] leading-[24px] transition-colors duration-200"
          onClick={() =>
            onSelect({
              selection: stateSelection(homeSt, schoolSt),
              homeSt,
              schoolSt,
            })
          }
          disabled={!homeSt || !schoolSt}
        >
          <span>
            Enter&nbsp;
            <CornerDownLeft className="inline w-[20px] h-[20px] ml-2 -mt-1" />
          </span>
        </button>
      </div>
    </div>
  );
};

const DescribeSelection: React.FC<{ result: StateSelectionResult }> = ({
  result,
}) => {
  const { selection, homeSt, schoolSt } = result;
  return <div>{SELECTION_DESCRIPTION[selection](homeSt, schoolSt)}</div>;
};

export const More: React.FC = () => {
  const [result, setResult] = useState<StateSelectionResult | null>(null);

  return result ? (
    <DescribeSelection result={result} />
  ) : (
    <SelectStates onSelect={setResult} />
  );
};

export default More;
