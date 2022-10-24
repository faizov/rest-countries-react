import React, { useState, useEffect, useMemo } from "react";

import { useGetCountriesQuery } from "./features/countries/restcountriesApi";

import { Card } from "./copmonents/card";

import "./styles.scss";

function App() {
  const { data, error, isLoading } = useGetCountriesQuery("");
  const [search, setSearch] = useState("");

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
        <input type="text" placeholder="Search for a counrty..." onChange={(e) => handleChange(e.target.value)} />
      </div>
      <div className="cards">
        {result &&
          result.map((item) => {
            return (
              <div key={item.name.common}>
                <Card
                  name={item.name.common}
                  flag={item.flags.png}
                  population={item.population}
                  region={item.region}
                  capital={item.capital}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
