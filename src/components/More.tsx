import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { assertNever } from "../utils/asserts";

import { stateSelection, type StateSelection } from "../election/powerRankings";
import {
  CANDIDATES_2020,
  ELECTION_2020,
  formatMargin,
  marginPercent,
  winner,
} from "../election/presidency";
import { STATE_NAMES, type State } from "../election/states";
import { bestRegistrationUrl } from "../election/voteGov";
import {
  fireClickRegisterEvent,
  fireSelectStatesEvent,
} from "../utils/analytics";
import { ArrowDown, CornerDownLeft, Share } from "./Icons";
import { browserSupportsShare, defaultShare } from "./ShareButton";

/** A state selection result. */
interface StateSelectionResult {
  /** The state selection */
  selection: StateSelection;

  /** The home state */
  homeState: State;

  /** The school state */
  schoolState: State;
}

/** Return the selected state for a result. */
const selectedState = (result: StateSelectionResult): State =>
  result.selection === "home" ? result.homeState : result.schoolState;

/** Return the selected state name for a result. */
const selectedStateName = (result: StateSelectionResult): string =>
  STATE_NAMES[selectedState(result)];

/** Return the 'other' state for a result. */
const otherState = (result: StateSelectionResult): State =>
  result.selection === "home" ? result.schoolState : result.homeState;

/** Return the 'other' state name for a result. */
const otherStateName = (result: StateSelectionResult): string =>
  STATE_NAMES[otherState(result)];

/** Return the 'home' state name for a result. */
const homeStateName = (result: StateSelectionResult): string =>
  STATE_NAMES[result.homeState];

/** Return the 'school' state name for a result. */
const schoolStateName = (result: StateSelectionResult): string =>
  STATE_NAMES[result.schoolState];

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
  const [homeState, setHomeState] = useState<State | "">("");
  const [schoolState, setSchoolState] = useState<State | "">("");

  return (
    <form
      className="flex flex-col space-y-[1.7rem]"
      onSubmit={(e) => {
        e.preventDefault();
        if (!homeState || !schoolState) return;
        onSelect({
          selection: stateSelection(homeState, schoolState),
          homeState,
          schoolState,
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
          value={homeState}
          onChange={setHomeState}
          label="Home state"
          className="xl:flex-grow"
        />
        <StateDropdown
          id="school-state"
          value={schoolState}
          onChange={setSchoolState}
          label="School state"
          className="xl:flex-grow"
        />
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex-none">
          <ShareButton />
        </div>
        <div className="flex-1 flex flex-row flex-wrap justify-end">
          <SubmitButton disabled={!homeState || !schoolState} />
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
const RegisterToVoteButton: React.FC<{ state: State; className?: string }> = ({
  state,
  className,
}) => {
  const url = bestRegistrationUrl(state);

  const handleRegistrationClick = useCallback(
    (e: React.MouseEvent, st: State, url: string) => {
      e.preventDefault();
      fireClickRegisterEvent({ state: st, next: "voteamerica" });
      // TODO voteamerica
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
      href={bestRegistrationUrl(state)!}
      target="_blank"
      onClick={(e) => handleRegistrationClick(e, state, url)}
      aria-label={`Follow this link to register to vote in ${STATE_NAMES[state]}`}
    >
      Register to vote in{" "}
      <span className="font-cabinet inline-block w-8 min-w-8 max-w-8">
        {state.toUpperCase()}
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
  const { selection, homeState, schoolState } = result;

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
          {selection !== "school" && bestRegistrationUrl(homeState) && (
            <RegisterToVoteButton state={homeState} />
          )}
          {selection !== "home" &&
            selection !== "same" &&
            bestRegistrationUrl(schoolState) && (
              <RegisterToVoteButton
                state={schoolState}
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
    fireSelectStatesEvent(result);
    setResult(result);
  }, []);

  return result ? (
    <DescribeSelection result={result} />
  ) : (
    <SelectStates onSelect={handleSelection} />
  );
};

export default More;
