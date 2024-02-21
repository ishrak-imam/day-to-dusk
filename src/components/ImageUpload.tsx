import { type FC } from "react";
import { useDropzone } from "react-dropzone";
import { UploadIcon } from "@/ui/Icons";
import { Typography } from "@/ui/Typography";

type Props = {
  onUpload: (file: File) => void;
};

export const ImageUpload: FC<Props> = ({ onUpload }) => {
  const onDrop = (acceptedFiles: File[]) => {
    onUpload(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [".jpg", ".png"],
    },
    onDrop,
  });

  return (
    <div
      className="flex items-center gap-x-3 p-5 cursor-pointer bg-gray-300 rounded-lg"
      {...getRootProps()}
    >
      <UploadIcon className="h-10 w-10 text-emerald-700" />
      <input {...getInputProps()} />
      <Typography>
        <span>{`Choose image `}</span>
      </Typography>
    </div>
  );
};
