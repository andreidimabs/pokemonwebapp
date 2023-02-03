import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Stats from "./stats";
import Axios from "axios";
import "./App.css";

function App() {
  const [nameList, setNameList] = useState([]);
  const [search, setSearch] = useState("");
  const [chosen, setChosen] = useState(false);
  const [pokemonStats, setPokemonStats] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  useEffect(() => {
    Axios.get("https://pokeapi.co/api/v2/pokemon/?limit=500").then(
      (response) => {
        const updatedNameList = response.data.results.map((item) => {
          return {
            name: item.name,
            url: item.url,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              item.url.split("/")[6]
            }.png`,
          };
        });
        setNameList(updatedNameList);
      }
    );
  }, []);
  const searchPokemon = (item) => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${item.name}`).then(
      (response) => {
        setPokemonStats({
          name: item.name,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setChosen(true);
      }
    );
  };

  const navigate = useNavigate();
  const navStats = (item) => {
    searchPokemon(item);
    navigate("./stats");
  };
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
                  <button
                    onClick={() => {
                      navStats(item);
                    }}
                  >
                    <img src={item.img} />
                    <p>
                      {item.name.charAt(0).toUpperCase() +
                        item.name.slice(1).toLowerCase()}
                    </p>
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      <Routes>
        <Route
          path="./stats"
          element={<Stats chosen={chosen} pokemonStats={pokemonStats} />}
        />
      </Routes>
    </div>
  );
}

export default App;
