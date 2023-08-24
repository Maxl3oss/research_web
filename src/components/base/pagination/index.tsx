import { IPagin } from "@interfaces/pagin.interface"
import { Fragment } from "react";

interface Props {
  pagin: IPagin;
  onPageChange: (curr: number) => void;
}

function Pagination({ pagin, onPageChange }: Props) {

  const handlePreviousPage = () => {
    onPageChange(Math.max(pagin.page - 1, 1));
  };

  const handleNextPage = () => {
    onPageChange(Math.min(pagin.page + 1, pagin.totalPage));
  };

  const getPageNumbers = (): number[] => {
    if (pagin.totalPage <= 5) {
      return Array.from({ length: pagin.totalPage }, (_, index) => index + 1);
    }

    let start = Math.max(pagin.page - 2, 1);
    let end = Math.min(pagin.page + 2, pagin.totalPage);

    if (end - start < 4) {
      if (pagin.page < pagin.totalPage / 2) {
        end = Math.min(end + (4 - (end - start)), pagin.totalPage);
      } else {
        start = Math.max(start - (4 - (end - start)), 1);
      }
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  return (
    <Fragment>
      <div className="w-fit flex gap-2">
        <button className="w-fit p-2 bg-theme rounded-lg shadow-sm font-bold" onClick={handlePreviousPage} disabled={pagin.page === 1}>
          ก่อนหน้า
        </button>
        {getPageNumbers().map((pageNum) => (
          <span
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`${pagin.page === pageNum ? "text-indigo-600 bg-white dark:bg-zinc-800 shadow-sm font-bold" : ""} p-2 px-3 rounded-md cursor-pointer`}
          >
            {pageNum}
          </span>
        ))}
        <button className="w-fit p-2 bg-theme rounded-lg shadow-sm font-bold" onClick={handleNextPage} disabled={pagin.page === pagin.totalPage}>
          ถัดไป
        </button>
      </div>
    </Fragment>
  );
}

export default Pagination