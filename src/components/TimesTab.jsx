import React from "react";

export default function TimesTab({ data, onChange }) {
  if (!data) return;
  return (
    <div className="flex items-center mb-20 gap-4 h-[20vh]">
      {Object.values(data.times).map((item, key) => {
        return (
          <div
            key={"times_" + key}
            className={`
       ${"hover:bg-gradient-to-l from-[#3362ef] via-[#9463eb] to-[#fb62e4] text-white cursor-pointer bg-[#1f1f1f]"} p-4 rounded-full`}
            onClick={() => {
              onChange(item)
            }}
          >
            <p className="text-center text-xs opacity-40">
              {item["dt_txt"].split(" ")[1].substr(0, 5)}
            </p>
            <img
              src={`/icons/${item["weather"][0]["icon"].replace("n", "d")}.png`}
              className="w-[25px] my-2"
            />
            <p className="text-center relative">
              {(item?.main?.temp - 273.15).toFixed(0)}
              <span className="w-[6px] h-[6px] border-2 absolute -right-1 top-0 rounded-full"></span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
