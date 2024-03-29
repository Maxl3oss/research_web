import SelectSearch from "../selectSearch";
import { Fragment, useEffect, useState } from "react";
import { ITypeDDL } from "./Tabs";
import { FetchTagsDDL } from "@services/tags.service";
import DatePicker from "@components/base/input/DatePicker";
import { setDateValue, setTagsList } from "@store/search.store/search.slice";
import { IRootState, store } from "@store/index";
import { useSelector } from "react-redux";
import { DateValueType } from "react-tailwindcss-datepicker";
import { FormatterDate } from "@components/helper/FunctionHelper";
import { searchJSON, sortJSON } from "./optionJSON.json";

function TabFilter() {
  const { tagsList, dateValue } = useSelector((state: IRootState) => state.RDsearch);
  const [tagsDDL, setTagsDDL] = useState<ITypeDDL[]>([]);

  async function fetchTagsDDL() {
    const res = await FetchTagsDDL();
    if (res && (res.statusCode === 200 && res.taskStatus)) {
      setTagsDDL(res.data);
    }
  }

  const handleChangeValueDate = (val: DateValueType) => {
    // remove old value
    const getDate = formatDateForTagsList(dateValue);
    const filData = tagsList.filter((item) => item !== getDate);

    // new value
    const newDate = formatDateForTagsList(val);
    val?.startDate !== null || val?.endDate !== null ? filData.push(newDate) : null;
    store.dispatch(setTagsList([...filData]));
    store.dispatch(setDateValue(val));
  }

  function formatDateForTagsList(val: DateValueType) {
    return `${FormatterDate(val?.startDate ?? "")} ~ ${FormatterDate(val?.endDate ?? "")}`;
  }

  useEffect(() => {
    fetchTagsDDL();
  }, []);

  return (
    <Fragment>
      <div className="flex flex-col px-1 pb-3 min-h-[300px] space-y-3">
        <div className="space-y-2">
          <label className="text-base font-bold">ค้นหา</label>
          <SelectSearch options={searchJSON} isMultiple />
        </div>
        <div className="space-y-2">
          <label className="text-base font-bold">ช่วงเวลา</label>
          <DatePicker onChange={handleChangeValueDate} />
        </div>
        <div className="space-y-2">
          <label className="text-base font-bold">เรืยงลำดับตาม</label>
          <SelectSearch options={sortJSON} />
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