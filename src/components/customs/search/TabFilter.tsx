import { Input } from "@components/base"
import SelectSearch from "../selectSearch";
import { Fragment, useEffect, useState } from "react";
import { ITypeDDL } from "./Tabs";
import { FetchTagsDDL } from "@services/tags.service";

function TabFilter() {
  const [tagsDDL, setTagsDDL] = useState<ITypeDDL[]>([]);
  const optionsSearch = [
    { id: 1, name: 'ชื่อเรื่อง' },
    { id: 2, name: 'ผู้สร้างผลงาน' },
    { id: 3, name: 'รายวิชา' },
    { id: 4, name: 'บทคัดย่อ' },
    { id: 5, name: 'ผู้ร่วมสร้างสรรค์ผลงาน' }
  ];
  const optionsSort = [
    { id: 1, name: 'เรียงจาก ก-ฮ' },
    { id: 1, name: 'เรียงจาก ฮ-ก' }
  ];

  async function fetchTagsDDL() {
    const res = await FetchTagsDDL();
    if (res && (res.statusCode === 200 && res.taskStatus)) {
      setTagsDDL(res.data);
    }
  }

  useEffect(() => {
    fetchTagsDDL();
  }, []);

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
          <SelectSearch options={tagsDDL} />
        </div>
      </div>
    </Fragment>
  )
}

export default TabFilter