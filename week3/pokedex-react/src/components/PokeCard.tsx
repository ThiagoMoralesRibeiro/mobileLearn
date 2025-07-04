import { useState } from "react";
import React from "react";
import type { Pokemon } from "./Pokedex";
import "./PokeCard.css";

type PokemonCardProps = {
  pokemon: Pokemon | null;

}



const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  if (!pokemon) {
    return <p>No Pokémon data available.</p>;
  }
  const [favorite, setFavorite] = useState(false);
  const primaryType = pokemon.types[0]?.type.name ?? "normal";
  const cardClass = `pokemon-card type-${primaryType}`;

  console.log(cardClass);

  const toggleFavorite = () => {
    setFavorite(!favorite);
  }


  return (
    <div className={cardClass} style={{ position: "relative" }}>
      <h3 className="pokedex-name">{pokemon.name.toUpperCase()}</h3>
      {pokemon.sprites.front_default && (
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokedex-image"
        />
      )}
      <button
        onClick={toggleFavorite}
        title={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        className={`favorite-button ${favorite ? 'favorited' : ''}`}
      >
        {favorite ? '★' : '☆'}
      </button>
      <p>
        <strong>Altura:</strong> {pokemon.height * 10} cm
      </p>
      <p>
        <strong>Peso:</strong> {pokemon.weight / 10} kg
      </p>
      <p>
        <strong>Tipos:</strong>{" "}
        {pokemon.types.map((t) => t.type.name).join(" / ").toUpperCase()}
      </p>
    </div>

  )
}

export default PokemonCard;
