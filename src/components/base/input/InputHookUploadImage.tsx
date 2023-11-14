import React, { Fragment } from "react";
import { InputHook } from "..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoProfile from '@assets/images/NoProfile.png';

type Props = {
  accept?: string;
  name: string;
  defaultValue: string | File;
  onChange: (file: File) => void;
  className?: string;
  outClassName?: string;
  imageOnError?: "image" | "profile";
  onLoading?: boolean;
}

const InputHookUploadImage: React.FC<Props> = ({ accept = "image/*", defaultValue = "", name = "", onChange, className = "h-full w-full", outClassName = "", imageOnError = "image", onLoading = false, ...props }) => {
  const FilImageOnError = imageOnError === "image" ? "" : imageOnError === "profile" ? NoProfile : "";
  return (
    <Fragment>
      <div className={`${outClassName} block h-full w-full p-2 border dark:border-zinc-400 border-dashed rounded-md relative`}>
        <img
          alt=""
          className={`${className} object-cover border-0`}
          src={(typeof defaultValue === "string") ? defaultValue : URL.createObjectURL(defaultValue)}
          onError={({ currentTarget }) => {
            currentTarget.src = FilImageOnError;
          }}
        />
        <div
          onClick={() => { if (!onLoading) document.getElementById(name)?.click() }}
          className="absolute bottom-3 right-3 p-2 rounded-full bg-theme cursor-pointer"
        >
          <div className="flex w-6 h-6 items-center justify-center">
            {onLoading
              ?
              <FontAwesomeIcon className="text-lg animate-spin" icon={["fas", "circle-notch"]} />
              :
              <FontAwesomeIcon className="text-lg" icon={["fas", "plus"]} />
            }
          </div>
        </div>
      </div>
      <InputHook name={name} id={name} type="file" className="hidden" accept={accept} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        onChange(file)
      }}
        {...props}
      />
    </Fragment>
  );
};

export default InputHookUploadImage;
