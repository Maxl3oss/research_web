import React, { useState } from 'react';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/th'; 

dayjs.locale('th');
const thaiDate = new Date();
thaiDate.setFullYear(thaiDate.getFullYear() + 543);

type Props = {
  onChange: (val: DateValueType) => void
}

const DatePicker: React.FC<Props> = ({ onChange }) => {
  const [value, setValue] = useState<DateValueType>({
    startDate: thaiDate,
    endDate: null,
  });

  const handleValueChange = (newValue: DateValueType) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Datepicker
      value={value}
      startFrom={thaiDate}
      showShortcuts={false}
      primaryColor="indigo"
      inputClassName="input-base"
      i18n="th-TH"
      displayFormat="DD MMMM YYYY"
      onChange={handleValueChange}
    />
  );
};

export default DatePicker;
