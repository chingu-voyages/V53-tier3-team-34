import Image from "next/image";
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
      <div className="bg-white shadow-lg flex flex-col justify-center items-center p-4  md:p-6 lg:p-16 gap-6">
        <Image
          src="/assets/images/events/share.png"
          width={151}
          height={205}
          alt="Share"
        />
        <p className="text-center text-[#26282b] text-2xl font-semibold font-['Mona-Sans'] leading-tight">
          Your events is ready to share!.
        </p>

        <p className="self-start text-center text-[#7a7878] text-xl font-normal font-['Inter'] leading-tight">
          Paste this link in a message to invite them to join events.
        </p>

        <div className="self-start w-full">
          <h2 className="text-gray-600 text-xl">Share link</h2>
          <div className="mt-0.5 flex items-center gap-1 border">
            <input
              type="text"
              value={shareLink}
              readOnly
              className="flex-grow h-16 p-4 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] border-2 border-[#aeaaaa]/30 text-black"
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
