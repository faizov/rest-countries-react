import React, { useState, useEffect, useMemo } from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";

import {
  useGetCountriesQuery,
  useGetCountriesByRegionQuery,
} from "./features/countries/restcountriesApi";

import { Card } from "./copmonents/card";

import "./styles.scss";

function App() {
  const {
    data: dataAll,
    error,
    isLoading: allLoading,
  } = useGetCountriesQuery("");
  const [search, setSearch] = useState("");

  const [region, setRegion] = useState("All");
  const { data: dataByRegion, isLoading: byRegionLoading } =
    useGetCountriesByRegionQuery(region === "All" ? skipToken : region);

  const data = region === "All" ? dataAll : dataByRegion;

  const result = useMemo(
    () =>
      data &&
      data.filter((item) => {
        if (
          item.name.common
            .toLocaleUpperCase()
            .indexOf(search.toLocaleUpperCase()) !== -1
        ) {
          return item;
        }
      }),
    [data, search]
  );

  const handleChange = (e: string) => {
    setSearch(e);
  };

  const handleChangeRegion = (e: string) => {
    setRegion(e);
  };

  if (error) {
    if ("status" in error) {
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);
      return <div>Error: {errMsg}</div>;
    }
  }

  return (
    <div className="content">
      <div className="search">
        <input
          type="text"
          placeholder="Search for a counrty..."
          onChange={(e) => handleChange(e.target.value)}
        />

        <select onChange={(e) => handleChangeRegion(e.target.value)}>
          <option value="All">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className="cards">
        {result &&
          result.map((item) => {
            return (
              <Card
                key={item.name.common}
                name={item.name.common}
                flag={item.flags.png}
                population={item.population}
                region={item.region}
                capital={item.capital}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
