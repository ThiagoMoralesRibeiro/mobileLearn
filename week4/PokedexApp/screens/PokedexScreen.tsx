import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getPokemons, getPokemonDetails } from '../services/api';
import { Pokemon } from '../types/Pokemon';
import { PokemonCard } from '../components/PokemonCard';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

const limit = 30;

export const PokedexScreen = () => {
  const insets = useSafeAreaInsets();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');
  const [loading, SetLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // scroll
  const [hasMore, setHasMore] = useState(true);// fim da lista

  type Nav = NativeStackNavigationProp<RootStackParamList, 'Pokedex'>;

  const navigation = useNavigation<Nav>();

  const loadMorePkmn = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    try {
      setIsLoadingMore(true);
      const list = await getPokemons(limit, offset);
      if (list.length === 0) {
        setHasMore(false);
        return;
      }

      const details = await Promise.all(list.map(p => getPokemonDetails(p.url)));
      setPokemons(prev => [...prev, ...details]);
      setOffset(prev => prev + limit);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoadingMore(false);
    }

  }, [offset, isLoadingMore, hasMore]);


  useEffect(() => {
    const initLoad = async () => {
      try {
        SetLoading(true);
        await loadMorePkmn();
      } catch (e) {
        setError('Erro ao carregar os pokémons.');
      } finally {
        SetLoading(false);
      }
    };
    initLoad();
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

  const renderFooter = () =>
    isLoadingMore ? (
      <View style={styles.footer}>
        <ActivityIndicator size="small" />
      </View>
    ) : null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.title}>Pokédex</Text>
        <TextInput
          placeholder="Buscar pokémon..."
          style={styles.input}
          onChangeText={setSearch}
        />



        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + 16 }]}
          onEndReached={loadMorePkmn}
          onEndReachedThreshold={0.6}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={() => (
            <View style={styles.center}>
              <Text style={styles.empty}>
                {search.trim()
                  ? `Nenhum Pokémon encontrado para ${search.trim()}.`
                  : "Nenhum Pokémon para exibir no momento."}
              </Text>
            </View>
          )} renderItem={({ item }) => (

            <TouchableOpacity
              onPress={() => navigation.navigate('Details', { pokemon: item })}
              style={{ flex: 1 }}           
              activeOpacity={0.8}
            >
              <PokemonCard pokemon={item} />
            </TouchableOpacity>
          )}
        />      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 12 },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  list: { paddingBottom: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  message: { fontSize: 16, marginTop: 8 },
  error: { fontSize: 16, color: 'red', textAlign: 'center' },
  empty: { fontSize: 16, color: '#666', textAlign: 'center' },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
});
