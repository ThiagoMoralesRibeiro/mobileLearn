import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Pokemon } from '../types/Pokemon';
import { capitalize } from '../utils/format';

type DetailsRoute = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsRoute;
};

const typeColors: Record<string, string> = {
  bug: '#A6B91A',
  dark: '#705746',
  dragon: '#6F35FC',
  electric: '#F7D02C',
  fairy: '#D685AD',
  fighting: '#C22E28',
  fire: '#EE8130',
  flying: '#A98FF3',
  ghost: '#735797',
  grass: '#7AC74C',
  ground: '#E2BF65',
  ice: '#96D9D6',
  normal: '#A8A77A',
  poison: '#A33EA1',
  psychic: '#F95587',
  rock: '#B6A136',
  steel: '#B7B7CE',
  water: '#6390F0',
};


export const DetailsScreen: React.FC<Props> = ({ route }) => {
  const { pokemon } = route.params as { pokemon: Pokemon };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.name}>{capitalize(pokemon.name)}</Text>

        <Image
          source={{ uri: pokemon.image }}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.sectionTitle}>
          {pokemon.types.length === 1 ?
          'Tipo' : 'Tipos'}
        </Text>
        <View style={styles.typesRow}>
          {pokemon.types.map((t) => (
            <View key={t} style={[styles.typeBadge,
            { backgroundColor: typeColors[t] ?? '#ccc' },
            ]}>

              <Text style={styles.typeText}>{t}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: {
    padding: 16,
    alignItems: 'center',
  },
  name: { fontSize: 32, fontWeight: 'bold', marginBottom: 12 },
  image: { width: 200, height: 200, marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  typesRow: { flexDirection: 'row', gap: 8 },
  typeBadge: {
    backgroundColor: '#eee',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  typeText: { fontSize: 14, color: '#333' },
});

