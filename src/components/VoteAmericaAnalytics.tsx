import { useCallback, useEffect } from "react";
import { isValidState, type State } from "../election/states";
import {
  fireRegisterFinishEvent,
  fireRegisterFollowUpEvent,
  fireRegisterStartEvent,
  fireVerifyFinishEvent,
  fireVerifyStartEvent,
  type RegisterFinishMethod,
  type RegisterFollowUpMethod,
  type VoterUser,
} from "../utils/analytics";
import { assertNever } from "../utils/asserts";

/**
 * VoteAmerica "start register" event, when a user submits the Register tool's
 * intake form.
 *
 * See https://docs.voteamerica.com/software/events/#register-tool
 */
interface RegisterStartEvent extends VoterUser {
  event: "action-start";
  tool: "register";
}

/**
 * VoteAmerica "start verify" event, when a user submits the Verify tool's
 * intake form.
 *
 * See https://docs.voteamerica.com/software/events/#verify-tool
 */
interface VerifyStartEvent extends VoterUser {
  event: "action-start";
  tool: "verify";
}

/** Details about what took place during the VA+ form flow. */
type FinishMethod =
  /** The user clicked a link to visit a state-hosted online voter site. */
  | "external"

  /** The user received an email with a PDF registration form to print and mail. */
  | "pdf"

  /**
   * The user lives in a state where online and PDF are unabvailable.
   *
   * Examples:
   *
   * North Dakota doesn't have voter registration, so nothing is required.
   *
   * New Hampshire requires in-person registration, so the user is shown details
   * about how to register on Election Day.
   */
  | "ineligible-state"

  /** The user is too young to register, so they were sent to futurevoter.com. */
  | "redirect-to-future-voter";

/**
 * VoteAmerica "finish register" event, when the user has completed the
 * full VoteAmerica form flow.
 *
 * See https://docs.voteamerica.com/software/events/#register-tool
 */
interface RegisterFinishEvent extends VoterUser {
  event: "action-finish";
  tool: "register";

  /** Method used to register. */
  method: FinishMethod;

  /** URL that the user was directed to, if any. */
  url?: string;
}

/**
 * VoteAmerica "finish verify" event, when the user has completed the
 * full VoteAmerica form flow.
 *
 * See https://docs.voteamerica.com/software/events/#verify-tool
 */
interface VerifyFinishEvent extends VoterUser {
  event: "action-finish";
  tool: "verify";
}

/** Details about user follow-up actions, well after the VA+ form flow. */
type FollowUpMethod =
  /**
   * The user visited an external site and came back to "confirm" that they
   * successfully registered. Confirmation is an honor system.
   */
  | "external-confirmed"

  /**
   * After clicking a link to visit a state online reigstration site, the user
   * reurned and decided to register by mail instead. They received a PDF email.
   */
  | "pdf";

/**
 * VoteAmerica "follow-up register" event, when the user has completed the
 * full VoteAmerica form flow and has taken a follow-up action.
 *
 * See https://docs.voteamerica.com/software/events/#register-tool
 */
interface RegisterFollowUpEvent extends VoterUser {
  event: "action-follow-up";
  tool: "register";

  /** Method used to register. */
  method: FollowUpMethod;

  /** URL that the user was directed to, if any. */
  url?: string;
}

/** All registration event types. */
type RegisterEvent =
  | RegisterStartEvent
  | RegisterFinishEvent
  | RegisterFollowUpEvent;

/** All verification event types. */
type VerifyEvent = VerifyStartEvent | VerifyFinishEvent;

/** The VoteAmerica event type. */
type VoteAmericaEvent = CustomEvent<{
  data: RegisterEvent | VerifyEvent;
  embedEl: HTMLDivElement;
  iFrame: HTMLIFrameElement;
}>;

/** Convert a VoteAmerica finish method into a countmore finish method. */
const finishMethodToCountMore = (
  method: FinishMethod
): RegisterFinishMethod => {
  switch (method) {
    case "external":
      return "online";
    case "pdf":
      return "paper";
    case "ineligible-state":
    case "redirect-to-future-voter":
      return "ineligible";
    default:
      assertNever(method);
      throw new Error("Unreachable");
  }
};

/** Convert a VoteAmerica follow-up method into a countmore follow-up method. */
const followUpMethodToCountMore = (
  method: FollowUpMethod
): RegisterFollowUpMethod => {
  switch (method) {
    case "external-confirmed":
      return "confirm-online";
    case "pdf":
      return "request-paper";
    default:
      assertNever(method);
      throw new Error("Unreachable");
  }
};

/** Listen to VoteAmerica reigster tool events. */
const registerListener = (data: RegisterEvent, intended: State) => {
  switch (data.event) {
    case "action-start":
      console.log("RegisterStartEvent", data);
      fireRegisterStartEvent({
        state: data.state,
        intended,
        handler: "voteamerica",
      });
      break;
    case "action-finish":
      console.log("RegisterFinishEvent", data);
      fireRegisterFinishEvent({
        state: data.state,
        intended,
        method: finishMethodToCountMore(data.method),
        handler: "voteamerica",
      });
      break;
    case "action-follow-up":
      console.log("RegisterFollowUpEvent", data);
      fireRegisterFollowUpEvent({
        state: data.state,
        intended,
        method: followUpMethodToCountMore(data.method),
        handler: "voteamerica",
      });
      break;
    default:
      assertNever(data);
  }
};

/** Listen to VoteAmerica verify tool events. */
const verifyListener = (data: VerifyEvent, intended: State) => {
  switch (data.event) {
    case "action-start":
      console.log("VerifyStartEvent", data);
      fireVerifyStartEvent({
        state: data.state,
        intended,
        handler: "voteamerica",
      });
      break;
    case "action-finish":
      console.log("VerifyFinishEvent", data);
      fireVerifyFinishEvent({
        state: data.state,
        intended,
        handler: "voteamerica",
      });
      break;
    default:
      assertNever(data);
  }
};

/** Listen to VoteAmerica events and manage them. */
const listener = (event: VoteAmericaEvent, intended: State) => {
  const { data } = event.detail;
  switch (data.tool) {
    case "register":
      registerListener(data, intended);
      break;
    case "verify":
      verifyListener(data, intended);
      break;
    default:
      assertNever(data);
  }
};

const useVoteAmericaAnalytics = (intended: State) => {
  const wrapListener = useCallback(
    (event: VoteAmericaEvent) => listener(event, intended),
    []
  );

  useEffect(() => {
    window.addEventListener("VoteAmericaEvent", wrapListener as EventListener);
    return () =>
      window.removeEventListener(
        "VoteAmericaEvent",
        wrapListener as EventListener
      );
  }, []);
};

const VoteAmericaAnalytics: React.FC = () => {
  // get the "state" URL parameter from the current window.location
  // and convert it to a State enum value
  const url = new URL(window.location.href);
  const state = url.searchParams.get("state");
  if (!isValidState(state)) {
    // we shouldn't be here, it seems?
    window.location.href = "/";
    return;
  }
  useVoteAmericaAnalytics(state);
  return <></>;
};

export default VoteAmericaAnalytics;
