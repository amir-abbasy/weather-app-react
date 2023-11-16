import React from "react";

export default function Card({ width = 300, data }) {
  return (
    <div className="xl:absolute z-50 xl:scale-125 xl:translate-x-20 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="308px" height="281px">
        <defs>
          <linearGradient
            id="PSgrad_0"
            x1="0%"
            x2="51.504%"
            y1="0%"
            y2="85.717%"
          >
            <stop offset="0%" stopColor="rgb(251,98,228)" stopOpacity="1" />
            <stop offset="50%" stopColor="rgb(148,99,235)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgb(51,98,239)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          fillRule="evenodd"
          fill="url(#PSgrad_0)"
          d="M45.459,0.010 L261.621,0.010 C286.709,0.010 307.046,20.382 307.046,45.513 L307.046,207.909 C307.046,233.039 286.709,253.412 261.621,253.412 L45.459,280.870 C20.372,280.870 0.034,260.498 0.034,235.367 L0.034,45.513 C0.034,20.382 20.372,0.010 45.459,0.010 Z"
        />
      </svg>
      <div className="absolute top-0 w-[308px]">
        <div className="flex flex-col justify-center items-center bg-redx-400 py-4">
          <p className="text-2xl text-white">{data?.weather?.[0]?.["main"]}</p>
          <p className="text-base text-white">
            {data?.weather?.[0]?.["description"]}
          </p>
          <div className="relative">
            <h1 className="text-[3.5em] scale-[2.5] text-white font-bold mt-6 mb-8">
              {(data?.main?.temp - 273.15).toFixed(0)}{" "}
              <span className="w-3 h-3 border-4  absolute -right-2 top-4 rounded-full"></span>
            </h1>
          </div>
          <img
            src={`/icons/${data?.weather?.[0]?.["icon"].replace('n', 'd')}.png`}
            className="w-[200px]"
          />
        </div>
      </div>
    </div>
  );
}
