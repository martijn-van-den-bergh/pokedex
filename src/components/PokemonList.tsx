import { Pokemon } from "pokenode-ts";

interface PokemonListProps {
  pokemonList: Pokemon[];
}

const PokemonList = ({ pokemonList }: PokemonListProps) => {
  return (
    <div>
      <h1>Pokemon List</h1>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
