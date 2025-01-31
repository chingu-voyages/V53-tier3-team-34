"use client";
import { Button } from "@/components/ui/button";
import { Menu, Search, X } from "lucide-react";
import { Peralta } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useRef, useState } from "react";
import BlueButton from "../molecules/BlueButton";

const peralta = Peralta({ weight: "400", subsets: ["latin"] });

interface HeaderProps {
  onSearch?: (searchTerm: string, location: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();
  const eventNameRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSearch = async () => {
    onSearch?.(title, location);
    router.push(`/publicevents?title=${title}&location=${location}`);
  };

  return (
    <header className="bg-black text-white p-8 lg:px-16 lg:py-9">
      <div className="flex items-center justify-between lg:justify-start">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/assets/images/logo.svg"
            alt="Partiyo Logo"
            width={48}
            height={48}
          />
          <span className={`text-xl font-bold ${peralta.className}`}>
            Partiyo
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center flex-1 mx-8">
          <div
            className={`flex bg-gray-900 rounded-none flex-1 max-w-max h-16 ${
              isInputFocused && "border border-white"
            }`}
          >
            <div className="flex items-center divide-x-[1px] divide-white px-6 py-3">
              <div className="flex items-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-labelledby="Search"
                >
                  <title>Search</title>
                  <g clipPath="url(#clip0_834_31651)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.25 0.1875C4.21142 0.1875 0.9375 3.46142 0.9375 7.5C0.9375 11.5386 4.21142 14.8125 8.25 14.8125C12.2886 14.8125 15.5625 11.5386 15.5625 7.5C15.5625 3.46142 12.2886 0.1875 8.25 0.1875ZM2.0625 7.5C2.0625 4.08274 4.83274 1.3125 8.25 1.3125C11.6673 1.3125 14.4375 4.08274 14.4375 7.5C14.4375 10.9173 11.6673 13.6875 8.25 13.6875C4.83274 13.6875 2.0625 10.9173 2.0625 7.5Z"
                      fill="white"
                    />
                    <path
                      d="M14.6478 13.1023C14.4281 12.8827 14.072 12.8827 13.8523 13.1023C13.6326 13.322 13.6326 13.6781 13.8523 13.8978L16.8522 16.8978C17.0719 17.1174 17.428 17.1174 17.6477 16.8978C17.8674 16.6781 17.8674 16.322 17.6477 16.1023L14.6478 13.1023Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_834_31651">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <input
                  type="text"
                  ref={eventNameRef}
                  placeholder="Lunar new year"
                  className="bg-transparent border-none outline-none px-4 py-2 flex-1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onClick={() => setIsInputFocused(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIsInputFocused(true);
                    }
                  }}
                  onBlur={() => setIsInputFocused(false)}
                />
              </div>
              <div className="flex items-center pl-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-labelledby="Location"
                >
                  <title>Location</title>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.5334 20.1756C9.5071 18.3783 5 13.9884 5 10.5C5 6 8 3 12.5 3C17 3 20 6.75 20 10.5C20 13.4266 15.432 18.1804 13.426 20.1269C12.8989 20.6383 12.0828 20.6629 11.5334 20.1756ZM15 9.5C15 10.8807 13.8807 12 12.5 12C11.1193 12 10 10.8807 10 9.5C10 8.11929 11.1193 7 12.5 7C13.8807 7 15 8.11929 15 9.5Z"
                    fill="white"
                  />
                </svg>
                <input
                  type="text"
                  ref={locationRef}
                  placeholder="London"
                  className="bg-transparent border-none outline-none px-4 py-2"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onClick={() => setIsInputFocused(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIsInputFocused(true);
                    }
                  }}
                  onBlur={() => setIsInputFocused(false)}
                />
              </div>
            </div>
            <Button
              onClick={handleSearch}
              className={`h-auto px-6 py-2 bg-[#084be7] justify-center items-center inline-flex rounded-none ${
                isInputFocused && "border-l border-white"
              }`}
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login">
            <Button
              type="button"
              className="text-center text-white text-base font-medium font-['Mona Sans'] leading-normal bg-inherit"
            >
              Log In
            </Button>
          </Link>
          {/* Added Create event button and changed the blue button text to browse event */}
          <Link href="/events/create">Create Event</Link>
          <BlueButton text="Browse Events" href="/events" />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-black p-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link href="/search">
                <p>Search</p>
              </Link>
              <Link href="/login">
                <p>Log In</p>
              </Link>
              <Link href="/events/create">
                <p>Create Events</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
