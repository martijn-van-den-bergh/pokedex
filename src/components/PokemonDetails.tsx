import { EnrichedPokemon } from "./PokemonList";
import "./PokemonDetails.css";

interface PokemonDetailsProp {
  pokemon: EnrichedPokemon;
  otherPokemon?: EnrichedPokemon;
}

const PokemonDetails = ({ pokemon, otherPokemon }: PokemonDetailsProp) => {
  const getStatComparison = (statName: string, statValue: number) => {
    if (!otherPokemon) {
      return null;
    }
    const otherStat = otherPokemon.stats.find((stat) => stat.stat.name === statName);
    if (!otherStat) {
      return null;
    }
    if (statValue > otherStat.base_stat) {
      return <span className="flashy-plus">+</span>;
    }
    return null;
  };

  return (
    <div className="pokemon-card">
      <div className="header-box">
        <h2>{pokemon.name}</h2>
        <img src={pokemon.sprites.front_default ?? ""} alt={pokemon.name} />
      </div>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Types: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
      <p>Habitat: {pokemon.habitat}</p>
      <p>Color: {pokemon.color}</p>
      <h3>Base Stats</h3>
      <ul>
        {pokemon.stats.map((stat) => (
          <li className="stat-list-item" key={stat.stat.name}>
            <span>
              {stat.stat.name}: {stat.base_stat}
            </span>
            <span className="plus">{getStatComparison(stat.stat.name, stat.base_stat)}</span>
          </li>
        ))}
      </ul>
      <h3>Top Moves</h3>
      <ul>
        {pokemon.moves.slice(0, 5).map((move) => (
          <li key={move.move.name}>{move.move.name}</li>
        ))}
      </ul>
      <h3>Abilities:</h3>
      <ul>
        {pokemon.abilities.map((ability) => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetails;
