import { type FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="bg-white">
      <div className="flex justify-start p-5">
        <p className="text-center text-xs leading-5 text-gray-500">
          {`© ${new Date().getFullYear()} All rights reserved.`}
        </p>
      </div>
    </footer>
  );
};
