import React, { Fragment } from "react";
import { InputHook } from "..";

type Props = {
  accept: string;
  name: string;
  defaultValue: string | File;
  onChange: (file: File) => void;
  className?: string,
}

const InputHookUploadImage = ({ accept = ".png", defaultValue = "", name = "", onChange, className = "", ...props }: Props) => {
  return (
    <Fragment>
      <div className="block h-full w-full p-2 border dark:border-zinc-400 border-dashed rounded-md relative">
        <img
          alt=""
          className={`object-cover border-0 h-full w-full ${className}`}
          src={(typeof defaultValue === "string") ? defaultValue : URL.createObjectURL(defaultValue)}
          onError={({ currentTarget }) => {
            // currentTarget.src = Profile;
          }}
        />
        <div
          onClick={() => document.getElementById(name)?.click()}
          className="absolute bottom-3 right-3 p-2 rounded-full bg-theme cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </div>
      <InputHook name={name} id={name} type="file" className="hidden" accept={accept} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        onChange(file)
      }}
        {...props}
      />
    </Fragment >
  );
};

export default InputHookUploadImage;
