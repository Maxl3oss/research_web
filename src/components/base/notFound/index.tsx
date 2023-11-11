import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCircleXmark } from "@fortawesome/free-solid-svg-icons";

function NotFound({ className = "" }: { className?: string }) {
  return (
    <div className={`${className} w-full h-60 grid col-span-4 place-content-center gap-2 dark:bg-zinc-800`}>
      <div className="flex flex-col gap-2 items-center justify-center">
        <FontAwesomeIcon className="text-3xl" icon={faFileCircleXmark} />
        <p className="text-xl">ไม่พบข้อมูล (404)</p>
      </div>
    </div>
  )
}

export default NotFound