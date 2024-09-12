import React, { useState } from "react";
import { EnrichedPokemon } from "./PokemonList";
import PokemonChart from "./PokemonChart";
import "./PokemonCharts.css";

interface PokemonChartsProps {
  pokemons: EnrichedPokemon[];
}

const PokemonCharts: React.FC<PokemonChartsProps> = ({ pokemons }) => {
  const [showWeightChart, setShowWeightChart] = useState(true);
  const [showHeightChart, setShowHeightChart] = useState(true);
  const [showHpChart, setShowHpChart] = useState(true);
  const [showAttackChart, setShowAttackChart] = useState(true);
  const [showDefenseChart, setShowDefenseChart] = useState(true);
  const [showSpecialAttackChart, setShowSpecialAttackChart] = useState(true);
  const [showSpecialDefenseChart, setShowSpecialDefenseChart] = useState(true);
  const [showSpeedChart, setShowSpeedChart] = useState(true);

  return (
    <div className="parent-container">
      <div className="chart-filters">
        <label>
          <input type="checkbox" checked={showWeightChart} onChange={() => setShowWeightChart(!showWeightChart)} />
          Show Weight Chart
        </label>
        <label>
          <input type="checkbox" checked={showHeightChart} onChange={() => setShowHeightChart(!showHeightChart)} />
          Show Height Chart
        </label>
        <label>
          <input type="checkbox" checked={showHpChart} onChange={() => setShowHpChart(!showHpChart)} />
          Show HP Chart
        </label>
        <label>
          <input type="checkbox" checked={showAttackChart} onChange={() => setShowAttackChart(!showAttackChart)} />
          Show Attack Chart
        </label>
        <label>
          <input type="checkbox" checked={showDefenseChart} onChange={() => setShowDefenseChart(!showDefenseChart)} />
          Show Defense Chart
        </label>
        <label>
          <input type="checkbox" checked={showSpecialAttackChart} onChange={() => setShowSpecialAttackChart(!showSpecialAttackChart)} />
          Show Special Attack Chart
        </label>
        <label>
          <input type="checkbox" checked={showSpecialDefenseChart} onChange={() => setShowSpecialDefenseChart(!showSpecialDefenseChart)} />
          Show Special Defense Chart
        </label>
        <label>
          <input type="checkbox" checked={showSpeedChart} onChange={() => setShowSpeedChart(!showSpeedChart)} />
          Show Speed Chart
        </label>
      </div>
      <div className="charts-container">
        {showWeightChart && (
          <div className="chart-item">
            <PokemonChart pokemons={pokemons} property="weight" label="Weight" backgroundColor="rgba(153, 102, 255, 0.2)" borderColor="rgba(153, 102, 255, 1)" />
          </div>
        )}
        {showHeightChart && (
          <div className="chart-item">
            <PokemonChart pokemons={pokemons} property="height" label="Height" backgroundColor="rgba(255, 159, 64, 0.2)" borderColor="rgba(255, 159, 64, 1)" />
          </div>
        )}
        {showHpChart && (
          <div className="chart-item">
            <PokemonChart pokemons={pokemons} property="hp" label="HP" backgroundColor="rgba(255, 99, 132, 0.2)" borderColor="rgba(255, 99, 132, 1)" />
          </div>
        )}
        {showAttackChart && (
          <div className="chart-item">
            <PokemonChart pokemons={pokemons} property="attack" label="Attack" backgroundColor="rgba(54, 162, 235, 0.2)" borderColor="rgba(54, 162, 235, 1)" />
          </div>
        )}
        {showDefenseChart && (
          <div className="chart-item">
            <PokemonChart pokemons={pokemons} property="defense" label="Defense" backgroundColor="rgba(75, 192, 192, 0.2)" borderColor="rgba(75, 192, 192, 1)" />
          </div>
        )}
        {showSpecialAttackChart && (
          <div className="chart-item">
            <PokemonChart pokemons={pokemons} property="special-attack" label="Special Attack" backgroundColor="rgba(153, 102, 255, 0.2)" borderColor="rgba(153, 102, 255, 1)" />
          </div>
        )}
        {showSpecialDefenseChart && (
          <div className="chart-item">
            <PokemonChart pokemons={pokemons} property="special-defense" label="Special Defense" backgroundColor="rgba(255, 159, 64, 0.2)" borderColor="rgba(255, 159, 64, 1)" />
          </div>
        )}
        {showSpeedChart && (
          <div className="chart-item">
            <PokemonChart pokemons={pokemons} property="speed" label="Speed" backgroundColor="rgba(255, 206, 86, 0.2)" borderColor="rgba(255, 206, 86, 1)" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCharts;
