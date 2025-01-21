export interface ChipModel {
  icon: React.ReactNode;
  text: string;
  value: string;
  maxCountCharacters: number;
  placeholderText?: string;
  preText?: string;
}

export const chips: ChipModel[] = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current"
        aria-labelledby="Music Styled"
      >
        <title>Music Styled</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.97852 18.8007C8.99272 18.7241 9 18.641 9 18.5512V18.5V8C9 8 13.0263 7.23253 14 7C14.4512 6.89226 15 6.51789 15 5.93171V4.17317C15 3.38226 14.2639 2.81827 13.5394 3.05418L7.78944 4.81272C7.31978 4.96567 7 5.41894 7 5.93171V16.1423C6.68722 16.0501 6.35064 16 6 16C4.34315 16 3 17.1193 3 18.5C3 19.8807 4.34315 21 6 21C7.53473 21 8.80029 20.0396 8.97852 18.8007Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 10C15 9.44772 15.4477 9 16 9H20C20.5523 9 21 9.44772 21 10C21 10.5523 20.5523 11 20 11H16C15.4477 11 15 10.5523 15 10ZM13 14C13 13.4477 13.4477 13 14 13H20C20.5523 13 21 13.4477 21 14C21 14.5523 20.5523 15 20 15H14C13.4477 15 13 14.5523 13 14ZM14 17C13.4477 17 13 17.4477 13 18C13 18.5523 13.4477 19 14 19H20C20.5523 19 21 18.5523 21 18C21 17.4477 20.5523 17 20 17H14Z"
          fill="currentColor"
        />
      </svg>
    ),
    text: "Music Styled",
    value: "musicStyled",
    maxCountCharacters: 200,
    placeholderText: "Www.Spotify.com",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current"
        aria-labelledby="Food Served"
      >
        <title>Food Served</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 15V20C2 21.6569 4.23858 23 7 23C8.9791 23 10.6896 22.3101 11.5 21.3092C12.3104 22.3101 14.0209 23 16 23C18.7614 23 21 21.6569 21 20V15C21 13.3431 18.7614 12 16 12C14.0209 12 12.3104 12.6899 11.5 13.6908C10.6896 12.6899 8.9791 12 7 12C4.23858 12 2 13.3431 2 15ZM16 17C18.281 17 20 15.9686 20 15C20 14.0314 18.281 13 16 13C13.719 13 12 14.0314 12 15C12 15.9686 13.719 17 16 17ZM11 15C11 14.0314 9.281 13 7 13C4.719 13 3 14.0314 3 15C3 15.9686 4.719 17 7 17C9.281 17 11 15.9686 11 15Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.6609 2.02107C19.8361 2.52971 19.5657 3.08401 19.0571 3.25915C19.049 3.26193 19.0409 3.26461 19.0327 3.26717L2.33572 8.52934C2.07035 8.61297 1.78665 8.46995 1.69606 8.20687C1.60547 7.94378 1.74098 7.65642 2.00159 7.55894L18.3987 1.42588C18.9026 1.23743 19.4638 1.4931 19.6523 1.99696C19.6552 2.00496 19.6581 2.013 19.6609 2.02107ZM20.9716 6.55165C21.065 7.08142 20.7113 7.58661 20.1815 7.68002C20.1731 7.68151 20.1646 7.68288 20.1562 7.68414L2.84157 10.2695C2.56638 10.3106 2.30855 10.125 2.26023 9.85097C2.21191 9.57695 2.3907 9.31432 2.66336 9.25881L19.818 5.76634C20.3452 5.65902 20.8595 5.99935 20.9668 6.52647C20.9685 6.53485 20.9701 6.54324 20.9716 6.55165ZM16.0001 16C16.8285 16 17.5001 15.5523 17.5001 15C17.5001 14.4477 16.8285 14 16.0001 14C15.1716 14 14.5001 14.4477 14.5001 15C14.5001 15.5523 15.1716 16 16.0001 16ZM8.50007 15C8.50007 15.5523 7.82849 16 7.00007 16C6.17164 16 5.50007 15.5523 5.50007 15C5.50007 14.4477 6.17164 14 7.00007 14C7.82849 14 8.50007 14.4477 8.50007 15Z"
          fill="currentColor"
        />
      </svg>
    ),
    text: "Food Served",
    value: "foodServed",
    maxCountCharacters: 200,
    placeholderText: "Chinese Food like Dumplings",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current"
        aria-labelledby="BYOY"
      >
        <title>BYOY</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 18V22C8 22.5523 8.44772 23 9 23H15C15.5523 23 16 22.5523 16 22V10.4142C16 10.149 15.8946 9.89464 15.7071 9.70711L14.2929 8.29289C14.1054 8.10536 14 7.851 14 7.58579V5C14 4.44772 13.5523 4 13 4H11C10.4477 4 10 4.44772 10 5V7.58579C10 7.851 9.89464 8.10536 9.70711 8.29289L8.29289 9.70711C8.10536 9.89464 8 10.149 8 10.4142V13H12V18H8Z"
          fill="currentColor"
        />
        <rect x="10" y="1" width="4" height="2" rx="1" fill="currentColor" />
      </svg>
    ),
    text: "BYOY",
    value: "byoy",
    maxCountCharacters: 200,
    placeholderText:
      "Yes, it's BYOB! Feel free to bring whatever you’d like to drink.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current"
        aria-labelledby="Dress Code"
      >
        <title>Dress Code</title>
        <path
          d="M16.0722 21.7006C15.9771 23.1833 8.02338 23.0991 7.92236 21.7006C7.63066 14.0682 8.79639 11.19 9.16483 8.56434C9.25398 7.92998 8.46906 6.80236 8.27345 6.01795C7.85547 4.36045 8.4542 2.91192 7.85547 1.54514L8.71914 1.21875C9.20645 3.12038 10.4921 4.47877 12.0015 4.47877C13.5109 4.47877 14.7965 3.12038 15.2838 1.21875L16.1475 1.54509C15.5487 2.91192 16.1475 4.36041 15.7295 6.01791C15.5314 6.80236 14.747 7.92994 14.8381 8.56434C15.1981 11.1905 16.3639 14.0687 16.0722 21.7006Z"
          fill="currentColor"
        />
      </svg>
    ),
    text: "Dress Code",
    value: "dressCode",
    maxCountCharacters: 200,
    placeholderText: "It’s a red theme—get creative with your outfit!",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current"
        aria-labelledby="Registry"
      >
        <title>Registry</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7V8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8V7ZM4 12C4 11.4477 4.44772 11 5 11H10C10.5523 11 11 11.4477 11 12V19C11 19.5523 10.5523 20 10 20H5C4.44772 20 4 19.5523 4 19V12ZM14 11C13.4477 11 13 11.4477 13 12V19C13 19.5523 13.4477 20 14 20H19C19.5523 20 20 19.5523 20 19V12C20 11.4477 19.5523 11 19 11H14Z"
          fill="currentColor"
        />
        <path
          d="M14.4454 2.16796C14.9049 1.86161 15.5258 1.98579 15.8322 2.44531C16.1385 2.90484 16.0143 3.52571 15.5548 3.83206L12.0001 6.20187L8.44541 3.83206C7.98588 3.52571 7.8617 2.90484 8.16806 2.44531C8.47441 1.98579 9.09528 1.86161 9.55481 2.16796L12.0001 3.79816L14.4454 2.16796Z"
          fill="currentColor"
        />
      </svg>
    ),
    text: "Registry",
    value: "registry",
    maxCountCharacters: 200,
    placeholderText: "",
    preText: "Find it here:",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="fill-current"
        aria-labelledby="Special Group"
      >
        <title>Special Group</title>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 7C5 9.20914 6.79086 11 9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7ZM15 11C15 12.6569 16.3431 14 18 14C19.6569 14 21 12.6569 21 11C21 9.34315 19.6569 8 18 8C16.3431 8 15 9.34315 15 11Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.98334 13C4.26191 13 0.388259 15.4265 0.000651684 20.1992C-0.0204618 20.4592 0.476712 21 0.727502 21H17.2467C17.9979 21 18.0096 20.3955 17.9979 20.2C17.7049 15.2932 13.7712 13 8.98334 13ZM23.4559 21H19.6C19.6 18.7491 18.8563 16.6718 17.6012 15.0006C21.0077 15.0379 23.7892 16.7601 23.9985 20.4C24.0069 20.5466 23.9985 21 23.4559 21Z"
          fill="currentColor"
        />
      </svg>
    ),
    text: "Special Group",
    value: "specialGroup",
    maxCountCharacters: 200,
    placeholderText:
      "No, this is a casual get-together for friends and family.",
  },
];
