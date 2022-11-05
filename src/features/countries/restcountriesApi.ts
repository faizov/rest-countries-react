import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type CountryApi = [
  {
    name: {
      common: string;
      nativeName: [
        {
          official: string;
        }
      ];
    };
    flags: {
      png: string;
      svg: string;
    };
    population: number;
    region: string;
    subregion: string;
    capital: [];
    tld: [];
    currencies: [{ name: string; symbol: string }];
    languages: [];
    borders: string[];
  }
];

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1/" }),
  endpoints: (builder) => ({
    getCountries: builder.query<CountryApi, string>({
      query: () => `all`,
    }),
    getCountriesByRegion: builder.query<CountryApi, string>({
      query: (region) => `region/${region}`,
    }),
    getCountryByName: builder.query<CountryApi, string>({
      query: (name) => `name/${name}`,
    }),
    getCountriesByCode: builder.query<CountryApi, string[] | undefined>({
      query: (codes) => `alpha?codes=${codes}`,
    }),
  }),
});

export const {
  useGetCountryByNameQuery,
  useGetCountriesByRegionQuery,
  useGetCountriesQuery,
  useGetCountriesByCodeQuery
} = countriesApi;
