import React from "react";
import { Link } from "react-router-dom";

const Index = ({ setSearch, nameList, search, searchPokemon }) => {
  return (
    <div className="App">
      <div className="header">
        <h1>Pokemon Stats</h1>
        <h4>Search for Pokemon Name Here</h4>
        <input
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="content">
        <div className="left">
          {nameList
            .filter((item) => {
              if (search === "") {
                return item;
              } else if (
                item.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              }
            })
            .map((item) => {
              return (
                <div className="nameContainer" key={item.name}>
                  <Link to={`/stats/${item.name}`}>
                    <button
                      onClick={() => {
                        searchPokemon(item);
                      }}
                    >
                      <img src={item.img} />
                      <p>
                        {item.name.charAt(0).toUpperCase() +
                          item.name.slice(1).toLowerCase()}
                      </p>
                    </button>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Index;
