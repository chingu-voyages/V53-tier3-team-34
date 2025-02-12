import Image from "next/image";
import { useEffect, useState } from "react";

export default function CopyPopup() {
  const [cancel, setCancel] = useState(false);

  const [inputLink, setInputLink] = useState("");

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setInputLink(window.location.href);
  }, []);

  function handleCancel() {
    setCancel((prevState) => !prevState);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(inputLink);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      alert("Something went wrong!");
      console.log(error);
    }
  }

  return (
    !cancel && (
      <div className="fixed backdrop-blur-md w-full h-screen flex justify-center items-center z-10">
        <div className="w-[715px] h-[547px] p-10 bg-white">
          <button type="button" className="ml-auto" onClick={handleCancel}>
            <Image
              src="/assets/images/imagePicker/close.svg"
              alt="Close"
              width={25}
              height={25}
            />
          </button>
          <div className="flex flex-col gap-2 items-center mb-10">
            <Image
              src="/assets/images/copyImage.png"
              alt="Share"
              width={100}
              height={100}
              className="w-auto h-auto"
            />
            <p className="text-xl font-bold">Your event is ready to share!</p>
          </div>

          <div>
            <p className="text-gray-400 mb-5">
              Paste this link in a message to invite them to join events.
            </p>
            <p className="text-gray-400">Share link</p>
            <div className="flex">
              <input
                className="w-full p-5 outline-none border border-gray-500"
                type="text"
                value={inputLink}
                readOnly
              />
              <button
                type="button"
                onClick={handleCopy}
                className="px-10 py-5 flex gap-2 items-center bg-blue-700 text-white"
              >
                <Image
                  src="/assets/images/copy.svg"
                  alt="Copy logo"
                  width={25}
                  height={25}
                />
                {copied ? "Copied!" : <p>Copy</p>}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
