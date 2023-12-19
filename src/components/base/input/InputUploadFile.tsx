import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage } from '@hookform/error-message';
import { FC, Fragment, InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

type InputProp = InputHTMLAttributes<HTMLInputElement>;

type CustomInputProp = InputProp & {
  fileName?: (val: string) => void,
};

const InputUploadFile: FC<CustomInputProp> = (props) => {
  const { register, formState: { errors, touchedFields }, getValues, setValue } = useFormContext();
  const name = props.name ?? "";
  const getData = getValues(name);
  const fileName = (typeof getData === "string" && getData !== "") ? getData : null;

  return (
    <Fragment>
      <div className="relative">
        <label title="Click to upload" htmlFor={name} className={`cursor-pointer flex items-center gap-4 px-6 py-4 group bg-theme rounded-xl
          ${errors[name] ? "!bg-red-400/10 !border-red-500/20" : (touchedFields[name] ? "!bg-green-400/10 !border-green-500/20" : "")}
          ${props.className}
        `}>
          <div className="w-max">
            <FontAwesomeIcon className="text-2xl" icon={(getData && getData?.length > 0 || fileName) ? ["fas", "file-pdf"] : ["fas", "upload"]} />
          </div>
          <div className="relative">
            <div className="block">
              <span className="block text-base font-semibold">
                {fileName ? fileName : getData?.length > 0 ? getData[0]?.name : "Upload a file"}
              </span>
              <span className="mt-0.5 block text-sm text-gray-500 dark:text-gray-400">Max 10 MB and type file (PDF)</span>
            </div>

          </div>
        </label>

        <div className="absolute h-full top-0 right-5 px-4 flex-ij-center">
          <FontAwesomeIcon
            icon={["fas", "x"]}
            className={getData && getData?.length > 0 ? "text-base cursor-pointer" : "sr-only"}
            onClick={() => setValue(name, [])}
          />
        </div>

        <input
          {...register(name)}
          {...props}
          id={name}
          className="sr-only"
          type="file"
        />
      </div>

      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <div role="alert" className="alert">{message}</div>}
      />
    </Fragment>
  );
};

export default InputUploadFile;