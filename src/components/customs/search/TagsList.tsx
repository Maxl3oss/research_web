import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { IRootState, store } from '@store/index';
import { setSearch, setTagsList } from '@store/search.store/search.slice';
import TagsSearch from '../selectSearch/tagsSearch';


function TagsList() {
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
            onClick={() => {
              store.dispatch(setTagsList([]));
              store.dispatch(setSearch(""));
            }}
            className="text-sm h-fit p-1 px-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg"
          >
            ล้าง
          </button>
        </>
      ) : null}
    </Fragment>
  )
}

export default TagsList