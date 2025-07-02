import axios from 'axios';
import { Pokemon, PokemonListItem } from '../types/Pokemon';

const API_BASE = 'https://pokeapi.co/api/v2';

export async function getPokemons(limit: number, offset: number = 0): Promise<PokemonListItem[]> {
  try {
    const res = await axios.get(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`);
    return res.data.results;
  } catch (error) {
    console.error("Erro em getPokemons:", error);
    throw new Error("Falha ao buscar lista de Pokémons");
  }

}

export async function getPokemonDetails(url: string): Promise<Pokemon> {
  try {
    const res = await axios.get(url);
    return {
      id: res.data.id,
      name: res.data.name,
      image: res.data.sprites.front_default,
      types: res.data.types.map((t: any) => t.type.name),
    };
  } catch (error) {
    console.error("Erro em getPokemonDetails:", error);
    throw new Error(`Falha ao buscar detalhes do Pokémon (${url})`);
  }

}

export async function getPokemonMoreDetails(url: string): Promise<Pokemon> {
  try {
    const res = await axios.get(url);
    return {
      id: res.data.id,
      name: res.data.name,
      image: res.data.sprites.front_default,
      types: res.data.types.map((t: any) => t.type.name),
    };
  } catch (error) {
    console.error("Erro em getPokemonDetails:", error);
    throw new Error(`Falha ao buscar detalhes do Pokémon (${url})`);
  }

}


