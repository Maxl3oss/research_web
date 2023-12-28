import NoProfile from "@assets/images/NoProfile.png";
import { nanoid } from "@reduxjs/toolkit";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
interface Props {
  src: string,
  className?: string;
}

export function Profile({ src, className }: Props) {
  return (
    <LazyLoadImage
      className={`${className} w-10 h-10 rounded-full object-cover border dark:border-gray-700 cursor-pointer`}
      src={src || NoProfile}
      alt={`profile${nanoid(2)}`}
      onError={({ currentTarget }) => currentTarget.src = NoProfile}
    />
  )
}

export function ResearchImage({ src, className }: Props) {
  return (
    <LazyLoadImage
      className={`${className} h-52 w-36 min-w-[144px] rounded-md border-base object-cover`}
      src={src || ""}
      effect="blur"
      alt={`research-${nanoid(5)}`}
      onError={({ currentTarget }) => currentTarget.src = ""}
    />
  )
}