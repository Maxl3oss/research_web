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
      <div className="block relative">
        <img
          alt=""
          className={`h-[230px] w-[230px] object-cover ${className}`}
          src={typeof defaultValue === "string" ? defaultValue : URL.createObjectURL(defaultValue)}
          onError={({ currentTarget }) => {
            // currentTarget.src = Profile;
          }}
        />
        <div
          onClick={() => document.getElementById(name)?.click()}
          className="absolute bottom-3 right-3 p-2 rounded-full bg-theme cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
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
