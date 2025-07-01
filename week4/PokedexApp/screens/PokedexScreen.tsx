import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { getPokemons, getPokemonDetails } from '../services/api';
import { Pokemon } from '../types/Pokemon';
import { PokemonCard } from '../components/PokemonCard';

export const PokedexScreen = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');
  const [loading, SetLoading] = useState(true);
  const [success, setSuccessMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {

      SetLoading(true);
      const list = await getPokemons(30); // primeiros 30 pokemons
      const details = await Promise.all(list.map(p => getPokemonDetails(p.url)));
      setPokemons(details);
    } catch (error: any) {
      setError(error.message ?? 'Erro desconhecido');

    } finally {
      SetLoading(false);
    }
  }


  useEffect(() => {
    fetchData();
  }, []);

  /* useEffect(() => {
     if (!search.trim()) return;
 
     const match = pokemons.find(
       p => p.name.toLowerCase() === search.trim().toLowerCase()
     );
     if (match) {
       setSuccessMessage(`✅ ${match.name.toUpperCase()} encontrado com sucesso!`);
       const t = setTimeout(() => setSuccessMessage(''), 3000);
       return () => clearTimeout(t);
     }
   }, [search, pokemons]);
 */

  const filtered = pokemons.filter(p => p.name.includes(search.toLowerCase()));

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.message}>Carregando Pokémons...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex</Text>
      <TextInput
        placeholder="Buscar pokémon..."
        style={styles.input}
        onChangeText={setSearch}
      />


      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        ListEmptyComponent={() => (
          <View style={styles.center}>
            <Text style={styles.empty}>
              {search
                ? `Nenhum Pokémon encontrado para "${search}".`
                : 'Nenhum Pokémon para exibir no momento.'}
            </Text>
          </View>
        )} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  message: { marginTop: 8, fontSize: 16 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 12 },
  empty: { marginTop: 8, fontSize: 16, color: '#777', textAlign: 'center' },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
});

