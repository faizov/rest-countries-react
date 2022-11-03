import { useParams, useNavigate } from "react-router-dom";

import { useGetCountryByNameQuery } from "../../features/countries/restcountriesApi";

import "./styles.scss";

export const Country = () => {
  const { countryName } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetCountryByNameQuery(
    countryName as string
  );

  const country = data && data[0];

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  console.log("country", country);
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
            <h1>{country?.region}</h1>
            <div className="country-page-info-details-lists">
              <ul>
                <li>
                  <h4>Native Name: </h4>
                </li>
                <li>
                  <h4>Population: </h4>
                  <p></p>
                </li>
                <li>
                  <h4>Region: </h4>
                  <p>{country?.name.common}</p>
                </li>
                <li>
                  <h4>Sub Region: </h4>
                </li>
                <li>
                  <h4>Capital: </h4>
                </li>
              </ul>

              <ul>
                <li>
                  <h4>Top Level Domain: </h4> <p></p>
                </li>
                <li>
                  <h4>Currencies: </h4>
                  <p></p>
                </li>
                <li>
                  <h4>Languages: </h4>
                  <p></p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
