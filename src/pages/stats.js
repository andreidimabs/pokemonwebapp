import React from "react";
import Axios from "axios";

const Stats = ({ chosen, pokemonStats }) => {
  return (
    <div className="right">
      {" "}
      {chosen ? (
        <div className="display">
          <h1>
            {pokemonStats.name.charAt(0).toUpperCase() +
              pokemonStats.name.slice(1).toLowerCase()}
          </h1>
          <img src={pokemonStats.img} />
          <h3>
            Species:{" "}
            {pokemonStats.species.charAt(0).toUpperCase() +
              pokemonStats.species.slice(1).toLowerCase()}
          </h3>
          <h3>Type: {pokemonStats.type}</h3>
          <h4>HP: {pokemonStats.hp}</h4>
          <h4>ATTACK: {pokemonStats.attack}</h4>
          <h4>DEF: {pokemonStats.defense}</h4>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Stats;
