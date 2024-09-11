import { Pokemon } from "pokenode-ts";
import "./PokemonList.css";
import { useEffect, useState } from "react";
import { getSpeciesByName } from "../services/pokemon-service";

interface EnrichedPokemon extends Pokemon {
  color: string;
  selected?: boolean;
}

interface PokemonListProps {
  pokemonList: Pokemon[];
  onPokemonClick: (pokemon: Pokemon) => void;
}

const PokemonList = ({ pokemonList, onPokemonClick }: PokemonListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [enrichedPokemonList, setEnrichedPokemonList] = useState<EnrichedPokemon[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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

  useEffect(() => {
    console.log("Filtered Pokémon list:", pokemonList);
    const enrichPokemonList = async () => {
      console.log("Enriching Pokémon list:", pokemonList);
      const newEnrichedPokemonList: EnrichedPokemon[] = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const species = await getSpeciesByName(pokemon.name);
          return { ...pokemon, color: species.color.name };
        })
      );
      console.log("Enriched Pokémon list:", newEnrichedPokemonList);
      setEnrichedPokemonList(newEnrichedPokemonList);
    };

    enrichPokemonList();
  }, [pokemonList]);

  return (
    <div>
      <h1>Pokemon List</h1>
      <input type="text" placeholder="Search Pokémon" value={searchTerm} onChange={handleSearchChange} />

      <ul>
        {filteredPokemonList.map((pokemon, index) => (
          <li key={index} className="pokemon-item" onClick={() => onPokemonClick(pokemon)}>
            <img src={pokemon.sprites.front_default ?? ""} alt={pokemon.name} />
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
