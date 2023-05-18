import { Fragment } from 'react'
import { twMerge } from 'tailwind-merge';

const Input = ((props: any) => {
    return (
        <Fragment>
            <input
                {...props}
                className={twMerge([
                    "bg-gray-50 border border-gray-300 text-gray-900 sm:text-xs text-sm rounded-lg",
                    "focus:border-blue-500 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 block w-full p-2.5",
                    "dark:bg-zinc-800 dark:border-zinc-800 dark:placeholder-zinc-300 dark:text-white dark:ring-zinc-700",
                    props.className,
                ])}
            />
            {props.name && props.openError &&
                <div className="mt-1 text-red-500 text-xs">{props.errorMessage}</div>
            }
        </Fragment>
    );
});

export default Input;