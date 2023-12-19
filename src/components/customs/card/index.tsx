import { Profile, ResearchImage } from "@components/base";
import StarRating from "@components/base/starRating";
import { FindPrefix, FormatterNumber } from "@components/helper/FunctionHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IResearch } from "@interfaces/research.interface";
import { nanoid } from "@reduxjs/toolkit";
import { Fragment } from "react";

interface Props {
  handleChangePage: (val: number) => void,
  item: IResearch,
  className?: string,
}

export function CardResearch({ className, handleChangePage, item }: Props) {
  return (
    <div
      key={nanoid(3)}
      onClick={() => handleChangePage(item.id)}
      className={`${className} relative cursor-pointer bg-theme space-y-3 p-3 md:p-5 rounded-lg`}
    >
      <div className="flex items-center gap-2">
        <Profile className="w-6 h-6" src={item.user_info.profile} />
        <p className="text-sm">{FindPrefix(item.user_info.prefix) + item.user_info.first_name + " " + item.user_info.last_name}</p>
      </div>
      <div className="flex gap-4">
        <ResearchImage src={item.image_url as string} />
        <div className="space-y-2">
          <p className="text-base line-clamp-2">{item.title}/{item.title_alternative}</p>
          <StarRating rating={item.average_rating} />
          <p className="line-clamp-3 text-sm text-white">{item.description || "-"}</p>
          <span className="tags-theme py-1 flex items-center">
            {item?.tags_info?.name}
          </span>
        </div>
      </div>
      {/* view */}
      <div className="absolute flex flex-row justify-center items-center gap-2 top-[2px] right-3 text-sm">
        <FontAwesomeIcon className="text-sm" icon={["fas", "eye"]} />
        {item?.views || 0}
      </div>
    </div>
  )
}

export function CardLoading() {
  return (
    <Fragment>
      {Array.from({ length: 9 }).map(() => (
        <div
          key={nanoid(5)}
          className="relative cursor-pointer bg-transparent border-base space-y-3 p-3 md:p-5 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <Profile className="w-6 h-6" src={""} />
            <p className="bg-loading h-5 w-3/12"></p>
          </div>
          <div className="flex gap-4">
            <div className="bg-loading h-52 w-36"></div>
            <div className="flex-1 space-y-2">
              <div style={{ width: `${Math.floor(Math.random() * 91) + 10}%` }} className={`bg-loading h-8`}></div>
              <StarRating className="text-loading" rating={Math.floor(Math.random() * 6)} />
              <div className={`bg-loading h-6 w-full`}></div>
              <div style={{ width: `${Math.floor(Math.random() * 91) + 10}%` }} className={`bg-loading h-6`}></div>
              <div className="bg-loading h-5 w-16 py-1"></div>
            </div>
          </div>
          {/* view */}
          <div className="absolute flex flex-row justify-center items-center gap-2 top-[2px] right-3 text-sm">
            <FontAwesomeIcon className="text-sm" icon={["fas", "eye"]} />
            {FormatterNumber(Math.floor(Math.random() * 1000))}
          </div>
        </div>
      ))}
    </Fragment>
  )
}