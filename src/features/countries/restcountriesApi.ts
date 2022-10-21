import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Country = [
  {
    name: {
      common: string;
    };
    flags: {
      png: string;
    };
    population: number;
    region: string;
    capital: [];
  }
];

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1/" }),
  endpoints: (builder) => ({
    getCountries: builder.query<Country, string>({
      query: () => `all`,
    }),
    getCountryByName: builder.query<Country, string>({
      query: (name) => `name/${name}`,
    }),
  }),
});

export const { useGetCountryByNameQuery, useGetCountriesQuery } = countriesApi;
