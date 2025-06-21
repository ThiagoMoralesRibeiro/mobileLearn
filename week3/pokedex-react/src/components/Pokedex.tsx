import React, { useEffect, useState } from "react";
import "./Pokedex.css";
import PokemonCard from "./PokeCard";

export type Pokemon = {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
  };
  types: Array<{
    type: { name: string };
  }>;
};

export default function Pokedex() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccessMessage] = useState("");

  useEffect(() => {
    if (pokemon) {
      setSuccessMessage(`✅ ${pokemon.name.toUpperCase()} encontrado com sucesso!`);

      const timeout = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [pokemon]);

  const searchPokemon = async () => {
    if (!name.trim()) return;

    setLoading(true);
    setError("");
    setPokemon(null);
    setSuccessMessage("");

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) throw new Error("Pokemon não encontrado");

      const data: Pokemon = await response.json();
      setPokemon(data);

    } catch (error) {
      setError("Pokémon não encontrado 😢");

    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="pokedex-container">
      <h2 className="pokedex-title">🔎 Pokédex</h2>
      <input
        className="pokedex-input"
        type="text"
        placeholder="Digite o nome do Pokémon"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="pokedex-button" onClick={searchPokemon}>
        Buscar
      </button>

      {loading && <p className="pokedex-loading">Carregando...</p>}
      {error && <p className="pokedex-error">{error}</p>}
      {success && <p className="pokedex-success">{success}</p>}

      {pokemon && <PokemonCard pokemon={pokemon} />}
    </div>


  );

}
