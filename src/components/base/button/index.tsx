import { ButtonHTMLAttributes, FC, Fragment } from 'react'
import { twMerge } from 'tailwind-merge';

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
    return (
        <Fragment>
            <button
                {...props}
                type={props.type}
                className={twMerge([
                    "px-4 rounded-md h-10 min-w-fit",
                    "bg-theme hover:bg-zinc-700",
                    props.className,
                ])}
            >
                {children}
            </button>
        </Fragment>
    );
};

export default Button;
