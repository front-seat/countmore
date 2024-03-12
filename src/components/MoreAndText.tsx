import { useState } from "react";
import { type RegistrationHandler } from "../utils/analytics";
import { More } from "./More";

const QA: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div>{children}</div>
);

const Question: React.FC<React.PropsWithChildren> = ({ children }) => (
  <p className="font-cabinet font-extrabold text-[24px]">{children}</p>
);

const Answer: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="font-satoshi font-medium text-[20px] leading-[30px] pt-2 space-y-4">
    {children}
  </div>
);

const FrequentlyAskedQuestions: React.FC = () => (
  <div className="md:border-4 mt-4 md:m-4 border-transparent p-1 md:p-4 space-y-8">
    {/**-----------------------------------------------*/}
    <QA>
      <Question>Why does my vote count more in certain states?</Question>
      <Answer>
        <p>
          Your vote counts more in a swing state because it can swing the
          election.
        </p>
        <p>
          Swing states are states where the election is close and a small number
          of votes can change the outcome. For example, in 2020, Biden won the
          state of Georgia by a razor-thin margin of just 11,779 votes — and
          there are more than 300,000 college students in Georgia!
        </p>
      </Answer>
    </QA>
    {/**-----------------------------------------------*/}
    <QA>
      <Question>How do you decide which states count more?</Question>
      <Answer>
        <p>
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
      </Answer>
    </QA>
    {/**-----------------------------------------------*/}
    <QA>
      <Question>
        Can I legally register in my home state or school state?
      </Question>
      <Answer>
        <p>
          Yes, you can register in either state. Registering to vote in a new
          state will typically cancel your registration in any previous state.
          Voting in two states is illegal, being registered in two states is
          not.
        </p>
      </Answer>
    </QA>
    {/**-----------------------------------------------*/}
    <QA>
      <Question>Who built this site?</Question>
      <Answer>
        <p>
          Hi. We're{" "}
          <a
            href="https://frontseat.org/"
            target="_blank"
            className="underline cursor-pointer md:hover:text-gray-600 transition-colors duration-200"
          >
            Front Seat
          </a>
          , a group of civic tech builders based in sunny Seattle, Washington.
          We built this site in partnership with{" "}
          <a
            href="https://voteamerica.com/"
            target="_blank"
            className="underline cursor-pointer md:hover:text-gray-600 transition-colors duration-200"
          >
            VoteAmerica
          </a>
          , a trusted name in online voter registration.
        </p>
      </Answer>
    </QA>
  </div>
);

const MoreAndText: React.FC<{ handler: RegistrationHandler }> = ({
  handler,
}) => {
  const [showFAQ, setShowFAQ] = useState(true);

  return (
    <>
      <div className="border-4 mt-4 md:m-4 border-black p-4">
        <More handler={handler} onSelectStates={() => setShowFAQ(false)} />
      </div>
      {showFAQ && <FrequentlyAskedQuestions />}
    </>
  );
};

export default MoreAndText;
