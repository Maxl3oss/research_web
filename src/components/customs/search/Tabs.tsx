import { Fragment } from 'react';
import TabFilter from './TabFilter';
import TabResult from './TabResult';
import TagsList from './TagsList';
interface Props {
  activeTab: number;
}

const Tabs = ({ activeTab }: Props) => {

  return (
    <Fragment>
      <div className="flex h-fit justify-between items-end gap-3">
        <TagsList />
      </div>
      <hr className="dark:border-zinc-700 w-full" />

      <div className={`${activeTab === 1 && "overflow-y-scroll"} w-full min-h-[300px] block relative max-h-[calc(100vh_-_15rem)] transition-all duration-300 transform`}>
        {activeTab === 1 && <TabResult />}
        {activeTab === 2 && <TabFilter />}
      </div>
    </Fragment>
  );
};

export default Tabs;
