import { useState } from "react";
import { type RegistrationHandler } from "../utils/analytics";
import { More } from "./More";

const MoreAndText: React.FC<{ handler: RegistrationHandler }> = ({
  handler,
}) => {
  const [showText, setShowText] = useState(true);

  return (
    <>
      <div className="border-4 mt-4 md:m-4 border-black p-4">
        <More handler={handler} onSelectStates={() => setShowText(false)} />
      </div>
      {showText && (
        <div className="md:border-4 mt-4 md:m-4 border-transparent p-1 md:p-4">
          <p className="font-cabinet font-extrabold text-[24px]">
            Why does my vote count more in certain states?
          </p>
          <p className="font-satoshi font-medium text-[20px] leading-[30px] pt-2">
            Your vote counts more in a swing state because it might swing the
            election.
          </p>
          <p className="font-satoshi font-medium text-[20px] leading-[30px] pt-4">
            Swing states are states where the election is close and a small
            number of votes can change the outcome. For example, in 2020, Biden
            won the state of Georgia by a razor-thin margin of just 11,779 votes
            — and there are more than 300,000 college students in Georgia!
          </p>
          <p className="font-cabinet font-extrabold text-[24px] pt-8">
            How do you decide which states count more?
          </p>
          <p className="font-satoshi font-medium text-[20px] leading-[30px] pt-2">
            Our list of swing states is from the{" "}
            <a
              href="https://www.cookpolitical.com/ratings/presidential-race-ratings"
              target="_blank"
              className="underline cursor-pointer md:hover:text-gray-600 transition-colors duration-200"
            >
              2024 Cook Political Report
            </a>
            .
          </p>
          <p className="font-satoshi font-medium text-[20px] leading-[30px] pt-4">
            There are many other important House and Senate races on the ballot
            this November. Wherever you live, your vote counts.
          </p>
          <p className="font-cabinet font-extrabold text-[24px] pt-8">
            Can I legally register in my home state or school state?
          </p>
          <p className="font-satoshi font-medium text-[20px] leading-[30px] pt-2">
            Yes, you can register in either state provided that you have a
            long-term intent to live in that state. Registering to vote in a new
            state will typically cancel your registration in any previous state.
            And even though we know you’d never do this, you can’t vote in two
            states.
          </p>
          <p className="font-cabinet font-extrabold text-[24px] pt-8">
            Are there efforts to change the electoral college?
          </p>
          <p className="font-satoshi font-medium text-[20px] leading-[30px] pt-2">
            States can agree to award their electoral college votes to the
            winner of the national popular vote by joining the{" "}
            <a
              href="https://www.nationalpopularvote.com/"
              target="_blank"
              className="underline cursor-pointer md:hover:text-gray-600 transition-colors duration-200"
            >
              National Popular Vote Interstate Compact
            </a>
            .
          </p>
          <p className="font-satoshi font-medium text-[20px] leading-[30px] pt-2">
            If enough states do this, the President would be elected by popular
            vote rather than the electoral college &mdash; and each person's
            vote would count the same no matter where they lived.
          </p>
          <p className="font-cabinet font-extrabold text-[24px] pt-8">
            Who built this site?
          </p>
          <p className="font-satoshi font-medium text-[20px] leading-[30px] pt-2">
            Hi. We're{" "}
            <a
              href="https://frontseat.org/"
              target="_blank"
              className="underline cursor-pointer md:hover:text-gray-600 transition-colors duration-200"
            >
              Front Seat
            </a>
            , a group of civic tech builders based in sunny Seattle, Washington.
            We've built this site in partnership with{" "}
            <a
              href="https://voteamerica.com/"
              target="_blank"
              className="underline cursor-pointer md:hover:text-gray-600 transition-colors duration-200"
            >
              VoteAmerica
            </a>
            , a trusted name in online voter registration.
          </p>
        </div>
      )}
    </>
  );
};

export default MoreAndText;
