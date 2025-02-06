"use client";

import { Button } from "@/components/ui/button";
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { genre } from "../config/genre";

// Types
interface ImagePickerProps {
  isVisible: boolean;
  onImageSelect: (url: string) => void;
  onClose: () => void;
}

interface ImageDetail {
  id: string;
  imageUrl: string;
  imageChipType: string;
}

type ImageType = "graphic" | "photo" | "gif";

interface TabButton {
  label: string;
  value: ImageType;
}

// Constants
const IMAGE_TABS: TabButton[] = [
  { label: "Graphic", value: "graphic" },
  { label: "Photo", value: "photo" },
  { label: "GIFs", value: "gif" },
];

const ImagePicker: React.FC<ImagePickerProps> = ({
  isVisible,
  onImageSelect,
  onClose,
}) => {
  // State
  const [activeTab, setActiveTab] = useState<ImageType>("graphic");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState<ImageDetail[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fetch images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/images");
        if (!response.ok) throw new Error("Failed to fetch images");
        const data = await response.json();
        setImages(data || []);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  // Handlers
  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    if (result.info && typeof result.info !== "string" && result.info.url) {
      onImageSelect(result.info.url);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  // Filtered images
  const filteredImages = images.filter(
    (image) =>
      (image.imageUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
        searchQuery === "") &&
      (selectedCategory === "" || selectedCategory === image.imageChipType),
  );

  if (!isVisible) return null;

  return (
    <CldUploadWidget
      onSuccess={handleUploadSuccess}
      uploadPreset="ml_default"
      options={{
        sources: ["local", "url"],
        multiple: false,
        clientAllowedFormats: ["image"],
        maxFiles: 1,
        cropping: true,
      }}
    >
      {({ open }: { open: () => void }) => (
        <div className="fixed top-0 bottom-0 inset-0 flex items-center justify-center bg-black/30 backdrop-blur-md z-20 p-10">
          <div className="relative w-3/5 h-[90vh] bg-gradient-to-tl from-white to-[#d6ff0b] shadow-[0px_10.592592239379883px_10.592592239379883px_-5.296296119689941px_rgba(16,24,40,0.03)] shadow-[0px_26.48147964477539px_31.77777671813965px_-5.296296119689941px_rgba(16,24,40,0.08)] p-5 flex flex-col gap-5">
            {/* Close Button */}
            <button className="self-end" onClick={onClose} type="button">
              <Image
                src="/assets/images/imagePicker/close.svg"
                width={25}
                height={25}
                alt="Close"
              />
            </button>

            {/* Search Bar */}
            <div
              className={`flex gap-4 px-6 py-3 bg-white ${
                isSearchFocused ? "border border-[#084be7]" : ""
              }`}
              onClick={() => searchInputRef.current?.focus()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchInputRef.current?.focus();
                }
              }}
            >
              <Image
                src="/assets/images/imagePicker/Search.svg"
                height={25}
                width={25}
                alt="Search"
              />
              <input
                ref={searchInputRef}
                type="text"
                className="w-full bg-transparent outline-none text-lg font-['Inter']"
                placeholder="Search images..."
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3">
              {genre.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  type="button"
                  className={`px-4 py-2 rounded-3xl text-white text-xl font-medium font-['Inter'] leading-normal
                    ${
                      selectedCategory === category
                        ? "bg-[#084be7]"
                        : "bg-[#ff00e3]/40"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Image Types & Gallery Container */}
            <div className="flex flex-col gap-5">
              <div className="space-x-2">
                {IMAGE_TABS.map(({ label, value }) => (
                  <Button
                    key={value}
                    className={`pt-0.5 pb-2 shadow-none rounded-none bg-inherit hover:bg-inherit justify-center items-center inline-flex text-center text-2xl font-medium font-['Mona Sans'] leading-7 
                      ${
                        activeTab === value
                          ? "border-b-2 border-[#084be7] text-[#26282b]"
                          : "text-[#575b60]"
                      }`}
                    onClick={() => setActiveTab(value)}
                  >
                    {label}
                  </Button>
                ))}
              </div>

              {/* Images Section with Scroll */}
              <div className="max-h-[55vh] flex flex-wrap gap-5 justify-center pb-20 overflow-y-scroll">
                {filteredImages.length === 0 ? (
                  <p className="self-center font-['Inter'] text-xl">
                    No images found
                  </p>
                ) : (
                  filteredImages.map((image) => (
                    <Image
                      key={image.id}
                      src={image.imageUrl}
                      width={340}
                      height={308}
                      alt="Gallery image"
                      className="h-[308px] w-[340px] object-cover cursor-pointer"
                      onClick={() => onImageSelect(image.imageUrl)}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Upload Button */}
            <Button
              onClick={() => open()}
              className="absolute bottom-[5%] right-[5%] z-10 h-16 px-6 py-2 bg-[#084be7] text-center text-base font-bold font-['Inter'] leading-normal rounded-none"
            >
              <Image
                src="/assets/images/imagePicker/Upload.svg"
                width={25}
                height={25}
                alt="Upload"
                className="mr-2"
              />
              Upload
            </Button>
          </div>
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImagePicker;
