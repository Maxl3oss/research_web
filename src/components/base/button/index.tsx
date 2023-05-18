import { Fragment } from 'react'
import { twMerge } from 'tailwind-merge';

const Button = ((props: any) => {
    return (
        <Fragment>
            <button
                {...props}
                type={props.type}
                className={twMerge([
                    "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:border-blue-500 focus:ring-blue-400",
                    "focus:outline-none focus:ring-opacity-40 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600",
                    "dark:hover:bg-blue-700 dark:focus:ring-blue-800",
                    props.className,
                ])}
            />
        </Fragment>
    );
});

export default Button;