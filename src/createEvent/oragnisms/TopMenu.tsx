import ThemesMenu from "@/createEvent/molecules/ThemesMenu";
import { useCreateEventTheme } from "@/providers/themeProvider";
import React from "react";

const TopMenu: React.FC = () => {
  const [isClicked, setIsClicked] = React.useState({
    style: false,
    settings: false,
    preview: false,
  });

  const handleClick = (target: "style" | "settings" | "preview") => {
    setIsClicked((prevState) => ({
      style: target === "style" ? !prevState.style : false,
      settings: target === "settings" ? !prevState.settings : false,
      preview: target === "preview" ? !prevState.preview : false,
    }));
  };

  const { theme } = useCreateEventTheme();
  return (
    <div className="relative flex flex-col w-min">
      <div
        className={`backdrop-blur-2xl w-max justify-start items-center flex py-6 divide-x-[1px] ${theme.dividerColor} ${theme.inputBgColor} ${theme.textColor} text-base font-medium`}
      >
        <button
          type="button"
          className="flex items-center gap-[18px] px-4 leading-tight"
          onClick={() => handleClick("style")}
        >
          <div
            className={`bg-blue-800 h-10 w-10 rounded-full ${theme.pageBgImage}`}
          />
          <span>STYLE</span>
        </button>
        <button
          type="button"
          className="flex items-center gap-[18px] px-4 leading-tight"
          onClick={() => handleClick("settings")}
        >
          <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Settings</title>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M30.7839 10.4652C31.7661 10.7685 32.705 11.1585 33.6006 11.6352L37.5721 9.25183C37.9862 9.00345 38.4714 8.90053 38.9507 8.95941C39.43 9.01829 39.8759 9.2356 40.2176 9.57683L42.4233 11.7825C42.7645 12.1242 42.9818 12.5701 43.0407 13.0494C43.0996 13.5287 42.9966 14.0139 42.7483 14.428L40.3649 18.3995C40.8416 19.2951 41.2316 20.2339 41.5349 21.2162L46.0264 22.3407C46.495 22.458 46.9108 22.7286 47.208 23.1094C47.5052 23.4902 47.6666 23.9593 47.6666 24.4423L47.6666 27.558C47.6666 28.041 47.5052 28.5102 47.208 28.8909C46.9108 29.2717 46.495 29.5423 46.0264 29.6597L41.5349 30.7842C41.2316 31.7664 40.8416 32.7053 40.3649 33.6008L42.7483 37.5723C42.9966 37.9865 43.0996 38.4717 43.0407 38.951C42.9818 39.4303 42.7645 39.8761 42.4233 40.2178L40.2176 42.4235C39.8759 42.7647 39.43 42.982 38.9507 43.0409C38.4714 43.0998 37.9862 42.9969 37.5721 42.7485L33.6006 40.3652C32.705 40.8418 31.7661 41.2318 30.7839 41.5352L29.6594 46.0267C29.542 46.4952 29.2715 46.9111 28.8907 47.2082C28.5099 47.5054 28.0408 47.6668 27.5578 47.6668L24.4421 47.6668C23.9591 47.6668 23.4899 47.5054 23.1091 47.2082C22.7284 46.9111 22.4578 46.4952 22.3404 46.0267L21.2159 41.5352C20.2424 41.2343 19.2994 40.8426 18.3993 40.3652L14.4278 42.7485C14.0136 42.9969 13.5284 43.0998 13.0491 43.0409C12.5698 42.982 12.1239 42.7647 11.7823 42.4235L9.57659 40.2178C9.23535 39.8761 9.01804 39.4303 8.95916 38.951C8.90028 38.4717 9.0032 37.9865 9.25159 37.5723L11.6349 33.6008C11.1575 32.7007 10.7658 31.7577 10.4649 30.7842L5.97342 29.6597C5.50524 29.5424 5.08963 29.2721 4.7925 28.8918C4.49538 28.5115 4.33375 28.0428 4.33325 27.5602L4.33325 24.4445C4.33326 23.9615 4.49467 23.4923 4.79184 23.1115C5.089 22.7308 5.50488 22.4602 5.97342 22.3428L10.4649 21.2183C10.7683 20.2361 11.1583 19.2972 11.6349 18.4017L9.25159 14.4302C9.0032 14.016 8.90028 13.5308 8.95916 13.0515C9.01804 12.5722 9.23535 12.1263 9.57659 11.7847L11.7823 9.57683C12.1239 9.2356 12.5698 9.01829 13.0491 8.95941C13.5284 8.90053 14.0136 9.00345 14.4278 9.25183L18.3993 11.6352C19.2948 11.1585 20.2337 10.7685 21.2159 10.4652L22.3404 5.97366C22.4577 5.50549 22.7279 5.08988 23.1083 4.79275C23.4886 4.49562 23.9573 4.33399 24.4399 4.3335L27.5556 4.3335C28.0386 4.33351 28.5078 4.49492 28.8885 4.79208C29.2693 5.08925 29.5399 5.50513 29.6573 5.97366L30.7839 10.4652ZM25.9999 34.6668C28.2985 34.6668 30.5029 33.7537 32.1282 32.1284C33.7535 30.5031 34.6666 28.2987 34.6666 26.0002C34.6666 23.7016 33.7535 21.4972 32.1282 19.8719C30.5029 18.2466 28.2985 17.3335 25.9999 17.3335C23.7014 17.3335 21.497 18.2466 19.8717 19.8719C18.2463 21.4972 17.3333 23.7016 17.3333 26.0002C17.3333 28.2987 18.2463 30.5031 19.8717 32.1284C21.497 33.7537 23.7014 34.6668 25.9999 34.6668Z"
              fill="white"
            />
          </svg>
          <span>SETTING</span>
        </button>
        <button
          type="button"
          className="flex items-center gap-[18px] px-4 leading-tight"
          onClick={() => handleClick("preview")}
        >
          <svg
            width="52"
            height="52"
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Preview</title>
            <mask
              id="mask0_338_13481"
              className="mask-type:luminance"
              maskUnits="userSpaceOnUse"
              x="3"
              y="12"
              width="46"
              height="28"
            >
              <path
                d="M25.9999 39C37.9664 39 47.6666 26 47.6666 26C47.6666 26 37.9664 13 25.9999 13C14.0334 13 4.33325 26 4.33325 26C4.33325 26 14.0334 39 25.9999 39Z"
                fill="white"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M25.9999 31.4168C27.4365 31.4168 28.8143 30.8461 29.8301 29.8303C30.8459 28.8145 31.4166 27.4368 31.4166 26.0002C31.4166 24.5636 30.8459 23.1858 29.8301 22.17C28.8143 21.1542 27.4365 20.5835 25.9999 20.5835C24.5633 20.5835 23.1856 21.1542 22.1698 22.17C21.1539 23.1858 20.5833 24.5636 20.5833 26.0002C20.5833 27.4368 21.1539 28.8145 22.1698 29.8303C23.1856 30.8461 24.5633 31.4168 25.9999 31.4168Z"
                fill="black"
                stroke="black"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </mask>
            <g mask="url(#mask0_338_13481)">
              <path
                d="M0 0L52 1.2122e-10L52 52L-1.2122e-10 52L0 0Z"
                fill="white"
              />
            </g>
          </svg>
          <span>PREVIEW</span>
        </button>
      </div>
      {isClicked.style && <ThemesMenu />}
    </div>
  );
};

export default TopMenu;
