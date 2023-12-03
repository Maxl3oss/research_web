import { Input } from "@components/base"
import SelectSearch from "../selectSearch";
import { Fragment } from "react";

function TabFilter() {
  const optionsSearch = ['ชื่อเรื่อง', 'ผู้สร้างผลงาน', 'รายวิชา', 'บทคัดย่อ', 'ผู้ร่วมสร้างสรรค์ผลงาน'];
  const optionsSort = ['เรียงจาก ก-ฮ', 'เรียงจาก ฮ-ก'];
  const optionsCategory = ['พัฒนาเว็ปไซต์', 'อินเทอร์เน็ตในทุกสิ่ง (IoT)'];

  return (
    <Fragment>
      <div className="flex flex-col px-1 pb-3 min-h-[300px] space-y-3">
        <div className="space-y-2">
          <label className="text-base font-bold">ค้นหา</label>
          <SelectSearch options={optionsSearch} isMultiple />
        </div>
        <div className="space-y-2">
          <label className="text-base font-bold">ช่วงเวลา</label>
          <div className="flex flex-wrap w-full px-2 gap-y-2">
            <div className="flex items-center w-full text-sm gap-2">
              <label className="w-3/12">ระหว่าง</label>
              <Input type="date" className="dark:border-zinc-600" lang="th" name="" />
            </div>
            <div className="flex items-center w-full text-sm gap-2">
              <label className="w-3/12">ถึง</label>
              <Input type="date" className="dark:border-zinc-600" lang="th" name="" />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-base font-bold">เรืยงลำดับตาม</label>
          <SelectSearch options={optionsSort} />
        </div>
        <div className="space-y-2">
          <label className="text-base font-bold">หมวดหมู่</label>
          <SelectSearch options={optionsCategory} />
        </div>
      </div>
    </Fragment>
  )
}

export default TabFilter