import { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({ children, className }) => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction: string) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className="my-2 mx-auto">
      <div className="relative overflow-hidden">
        <div className="flex justify-between absolute top left w-full h-full">
          <div
            className="hover:bg-zine-900/75 text-black dark:text-white flex items-center justify-center opacity-60 hover:opacity-100 z-10 p-0 m-0 transition-all ease-in-out duration-300"
          >
            <button
              onClick={movePrev}
              className="rounded-full grid place-content-center bg-slate-100 dark:bg-zinc-950 w-14 h-14 disabled:opacity-25 disabled:cursor-not-allowed"
              disabled={isDisabled('prev')}

            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </div>
          <div
            className="hover:bg-zine-900/75 text-black dark:text-white flex items-center justify-center opacity-60 hover:opacity-100 z-10 p-0 m-0 transition-all ease-in-out duration-300"
          >
            <button
              onClick={moveNext}
              className="grid place-content-center bg-slate-100 dark:bg-zinc-950 w-14 h-14 rounded-full disabled:opacity-25 disabled:cursor-not-allowed"
              disabled={isDisabled('next')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
        <div
          ref={carousel}
          className={twMerge(["relative flex gap-1 overflow-auto sm:overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0", className])}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
