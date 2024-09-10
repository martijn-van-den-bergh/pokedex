import { Pokemon } from "pokenode-ts";

interface PokemonDetailsProp {
  pokemon: Pokemon;
}

const PokemonDetails = ({ pokemon }: PokemonDetailsProp) => {
  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default ?? ""} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Types: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
      <p>Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}</p>
    </div>
  );
};

export default PokemonDetails;
