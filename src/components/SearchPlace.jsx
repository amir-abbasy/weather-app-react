import React, { useEffect, useState } from "react";
const recentKey = "@recent";
import api from "../service/api";

export default function SearchPlace({ onSearch, error }) {
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState();
  const [recentPlaces, setRecentPlaces] = useState([]);

  useEffect(() => {
    const storage = localStorage.getItem(recentKey);
    if (storage) {
      setRecentPlaces(JSON.parse(storage));
    }
  }, [search]);

  const search_place = (place, save = true) => {
    setLoading(true);
    api
      .get(`/weather?city=${place}`)
      .then((res) => {
        if (res.status) {
          setSearch();
          onSearch(res.data);
          console.log("weather--------->", res);
          // Save to localstorage

          if (save) {
            var newSearchPlace = [
              { name: search, date: new Date().toLocaleString() },
            ];
            var storageData = JSON.stringify([
              ...recentPlaces,
              ...newSearchPlace,
            ]);
            localStorage.setItem(recentKey, storageData);
          }
        } else {
          onSearch(null);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        onSearch(null);
        console.error("Axios Error:", error);
      });
  };

  return (
    <div className="xl:w-[60vw] xl:h-[70vh] bg-gradient-to-t from-[#282828] from-40% to-transparent rounded-[50px] mt-[8vh] overflow-y-scroll">
      <div className="flex h-12 bg-[#282828] rounded-full m-4 overflow-hidden">
        <input
          className="flex-1 bg-[#282828] pl-4 outline-none text-xl text-white"
          placeholder="Search city"
          onChange={(e) => setSearch(e.target.value)}
          value={search ?? ""}
        />
        <div
          className="bg-gradient-to-l from-[#3362ef] via-[#9463eb] to-[#fb62e4] rounded-full  px-8 flex items-center cursor-pointer"
          onClick={() => search_place(search)}
        >
          <span
            className={`material-symbols-outlined text-white ${
              loading ? "animate-spin" : ""
            }`}
          >
            {loading ? "progress_activity" : "search"}
          </span>
        </div>
      </div>

      {error && (
        <div className="flex justify-center">
          <p className="text-yellow-600">{error}</p>
        </div>
      )}

      {/* LIST */}
      {!search && recentPlaces.length > 0 ? (
        <div className="p-8 text-white ">
          <p className="text-2xl my-8">Recent seach places</p>
          {recentPlaces.reverse().map((place, plKey) => (
            <div
              className="hover:bg-[#282828] cursor-pointer p-3 rounded-2xl"
              key={"recent_place_" + plKey}
              onClick={() => search_place(place.name, false)}
            >
              <h4>{place.name}</h4>
              <p className="opacity-40 text-xs mb-2">{place.date.split(",")[1]+' '+place.date.split(",")[0]}</p>
              <div className="h-[1px] bg-gradient-to-l from-transparent via-[#3362ef] to-transparent rounded-full  px-8 flex items-center" />
              <span className="material-symbols-outlined float-right font-thin hover:opacity-100 opacity-40 -translate-y-8"
              onClick={()=> {
                var filterdPlace = recentPlaces.filter(_=> _.name != place.name)
                setRecentPlaces(filterdPlace)
                localStorage.setItem(recentKey, JSON.stringify(filterdPlace));
              }}
              >
                delete
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex text-white justify-center items-center mt-40 opacity-40">
          <span className="material-symbols-outlined font-thin">
            hourglass_empty
          </span>
          <p>No searche history</p>
        </div>
      )}
    </div>
  );
}
