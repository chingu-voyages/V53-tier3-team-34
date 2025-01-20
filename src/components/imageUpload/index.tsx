"use client";

import addImageToDb from "@/actions/uploadImage";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";

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
      {({ open }) => <Button onClick={() => open()}>Upload Image</Button>}
    </CldUploadWidget>
  );
};

export default ImageUpload;
