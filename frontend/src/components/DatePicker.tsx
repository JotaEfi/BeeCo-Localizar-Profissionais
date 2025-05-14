import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerComponent() {
  const [data, setData] = useState(new Date());

  return (
    <div className="flex flex-col">
      <DatePicker
        selected={data}
        onChange={(date) => setData(date!)}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
        locale="pt-BR"
        className="w-[58px] text-sm"
      />
    </div>
  );
}

export default DatePickerComponent;
