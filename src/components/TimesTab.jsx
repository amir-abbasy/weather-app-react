import React from "react";
import { generateRandomAroundNumber } from "../utils/Helper";

export default function TimesTab({ data }) {
  const time_hour = new Date(data.time * 1000).getHours();
  const centralNumber = (data.temp - 273.15).toFixed();
  return (
    <div className="flex items-center mb-20 gap-4 h-[20vh]">
      {new Array(6).fill({ value: 22 }).map((item, key) => {
        const randomAroundNumber = generateRandomAroundNumber(
          parseInt(centralNumber),
          2
        );
        var hour = time_hour > 24 ? 0 : time_hour;
        var h = hour + key > 24 ? hour + key - 24 : hour + key;
        return (
          <div
            key={"times_" + key}
            className={`
       ${"hover:bg-gradient-to-l from-[#3362ef] via-[#9463eb] to-[#fb62e4] text-white text-white cursor-pointer bg-[#1f1f1f]"} p-4 rounded-full`}
          >
            <p className="text-center text-xs opacity-40">{h + ":00"}</p>
            <img
              src={`/icons/${data?.data?.["icon"].replace('n', 'd')}.png`}
              className="w-[25px] my-2"
            />
            <p className="text-center relative">
              {randomAroundNumber}
              <span className="w-[6px] h-[6px] border-2 absolute -right-1 top-0 rounded-full"></span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
