import { Lucide } from ".."

function NotFound() {
  return (
    <div className="w-full h-60 grid col-span-4 place-content-center gap-2 dark:bg-zinc-800">
      <div className="flex flex-col gap-2 items-center justify-center">
        <Lucide name="FileX2" size='50' className="text-red-400" />
        <p className="text-2xl">ไม่พบข้อมูล (404)</p>
      </div>
    </div>
  )
}

export default NotFound