import React, { useEffect, useState } from "react";

/** Return `true` if this browser has native sharing panel support. */
export const browserSupportsShare = () =>
  Boolean(window.navigator && window.navigator.share);

/** Invoke a generic native share, if safe. */
export const nativeShare = (title: string, text: string, url: string) => {
  if (browserSupportsShare()) {
    navigator.share({
      title,
      text,
      url,
    });
  }
};

/** Share the default countmore information if possible. */
export const defaultShare = () =>
  nativeShare(
    "Count More",
    "Every vote counts... but some count more. Find out where *your* vote counts more in 2024.",
    "https://countmore.us"
  );

const ShareButton: React.FC = () => {
  const [showShare, setShowShare] = useState<boolean>(false);

  useEffect(() => {
    // @ts-ignore-next-line
    setShowShare(window.navigator && window.navigator.share);
  }, []);

  if (!showShare) return null;

  return (
    <button
      className="bg-black py-4 px-8 text-white text-xl font-bold md:hover:bg-red-500"
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
