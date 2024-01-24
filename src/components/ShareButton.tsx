import React, { useEffect, useState } from "react";

const ShareButton: React.FC = () => {
  const [showShare, setShowShare] = useState<boolean>(false);

  useEffect(() => {
    // @ts-ignore-next-line
    setShowShare(window.navigator && window.navigator.share);
  }, []);

  if (!showShare) return null;

  return (
    <button
      className="bg-black py-4 px-8 text-white text-xl font-bold hover:bg-red-500"
      onClick={() => {
        navigator.share({
          title: "Count More",
          text: "Every vote counts... but some count more. Find out where *your* vote counts more in 2024.",
          url: "https://countmore.us",
        });
      }}
    >
      Share
    </button>
  );
};

export default ShareButton;
