import { Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";
import "./App.css";
import PokemonCharts from "./components/PokemonCharts";
import PokemonDetails from "./components/PokemonDetails";
import PokemonList, { EnrichedPokemon } from "./components/PokemonList";
import { getDetailedPokemonList } from "./services/pokemon-service";

function App() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<EnrichedPokemon[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPokemonList = async () => {
    try {
      setLoading(true);
      const list = await getDetailedPokemonList();
      console.log("Fetched Pokémon list:", list);
      setPokemonList(list);
    } catch (error) {
      console.error("Failed to fetch Pokémon list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
    switch (selectedPokemons.length) {
      case 0:
        return <p>Please select a Pokémon.</p>;
      case 1:
        return <PokemonDetails pokemon={selectedPokemons[0]} />;
      case 2:
        return (
          <>
            <PokemonDetails pokemon={selectedPokemons[0]} otherPokemon={selectedPokemons[1]} />
            <PokemonDetails pokemon={selectedPokemons[1]} otherPokemon={selectedPokemons[0]} />
          </>
        );
      default:
        return <PokemonCharts pokemons={selectedPokemons} />;
    }
  };

  return (
    <div className="app-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="pokemon-list-container">
            <PokemonList pokemonList={pokemonList} onPokemonClick={handlePokemonClick} />
          </div>
          <div className="pokemon-details-container">{renderPokemonDetails()}</div>
        </>
      )}
    </div>
  );
}

export default App;
