import { Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";
import "./App.css";
import PokemonList from "./components/PokemonList";
import { getDetailedPokemonList } from "./services/pokemon-service";

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const list = await getDetailedPokemonList();
        console.log("Fetched Pokémon list:", list);
        setPokemonList(list);
      } catch (error) {
        console.error("Failed to fetch Pokémon list:", error);
      }
    };

    fetchPokemonList();
  }, []);

  return (
    <>
      <PokemonList pokemonList={pokemonList} />
    </>
  );
}

export default App;
