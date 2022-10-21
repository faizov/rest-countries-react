import React from "react";

import { useGetCountriesQuery } from "./features/countries/restcountriesApi";

import { Card } from "./copmonents/card";

import "./styles.scss";

function App() {
  const { data, error, isLoading } = useGetCountriesQuery("");

  if (error) {
    if ("status" in error) {
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);
      return <div>{errMsg}</div>;
    }
  }

  return (
    <div className="content">
      Coutries page
      <div className="cards">
        {data &&
          data.map((item) => {
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
