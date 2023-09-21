import { Fragment } from 'react';
import TabFilter from "@components/customs/search/TabFilter";
import TabResult from '../../../components/customs/search/TabResult';

function MainResultSearch() {
  return (
    <Fragment>
      <div className="flex gap-2">
        <div className="w-96 p-5 dark:bg-zinc-800 h-fit rounded-lg shadow-md">
          <TabFilter />
        </div>
        <fieldset className="flex-1 max-w-2xl px-5 h-fit rounded-lg shadow-md">
          <TabResult />
        </fieldset>
      </div>
    </Fragment>
  );
}

export default MainResultSearch;