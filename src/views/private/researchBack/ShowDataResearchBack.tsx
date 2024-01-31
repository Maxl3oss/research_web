import { Fragment } from 'react'
import { IRawResearchBack } from './MainResearchBack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NotFound from '@components/base/notFound';
import { IPagin } from '@interfaces/pagin.interface';
import { FindIndex } from '@components/helper/FunctionHelper';

interface Props {
  raw: IRawResearchBack[];
  isLoading: boolean;
  pagin: IPagin;
  onClick: (id: number) => void;
  onDelete: (id: number) => void;
  onVerify: (id: number) => void;
}

function ShowDataResearchBack({ raw, pagin, onClick, onDelete, onVerify, isLoading }: Props) {
  return (
    <Fragment>
      <div className="mt-5 w-full">
        <h1>ล่าสุด</h1>
        <table className={isLoading || raw.length === 0 ? "w-full" : "w-full md:inline-table flex flex-row flex-wrap rounded-lg overflow-y-auto"}>
          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan={10} className="">
                  <div className="flex justify-center items-center gap-2 p-5">
                    <FontAwesomeIcon className="text-4xl animate-spin" icon={['fas', 'circle-notch']} />
                    <p>กำลังโหลด</p>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : raw.length > 0 ? (
            <Fragment>
              <thead className="">
                {Array.from({ length: raw.length }).map((_, key) => (
                  <tr key={key} className="">
                    <th className="p-3 text-center md:w-[5%]">No.</th>
                    <th className="p-3 text-left md:w-3/12">ชื่อรายงาน/วิจัย</th>
                    <th className="p-3 text-left md:grow">รายละเอียด</th>
                    <th className="p-3 text-center md:w-[5%]">สถานะ</th>
                    <th className="p-3 text-center md:w-[5%]">#</th>
                  </tr>
                ))}
              </thead>
              <tbody className="flex-1 md:flex-none">
                {raw && raw.map((curr, index) => (
                  <tr key={index} className="flex flex-col flex-nowrap md:table-row mb-2 md:mb-0">
                    <td className="border rounded-md p-3 md:text-center">{FindIndex(pagin, index)}</td>
                    <td className="border rounded-md p-3">
                      <span className="line-clamp-1 md:line-clamp-none">{curr.title}</span>
                    </td>
                    <td className="border rounded-md p-3">
                      <span className="max-h-16 line-clamp-1 md:line-clamp-3">{curr.description}</span>
                    </td>
                    <td className="border rounded-md p-3">
                      <div className="flex md:justify-center">
                        <span onClick={() => onVerify(curr.id)} className={(curr.status === 1 ? "bg-green-800/20 text-green-400" : "bg-red-800/20 text-red-400") + " h-fit w-fit whitespace-nowrap px-3 py-[2px] text-sm rounded-xl cursor-pointer"}>
                          {curr.status === 1 ? "ยืนยันแล้ว" : "ยังไม่ยืนยัน"}
                        </span>
                      </div>
                    </td>
                    <td className="border rounded-md p-3 cursor-pointer">
                      <div className="flex gap-2">
                        <span className="text-yellow-400 hover:text-yellow-600 ">
                          <FontAwesomeIcon onClick={() => onClick(curr.id)} icon={['fas', 'edit']} />
                        </span>
                        <span className="text-red-400 hover:text-red-600 ">
                          <FontAwesomeIcon onClick={() => onDelete(curr.id)} icon={['fas', 'trash']} />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Fragment>
          ) : (
            <tbody>
              <tr>
                <td colSpan={10} className="">
                  <NotFound className="dark:bg-transparent p-5 h-fit" />
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </Fragment >
  )
}

export default ShowDataResearchBack