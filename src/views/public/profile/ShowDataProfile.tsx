import { Fragment } from 'react';
import { IResearchByUserList } from './MainProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare, faFileCircleXmark } from "@fortawesome/free-solid-svg-icons";
import StarRating from '@components/base/starRating';
import { ResearchImage } from '@components/base';
import { nanoid } from '@reduxjs/toolkit';

interface IProps {
  isLoading: boolean;
  raw: IResearchByUserList[];
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
  onViews: (id: number) => void;
  activeTabs: number;
}

function ShowDataProfile({ isLoading, raw, onUpdate, onDelete, onViews, activeTabs }: IProps) {
  return (
    <Fragment>
      {isLoading ? (
        <div className="grow animate-pulse bg-theme rounded-xl p-3" >
          <div className="flex bg-zinc-700 rounded-md h-52 w-36 animate-pulse"></div>
        </div>
      ) : raw?.length > 0 ? (
        <div className="gird grow space-y-2 grid-cols-1">
          {raw.map((item) => (
            <div key={nanoid()} className="relative flex gap-x-5 bg-theme rounded-xl p-3">
              <ResearchImage src={item.image_url as string} />
              {/* <img className="h-52 w-36 object-cover" src={item.image_url} alt="image_research" /> */}
              <div className="grow">
                <span className="text-lg font-semibold line-clamp-1 pr-24">{item.title}</span>
                <p className="mb-5 indent-4 text-justify text-sm">{item.description}</p>
                <StarRating rating={Number(item?.average_rating ?? 0)} />
              </div>
              <div className="absolute grid gap-2 bottom-3 right-3">
                {activeTabs !== 4
                  ? (
                    <Fragment>
                      <div onClick={() => onUpdate(item.id)} className="p-2 w-8 h-8 bg-indigo-800/60 hover:bg-indigo-600/60 hover:cursor-pointer rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </div>
                      <div onClick={() => onDelete(item.id)} className="p-2 w-8 h-8 bg-indigo-800/60 hover:bg-red-600/60 hover:cursor-pointer rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faTrashCan} />
                      </div>
                    </Fragment>
                  ) : (
                    <div onClick={() => onViews(item.id)} className="p-2 w-8 h-8 bg-indigo-800/60 hover:bg-indigo-600/60 hover:cursor-pointer rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={['fas', 'eye']} />
                    </div>
                  )
                }
              </div>
              {/* views */}
              <div className="absolute flex flex-row justify-center items-center gap-2 top-4 right-5 text-sm">
                <FontAwesomeIcon className="text-sm" icon={["fas", "heart"]} />
                {item?.likes ?? 0}
                <FontAwesomeIcon className="text-sm" icon={["fas", "eye"]} />
                {item?.views ?? 0}
              </div>
            </div>
          ))}
        </div>
      )
        :
        <div className="grow bg-theme rounded-xl p-3" >
          <div className="h-52 flex flex-col gap-2 items-center justify-center text-red-400">
            <FontAwesomeIcon icon={faFileCircleXmark} className="text-4xl" />
            <p className="text-xl">ไม่พบข้อมูล</p>
          </div>
        </div>
      }
    </Fragment>
  )
}

export default ShowDataProfile