interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

async function api<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}/${path}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Pokémon "${path}" não encontrado.`);
    }
    throw new Error(`Erro ao buscar Pokémon: ${response.status} ${response.statusText}`);
  }

  return await response.json() as T;
}

function getPokemonTypes(pokemon: Pokemon): string[] {
  return [...pokemon.types]
    .sort((a, b) => a.slot - b.slot) // aqui eu consigo pegar o primeiro e segundo tipo, os ordenando
    .map(t => t.type.name);
}


async function main() {
  const arg = process.argv[2];

  if (!arg) {
    console.error("❌ Você precisa informar o nome ou ID de um Pokémon.");
    process.exit(1);
  }

  try {
    const pkmn = await api<Pokemon>(String(arg.toLowerCase()));
    const type = getPokemonTypes(pkmn);
    if (type.length > 1) {
      console.log(`${pkmn.name.toUpperCase()} - ${pkmn.height / 10} m - ${pkmn.weight / 10} kg - ${type.join("/").toUpperCase()}`);
    } else {
      console.log(`${pkmn.name.toUpperCase()} - ${pkmn.height / 10} m - ${pkmn.weight / 10} kg - ${type[0].toUpperCase()}`);

    }

  } catch (error) {
    console.error("❌ Erro:", (error as Error).message);
  }

}

main();
