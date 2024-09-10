import { MainClient } from "pokenode-ts";

export const getPokemonList = async (limit = 150, offset = 0) => {
  const api = new MainClient();
  const pokemonList = await api.pokemon.listPokemons(offset, limit);
  return pokemonList;
};

export const getDetailedPokemonList = async (limit = 151, offset = 0) => {
  const api = new MainClient();
  const pokemonList = await api.pokemon.listPokemons(offset, limit);
  const detailedPokemonList = await Promise.all(
    pokemonList.results.map(async (pokemon) => {
      const detailedPokemon = await api.pokemon.getPokemonByName(pokemon.name);
      return detailedPokemon;
    })
  );
  return detailedPokemonList;
};
