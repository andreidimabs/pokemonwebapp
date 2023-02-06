import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route, BrowserRouter } from "react-router-dom";
import Stats from "./pages/stats";
import Index from "./pages/index";
import "./App.css";
import Axios from "axios";

const App = (props) => {
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
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Index
            {...props}
            search={search}
            setSearch={setSearch}
            nameList={nameList}
            searchPokemon={searchPokemon}
          />
        }
      />
      <Route
        exact
        path={"/stats/:id"}
        element={
          <Stats {...props} chosen={chosen} pokemonStats={pokemonStats} />
        }
      />
    </Routes>
  );
};

export default App;
