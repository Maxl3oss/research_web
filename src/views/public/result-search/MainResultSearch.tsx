import { Fragment } from 'react';
import TabFilter from "@components/customs/search/TabFilter";
import TabResult from '../../../components/customs/search/TabResult';
import TagsList from '@components/customs/search/TagsList';

function MainResultSearch() {
  return (
    <Fragment>
      <section className="bg-back-theme p-5">
        <div className="flex flex-wrap min-h-10 mb-5 items-center gap-3">
          <span className="w-full md:w-10 whitespace-nowrap">
            ค้นหา
          </span>

          <div className="flex w-full md:flex-1 items-end justify-between">
            <TagsList />
          </div>
        </div>
        <div className="flex gap-2">
          <fieldset className="flex-1 p-3 dark:bg-zinc-900 max-w-full h-fit rounded-lg shadow-md">
            <TabResult />
          </fieldset>
          <div className="hidden lg:block w-96 p-5 dark:bg-zinc-800 h-fit rounded-lg shadow-md">
            <TabFilter />
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default MainResultSearch;