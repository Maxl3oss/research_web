import { Fragment, useEffect, useState, FC } from 'react';

export type AlertType = {
  title?: string;
  text?: string;
  icon?: "success" | "error";
  isShow?: boolean;
}

interface IProps {
  alert: AlertType;
  onChange?: (isShow: boolean) => void;
}

type ITheme = {
  icon: JSX.Element,
  color: string,
  colorBar: string,
}

const iconJSON = {
  "X": (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "check": (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

const CustomAlert: FC<IProps> = ({ alert, onChange }) => {
  const [theme, setTheme] = useState<ITheme | null>(null);

  useEffect(() => {
    switch (alert?.icon) {
      case "success":
        setTheme({
          icon: iconJSON.check,
          color: "bg-green-400/50 text-green-800 dark:text-green-200 dark:bg-green-400/20",
          colorBar: "bg-green-500 dark:bg-green-500/20",
        })
        break;
      case "error":
        setTheme({
          icon: iconJSON.X,
          color: "bg-red-400/50 text-red-800 dark:text-red-300 dark:bg-red-400/20",
          colorBar: "bg-red-500 dark:bg-red-500/20"
        })
        break;
    }
    // auto close
    const timer = setTimeout(() => {
      onChange && onChange(false);
    }, 4900);

    return () => {
      clearTimeout(timer); // Clear the timer if the component unmounts before the timeout
    };
  }, [alert.icon, alert.isShow]);

  return (
    <Fragment>
      {alert.isShow ?
        (
          <div id="countdown-div" className="fixed left-0 bottom-0 h-fit w-fit min-w-sm">
            <div className={`relative flex gap-2 items-center ml-2 py-3 px-4 border-0 rounded-lg mb-4 ${theme?.color}`}>
              <span className="text-xl inline-block align-middle">
                {theme?.icon}
              </span>
              <span className="inline-block align-middle text-base">
                <b className="capitalize mr-1">{alert?.title}!</b>{alert?.text}
              </span>
              <button
                className="pl-2 bg-transparent font-semibold leading-none outline-none focus:outline-none"
                onClick={() => onChange && onChange(false)}
              >
                <span className="text-2xl">×</span>
              </button>
              <div className="absolute bottom-0 left-0 w-full">
                <div id="countdown-bar" className={`${theme?.colorBar} h-1 w-full rounded-b-lg`}></div>
              </div>
            </div>
          </div>
        )
        : null}
    </Fragment>
  );
};

export default CustomAlert;