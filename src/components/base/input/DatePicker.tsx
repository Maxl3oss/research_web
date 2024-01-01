import React, { useEffect, useState } from 'react';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/th';

dayjs.locale('th');
const thaiDate = new Date();
thaiDate.setFullYear(thaiDate.getFullYear() + 543);

type Props = {
  onChange?: (val: DateValueType) => void;
  useRange?: boolean;
  value?: DateValueType;
}

const DatePicker: React.FC<Props> = (props) => {
  const { onChange, useRange = true, value } = props;
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: thaiDate,
    endDate: null,
  });

  const handleValueChange = (newValue: DateValueType) => {
    setDateValue(newValue);
    onChange ? onChange(newValue) : null;
  };

  useEffect(() => {
    if (value) {
      setDateValue(value);
    }
  }, [value]);
  return (
    <Datepicker
      value={dateValue}
      startFrom={thaiDate}
      showShortcuts={false}
      primaryColor="indigo"
      inputClassName="input-base"
      i18n="th-TH"
      displayFormat="DD MMMM YYYY"
      onChange={handleValueChange}
      useRange={useRange}
      asSingle={!useRange}
    />
  );
};

export default DatePicker;
