import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Country = [
  {
    name: {
      common: string;
    };
    flags: {
      png: string;
      svg: string;
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
    getCountriesByRegion: builder.query<Country, string>({
      query: (region) => `region/${region}`,
    }),
    getCountryByName: builder.query<Country, string>({
      query: (name) => `name/${name}`,
    }),
  }),
});

export const {
  useGetCountryByNameQuery,
  useGetCountriesByRegionQuery,
  useGetCountriesQuery,
} = countriesApi;
