import React, { useState, useEffect, useMemo, useRef } from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";

import {
  useGetCountriesQuery,
  useGetCountriesByRegionQuery,
} from "../../features/countries/restcountriesApi";

import { Card } from "../../copmonents/card";

import { listSelect } from "./config";

import { SearchIcon } from "../../assets/icons/SearchIcon";
import { ArrowDownIcon } from "../../assets/icons/ArrowDownIcon";

import "./styles.scss";

export const Home = () => {
  const {
    data: dataAll,
    error,
    isLoading: allLoading,
  } = useGetCountriesQuery("");
  const [search, setSearch] = useState("");

  const [region, setRegion] = useState("All");
  const [hideSelect, setHideSelect] = useState(false);
  const selectMenu = useRef<HTMLDivElement>(null);

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
    setHideSelect(false);
    setRegion(e);
  };

  const closeOpenMenus = (e: any) => {
    if (
      selectMenu.current &&
      hideSelect &&
      !selectMenu.current.contains(e.target)
    ) {
      setHideSelect(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeOpenMenus);
  }, [hideSelect]);

  if (error) {
    if ("status" in error) {
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);
      return <div>Error: {errMsg}</div>;
    }
  }

  return (
    <div className="list-countries">
      <div className="search">
        <div className="search-input">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search for a counrty..."
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        <div className="list-countries-select" ref={selectMenu}>
          <button onClick={() => setHideSelect(!hideSelect)}>
            {region} <ArrowDownIcon />
          </button>
          {hideSelect && (
            <ul>
              {listSelect.map((option) => {
                return (
                  <li onClick={() => handleChangeRegion(option.label)}>
                    {option.label}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
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
};
