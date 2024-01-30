import { useCallback, useState } from "react";
import clsx from "clsx";

import { bestRegistrationUrl } from "../vote_gov";
import { ArrowDown, CornerDownLeft, Share } from "./Icons";
import { STATE_NAMES } from "../states";
import type { State } from "../states";
import { browserSupportsShare, defaultShare } from "./ShareButton";
import {
  EV_2024,
  CANDIDATES_2020,
  ELECTION_2020,
  winner,
  describeMargin,
} from "../presidency";
import { formatNumber, formatPercent } from "../format";

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
type StateSelection = "home" | "school" | "toss-up" | "same";

/** Return the state selection for a state */
const stateSelection = (homeSt: string, schoolSt: string): StateSelection => {
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

/** A state selection result. */
interface StateSelectionResult {
  /** The state selection */
  selection: StateSelection;

  /** The home state */
  homeSt: State;

  /** The school state */
  schoolSt: State;
}

/** Return the vote.gov URL for a state */
// const voteGovUrl = (st: string): string =>
//   `https://vote.gov/register/${st.toLowerCase()}/`;

/** A React component with two dropdowns containing states; shows which one to use. */
const SelectStates: React.FC<{
  onSelect: (result: StateSelectionResult) => void;
}> = ({ onSelect }) => {
  const [homeSt, setHomeSt] = useState<State | "">("");
  const [schoolSt, setSchoolSt] = useState<State | "">("");

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
            defaultValue=""
            onChange={(e) => setHomeSt(e.target.value as State)}
          >
            <option value="" disabled>
              choose...
            </option>
            {Object.entries(STATE_NAMES).map(([st, name]) => (
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
            defaultValue=""
            onChange={(e) => setSchoolSt(e.target.value as State)}
          >
            <option value="" disabled>
              choose...
            </option>
            {Object.entries(STATE_NAMES).map(([st, name]) => (
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
          onClick={() => {
            if (!homeSt || !schoolSt) return;
            onSelect({
              selection: stateSelection(homeSt, schoolSt),
              homeSt,
              schoolSt,
            });
          }}
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

  return (
    <div>
      {/* Headline for selection. */}
      <div className="font-cabinet text-[36px] leading-[43.2px] font-bold">
        {selection !== "toss-up" && selection !== "same" && (
          <>
            Your vote counts more in{" "}
            <span className="text-point">
              {STATE_NAMES[selection === "home" ? homeSt : schoolSt]}
            </span>
            .
          </>
        )}
        {selection === "toss-up" && (
          <>
            Your vote counts the same in{" "}
            <span className="text-point">{STATE_NAMES[homeSt]}</span> and{" "}
            <span className="text-point">{STATE_NAMES[schoolSt]}</span>.
          </>
        )}
        {selection === "same" && (
          <>
            Your home and school states are both{" "}
            <span className="text-point">{STATE_NAMES[homeSt]}</span>.
          </>
        )}
      </div>
      {/* Explanatory text for selection. */}
      <p className="font-satoshi font-medium py-8 text-[20px] leading-[30px]">
        {selection === "same" && (
          <>
            That makes things simple: you should vote in{" "}
            <span className="text-point">{STATE_NAMES[homeSt]}</span>.<br />
            <br />
            Your home state is worth{" "}
            <span className="font-black">{EV_2024[homeSt]}</span> electoral
            votes in 2024. In the 2020 election,{" "}
            <span className="font-black">
              {winner(ELECTION_2020[homeSt], CANDIDATES_2020)}
            </span>{" "}
            won your state by {describeMargin(ELECTION_2020[homeSt])}.
          </>
        )}
        {selection === "toss-up" && (
          <>
            It's a toss-up between your home and school states. Choose the state
            that works best for you, but please remember that you can only vote
            in one of them.
            <br />
            <br />
            In 2024, <span className="text-point">
              {STATE_NAMES[homeSt]}
            </span>{" "}
            is worth <span className="font-black">{EV_2024[homeSt]}</span>{" "}
            electoral votes;{" "}
            <span className="text-point">{STATE_NAMES[schoolSt]}</span> is worth{" "}
            <span className="font-black">{EV_2024[schoolSt]}</span>. In the 2020
            election,{" "}
            <span className="font-black">
              {winner(ELECTION_2020[homeSt], CANDIDATES_2020)}
            </span>{" "}
            won {STATE_NAMES[homeSt]} by {describeMargin(ELECTION_2020[homeSt])}
            , while{" "}
            <span className="font-black">
              {winner(ELECTION_2020[schoolSt], CANDIDATES_2020)}
            </span>{" "}
            won {STATE_NAMES[schoolSt]} by{" "}
            {describeMargin(ELECTION_2020[schoolSt])}.
          </>
        )}
        {selection === "home" && (
          <>
            You should vote in your home state of{" "}
            <span className="text-point">{STATE_NAMES[homeSt]}</span>.
            It&rsquo;s a battleground state where your vote has a better chance
            of swinging the election.
            <br />
            <br />
            <span className="text-point">{STATE_NAMES[homeSt]}</span> is worth{" "}
            <span className="font-black">{EV_2024[homeSt]}</span> electoral
            votes in 2024. In the 2020 election,{" "}
            <span className="font-black">
              {winner(ELECTION_2020[homeSt], CANDIDATES_2020)}
            </span>{" "}
            won by {describeMargin(ELECTION_2020[homeSt])}.
          </>
        )}
        {selection === "school" && (
          <>
            You should vote in your school state,{" "}
            <span className="text-point">{STATE_NAMES[schoolSt]}</span>.
            It&rsquo;s a battleground state where your vote has a better chance
            of swinging the election.
            <br />
            <br />
            <span className="text-point">{STATE_NAMES[schoolSt]}</span> is worth{" "}
            <span className="font-black">{EV_2024[schoolSt]}</span> electoral
            votes in 2024. In the 2020 election,{" "}
            <span className="font-black">
              {winner(ELECTION_2020[schoolSt], CANDIDATES_2020)}
            </span>{" "}
            won by {describeMargin(ELECTION_2020[schoolSt])}.
          </>
        )}
      </p>
      {/* Action buttons for selection (share/register to vote/etc). */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex-none">
          {browserSupportsShare() ? (
            <Share
              className="text-black hover:text-hover cursor-pointer w-8 h-8 transition-colors duration-200"
              onClick={defaultShare}
            />
          ) : (
            " "
          )}
        </div>
        <div className="flex-1 flex flex-row flex-wrap justify-end -mb-2">
          {selection !== "school" && bestRegistrationUrl(homeSt) && (
            <a
              className="inline-block bg-point rounded-md py-4 px-8 text-white text-xl font-bold hover:bg-hover transition-colors duration-200 mb-2"
              href={bestRegistrationUrl(homeSt)!}
              target="_blank"
            >
              Register to vote
              {selection === "toss-up" && (
                <>
                  {" "}
                  in{" "}
                  <span className="font-cabinet inline-block w-8 min-w-8 max-w-8">
                    {homeSt.toUpperCase()}
                  </span>
                </>
              )}
            </a>
          )}
          {selection !== "home" &&
            selection !== "same" &&
            bestRegistrationUrl(schoolSt) && (
              <a
                className={clsx(
                  "inline-block bg-point rounded-md py-4 px-8 text-white text-xl font-bold hover:bg-hover transition-colors duration-200 mb-2",
                  selection === "toss-up" && "ml-4"
                )}
                href={bestRegistrationUrl(schoolSt)!}
                target="_blank"
              >
                Register to vote
                {selection === "toss-up" && (
                  <>
                    {" "}
                    in{" "}
                    <span className="font-cabinet inline-block w-8 min-w-8 max-w-8">
                      {schoolSt.toUpperCase()}
                    </span>
                  </>
                )}
              </a>
            )}
        </div>
      </div>
    </div>
  );
};

export const More: React.FC = () => {
  const [result, setResult] = useState<StateSelectionResult | null>(null);

  const handleSelection = useCallback((result: StateSelectionResult) => {
    if (window.gtag) {
      window.gtag("event", "select", {
        event_category: "state_selection",
        event_label: "state_selection",
        home_state: result.homeSt.toUpperCase(),
        school_state: result.schoolSt.toUpperCase(),
        selection: result.selection,
      });
    }
    setResult(result);
  }, []);

  return result ? (
    <DescribeSelection result={result} />
  ) : (
    <SelectStates onSelect={handleSelection} />
  );
};

export default More;
