import { Pokemon } from "pokenode-ts";
import "./PokemonList.css";
import { useEffect, useState } from "react";
import { getSpeciesByName } from "../services/pokemon-service";

export interface EnrichedPokemon extends Pokemon {
  color: string;
  selected?: boolean;
  habitat: string;
}

interface PokemonListProps {
  pokemonList: Pokemon[];
  onPokemonClick: (pokemon: EnrichedPokemon) => void;
  deselectAll: () => void;
}

const PokemonList = ({ pokemonList, onPokemonClick, deselectAll }: PokemonListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [enrichedPokemonList, setEnrichedPokemonList] = useState<EnrichedPokemon[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDeselect = () => {
    const updatedList = enrichedPokemonList.map((pokemon) => ({ ...pokemon, selected: false }));
    setEnrichedPokemonList(updatedList);
    deselectAll();
  };

  const handlePokemonClickInternal = (clickedPokemon: EnrichedPokemon) => {
    const updatedList = enrichedPokemonList.map((pokemon) => (pokemon.name === clickedPokemon.name ? { ...pokemon, selected: !pokemon.selected } : pokemon));
    setEnrichedPokemonList(updatedList);
    onPokemonClick(clickedPokemon);
  };

  const filteredPokemonList = enrichedPokemonList.filter((pokemon) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      pokemon.name.toLowerCase().includes(searchLower) ||
      pokemon.abilities.some((ability: any) => ability.ability.name.toLowerCase().includes(searchLower)) ||
      pokemon.weight.toString().includes(searchLower) ||
      pokemon?.color?.includes(searchLower)
    );
  });

  const enrichPokemonList = async () => {
    // we need to be able to search/compare by color and habitat, so we enrich the list with this information
    const newEnrichedPokemonList: EnrichedPokemon[] = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const species = await getSpeciesByName(pokemon.name);
        return { ...pokemon, color: species.color.name, habitat: species.habitat.name };
      })
    );
    setEnrichedPokemonList(newEnrichedPokemonList);
    setLoading(false);
  };

  useEffect(() => {
    enrichPokemonList();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Pokemon List</h1>
      <div className="controls">
        <input type="text" placeholder="Search Pokémon" value={searchTerm} onChange={handleSearchChange} />
        <button onClick={handleDeselect}>Deselect all</button>
      </div>

      <ul>
        {filteredPokemonList.map((pokemon) => (
          <li key={pokemon.id} className={`pokemon-item ${pokemon.selected ? "selected" : ""}`} onClick={() => handlePokemonClickInternal(pokemon)}>
            <img src={pokemon.sprites.front_default ?? ""} alt={pokemon.name} />
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
