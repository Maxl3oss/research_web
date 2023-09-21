import { Input } from "@components/base";
import { useEffect, useRef, useState } from "react";
import Tabs from "./Tabs";

interface Props {
  isOpen: boolean;
  returnIsOpen: (value: boolean) => void;
}

function Search({ isOpen, returnIsOpen }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<number>(1);

  useEffect(() => {
    if (isOpen) {
      inputRef?.current?.focus();
      document.body.style.overflow = 'hidden';
      document.addEventListener('click', handleClickOutside);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleClickOutside = (event: MouseEvent) => {
    if (cardRef.current && cardRef.current === event.target as Node) {
      returnIsOpen(false);
    }
  };

  useEffect(() => {
    if(isOpen === false) setActiveTab(1);
  },[isOpen])

  return (
    <section className={`${!isOpen ? "hidden" : ""} fixed inset-0 z-10 dark:text-white`}>
      <div ref={cardRef} className="min-h-full w-full flex justify-center p-3 pb-5 md:pt-14 bg-zinc-800/20">

        <div className="h-fit w-full md:w-8/12 max-w-xl">
          {/* search bar */}
          <div className="flex items-center py-1 pl-4 pr-2 h-fit bg-theme rounded-full dark:border-zinc-700 border">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <Input
              type="text"
              className="h-10 text-base rounded-l-full focus:ring-0 border-0"
              ref={inputRef}
            />
            <div onClick={() => setActiveTab((prev) => prev === 1 ? 2 : 1)} className="hover:bg-indigo-50 dark:hover:bg-zinc-900 p-2 rounded-full cursor-pointer">
              {
                activeTab === 1 ?
                  (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                  )
              }
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-full bg-theme min-h-[350px] rounded-lg mt-1 p-3">
            {/* result */}
            <Tabs activeTab={activeTab} />
            {/* end result list */}
          </div>
          <div className="flex justify-center mt-2">
            <div onClick={() => returnIsOpen(false)} className="p-2 rounded-full cursor-pointer bg-gray-100/40 hover:bg-gray-100/100 dark:bg-zinc-800 hover:dark:bg-zinc-900">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Search