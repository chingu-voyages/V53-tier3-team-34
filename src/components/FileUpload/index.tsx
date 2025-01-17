import { Input } from "@/components/ui/input";
import Image from "next/image";

type FileUploadProps = React.ComponentProps<"input">;
type FileUploadPreviewProps = {
  src: string;
  width?: number;
  height?: number;
  imageSize?: number;
};

const FileUpload = (props: FileUploadProps) => {
  return <Input {...props} />;
};

const FileUploadPreview = ({
  src,
  width = 100,
  height = 100,
  imageSize,
}: FileUploadPreviewProps) => {
  return (
    <>
      <Image src={src} width={width} height={height} alt="upload-preview" />
      {imageSize && (
        <p>
          Size:{" "}
          {new Intl.NumberFormat("en-US", {
            maximumFractionDigits: 2,
            notation: "compact",
            compactDisplay: "short",
          }).format(imageSize)}
          b
        </p>
      )}
    </>
  );
};

export { FileUpload, FileUploadPreview };

export default FileUpload;
