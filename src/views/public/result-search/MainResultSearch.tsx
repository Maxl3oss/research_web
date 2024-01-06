import { Fragment } from 'react';
import TabFilter from "@components/customs/search/TabFilter";
import TagsList from '@components/customs/search/TagsList';
import NotFound from '@components/base/notFound';
import { CardResearch } from '@components/customs/card';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState } from '@store/index';

function MainResultSearch() {
  const navigate = useNavigate();
  const { data } = useSelector((state: IRootState) => state.RDsearch);
  const handleChangePage = async (id: number) => {
    const state = {
      id: id
    }
    navigate("/research/detail-research", { state });
  }

  return (
    <Fragment>
      <div className="pt-5 lg:pt-0 md:p-5">
        <div className="flex flex-wrap min-h-10 mb-5 items-center gap-3">
          <span className="w-full py-1 md:w-10 whitespace-nowrap">
            ค้นหา
          </span>

          <div className="flex w-full md:flex-1 items-end justify-between">
            <TagsList />
          </div>
        </div>
        <section className="flex gap-2">
          <div className="flex-1 space-y-2 dark:bg-zinc-900 max-w-full h-fit rounded-lg shadow-md">
            {data.length > 0
              ? data.map((item, idx) => (
                <Fragment key={idx}>
                  <CardResearch item={item} handleChangePage={handleChangePage} />
                </Fragment>
              ))
              : <NotFound className="rounded-lg" />}
          </div>
          <div className="hidden lg:block w-96 p-5 dark:bg-zinc-800 h-fit rounded-lg shadow-md">
            <TabFilter />
          </div>
        </section>
      </div>
    </Fragment>
  );
}

export default MainResultSearch;