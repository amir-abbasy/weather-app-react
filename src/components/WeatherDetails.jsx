import React from "react";

export default function WeatherDetails({ data }) {
  return (
    <div className="flex flex-wrap justify-start items-start">
      {Object.entries(data).map((item, key) => {
        if (item[0] == "weather") return;
        const child = (child) => {
          if (typeof child == "object") {
            return (
              <div>
                {Object.entries(child).map((ch, chIdx) => {
                  return (
                    <p className="text-xs opacity-40" key={chIdx}>{`${ch[0]} : ${ch[1]}`}</p>
                  );
                })}
              </div>
            );
          }
          return <p className="text-xs opacity-40" >{child}</p>;
        };

        return (
          <div className="text-white flex flex-col my-4 h-[100px] bg-gradient-to-t from-transparent from-50% px-2 via-[#ffffff04] to-transparent overflow-clip"
          key={"weatherDetails_"+key}
          >
            <p className="text-xs mb-1">{item[0]}</p>
            <div className="bg-ysellow-100">{child(item[1])}</div>
          </div>
        );
      })}
    </div>
  );
}
