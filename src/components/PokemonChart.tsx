import React from "react";
import { Bar } from "react-chartjs-2";
import { EnrichedPokemon } from "./PokemonList";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the necessary components with Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PokemonChartProps {
  pokemons: EnrichedPokemon[];
  property: string;
  label: string;
  backgroundColor: string;
  borderColor: string;
}

const PokemonChart: React.FC<PokemonChartProps> = ({ pokemons, property, label, backgroundColor, borderColor }) => {
  const data = {
    labels: pokemons.map((pokemon) => pokemon.name),
    datasets: [
      {
        label: label,
        data: pokemons.map((pokemon) => {
          if (property === "weight" || property === "height") {
            return pokemon[property];
          } else {
            const stat = pokemon.stats.find((s) => s.stat.name === property);
            return stat ? stat.base_stat : 0;
          }
        }),
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} />;
};

export default PokemonChart;
