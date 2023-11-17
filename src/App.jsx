import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import WeatherMain from "./components/WeatherMain";
import WeatherDetails from "./components/WeatherDetails";
import DaysTab from "./components/DaysTab";
import SearchPlace from "./components/SearchPlace";
import "./index.css";
import { getFormattedDate, getNext7Days, daysOfWeek } from "./utils/Helper";
import TimesTab from "./components/TimesTab";
import api from "./service/api";
import test from "./test.json";

const future_datas = (data) => {
  var selected_temp = [];
  var selected = {};
  // console.log(data);
  data.forEach((day, dayIdx) => {
    var date = day["dt_txt"].split(" ");
    if (selected_temp.includes(date[0])) {
      selected[date[0]]["times"][date[1]] = day;
    } else {
      selected[date[0]] = day;
      selected[date[0]]["times"] = {};
      selected_temp.push(date[0]);
    }
  });

  return selected;
};

// main
export default function Index() {
  const [state, setState] = useState({
    data: null,
    day: {
      dayName: daysOfWeek[new Date().getDay()],
      date: getFormattedDate(),
    },
    time: 1700061656,
    loading: false,
    city: { name: "London" },
  });

  useEffect(() => {
    future_weather();
  }, []);

  const future_weather = () => {
    setState((prev) => ({ ...prev, loading: true }));
    api
      .get(`/future-weather?city=London`)
      .then((res) => {
        if (res.status) {
          // console.log("future weather-----London---->", res);
          // setState((prev) => ({ ...prev, future_weather: res.data, time : res.data.dt}));
          setState((prev) => ({
            ...prev,
            data: res.data["list"][0],
            future_weather: future_datas(res.data["list"]),
            time: res.data["list"][0]["dt"],
            city: res.data["city"],
          }));
        }
        setState((prev) => ({ ...prev, loading: false }));
      })
      .catch((error) => {
        setState((prev) => ({ ...prev, loading: false }));
        console.error("Axios Error:", error);
      });
  };

  return (
    <main className="bg-[#1f1f1f] w-full xl:h-[100vh] xl:flex pt-16 px-[4%] xl:gap-16">
      <div className="xl:h-[50vh] bg-red-300d xl:flex-1">
        <DaysTab
          onChange={(day_data) =>
            setState((prev) => ({
              ...prev,
              day: day_data.selected,
              data: day_data.data,
            }))
          }
          selectedDate={state.day}
          data={state.future_weather}
        />
        {state?.data && (
          <section className="relative">
            <Card data={state?.data} />
            <div className="flex">
              <div className="xl:w-[50%]" />
              <div className="xl:w-[50%] flex flex-col pl-8 mt-20 xl:mt-0">
                <div className="m-8">
                  <h1 className="text-4xl text-white tracking-widest">
                    {state?.city?.name}
                  </h1>
                  <p className="text-base text-white opacity-40">
                    {new Date(state.data?.dt * 1000).toLocaleTimeString()}
                  </p>
                  <p className="text-xs text-white opacity-40">
                    {new Date(state.data?.dt * 1000).toLocaleDateString()}
                  </p>
                 
                </div>
              </div>
            </div>

            <div className="xl:w-[60vw] xl:h-[60vh] bg-gradient-to-l from-[#282828] from-40% to-transparent rounded-[50px]  mt-40 xl:mt-0 overflow-clip">
              <div className="flex">
                <div className="xl:h-[40vh] bg-red-60s0 xl:w-[50%]" />
                <div className="xl:h-[40vh] bg-yellow-6s00 xl:w-[50%]">
                  <div className="flex gap-6 items-center justify-center flex-wrap p-10">
                    <WeatherMain data={state.data} />
                  </div>
                  <WeatherDetails data={state.data} />
                </div>
              </div>
              <TimesTab
                data={state.data}
                onChange={(day_data) => {
                  setState((prev) => ({
                    ...prev,
                    data: { ...day_data, times: state.data.times },
                  }));
                }}
              />
            </div>
          </section>
        )}
      </div>

      <SearchPlace
        onSearch={(result) => {
          if (result) {
            setState((prev) => ({
              ...prev,
              data: result["list"][0],
              future_weather: future_datas(result["list"]),
              time: result["list"][0]["dt"],
              city: result["city"],
            }));

            // setState((prev) => ({ ...prev, data: future_datas(result), error: null }));
          } else {
            setState((prev) => ({ ...prev, error: "no result found !" }));
          }
        }}
        error={state?.error}
      />
    </main>
  );
}
