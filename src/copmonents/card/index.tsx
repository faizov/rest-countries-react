import { Link } from "react-router-dom";

import { Country } from "../../@types";

import "./styles.scss";

export const Card = ({ name, flag, population, region, capital }: Country) => {
  return (
    <div className="card">
      <Link to={`${name}`}>
        <div className="card-image">
          <img src={flag} alt={name} />
        </div>
        <div className="card-info">
          <div>
            <h3>{name}</h3>
          </div>
          <div className="card-info-text">
            <h4>Population:</h4>
            <p>{new Intl.NumberFormat("en-US").format(population)}</p>
          </div>
          <div className="card-info-text">
            <h4>Region: </h4>
            <p>{region}</p>
          </div>
          {capital && (
            <div className="card-info-text">
              <h4>Capital: </h4>
              {capital.map((item) => {
                return (
                  <p key={item}>{item}</p>
                );
              })}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};
