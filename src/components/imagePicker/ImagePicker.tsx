"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { genre } from "./genre";
import { images } from "./images";
import { filteredImages, getAllImages } from "./images";

// Use the cloudinary feature in the image picker
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from "next-cloudinary";

type imagePickerProp = {
  showImagePicker: boolean;
  onChange: (url: string) => void; // The onChange function expects a string URL
  onClose: () => void;
};

interface ImageDetail {
  id: string;
  imageUrl: string;
  imageChipType: string;
}

export default function ImagePicker({
  showImagePicker,
  onChange,
  onClose,
}: imagePickerProp) {
  const handleUploadSuccess = async (res: CloudinaryUploadWidgetResults) => {
    // Ensure the response has a valid URL
    if (res.info && typeof res.info !== "string" && res.info.url) {
      onChange(res.info.url);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [chipType, setChipType] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [image, setImages] = useState<ImageDetail[]>([]);

  // Chip search
  useEffect(() => {
    const fetchImages = async () => {
      const images = await getAllImages();
      setImages(images || []);
    };

    fetchImages();
  }, []);

  async function handleClick(chipType: string) {
    setChipType(chipType);
    const images = await filteredImages(chipType, searchInput);
    setImages(images || []);
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { value } = event.target;
    setSearchInput(value);
  }

  // Filter images based on search term and chip type
  useEffect(() => {
    const fetchFilteredImages = async () => {
      const images = await filteredImages(chipType, searchInput);
      setImages(images || []);
    };

    if (searchInput || chipType) {
      fetchFilteredImages();
    }
  }, [searchInput, chipType]);

  // Simple search functionality
  // const filteredImages = imageDetails.filter((image) =>
  //   image.imageUrl.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // function filterChip(type: string) {
  //   const allTypes = genre();
  //   allTypes.filter(type=>type ==)
  // }

  return (
    <CldUploadWidget
      onSuccess={handleUploadSuccess}
      uploadPreset="ml_default"
      options={{
        sources: ["local", "url"],
        multiple: false,
        clientAllowedFormats: ["image"],
        maxFiles: 1, // Optional: Limit number of files uploaded
        cropping: true, // Optional: Enable cropping feature
      }}
    >
      {({ open }: { open: () => void }) => (
        <div
          style={{ display: showImagePicker ? "flex" : "none" }}
          className="w-full h-dvh py-10 fixed bg-transparent backdrop-blur-md z-20 justify-center items-center"
        >
          <div className="w-3/5 h-full  bg-white p-5 flex flex-col gap-5">
            {/* cancel button */}
            <button className="self-end mr-5" type="button" onClick={onClose}>
              <Image
                src="/assets/images/imagePicker/close.svg"
                width={25}
                height={25}
                alt="Cancel"
              />
            </button>

            {/* search bar */}
            <div className="flex gap-4 p-4 rounded-full bg-slate-300 backdrop-blur-md">
              <Image
                src="/assets/images/imagePicker/Search.svg"
                height={25}
                width={25}
                alt="Search"
              />
              <input
                type="text"
                className="w-full bg-transparent outline-none text-lg"
                placeholder="Search"
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>

            {/* genre buttons */}
            <div className="flex flex-wrap gap-3 w-full">
              {genre.map((type, index) => (
                <button
                  key={genre[index]}
                  onClick={() => handleClick(genre[index])}
                  type="button"
                  className="bg-genreBg py-2 px-4 text-white rounded-full"
                >
                  {type}
                </button>
              ))}
            </div>

            {/* images section */}
            <div className="flex flex-col gap-5 h-3/5 relative">
              <Button
                onClick={() => open()}
                className="absolute bottom-10 right-10 z-10 h-16 px-6 py-2 bg-[#084be7] text-center text-base font-bold leading-normal rounded-none"
              >
                <Image
                  src="/assets/images/imagePicker/Upload.svg"
                  width={25}
                  height={25}
                  alt="Upload"
                />
                Upload
              </Button>

              <div className="space-x-5">
                <button type="button" className="">
                  Graphic
                </button>
                <button type="button">Photo</button>
                <button type="button">GIFs</button>
              </div>
              <div className="grid grid-cols-3 gap-5 overflow-x-auto">
                {image.map((image) => (
                  <Image
                    key={image.imageUrl}
                    src={image.imageUrl}
                    width={250}
                    height={0}
                    alt="Image template"
                    onClick={() => onChange(image.imageUrl)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </CldUploadWidget>
  );
}
