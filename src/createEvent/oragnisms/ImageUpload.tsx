"use client";

import { Button } from "@/components/ui/button";
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import EventImage from "../molecules/EventImage";

interface ImageUploadProps {
  imageURL: string | null;
  onChange: (url: string) => void; // The onChange function expects a string URL
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imageURL, onChange }) => {
  // Handle successful upload
  const handleUploadSuccess = async (res: CloudinaryUploadWidgetResults) => {
    // Ensure the response has a valid URL
    if (res.info && typeof res.info !== "string" && res.info.url) {
      onChange(res.info.url);
    }
  };

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
        <div className="relative inline-block">
          <EventImage image={imageURL} />
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
