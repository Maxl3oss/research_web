import { Fragment, useEffect, useState } from 'react';
import TabFilter from "@components/customs/search/TabFilter";
import TagsList from '@components/customs/search/TagsList';
import NotFound from '@components/base/notFound';
import { debounce } from 'lodash';
import { IResearch, IResponse } from '@interfaces/research.interface';
import { GetResearch } from '@services/research.service';
import { CardLoading, CardResearch } from '@components/customs/card';
import { useNavigate } from 'react-router-dom';

function MainResultSearch() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [raw, setRaw] = useState<IResearch[]>([]);

  const fetchData = debounce(async (search = "", fill = "", sort = "") => {
    setIsLoading(true);
    const res: IResponse<IResearch[]> = await GetResearch(1, 10, "asc", search, fill, sort);
    setIsLoading(false);
    if (res && (res?.taskStatus && res?.statusCode === 200)) {
      setRaw(res.data);
    }
  }, 1500);

  const handleChangePage = async (id: number) => {
    const state = {
      id: id
    }
    navigate("/research/detail-research", { state });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <div className="md:p-5">
        <div className="flex flex-wrap min-h-10 mb-5 items-center gap-3">
          <span className="w-full py-1 md:w-10 whitespace-nowrap">
            ค้นหา
          </span>

          <div className="flex w-full md:flex-1 items-end justify-between">
            <TagsList />
          </div>
        </div>
        <div className="flex gap-2">
          <section className="flex-1 space-y-2 dark:bg-zinc-900 max-w-full h-fit rounded-lg shadow-md">
            {isLoading
              ? <CardLoading />
              : raw.length > 0
                ? raw.map((item) => (
                  <CardResearch item={item} handleChangePage={handleChangePage} />
                ))
                : <NotFound className="rounded-lg" />}
          </section>
          <div className="hidden lg:block w-96 p-5 dark:bg-zinc-800 h-fit rounded-lg shadow-md">
            <TabFilter />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default MainResultSearch;