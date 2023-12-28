import { Input } from '@components/base';
import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { IRootState, store } from '@store/index';
import { useSelector } from 'react-redux';
import { setTagsList } from '@store/search.store/search.slice';
import { nanoid } from '@reduxjs/toolkit';

interface Props {
  options: any[];
  placeholder?: string;
  isMultiple?: boolean;
  optionId?: string;
  optionLabel?: string;
}

const SelectSearch: React.FC<Props> = ({ options, placeholder, isMultiple, optionLabel = "name" }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState<any[]>(options);
  const tagsList = useSelector((state: IRootState) => state.RDsearch.tagsList);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value.toLowerCase();
    setSearchTerm(searchQuery);
    const filteredOptions = options.filter((option) =>
      option[optionLabel].toLowerCase().includes(searchQuery)
    );
    setFilteredOptions(filteredOptions);
  };

  const handleSearchTagsClick = (str: string) => {
    setSearchTerm("");
    const words = str;

    const isValue = tagsList.includes(words);
    if (!isMultiple) {
      // remove item in option on tagsList 
      const prev = tagsList.filter((curr) => !options.map(item => item[optionLabel] === curr));
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
  }, [searchTerm]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  return (
    <div className="relative" ref={ref}>
      <div className="flex w-full items-center border dark:border-zinc-600 rounded-lg">
        <Input
          value={searchTerm}
          onChange={handleSearchChange}
          onClick={() => setIsOpen(prev => !prev)}
          placeholder={placeholder ?? "--- เลือก / ค้นหา ---"}
          className="focus:ring-0 w-full"
        />
      </div>
      {isOpen ? (
        <ul
          className={twMerge([
            "absolute w-full mt-12 z-50 max-h-[180px] text-sm overflow-auto",
            "bg-theme rounded-lg border dark:border-zinc-600",
            isOpen ? "top-0" : "hidden",
          ])}
        >
          {filteredOptions?.length > 0 ? filteredOptions?.map((option) => (
            <li
              className={twMerge([
                "p-2 hover:bg-gray-100 dark:hover:bg-zinc-600 cursor-pointer",
                `${tagsList?.some(it => it === option[optionLabel]) ? "dark:bg-zinc-900 bg-gray-200" : ""}`,
              ])}
              onClick={() => {
                handleSearchTagsClick(option[optionLabel]);
                if (filteredOptions?.length !== options?.length) setFilteredOptions(options);
              }}
              key={nanoid()}
            >
              {option[optionLabel]}
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
