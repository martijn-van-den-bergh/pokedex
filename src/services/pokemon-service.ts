import { MainClient } from "pokenode-ts";

const amountOfPokemon = 151;

export const getPokemonList = async (limit = amountOfPokemon, offset = 0) => {
  const api = new MainClient();
  const pokemonList = await api.pokemon.listPokemons(offset, limit);
  return pokemonList;
};

export const getDetailedPokemonList = async (limit = amountOfPokemon, offset = 0) => {
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

export const getSpeciesByName = async (name: string) => {
  const api = new MainClient();
  const species = await api.pokemon.getPokemonSpeciesByName(name);
  return species;
};
