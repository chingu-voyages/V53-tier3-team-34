import type React from "react";

interface ShareModalProps {
  shareLink: string;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ shareLink, onClose }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white w-[560%] h-[50%] max-w-[700px] max-h-[700px] p-2  shadow-lg flex flex-col justify-center
     sm:w-[550%] sm:h-[50%] lg:w-[50%] lg:h-[50%] items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="151"
          height="205"
          viewBox="0 0 151 205"
          fill="none"
        >
          <title>Share</title>
          <path
            d="M111.268 172.857L89.3645 112.317C98.8705 106.228 105.179 95.6265 105.179 83.536C105.179 64.6556 89.8902 49.3672 71.0098 49.3672C52.1293 49.3672 36.8409 64.6556 36.8409 83.536C36.8409 95.1009 42.5795 105.308 51.3846 111.484L29.7881 172.857H111.268Z"
            fill="black"
            stroke="black"
            stroke-width="1.75225"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M60.1016 59.6191L62.1605 79.3319L72.0607 80.7775L64.8766 87.7427L73.1559 101.98L57.7361 92.9557L48.8435 97.5991L50.5519 87.7427L43.3677 80.7775L53.3117 79.3319L60.1016 59.6191Z"
            fill="white"
            stroke="black"
            stroke-width="0.438062"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M88.2692 132.557L82.2678 145.479L69.8706 140.004L79.8146 153.014L72.4114 165.718L86.2103 157.658L94.1392 161.819L92.6498 153.014L99.0456 146.75L90.1966 145.479L88.2692 132.557Z"
            fill="white"
            stroke="black"
            stroke-width="0.438062"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M75.5657 49.1055C75.5657 49.1055 76.179 52.5223 68.7319 51.8214C68.7319 51.8214 78.895 53.8365 71.0975 62.992C71.0975 62.992 81.5672 55.1945 80.253 70.4391C80.253 70.4391 84.327 56.2459 90.7227 68.7306C90.7227 68.7306 91.2484 57.0782 97.0308 60.4513C91.1169 53.9241 83.5823 50.5949 75.5657 49.1055Z"
            fill="white"
            stroke="black"
            stroke-width="0.438062"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M64.7455 125.109C66.9708 125.109 68.7756 123.305 68.7756 121.079C68.7756 118.853 66.9708 117.049 64.7455 117.049C62.5201 117.049 60.7153 118.853 60.7153 121.079C60.7153 123.305 62.5201 125.109 64.7455 125.109Z"
            stroke="white"
            stroke-width="0.876124"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M88.8387 92.2537C91.0641 92.2537 92.8689 90.4493 92.8689 88.2235C92.8689 85.9977 91.0641 84.1934 88.8387 84.1934C86.6134 84.1934 84.8086 85.9977 84.8086 88.2235C84.8086 90.4493 86.6134 92.2537 88.8387 92.2537Z"
            stroke="white"
            stroke-width="0.876124"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M51.3845 134.615L51.6911 146.092L43.0613 192.308L31.1897 186.263L21.0267 203.216L5.1689 195.944L4.38037 182.145L51.3845 134.615Z"
            fill="black"
            stroke="black"
            stroke-width="1.75225"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M51.3848 134.615L4.20557 164.973L14.6752 170.361L4.38075 182.145L20.1948 189.986L28.8684 177.677L41.5722 184.248L51.3848 134.615Z"
            fill="white"
            stroke="black"
            stroke-width="1.75225"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M0.0874023 43.3676C0.0874023 43.3676 9.94378 44.1123 11.7836 28.7363C11.7836 28.7363 12.1342 42.2724 18.7489 45.5579C18.7489 45.5579 9.98758 46.3026 8.49817 62.029C8.54198 62.029 8.89245 44.4628 0.0874023 43.3676Z"
            fill="black"
            stroke="black"
            stroke-width="1.75225"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="bevel"
          />
          <path
            d="M134.616 141.579C134.616 141.579 143.071 142.193 144.648 129.051C144.648 129.051 144.954 140.616 150.605 143.463C150.605 143.463 143.115 144.076 141.844 157.525C141.844 157.525 142.151 142.499 134.616 141.579Z"
            fill="black"
            stroke="black"
            stroke-width="1.75225"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="bevel"
          />
          <path
            d="M68.688 10.1616C68.688 10.1616 74.6018 20.4123 82.706 17.1706C92.3433 13.3157 88.0942 0.480469 88.0942 0.480469"
            stroke="black"
            stroke-width="3.06643"
            stroke-miterlimit="10"
            stroke-linejoin="round"
          />
          <path
            d="M37.98 33.3349L48.7564 22.5586"
            stroke="black"
            stroke-width="3.06643"
            stroke-miterlimit="10"
            stroke-linejoin="round"
          />
          <path
            d="M122.657 110.127L130.192 117.136"
            stroke="black"
            stroke-width="3.06643"
            stroke-miterlimit="10"
            stroke-linejoin="round"
          />
          <path
            d="M115.911 40.8709L133.696 30.6641"
            stroke="black"
            stroke-width="3.06643"
            stroke-miterlimit="10"
            stroke-linejoin="round"
          />
          <path
            d="M4.81836 95.8039L19.362 93.0879"
            stroke="black"
            stroke-width="3.06643"
            stroke-miterlimit="10"
            stroke-linejoin="round"
          />
          <path
            d="M135.142 54.582L139.479 63.1681L148.065 70.7465"
            stroke="black"
            stroke-width="3.06643"
            stroke-miterlimit="10"
            stroke-linejoin="round"
          />
          <path
            d="M135.711 73.9423L139.479 63.166"
            stroke="black"
            stroke-width="3.06643"
            stroke-miterlimit="10"
            stroke-linejoin="round"
          />
          <path
            d="M148.065 55.6328L138.909 63.737L129.754 64.2626"
            stroke="black"
            stroke-width="3.06643"
            stroke-miterlimit="10"
            stroke-linejoin="round"
          />
        </svg>
        <h2 className="text-xl mb-2 text-black font-bold">
          Your events is ready to share!.
        </h2>

        <div className="flex w-[85%] flex-col items-left border  rounded bg-gray-100">
          <h2 className="text-gray-600 mb-2 font-5 text-xl">
            Paste this link in a message to invite them to join events.
          </h2>
          <h2 className="text-gray-600 text-xl">Share link</h2>
          <div className="flex items-center mt-4 border p-2 rounded bg-gray-100">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="flex-grow mr-3 p-2 bg-transparent border-none outline-none text-black"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="bg-blue-700 flex items-center justify-between text-white p-4  hover:bg-blue-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
              >
                <title>Copy link</title>
                <path
                  d="M7.27533 21.154C5.98491 21.154 5.3397 21.154 4.83074 20.9432C4.15214 20.6621 3.61299 20.123 3.33191 19.4444C3.12109 18.9354 3.12109 18.2902 3.12109 16.9998V7.58352C3.12109 6.03247 3.12109 5.25694 3.42295 4.66451C3.68847 4.1434 4.11215 3.71972 4.63326 3.4542C5.22569 3.15234 6.00122 3.15234 7.55227 3.15234H16.9685C18.259 3.15234 18.9042 3.15234 19.4131 3.36316C20.0917 3.64424 20.6309 4.18339 20.912 4.86199C21.1228 5.37095 21.1228 6.01616 21.1228 7.30658M17.2455 30.8472H26.3848C27.9358 30.8472 28.7114 30.8472 29.3038 30.5454C29.8249 30.2798 30.2486 29.8562 30.5141 29.3351C30.816 28.7426 30.816 27.9671 30.816 26.416V17.2767C30.816 15.7257 30.816 14.9501 30.5141 14.3577C30.2486 13.8366 29.8249 13.4129 29.3038 13.1474C28.7114 12.8456 27.9358 12.8456 26.3848 12.8456H17.2455C15.6944 12.8456 14.9189 12.8456 14.3265 13.1474C13.8054 13.4129 13.3817 13.8366 13.1162 14.3577C12.8143 14.9501 12.8143 15.7257 12.8143 17.2767V26.416C12.8143 27.9671 12.8143 28.7426 13.1162 29.3351C13.3817 29.8562 13.8054 30.2798 14.3265 30.5454C14.9189 30.8472 15.6944 30.8472 17.2455 30.8472Z"
                  stroke="white"
                  stroke-width="2.76949"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="ml-2">Copy link</p>
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 text-black hover:text-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
