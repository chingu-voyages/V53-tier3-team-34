"use client";
import FileUpload, { FileUploadPreview } from "@/components/FileUpload";
import { type ReactNode, useState } from "react";

const FileUploadExample = ({ withPreview }: { withPreview?: boolean }) => {
  const [src, setSrc] = useState("");
  const [Preview, setPreview] = useState<ReactNode>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files || [];

    if (file.type.indexOf("image") === -1) {
      alert("Please upload an image file");
      return;
    }

    if (file) {
      setSrc(URL.createObjectURL(file));
    }

    if (withPreview) {
      setPreview(<FileUploadPreview src={src} imageSize={file.size} />);
    }
  };

  return (
    <>
      <FileUpload type="file" onChange={handleChange} />
      {Preview}
    </>
  );
};

export default FileUploadExample;
