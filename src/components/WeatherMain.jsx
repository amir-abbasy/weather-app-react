import React from "react";

const icons = {
  main: "thermometer_minus",
  wind: "air",
  clouds: "filter_drama",
  sys: "water_lux",
};

const valKeys = {
  main: "temp",
  wind: "speed",
  clouds: "all",
  sys: "sunrise",
};

export default function WeatherDetails({ data }) {
  return (
    <>
      {Object.entries(data).map((item, key) => {
        if (!["main", "wind", "clouds", "sys"].includes(item[0])) return;

        const val = (key) => {
          var val = item[1][valKeys[item[0]]];
          switch (key) {
            case "sys":
              val = new Date(val * 1000).toLocaleTimeString();
              break;
            default:
              val = item[1][valKeys[item[0]]];
              break;
          }
          return val;
        };

        return (
          <div
            className="text-white flex flex-col justify-center items-center"
            key={"weatherDetails_" + key}
          >
            <span className="material-symbols-outlined font-thin">
              {icons[item[0]]}
            </span>
            <p className="text-sm">{val(item[0])}</p>
            <p className="text-xs opacity-40">{item[0]}</p>
          </div>
        );
      })}
    </>
  );
}
