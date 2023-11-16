import React from "react";
import {getFormattedDate, getNext7Days} from '../utils/Helper'

export default function DaysTab({ onChange, selectedDate  }) {
const sevenDays = getNext7Days();
  return (
    <div className="xl:flex  mb-20 gap-10">
      {sevenDays.map((item, key) => (
        <div
          key={"days_" + key}
          className={
            (selectedDate.date ==  item.date)
              ? "transition-all bg-gradient-to-l from-[#3362ef] via-[#9463eb] to-[#fb62e4] text-white p-2 px-4 rounded-full"
              : "text-white cursor-pointer transition-all"
          }
          onClick={() => onChange(item)}
        >
          <p className="">{item.dayName}</p>
          <p className="text-center text-xs opacity-40">02.00</p>
        </div>
      ))}
    </div>
  );
}
