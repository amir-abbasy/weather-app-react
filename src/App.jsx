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

export default function Index() {
  const [state, setState] = useState({
    data: null,
    day: {
      dayName: daysOfWeek[new Date().getDay()],
      date: getFormattedDate(),
    },
    time: 1700061656,
    loading: false,
  });

  useEffect(() => {
    initial_place();
  }, []);

  const initial_place = () => {
    setState((prev) => ({ ...prev, loading: true }));
    api
      .get(`/weather?city=London`)
      .then((res) => {
        if (res.status) {
          // console.log("weather-----London---->", res);
          setState((prev) => ({ ...prev, data: res.data, time : res.data.dt}));
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
          onChange={(day) => setState((prev) => ({ ...prev, day }))}
          selectedDate={state.day}
        />
        {state?.data && (
          <section className="relative">
            <Card data={state?.data} />
            <div className="flex">
              <div className="xl:w-[50%]" />
              <div className="xl:w-[50%] flex flex-col pl-8 mt-20 xl:mt-0">
                <div className="m-8">
                  <h1 className="text-3xl text-white tracking-widest">
                    {state.data?.name}
                  </h1>
                  <h1 className="text-base text-white opacity-40">
                    {new Date(state.data?.dt * 1000).toLocaleDateString() +
                      " " +
                      new Date(state.data?.dt * 1000).toLocaleTimeString()}
                  </h1>
                </div>
              </div>
            </div>

            <div className="xl:w-[60vw] xl:h-[50vh] bg-gradient-to-l from-[#282828] from-40% to-transparent rounded-[50px]  mt-40 xl:mt-0 overflow-clip">
              <div className="flex">
                <div className="xl:h-[30vh] bg-red-60s0 xl:w-[50%]" />
                <div className="xl:h-[30vh] bg-yellow-6s00 xl:w-[50%]">
                  <div className="flex gap-6 items-center justify-center flex-wrap p-10">
                    <WeatherMain data={state.data} />
                  </div>
                  <WeatherDetails data={state.data} />
                </div>
              </div>
              <TimesTab
                data={{
                  time: state.time,
                  data: state.data?.weather[0],
                  temp: state.data?.main.temp,
                }}
              />
            </div>
          </section>
        )}
      </div>

      <SearchPlace
        onSearch={(result) => {
          if (result) {
            setState((prev) => ({ ...prev, data: result, error: null }));
          }else{
            console.log("here");
            setState((prev) => ({ ...prev, error: 'no result found !' }));
          }
        }}
        error={state?.error}
      /> 
    </main>
  );
}
