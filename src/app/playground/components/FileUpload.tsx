"use client";
import FileUpload, { FileUploadPreview } from "@/components/FileUpload";
import { useState } from "react";

const FileUploadExample = ({ withPreview }: { withPreview?: boolean }) => {
  const [file, setFile] = useState<File | null>(null);

  const showPreview = file && withPreview;

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files || [];

    if (!file) {
      return;
    }

    if (file.type.indexOf("image") === -1) {
      alert("Please upload an image file");
      return;
    }

    setFile(file);
  };

  const handleUpload = async () => {
    console.log("Uploading file...");

    if (!file) {
      return;
    }

    const reader = new FileReader();
    await reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const blob = new Blob([arrayBuffer], { type: file.type });
    };
  };

  return (
    <>
      <FileUpload
        type="file"
        onChange={handleImageSelect}
        onUpload={handleUpload}
      />
      {showPreview && (
        <FileUploadPreview
          src={URL.createObjectURL(file)}
          imageSize={file.size}
        />
      )}
    </>
  );
};

export default FileUploadExample;
