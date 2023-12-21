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
import { FindDataInJSON } from '@components/helper/FunctionHelper';
import { useNavigate } from 'react-router-dom';

interface Props {
  search: string,
  activeTab: number,
  returnIsOpen: (val: boolean) => void,
}

const Tabs = ({ activeTab, search, returnIsOpen }: Props) => {
  const navigate = useNavigate();
  const tagsList = useSelector((state: IRootState) => state.RDsearch.tagsList);
  const [raw, setRaw] = useState<IResearch[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = debounce(async (search = "", fill = "", sort = "") => {
    setIsLoading(true);
    const res: IResponse<IResearch[]> = await GetResearch(1, 10, "asc", search, fill, sort);
    setIsLoading(false);
    if (res && (res?.taskStatus && res?.statusCode === 200)) {
      setRaw(res.data);
    }
  }, 1500);

  const handleChangePage = () => {
    returnIsOpen(false);
    navigate("/research/result", {
      state: {
        search: search,
      }
    })
  }

  useEffect(() => {
    const fill = FindDataInJSON(tagsList, searchJSON);
    const sort = FindDataInJSON(tagsList, sortJSON);
    fetchData(search, fill, sort);
  }, [tagsList, search]);

  return (
    <Fragment>
      <div className="flex h-fit justify-between items-end gap-3">
        <TagsList />
      </div>
      <hr className="dark:border-zinc-700 w-full" />

      <div className={`${activeTab === 1 && "overflow-y-scroll"} w-full block relative max-h-[calc(100vh_-_15rem)] transition-all duration-300 transform`}>
        {activeTab === 1 && <TabResult onClick={handleChangePage} isLoading={isLoading} raw={raw} />}
        {activeTab === 2 && <TabFilter />}
      </div>
    </Fragment>
  );
};

export default Tabs;
