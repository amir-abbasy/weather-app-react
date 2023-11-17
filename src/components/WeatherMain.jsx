import React from "react";

const icons = {
  main: "thermometer_minus",
  wind: "air",
  clouds: "filter_drama",
};

const valKeys = {
  main: "temp",
  wind: "speed",
  clouds: "all",
};

export default function WeatherDetails({ data }) {
  return (
    <div className="flex w-full justify-evenly">
      {Object.entries(data).map((item, key) => {
        if (!["main", "wind", "clouds", ].includes(item[0])) return;
        return (
          <div
            className="text-white flex flex-col justify-center items-center"
            key={"weatherDetails_" + key}
          >
            <span className="material-symbols-outlined font-thin">
              {icons[item[0]]}
            </span>
            <p className="text-sm">{item[1][valKeys[item[0]]]}</p>
            <p className="text-xs opacity-40">{item[0]}</p>
          </div>
        );
      })}
    </div>
  );
}
