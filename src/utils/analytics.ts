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
  // snake_case seems natural in both the google and meta contexts.
  const snake_case = {
    home_state: event.homeState,
    school_state: event.schoolState,
    selection: event.selection,
  };
  fireGoogle("event", "select_states", {
    event_category: "engagement",
    swing,
    ...snake_case,
  });
  fireMetaCustom("SelectStates", {
    swing,
    ...snake_case,
  });
};

/** The three supported registration handlers. */
export type RegistrationHandler = "direct" | "voteamerica" | "rockthevote";

/**
 * The "click register" event type. This event is fired when a user clicks a
 * register to vote button.
 */
export interface ClickRegisterEvent {
  /** The state the user clicked to register in. */
  state: State;

  /** Where we plan to take them next. */
  handler: RegistrationHandler;
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

/**
 * The "click to verify" event type. This event is fired when a user clicks a
 * 'verify registration' button.
 */
export interface ClickVerifyEvent {
  /** The state the user clicked to verify in. */
  state: State;

  /** Where we plan to take them next. */
  handler: RegistrationHandler;
}

/** Fire the click to verify event. */
export const fireClickVerifyEvent = (event: ClickVerifyEvent) => {
  const battleground = isBattleground(event.state);
  fireGoogle("event", "click_verify", {
    event_category: "engagement",
    battleground,
    ...event,
  });
  fireMetaCustom("ClickVerify", {
    battleground,
    ...event,
  });
};

/** Generic information about the registering user. */
export interface VoterUser {
  /** The user's state of registration. */
  state: State;

  /** The *intended* state of registration. Some forms may allow divergence. */
  intended: State;
}

/**
 * The "start registration form" event type. This event is fired when a user
 * starts filling out a registration form -- any form.
 */
export interface RegisterStartEvent extends VoterUser {
  handler: RegistrationHandler;
}

/** Fire the start registration form event. */
export const fireRegisterStartEvent = (event: RegisterStartEvent) => {
  const battleground = isBattleground(event.state);
  fireGoogle("event", "register_start", {
    event_category: "engagement",
    battleground,
    ...event,
  });
  fireMetaCustom("RegisterStart", {
    battleground,
    ...event,
  });
};

/**
 * The "start verify form" event type. This event is fired when a user
 * starts filling out a verify form -- any form.
 */
export interface VerifyStartEvent extends VoterUser {
  handler: RegistrationHandler;
}

/** Fire the start verify form event. */
export const fireVerifyStartEvent = (event: VerifyStartEvent) => {
  const battleground = isBattleground(event.state);
  fireGoogle("event", "verify_start", {
    event_category: "engagement",
    battleground,
    ...event,
  });
  fireMetaCustom("VerifyStart", {
    battleground,
    ...event,
  });
};

/** The three common outcomes in registration. */
export type RegisterFinishMethod = "online" | "paper" | "ineligible";

/**
 * The "finish registration form" event type. This event is fired when a user
 * completes a registration form -- any form.
 */
export interface RegisterFinishEvent extends VoterUser {
  handler: RegistrationHandler;
  method: RegisterFinishMethod;
  url?: string;
}

/** Fire the finish registration form event. */
export const fireRegisterFinishEvent = (event: RegisterFinishEvent) => {
  const battleground = isBattleground(event.state);
  fireGoogle("event", "register_finish", {
    event_category: "engagement",
    battleground,
    ...event,
  });
  fireMetaCustom("RegisterFinish", {
    battleground,
    ...event,
  });
};

/**
 * The "finish verify form" event type. This event is fired when a user
 * completes a verify form -- any form.
 */
export interface VerifyFinishEvent extends VoterUser {
  handler: RegistrationHandler;
}

/** Fire the finish verify form event. */
export const fireVerifyFinishEvent = (event: VerifyFinishEvent) => {
  const battleground = isBattleground(event.state);
  fireGoogle("event", "verify_finish", {
    event_category: "engagement",
    battleground,
    ...event,
  });
  fireMetaCustom("VerifyFinish", {
    battleground,
    ...event,
  });
};

/** The two common follow-up actions. */
export type RegisterFollowUpMethod = "confirm-online" | "request-paper";

/**
 * The "follow up registration" event type. This event is fired when a user
 * takes some kind of follow up action.
 */
export interface RegisterFollowUpEvent extends VoterUser {
  handler: RegistrationHandler;
  method: RegisterFollowUpMethod;
  url?: string;
}

/** Fire the follow up registration event. */
export const fireRegisterFollowUpEvent = (event: RegisterFollowUpEvent) => {
  const battleground = isBattleground(event.state);
  fireGoogle("event", "register_follow_up", {
    event_category: "engagement",
    battleground,
    ...event,
  });
  fireMetaCustom("RegisterFollowUp", {
    battleground,
    ...event,
  });
};
