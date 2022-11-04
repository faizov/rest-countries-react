import { useParams, useNavigate, Link } from "react-router-dom";

import {
  useGetCountryByNameQuery,
  useGetCountriesByCodeQuery,
} from "../../features/countries/restcountriesApi";

import "./styles.scss";

export const Country = () => {
  const { countryName } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetCountryByNameQuery(
    countryName as string
  );

  const country = data && data[0];
  const { data: CountriesCode } = useGetCountriesByCodeQuery(country?.borders);

  const nativeName =
    country && Object.values(country?.name?.nativeName)[0].official;
  const currencies = country && Object.values(country?.currencies);
  const languages = country && Object.values(country?.languages);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="country-page">
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="country-page-back"
      >
        <img
          width={16}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Feather-arrows-arrow-left.svg/2048px-Feather-arrows-arrow-left.svg.png"
          alt=""
        />
        <p>Back</p>
      </button>
      <div className="country-page-info">
        <div className="country-page-info-image">
          <img src={country?.flags.svg} alt="" />
        </div>
        <div className="country-page-info-details">
          <div>
            <h1>{country?.name.common}</h1>
            <div className="country-page-info-details-lists">
              <ul>
                <li>
                  <h4>Native Name: </h4>
                  <p>{nativeName}</p>
                </li>
                <li>
                  <h4>Population: </h4>
                  <p>{country?.population}</p>
                </li>
                <li>
                  <h4>Region: </h4>
                  <p>{country?.region}</p>
                </li>
                <li>
                  <h4>Sub Region: </h4>
                  <p>{country?.subregion}</p>
                </li>
                <li>
                  <h4>Capital: </h4>
                  {country?.capital &&
                    country?.capital
                      .map<React.ReactNode>((item) => {
                        return <p key={item}>{item}</p>;
                      })
                      .reduce((prev, curr) => [prev, ",", curr])}
                </li>
              </ul>

              <ul>
                <li>
                  <h4>Top Level Domain: </h4>
                  {country?.tld &&
                    country?.tld
                      .map<React.ReactNode>((item) => {
                        return <p key={item}>{item}</p>;
                      })
                      .reduce((prev, curr) => [prev, ",", curr])}
                </li>
                <li>
                  <h4>Currencies: </h4>
                  {currencies
                    ?.map<React.ReactNode>((item) => {
                      return <p key={item.name}>{item.name}</p>;
                    })
                    .reduce((prev, curr) => [prev, ",", curr])}
                </li>
                <li>
                  <h4>Languages: </h4>
                  {languages
                    ?.map<React.ReactNode>((item) => {
                      return <p key={item}>{item}</p>;
                    })
                    .reduce((prev, curr) => [prev, ",", curr])}
                </li>
              </ul>
            </div>
            {CountriesCode && (
              <div className="country-page-info-details-borders">
                <h4>Border Countries:</h4>

                <div>
                  {CountriesCode.map((item) => {
                    return (
                      <Link to={`/${item.name.common}`}>
                        <button>{item.name.common}</button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
