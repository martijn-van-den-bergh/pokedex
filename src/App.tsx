import { Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";
import "./App.css";
import PokemonList, { EnrichedPokemon } from "./components/PokemonList";
import { getDetailedPokemonList } from "./services/pokemon-service";
import PokemonDetails from "./components/PokemonDetails";

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<EnrichedPokemon[]>([]);

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

  const handlePokemonClick = (pokemon: EnrichedPokemon) => {
    setSelectedPokemons((prevSelected) => {
      if (prevSelected.some((selected) => selected.id === pokemon.id)) {
        return prevSelected.filter((selected) => selected.id !== pokemon.id);
      } else {
        return [...prevSelected, pokemon];
      }
    });
  };

  const renderPokemonDetails = () => {
    if (selectedPokemons.length === 0) {
      return <p>Please select a Pokémon.</p>;
    } else if (selectedPokemons.length === 1) {
      return <PokemonDetails pokemon={selectedPokemons[0]} />;
    } else if (selectedPokemons.length === 2) {
      return (
        <>
          <PokemonDetails pokemon={selectedPokemons[0]} otherPokemon={selectedPokemons[1]} />
          <PokemonDetails pokemon={selectedPokemons[1]} otherPokemon={selectedPokemons[0]} />
        </>
      );
    } else {
      return <p>More then 2 pokemons selected</p>;
    }
  };

  return (
    <div className="app-container">
      <div className="pokemon-list-container">
        <PokemonList pokemonList={pokemonList} onPokemonClick={handlePokemonClick} />
      </div>
      <div className="pokemon-details-container">{renderPokemonDetails()}</div>
    </div>
  );
}

export default App;
