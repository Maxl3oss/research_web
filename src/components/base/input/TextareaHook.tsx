import { ErrorMessage } from '@hookform/error-message';
import { FC, Fragment, TextareaHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextareaHook: FC<TextareaProps> = (props) => {
  const { register, formState: { errors, touchedFields } } = useFormContext(); // Retrieve all hook methods
  const name = props.name ?? "";
  // console.log(name, (errors[name] ? "1" : (touchedFields[name] ? "3" : "2")));
  // touchedFields[name] ? (errors[name] ? "!bg-red-400/10 !border-red-500/20" : "!bg-green-400/10 !border-green-500/20") : "",
  // errors[name] ? "!bg-red-400/10 !border-red-500/20" : (touchedFields[name] ? "!bg-green-400/10 !border-green-500/20" : "")

  return (
    <Fragment>
      <textarea
        {...register(name)}
        {...props}
        className={twMerge([
          "bg-gray-50 border border-gray-300 text-zinc-900 sm:text-sm text-base rounded-lg",
          "focus:border-blue-500 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 block w-full p-2.5",
          "dark:bg-zinc-800 dark:border-zinc-800 dark:ring-zinc-800/60 dark:placeholder-zinc-300 dark:text-white",
          "dark:placeholder:text-zinc-400",
          errors[name] ? "!bg-red-400/10 !border-red-500/20" : (touchedFields[name] ? "!bg-green-400/10 !border-green-500/20" : ""),
          props.className,
        ])}
      />
      {/* {errors && <span className="alert">{errors.root?.message}</span>} */}
      < ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <div role="alert" className="alert">{message}</div>}
      />
    </Fragment>
  );
};

export default TextareaHook;