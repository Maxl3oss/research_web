import { Fragment } from 'react';
import TabFilter from './TabFilter';
import TabResult from './TabResult';
import { useSelector } from 'react-redux';
import { IRootState, store } from '@store/index';
import TagsSearch from '../selectSearch/tagsSearch';
import { setTagsList } from '@store/search.store/search.slice';

interface Props {
  activeTab: number;
}

const Tabs = ({ activeTab }: Props) => {
  const tagsList = useSelector((state: IRootState) => state.RDsearch.tagsList);

  const handleSearchTagsClick = (str: string) => {
    const words = str.toLowerCase();
    const isValue = tagsList.includes(words);
    if (isValue) {
      const filteredArray = tagsList.filter((item) => item !== words);
      return store.dispatch(setTagsList(filteredArray));
    }
    store.dispatch(setTagsList([...tagsList, words]));
  }

  return (
    <Fragment>
      <div className="flex h-fit justify-between items-end gap-3">
        {tagsList.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-1">
              {tagsList.map((option, key) => (
                <TagsSearch
                  key={key}
                  title={option}
                  returnDelete={handleSearchTagsClick}
                />
              ))}
            </div>
            <button
              type="reset"
              onClick={() => store.dispatch(setTagsList([]))}
              className="text-sm h-fit p-1 px-2 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg"
            >
              ล้าง
            </button>
          </>
        ) : null}
      </div>
      <hr className="dark:border-zinc-700 w-full" />

      <div className="w-full min-h-[300px] block relative max-h-[calc(100vh_-_15rem)] overflow-y-scroll">
        {activeTab === 1 && <TabResult />}
        {activeTab === 2 && <TabFilter />}
      </div>
    </Fragment>
  );
};

export default Tabs;
