"use client";

import { Button } from "@/components/ui/button";
import EventImage from "@/createEvent/molecules/EventImage";
import { memo } from "react";

interface ImageUploadProps {
  imageURL: string | null;
  showImagePicker: (state: boolean) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = memo(
  ({ showImagePicker, imageURL }) => {
    return (
      <div className="relative inline-block">
        <EventImage image={imageURL} />
        <Button
          onClick={() => showImagePicker(true)}
          className="absolute bottom-0 right-0 z-10 h-16 px-6 py-2 bg-[#084be7] text-center text-base font-bold leading-normal rounded-none"
        >
          Change
        </Button>
      </div>
    );
  },
);

ImageUpload.displayName = "ImageUpload";

export default ImageUpload;
