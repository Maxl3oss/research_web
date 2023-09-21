import { Fragment } from "react"

function TabResult() {
  return (
    <Fragment>
      <div className="grid space-y-2">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="flex h-fit gap-3 hover:bg-gray-200 dark:hover:bg-zinc-900 p-2 rounded-lg cursor-pointer">
            <img
              className="w-10 max-h-10 rounded-full border dark:border-gray-700"
              src="https://i.pinimg.com/736x/80/17/86/80178693d1d0c7e0ec688707b02ecc0b.jpg"
              alt=""
            />
            <div className="block">
              <div className="flex gap-1 line-clamp-1 text-sm">
                โครงการพัฒนาเว็ปไซต์
                <span className="bg-indigo-600/20 text-indigo-400 px-1 text-xs rounded-lg align-middle whitespace-nowrap">ณรงค์ฤทธิ์</span>
              </div>

              <div className="grid gap-1 ">
                <span className="indent-3 line-clamp-3 text-xs">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto perferendis dicta harum repellendus porro reiciendis impedit illum, in quibusdam temporibus aut vel dignissimos accusamus, fugit, quisquam ut magni earum at.
                </span>
                <div className="flex gap-1">
                  <p className="tags-theme p-1">
                    เทคโนโลยี
                  </p>
                  <p className="tags-theme p-1">
                    โครงงาน
                  </p>
                  <p className="tags-theme p-1">
                    วิจัย
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  )
}

export default TabResult