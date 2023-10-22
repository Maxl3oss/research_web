import { Fragment } from 'react';
import { IResearchByUserList } from './MainProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  isLoading: boolean;
  raw: IResearchByUserList[];
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

function ShowDataProfile({ isLoading, raw, onUpdate, onDelete }: IProps) {
  return (
    <Fragment>
      {isLoading ? (
        <div className="grow animate-pulse bg-theme rounded-xl p-3" >
          <div className="flex bg-zinc-700 h-52 w-36 animate-pulse"></div>
        </div>
      ) : raw?.length > 0 ? (
        <div className="gird grow space-y-2 grid-cols-1">
          {raw.map((_, idx) => (
            <div key={idx + _.id} className="relative flex gap-x-5 bg-theme rounded-xl p-3">
              <img className="h-52 w-36 object-cover" src={_.image_url} alt="image_research" />
              <div className="grow">
                <span className="text-lg font-semibold line-clamp-1">{_.title}</span>
                <p className="indent-4 text-justify text-sm">{_.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, corporis soluta quod ipsam quisquam autem tempora quo inventore commodi, necessitatibus sit dicta, excepturi rerum ad alias quidem libero modi earum.</p>
              </div>
              <div className="absolute grid gap-2 bottom-3 right-3">
                <div onClick={() => onUpdate(_.id)} className="p-2 w-8 h-8 bg-indigo-800/60 hover:bg-indigo-600/60 hover:cursor-pointer rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </div>
                <div onClick={() => onDelete(_.id)} className="p-2 w-8 h-8 bg-indigo-800/60 hover:bg-red-600/60 hover:cursor-pointer rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faTrashCan} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </Fragment>
  )
}

export default ShowDataProfile