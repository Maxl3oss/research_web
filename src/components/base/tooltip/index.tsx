import { ReactNode } from 'react';

type Props = { children: ReactNode; titleTooltip: string; }

function Tooltip(props: Props) {
  return (
    <div className="relative flex flex-col items-center group">
      <div>
        {props.children}
      </div>
      <div className="absolute top-2 left-12 hover:flex hidden items-center mb-6 group-hover:flex">
        <div className="w-3 h-3 -mr-2 rotate-45 bg-zinc-700 bg-opacity-80"></div>
        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-zinc-700 shadow-lg rounded-lg">
          {props.titleTooltip}
        </span>
      </div>
    </div>
  )
}

export default Tooltip