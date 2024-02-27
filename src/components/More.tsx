import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { assertNever } from "../asserts";

import { bestRegistrationUrl } from "../vote_gov";
import { ArrowDown, CornerDownLeft, Share } from "./Icons";
import { STATE_NAMES } from "../states";
import type { State } from "../states";
import { browserSupportsShare, defaultShare } from "./ShareButton";
import {
  CANDIDATES_2020,
  ELECTION_2020,
  winner,
  formatMargin,
  marginPercent,
} from "../presidency";

/** Countmore power rankings */
const POWER_RANKINGS: Record<string, number> = {
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
  NE: 10,
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

/** Return the selected state for a result. */
const selectedState = (result: StateSelectionResult): State =>
  result.selection === "home" ? result.homeSt : result.schoolSt;

/** Return the selected state name for a result. */
const selectedStateName = (result: StateSelectionResult): string =>
  STATE_NAMES[selectedState(result)];

/** Return the 'other' state for a result. */
const otherState = (result: StateSelectionResult): State =>
  result.selection === "home" ? result.schoolSt : result.homeSt;

/** Return the 'other' state name for a result. */
const otherStateName = (result: StateSelectionResult): string =>
  STATE_NAMES[otherState(result)];

/** Return the 'home' state name for a result. */
const homeStateName = (result: StateSelectionResult): string =>
  STATE_NAMES[result.homeSt];

/** Return the 'school' state name for a result. */
const schoolStateName = (result: StateSelectionResult): string =>
  STATE_NAMES[result.schoolSt];

/** Renders a share button if native browser sharing is available. */
const ShareButton: React.FC = () => {
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    if (browserSupportsShare()) {
      setShowShare(true);
    }
  }, []);

  if (!showShare) return null;

  return (
    <Share
      className="text-black md:hover:text-gray-600 cursor-pointer w-7 h-7 transition-colors duration-200"
      aria-hidden="true"
      onClick={defaultShare}
    />
  );
};

//-------------------------------------------------------------------------
//
// The following components are used to render the selection form.
//
//-------------------------------------------------------------------------

/** Renders a single accessible dropdown in the site's visual style. */
const StateDropdown: React.FC<{
  id: string;
  value: State | "";
  label: string;
  onChange: (value: State) => void;
  className?: string;
}> = ({ id, value, label, onChange, className }) => (
  <div className={clsx("flex flex-col space-y-[0.7rem]", className)}>
    <label
      className="font-satoshi text-normal font-black uppercase text-[14px] leading-[20px]"
      htmlFor={id}
    >
      {label}
    </label>
    <div className="block relative">
      <select
        id={id}
        className="text-black pb-[0.2rem] invalid:text-black/25 w-full rounded-none flex-grow font-cabinet font-bold text-[24px] leading-[32px] appearance-none bg-transparent border-b-2 border-black focus:ring-hover"
        value={value}
        required
        onChange={(e) => onChange(e.target.value as State)}
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
      <ArrowDown
        className="block w-6 h-6 absolute right-0 top-0 pointer-events-none text-black"
        aria-hidden="true"
      />
    </div>
  </div>
);

/** Renders our submit button. */
const SubmitButton: React.FC<{ disabled: boolean }> = ({ disabled }) => (
  <div className="flex flex-row">
    <div className="flex-grow">&nbsp;</div>
    <button
      className="bg-point disabled:bg-black/15 disabled:text-white/75 inline text-white font-cabinet rounded-md px-8 py-4 font-extrabold md:hover:bg-press text-[20px] leading-[24px] transition-colors duration-200"
      type="submit"
      disabled={disabled}
    >
      <span>
        Enter
        <CornerDownLeft className="inline-block w-[20px] h-[20px] ml-2 -mt-[2px]" />
      </span>
    </button>
  </div>
);

/** Renders the primary form for the website: two dropdowns and a submit button. */
const SelectStates: React.FC<{
  onSelect: (result: StateSelectionResult) => void;
}> = ({ onSelect }) => {
  const [homeSt, setHomeSt] = useState<State | "">("");
  const [schoolSt, setSchoolSt] = useState<State | "">("");

  return (
    <form
      className="flex flex-col space-y-[1.7rem]"
      onSubmit={(e) => {
        e.preventDefault();
        if (!homeSt || !schoolSt) return;
        onSelect({
          selection: stateSelection(homeSt, schoolSt),
          homeSt,
          schoolSt,
        });
      }}
    >
      <h2 className="font-extrabold text-[24px] leading-[33.6px] pb-1">
        <span className="inline sm:hidden">Let’s</span>
        <span className="hidden sm:inline">
          Choose your home and school states to
        </span>{" "}
        see where your vote counts more:
      </h2>

      <div className="flex flex-col space-y-[1.7rem] xl:flex-row xl:space-y-0 xl:space-x-[1.7rem]">
        <StateDropdown
          id="home-state"
          value={homeSt}
          onChange={setHomeSt}
          label="Home state"
          className="xl:flex-grow"
        />
        <StateDropdown
          id="school-state"
          value={schoolSt}
          onChange={setSchoolSt}
          label="School state"
          className="xl:flex-grow"
        />
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex-none">
          <ShareButton />
        </div>
        <div className="flex-1 flex flex-row flex-wrap justify-end">
          <SubmitButton disabled={!homeSt || !schoolSt} />
        </div>
      </div>
    </form>
  );
};

//-------------------------------------------------------------------------
//
// The following components are used to render the selection result.
//
//-------------------------------------------------------------------------

/** Renders a single analytics-tracked "register to vote" button. */
const RegisterToVoteButton: React.FC<{ st: State; className?: string }> = ({
  st,
  className,
}) => {
  const url = bestRegistrationUrl(st);

  const handleRegistrationClick = useCallback(
    (e: React.MouseEvent, st: State, url: string) => {
      e.preventDefault();

      if (window.gtag) {
        window.gtag("event", "register_to_vote", {
          event_category: "engagement",
          state: st.toUpperCase(),
          url: url,
        });
      }

      // @ts-ignore-next-line  The @types/facebook-pixel don't allow for
      // the possibility that facebook's script doesn't load properly.
      if (window.fbq) {
        // see https://developers.facebook.com/docs/meta-pixel/reference
        window.fbq("trackCustom", "RegisterToVote", {
          state: st.toUpperCase(),
          content_ids: [url],
        });
      }

      window.open(url, "_blank");
    },
    []
  );

  if (!url) return null;

  return (
    <a
      className={clsx(
        "inline-block bg-point rounded-md px-6 py-4 text-white text-xl font-extrabold md:hover:bg-hover transition-colors duration-200 mb-2",
        className
      )}
      href={bestRegistrationUrl(st)!}
      target="_blank"
      onClick={(e) => handleRegistrationClick(e, st, url)}
      aria-label={`Follow this link to register to vote in ${STATE_NAMES[st]}`}
    >
      Register to vote in{" "}
      <span className="font-cabinet inline-block w-8 min-w-8 max-w-8">
        {st.toUpperCase()}
      </span>
    </a>
  );
};

/** Renders the headline for a specific two-state selection. */
const SelectionHeadline: React.FC<{ result: StateSelectionResult }> = ({
  result,
}) => {
  let headline;

  switch (result.selection) {
    case "home":
    case "school":
      headline = (
        <>
          Your vote counts more in{" "}
          <span className="text-point">{selectedStateName(result)}</span>.
        </>
      );
      break;

    case "toss-up":
      headline = (
        <>
          Your vote matters in both{" "}
          <span className="text-point">{homeStateName(result)}</span> and{" "}
          <span className="text-point">{schoolStateName(result)}</span>.
        </>
      );
      break;

    case "same":
      headline = (
        <>
          Your home and school states are both{" "}
          <span className="text-point">{selectedStateName(result)}</span>.
        </>
      );
      break;

    default:
      assertNever(result.selection);
  }

  return (
    <div className="font-cabinet text-[36px] leading-[43.2px] font-extrabold">
      {headline}
    </div>
  );
};

/** Renders the detail text for a two-state selection. */
const SelectionDetails: React.FC<{ result: StateSelectionResult }> = ({
  result,
}) => {
  let message;
  let marginMessage = null;

  switch (result.selection) {
    case "home":
    case "school":
      message = (
        <>
          In this presidential election, your vote has more impact in{" "}
          <span className="text-point">{selectedStateName(result)}</span> than
          in {otherStateName(result)}. {selectedStateName(result)} is a “swing
          state” where a small number of votes can swing the election.
        </>
      );
      break;

    case "toss-up":
      message = <>It’s a toss-up between your home and school states.</>;
      break;

    case "same":
      message = (
        <>
          That makes things simple: vote in{" "}
          <span className="text-point">{homeStateName(result)}</span>.
        </>
      );
      break;

    default:
      assertNever(result.selection);
  }

  const election = ELECTION_2020[selectedState(result)];
  const mp = marginPercent(election);
  if (mp < 0.01) {
    marginMessage = (
      <>
        In 2020,{" "}
        <span className="font-black">{winner(election, CANDIDATES_2020)}</span>{" "}
        won {selectedStateName(result)} by a razor-thin margin of{" "}
        {formatMargin(election)} votes (&lt;1%).
      </>
    );
  } else if (mp < 0.025) {
    marginMessage = (
      <>
        In 2020,{" "}
        <span className="font-black">{winner(election, CANDIDATES_2020)}</span>{" "}
        won {selectedStateName(result)} by a slim margin of{" "}
        {formatMargin(election)} votes (&lt;2.5%).
      </>
    );
  }

  return (
    <div className="font-satoshi font-medium py-4 text-[20px] leading-[30px]">
      {message}
      {marginMessage && (
        <>
          <br />
          <br />
          {marginMessage}
        </>
      )}
    </div>
  );
};

const DescribeSelection: React.FC<{ result: StateSelectionResult }> = ({
  result,
}) => {
  const { selection, homeSt, schoolSt } = result;

  return (
    <div>
      <SelectionHeadline result={result} />
      <SelectionDetails result={result} />

      {/* Action buttons for selection (share/register to vote/etc). */}
      <div className="flex flex-row justify-between items-center space-x-2">
        <div className="flex-none">
          <ShareButton />
        </div>
        <div className="flex-1 flex flex-row flex-wrap justify-end -mb-2">
          {selection !== "school" && bestRegistrationUrl(homeSt) && (
            <RegisterToVoteButton st={homeSt} />
          )}
          {selection !== "home" &&
            selection !== "same" &&
            bestRegistrationUrl(schoolSt) && (
              <RegisterToVoteButton
                st={schoolSt}
                className={selection === "toss-up" ? "ml-4" : ""}
              />
            )}
        </div>
      </div>
    </div>
  );
};

//-------------------------------------------------------------------------
//
// Top-level component
//
//-------------------------------------------------------------------------

/** Render our primary user interface. */
export const More: React.FC = () => {
  const [result, setResult] = useState<StateSelectionResult | null>(null);

  const handleSelection = useCallback((result: StateSelectionResult) => {
    if (window.gtag) {
      window.gtag("event", "select_states", {
        event_category: "engagement",
        home_state: result.homeSt.toUpperCase(),
        school_state: result.schoolSt.toUpperCase(),
        selection: result.selection,
        swing: result.selection === "home" || result.selection === "school",
      });

      // @ts-ignore-next-line  The @types/facebook-pixel don't allow for
      // the possibility that facebook's script doesn't load properly.
      if (window.fbq) {
        // see https://developers.facebook.com/docs/meta-pixel/reference
        window.fbq("trackCustom", "SelectStates", {
          home_state: result.homeSt.toUpperCase(),
          school_state: result.schoolSt.toUpperCase(),
          selection: result.selection,
          swing: result.selection === "home" || result.selection === "school",
        });
      }
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
