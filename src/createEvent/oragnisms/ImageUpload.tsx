"use client";

import addImageToDb from "@/actions/uploadImage";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import EventImage from "../molecules/EventImage";

const ImageUpload = ({ eventId }: { eventId: string }) => {
  return (
    <CldUploadWidget
      onSuccess={async (res) => {
        await addImageToDb({
          res,
          eventId,
        });
      }}
      uploadPreset="ml_default"
    >
      {({ open }) => (
        <div className="relative inline-block">
          <EventImage />
          <Button
            onClick={() => open()}
            className="absolute bottom-0 right-0 z-10 h-16 px-6 py-2 bg-[#084be7] text-center text-base font-bold leading-normal rounded-none"
          >
            Change
          </Button>
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
