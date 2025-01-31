"use client";
import { Button } from "@/components/ui/button";
import { Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import BlueButton from "../molecules/BlueButton";
interface HeaderProps {
  onSearch?: (searchTerm: string, location: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = async () => {
    onSearch?.(title, location);
    router.push(`/publicevents?title=${title}&location=${location}`);
  };

  return (
    <header className="bg-black text-white px-16 py-9">
      <div className="flex items-center justify-start">
        {/* Logo */}
        <div className="flex items-center gap-5">
          <Image
            src="/assets/images/logo.svg"
            alt="Partiyo Logo"
            width={48}
            height={48}
          />
          <span className="text-xl font-bold">Partiyo</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center flex-1 mx-8">
          <div className="flex bg-gray-900 rounded-none flex-1 max-w-xl h-16">
            <input
              type="text"
              placeholder="Lunar new year"
              className="bg-transparent border-none outline-none px-4 py-2 flex-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="London"
              className="bg-transparent border-none outline-none px-4 py-2 border-l border-gray-700"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button
              onClick={handleSearch}
              className="h-16 px-6 py-2 bg-[#084be7] justify-center items-center flex rounded-none"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a href="/login">
            <Button
              type="button"
              className="text-center text-white text-base font-medium font-['Mona Sans'] leading-normal bg-none"
            >
              Log In
            </Button>
          </a>
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
              <p>Search</p>
              <p>Log In</p>
              <p>Create Events</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
