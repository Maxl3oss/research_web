import { Lucide } from '@components/base';
import StarRating from '@components/base/starRating';
import { IResearch } from '@interfaces/research.interface';
import { nanoid } from '@reduxjs/toolkit';
import { Fragment } from 'react';

type Tags = {
  tag_id: number;
  tag_name: string;
}

interface rawData {
  image: string;
  viewed: number;
  title: string;
  description: string;
  star_rating: number;
  tags: Tags[];
}

interface Props {
  raw: rawData[];
  loading: boolean;
  returnResearch: (item: IResearch) => void;
}

function CardMostViewed({ raw, loading }: Props) {

  return (
    <Fragment>
      {loading ? (
        Array.from({ length: 5 }).map((_, key) => (
          <div key={key} className="md:p-2 relative w-full h-[450px] sm:h-80 snap-start rounded-xl m-2">
            <div className="aspect-[0.75/1] sm:aspect-video flex flex-col p-3 sm:p-0 h-full sm:flex-row gap-3 border dark:border-zinc-800 rounded-lg z-0">
              <div className="flex w-96 h-full justify-center sm:w-52 bg-loading"></div>
              <div className="flex flex-col flex-1 gap-2 pt-0 sm:py-6 h-full">
                <div className="grid gap-1">
                  <div className="bg-loading w-full p-3 mb-2"></div>
                  <p className="bg-loading w-full p-2"></p>
                  <StarRating className="text-loading" rating={2} />
                  <p className="bg-loading w-full p-2 h-32"></p>
                </div>
                {/* <div className="pt-4 pb-2"> */}
                <div className="flex grow flex-col mt-auto justify-end gap-2 text-xs font-semibold">
                  <div className="flex gap-3">
                    <p className="bg-loading w-1/4 p-3"></p>
                    <p className="bg-loading w-1/3 p-3"></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute flex flex-row justify-center items-center gap-2 top-4 right-5 text-sm">
              <Lucide name="Eye" size='14' />
              {key}
            </div>
          </div>
        ))
      ) : (
        raw.map((item) => (
          <div key={nanoid(5)} className="md:p-2 relative w-full h-[450px] sm:h-80 snap-start rounded-xl shadow-md m-2 bg-theme">
            <div className="aspect-[0.75/1] sm:aspect-video flex flex-col p-3 sm:p-0 h-full sm:flex-row gap-3 rounded-lg z-0">
              <div className="flex flex-none w-full justify-center sm:w-52 object-cover">
                <img className="h-52 sm:h-full rounded-md" src={item.image} alt="" />
              </div>
              <div className="flex flex-col gap-2 pt-0 sm:py-6 h-full">
                <div className="grid gap-1">
                  <div className="font-bold text-base mb-2 line-clamp-1">{item.title}</div>
                  <p className="text-gray-700 dark:text-gray-400 text-sm line-clamp-1">by Narongrid Naorkham</p>
                  <StarRating rating={item.star_rating} />
                  <p className="text-gray-700 dark:text-zinc-400 text-sm line-clamp-5 mr-2">
                    {item.description}
                  </p>
                </div>
                <div className="flex grow flex-col mt-auto justify-end gap-2 text-xs font-semibold">
                  <div className="flex">
                    {item.tags.map((item) => (
                      <div key={nanoid(5)}>
                        <span
                          className="inline-block dark:bg-zinc-900 bg-gray-300 rounded-full px-3 py-1 dark:text-zinc-400 text-zinc-800 mr-2 mb-2"
                        >{item.tag_name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute flex flex-row justify-center items-center gap-2 top-4 right-5 text-sm">
              <Lucide name="Eye" size='14' />
              {item.viewed}
            </div>
          </div>
        ))
      )}
    </Fragment>
  )
}

export default CardMostViewed