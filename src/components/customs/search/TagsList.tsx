import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { IRootState, store } from '@store/index';
import { setDateValue, setSearch, setTagsList } from '@store/search.store/search.slice';
import TagsSearch from '../selectSearch/tagsSearch';
import { FormatterDate } from '@components/helper/FunctionHelper';
import { DateValueType } from 'react-tailwindcss-datepicker';


function TagsList() {
  const { tagsList, dateValue } = useSelector((state: IRootState) => state.RDsearch);

  function formatDateForTagsList(val: DateValueType) {
    return `${FormatterDate(val?.startDate ?? "")} ~ ${FormatterDate(val?.endDate ?? "")}`;
  }

  const handleSearchTagsDelete = (str: string) => {
    const words = str.toLowerCase();
    const isValue = tagsList.includes(words);
    if (isValue) {
      const filteredArray = tagsList.filter((item) => item !== words);
      if (formatDateForTagsList(dateValue) === words) {
        store.dispatch(setDateValue(null));
      }
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
                returnDelete={handleSearchTagsDelete}
              />
            ))}
          </div>
          <button
            type="reset"
            onClick={() => {
              store.dispatch(setTagsList([]));
              store.dispatch(setSearch(""));
              store.dispatch(setDateValue(null));
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