import React from "react";
import { getFormattedDate, getNext7Days, daysOfWeek } from "../utils/Helper";

export default function DaysTab({ data, onChange, selectedDate }) {
  if (!data) return;
  // const sevenDays = getNext7Days();
  return (
    <div className="xl:flex  mb-20 gap-10">
      {Object.entries(data).map((item, key) => {
        var day = new Date(item[1]["dt"] * 1000);
        return (
          <div
            key={"days_" + key}
            className={
              selectedDate.dayName == daysOfWeek[day.getDay()]
                ? "transition-all bg-gradient-to-l from-[#3362ef] via-[#9463eb] to-[#fb62e4] text-white p-2 px-4 rounded-full"
                : "text-white cursor-pointer transition-all"
            }
            onClick={() =>
              onChange({
                data: item[1],
                selected: { dayName: daysOfWeek[day.getDay()], date: item[0] },
              })
            }
          >
            <p className="">{daysOfWeek[day.getDay()]}</p>
            <p className="text-center text-xs opacity-40">
              {item[1]["dt_txt"].split(" ")[1].substr(0, 5)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
