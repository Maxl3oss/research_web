/* eslint-disable  @typescript-eslint/no-explicit-any */
import { InputHook } from '@components/base';
import React, { useState, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  options: any[];
  optionId: string;
  optionLabel: string;
  placeholder?: string;
  isMultiple?: boolean;
  value?: unknown;
  name: string;
  optionOnClick: (val: any) => void;
  onChange?: (val: React.FormEvent<HTMLInputElement>) => void;
}

const SelectSearchHook: React.FC<Props> = ({ options, onChange, optionOnClick, optionLabel, optionId, placeholder, value, name }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

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
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    if (value) {
      optionOnClick(filteredOptions.filter((curr) => curr[optionId] === value)[0]);
    }
  }, [value])

  return (
    <div className="relative" ref={ref}>
      <InputHook
        name={name}
        onClick={() => setIsOpen(prev => !prev)}
        placeholder={placeholder ?? "--- เลือก / ค้นหา ---"}
        className="focus:ring-0 w-full"
        onChange={onChange && onChange}
      />
      {isOpen ? (
        <ul
          className={twMerge([
            "absolute w-full mt-12 z-50 max-h-[180px] text-sm overflow-auto",
            "bg-theme rounded-lg border dark:border-zinc-600",
            isOpen ? "top-0" : "hidden",
          ])}
        >
          {filteredOptions?.length > 0 ? filteredOptions?.map((option, index) => (
            <li
              className={twMerge([
                "p-2 hover:bg-gray-100 dark:hover:bg-zinc-600 cursor-pointer",
                `${Number(value) === Number(option[optionId]) ? "dark:bg-zinc-900 bg-gray-200" : ""}`,
              ])}
              onClick={() => {
                setIsOpen(false);
                optionOnClick(option);
                if (filteredOptions?.length !== options?.length) setFilteredOptions(options);
              }}
              key={index}
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

export default SelectSearchHook;
