import { isBattleground, type StateSelection } from "../election/powerRankings";
import { type State } from "../election/states";

/** Invoke Google's tag manager safely. */
const fireGoogle: Gtag.Gtag = <Command extends keyof Gtag.GtagCommands>(
  command: Command,
  ...args: Gtag.GtagCommands[Command]
) => {
  try {
    if (window.gtag) {
      window.gtag(command, ...args);
    }
  } catch (e) {
    console.error(e);
  }
};

/** Invoke Meta's pixel with a custom event, safely. */
const fireMetaCustom = (
  eventName: string,
  parameters: facebook.Pixel.CustomParameters,
  option?: facebook.Pixel.EventIDOptions
) => {
  try {
    // @ts-ignore-next-line  The @types/facebook-pixel package doesn't allow
    // for the possibility that facebook's script didn't load properly.
    if (window.fbq) {
      window.fbq(
        "trackCustom",
        eventName,
        { kind: eventName, ...parameters },
        option
      );
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * The "select states" event type. This event is fired after a user selects
 * two states and clicks to get the results.
 */
export interface SelectStatesEvent {
  homeState: State;
  schoolState: State;
  selection: StateSelection;
}

/** Fire the select states event. */
export const fireSelectStatesEvent = (event: SelectStatesEvent) => {
  const swing = event.selection === "home" || event.selection === "school";
  fireGoogle("event", "select_states", {
    event_category: "engagement",
    swing,
    ...event,
  });
  fireMetaCustom("SelectStates", {
    swing,
    ...event,
  });
};

/**
 * The "click register" event type. This event is fired when a user clicks a
 * register to vote button.
 */
export interface ClickRegisterEvent {
  /** The state the user clicked to register in. */
  state: State;

  /** Where we plan to take them next. */
  next: "direct" | "voteamerica" | "rockthevote";
}

/** Fire the click register event. */
export const fireClickRegisterEvent = (event: ClickRegisterEvent) => {
  const battleground = isBattleground(event.state);
  fireGoogle("event", "click_register", {
    event_category: "engagement",
    battleground,
    ...event,
  });
  fireMetaCustom("ClickRegister", {
    battleground,
    ...event,
  });
};
