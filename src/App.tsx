import { Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";
import "./App.css";
import PokemonList from "./components/PokemonList";
import { getDetailedPokemonList } from "./services/pokemon-service";
import PokemonDetails from "./components/PokemonDetails";

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

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

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <>
      {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} />}

      <PokemonList pokemonList={pokemonList} onPokemonClick={handlePokemonClick} />
    </>
  );
}

export default App;
