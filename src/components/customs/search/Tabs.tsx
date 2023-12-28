import { Fragment, useEffect, useState } from 'react';
import TabFilter from './TabFilter';
import TabResult from './TabResult';
import TagsList from './TagsList';
import { IResearch, IResponse } from '@interfaces/research.interface';
import { GetResearch } from '@services/research.service';
import { useSelector } from 'react-redux';
import { IRootState } from '@store/index';
import { debounce } from 'lodash';
import { searchJSON, sortJSON } from './optionJSON.json';
import { FindDataInJSON, SubtractYear543 } from '@components/helper/FunctionHelper';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setResultSearch } from '@store/search.store/search.slice';
import { FetchTagsDDL } from '@services/tags.service';

type Props = {
  search: string,
  activeTab: number,
  returnIsOpen: (val: boolean) => void,
}

export type ITypeDDL = {
  id: number;
  name: string;
}

const Tabs = ({ activeTab, search, returnIsOpen }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tagsList, dateValue, isLoad } = useSelector((state: IRootState) => state.RDsearch);
  const [raw, setRaw] = useState<IResearch[]>([]);
  const [tagsDDL, setTagsDDL] = useState<ITypeDDL[]>([]);

  const fetchData = debounce(async (search = "", fill = "", orderBy = "", category = "", startDate = "", endDate = "") => {
    orderBy === "2" ? "desc" : "asc";
    const res: IResponse<IResearch[]> = await GetResearch(1, 10, orderBy, search, fill, category, startDate, endDate);
    if (res && (res?.taskStatus && res?.statusCode === 200)) {
      setRaw(res.data);
    }
  }, 1500);

  const handleChangePage = (id: number) => {
    returnIsOpen(false);
    const res = sortData(raw, id);
    dispatch(setResultSearch(res));
    navigate("/research/result", {
      state: {
        search: search,
      }
    })
  }

  async function fetchTagsDDL() {
    const res = await FetchTagsDDL();
    if (res && (res.statusCode === 200 && res.taskStatus)) {
      setTagsDDL(res.data);
    }
  }

  function sortData(data: IResearch[], sortId: number): IResearch[] {
    const sortedData = data.slice().sort((a, b) => (a.id === sortId ? -1 : b.id === sortId ? 1 : a.id - b.id));
    return sortedData;
  }

  useEffect(() => {
    const fill = FindDataInJSON(tagsList, searchJSON);
    const sort = FindDataInJSON(tagsList, sortJSON);
    const category = FindDataInJSON(tagsList, tagsDDL);
    const startDate = SubtractYear543(dateValue?.startDate);
    const endDate = SubtractYear543(dateValue?.endDate);
    fetchData(search, fill, sort, category, startDate, endDate);
  }, [tagsList, search, dateValue]);

  useEffect(() => {
    fetchTagsDDL();
  }, []);

  return (
    <Fragment>
      <div className="flex h-fit justify-between items-end gap-3">
        <TagsList />
      </div>
      <hr className="dark:border-zinc-700 w-full" />

      <div className={`${activeTab === 1 && "overflow-y-scroll"} w-full block relative max-h-[calc(100vh_-_15rem)] transition-all duration-300 transform`}>
        {activeTab === 1 && <TabResult onClick={handleChangePage} isLoading={isLoad} raw={raw} />}
        {activeTab === 2 && <TabFilter />}
      </div>
    </Fragment>
  );
};

export default Tabs;
