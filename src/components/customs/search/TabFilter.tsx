import { Input } from "@components/base"
import SelectSearch from "../selectSearch";

function TabFilter() {
  const optionsSearch = ['ชื่อเรื่อง', 'ผู้สร้างผลงาน', 'หัวเรื่อง', 'บทคัดย่อ', 'ผู้ร่วมสร้างสรรค์ผลงาน'];
  const optionsSort = ['เรียงจาก ก-ฮ', 'เรียงจาก ฮ-ก'];
  const optionsCategory = ['พัฒนาเว็ปไซต์', 'อินเทอร์เน็ตในทุกสิ่ง (IoT)'];

  return (
    <div className="flex flex-col pb-3 min-h-[300px] space-y-3 overflow-hidden">
      <div className="space-y-2">
        <label className="text-base font-bold">ค้นหา</label>
        <SelectSearch options={optionsSearch} isMultiple />
      </div>
      <div className="space-y-2">
        <label className="text-base font-bold">ช่วงเวลา</label>
        <div className="flex w-full gap-2 px-2">
          <div className="flex items-center w-1/2 text-sm gap-2">
            <label>ระหว่าง</label>
            <Input type="date" className="dark:border-zinc-600" lang="th" name="" />
          </div>
          <div className="flex items-center w-1/2 text-sm gap-2">
            <label>ถึง</label>
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
  )
}

export default TabFilter