"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { genre } from "./genre";
import { images } from "./images";

// Use the cloudinary feature in the image picker
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from "next-cloudinary";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type imagePickerProp = {
  showImagePicker: boolean;
  onChange: (url: string) => void; // The onChange function expects a string URL
  onClose: () => void;
};

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

  //   Simple search functionality
  const filteredImages = images.filter((image) =>
    image.url.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Chip search
  async function genree() {
    const imageType = await prisma.imageType.findMany();
    return imageType;
  }

  function filterChip(type: string) {}

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
                {filteredImages.map((image) => (
                  <Image
                    key={image.url}
                    src={image.url}
                    width={250}
                    height={0}
                    alt="Image template"
                    onClick={() => onChange(image.url)}
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
