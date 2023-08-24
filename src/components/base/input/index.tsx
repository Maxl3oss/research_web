import { forwardRef, InputHTMLAttributes, Fragment } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegister<any>;
  error?: FieldError | undefined;
}

const Input = forwardRef<HTMLInputElement | null, CustomInputProps>(
  ({ register, error, ...rest }, ref) => (
    <Fragment>
      <input
        {...rest}
        {...register?.(rest.name ?? "")}
        ref={ref}
        className={twMerge([
          "bg-gray-50 border border-gray-300 text-zinc-900 sm:text-sm text-base rounded-lg",
          "focus:border-blue-500 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 block w-full p-2.5",
          "dark:bg-zinc-800 dark:border-zinc-800 dark:ring-zinc-800/60 dark:placeholder-zinc-300 dark:text-white",
          "dark:placeholder:text-zinc-400",
          rest.className,
        ])}
      />
      {error && <span className="alert">{error?.message}</span>}
    </Fragment>
  )
);

export default Input;
