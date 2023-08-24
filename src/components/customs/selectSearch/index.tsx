import { Input } from '@components/base';
import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { IRootState, store } from '@store/index';
import { useSelector } from 'react-redux';
import { setTagsList } from '@store/search.store/search.slice';

interface Props {
  options: string[];
  placeholder?: string;
  isMultiple?: boolean;
}

const SelectSearch: React.FC<Props> = ({ options, placeholder, isMultiple }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const tagsList = useSelector((state: IRootState) => state.RDsearch.tagsList);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value.toLowerCase();
    setSearchTerm(searchQuery);
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(searchQuery)
    );
    setFilteredOptions(filteredOptions);
  };

  const handleSearchTagsClick = (str: string) => {
    setSearchTerm("");
    const words = str;
    
    const isValue = tagsList.includes(words);
    if (!isMultiple) {
      // remove item in option on tagsList 
      const prev = tagsList.filter((curr) => !options.includes(curr));
      return store.dispatch(setTagsList([...prev, words]));
    } else if (isValue) {
      const filteredArray = tagsList.filter((item) => item !== words);
      return store.dispatch(setTagsList(filteredArray));
    }
    store.dispatch(setTagsList([...tagsList, words]));
  }

  // close on click outside
  const checkIfClickedOutside = (e: MouseEvent) => {
    if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(prev => !prev);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (searchTerm) {
      setIsOpen(true);
    }
  }, [searchTerm])

  return (
    <div className="px-2" ref={ref}>
      <div className="flex items-center border dark:border-zinc-600 rounded-lg">
        <Input
          value={searchTerm}
          onChange={handleSearchChange}
          onClick={() => setIsOpen(prev => !prev)}
          placeholder={placeholder ?? "--- เลือก / ค้นหา ---"}
          className="focus:ring-0 min-w-fit"
        />
      </div>
      {isOpen ? (
        <ul
          className={twMerge([
            "fixed max-w-[calc(576px_-_40px)] w-[calc(100%_-_4rem)] sm:w-11/12 md:w-[60%] lg:w-full max-h-[180px] text-sm z-50 overflow-auto",
            "bg-theme rounded-lg border dark:border-zinc-600"
          ])}
        >
          {filteredOptions.length > 0 ? filteredOptions.map((option, index) => (
            <li
              className={twMerge([
                "p-2 hover:bg-gray-100 dark:hover:bg-zinc-600 cursor-pointer",
                `${tagsList.includes(option) ? "dark:bg-zinc-900 bg-gray-200" : ""}`,
              ])}
              onClick={() => handleSearchTagsClick(option)}
              key={index}
            >
              {option}
            </li>
          )) : (
            <li className="p-2 hover:bg-gray-100 text-red-500 dark:hover:bg-zinc-600 cursor-pointer">
              ไม่พบข้อมูล
            </li>
          )}
        </ul>
      ) : null}
    </div>
  );
};

export default SelectSearch;
