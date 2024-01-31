import { Fragment } from 'react'
import { IUsersBack } from './MainUsersBack'
import { IPagin } from '@interfaces/pagin.interface';
import { FindIndex, FindPrefix } from '@components/helper/FunctionHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NotFound from '@components/base/notFound';
import NoProfile from '@assets/images/NoProfile.png';

interface IProps {
  raw: IUsersBack[];
  pagin: IPagin;
  isLoading: boolean;
  onVerify: (val: string) => void;
  onDelete: (val: string) => void;
  onUpdate: (val: string) => void;
}

function ShowDataUsersBack({ raw, pagin, isLoading, onVerify, onDelete, onUpdate }: IProps) {
  return (
    <Fragment>
      <div className="mt-5 w-full">
        {/* <div className="row-span-2 col-span-3 gird max-h-full gap-3 bg-back-theme p-5 rounded-xl"> */}
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
                    <th className="p-3 text-left w-fit">No.</th>
                    <th className="p-3 text-left hidden md:table-cell md:w-fit whitespace-nowrap">โปรไฟล์</th>
                    <th className="p-3 text-left md:w-5/12">ชื่อ-นามสกุล</th>
                    <th className="p-3 text-left md:w-5/12">อีเมล</th>
                    <th className="p-3 text-left">สถานะ</th>
                    <th className="p-3 text-left">#</th>
                  </tr>
                ))}
              </thead>
              <tbody className="flex-1 md:flex-none">
                {raw.map((curr, index) => (
                  <tr key={index} className="flex flex-col flex-nowrap md:table-row mb-2 md:mb-0">
                    <td className="border rounded-md p-3">{FindIndex(pagin, index)}</td>
                    <td className="border rounded-md p-3 hidden md:table-cell">
                      <div className="flex items-center justify-center">
                        <img
                          alt=""
                          src={curr.profile || NoProfile}
                          className="w-10 h-10 p-[0.5px] object-cover rounded-full border"
                          onError={({ currentTarget }) => currentTarget.src = NoProfile}
                        />
                      </div>
                    </td>
                    <td className="border rounded-md p-3">{FindPrefix(curr.prefix)+curr.first_name + " " + curr.last_name}</td>
                    <td className="border rounded-md p-3">
                      <span className="max-h-16 line-clamp-1">{curr.email}</span>
                    </td>
                    <td className="border rounded-md p-3">
                      <div className="flex w-full">
                        <span onClick={() => onVerify(curr.id)} className={(curr.status === 1 ? "bg-green-800/20 text-green-400" : "bg-red-800/20 text-red-400") + " h-fit w-fit whitespace-nowrap px-3 py-[2px] text-sm rounded-xl cursor-pointer"}>
                          {curr.status === 1 ? "ยืนยันแล้ว" : "ยังไม่ยืนยัน"}
                        </span>
                      </div>
                    </td>
                    <td className="border rounded-md p-3 cursor-pointer">
                      <div className="flex gap-2">
                        <span className="text-yellow-400 hover:text-yellow-600 ">
                          <FontAwesomeIcon onClick={() => onUpdate(curr.id)} icon={['fas', 'edit']} />
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
    </Fragment>
  )
}

export default ShowDataUsersBack