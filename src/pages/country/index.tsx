import { useParams } from "react-router-dom";

import { useGetCountryByNameQuery } from "../../features/countries/restcountriesApi";

export const Country = () => {
  const { countryName } = useParams();

  const { data, error, isLoading } = useGetCountryByNameQuery(
    countryName as string
  );

  const country = data && data[0];

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      Country Page
      <div>{country?.name.common}</div>
      <div>region: {country?.region}</div>
    </div>
  );
};
