import { Lucide } from '@components/base';
import { IResearch } from '@interfaces/research.interface';
import StarRating from '@components/base/starRating';
import NotFound from '@components/base/notFound';
import { Fragment } from 'react';

interface Props {
  loading: boolean;
  raw: IResearch[];
  returnChangePage: (raw: IResearch) => void;
}
function CardLastsViewed({ loading, raw, returnChangePage }: Props) {
  return (
    <Fragment>
      <div className="mt-3 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 9 }).map((_, key: number) => (
            <div key={key} className="relative card-hv card-pp gap-3 flex flex-col p-2 rounded-lg border dark:border-zinc-800">
              <div className="bg-loading flex h-full mt-1 sm:mt-5 md:mt-0 md:absolute bottom-5 top-0">
                <div className="h-full w-36 rounded-lg"></div>
              </div>
              <div className="absolute text-loading flex flex-row justify-center items-center gap-2 top-2 right-4 text-sm">
                <Lucide name="Eye" size='14' />
                {key}
              </div>
              <div className="p-2 md:ml-40 min-h-[200px]">
                <div className="bg-loading w-full p-3 font-bold text-base mb-2 mt-3"></div>
                <p className="bg-loading w-full p-2"></p>
                <StarRating className="text-loading" rating={5} />
                <p className="bg-loading w-full p-2 h-16"></p>
              </div>
            </div>
          ))
        ) : (
          raw?.length > 0
            ? raw.map((item: IResearch, key: number) => (
              <div key={key} onClick={() => {
                returnChangePage(item);
              }}
                className="relative bg-theme card-hv card-pp gap-3 flex flex-col p-2 rounded-lg border shadow-lg cursor-pointer dark:border-zinc-800 hover:ring-zinc-200 hover:dark:ring-zinc-800 hover:ring"
              >
                <div className="flex mt-1 sm:mt-5 md:mt-0 md:absolute bottom-5 top-0">
                  <img className="h-full md:mt-0 md:h-52 rounded-lg" src={item.image_url} alt="" />
                </div>
                <div className="absolute flex flex-row justify-center items-center gap-2 top-2 right-4 text-sm">
                  <Lucide name="Eye" size='14' />
                  9
                </div>
                <div className="p-2 md:ml-40 h-fit md:min-h-[200px]">
                  <div className="font-bold text-base mb-2 mt-3 line-clamp-1">
                    {item.title}
                  </div>
                  <p className="text-gray-700 dark:text-gray-400 text-sm line-clamp-1">by {item.user_info.first_name + " " + item.user_info.last_name}</p>
                  <StarRating rating={4} />
                  <p className="text-gray-700 dark:text-zinc-400 text-sm line-clamp-3 mr-2">
                    {item.description}
                  </p>
                </div>
              </div>
            )) : (
              <NotFound />
            )
        )}
      </div>
    </Fragment>
  )
}

export default CardLastsViewed