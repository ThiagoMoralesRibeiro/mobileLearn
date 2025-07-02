import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PokedexScreen } from '../screens/PokedexScreen'
import { DetailsScreen } from '../screens/DetailsScreen';
import { Pokemon } from '../types/Pokemon';



export type RootStackParamList = {
  Pokedex: undefined;
  Details: { pokemon: Pokemon };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>


      <Stack.Navigator initialRouteName="Pokedex">
        <Stack.Screen
          name="Pokedex"
          component={PokedexScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Detalhes do Pokémon' }}
        />



      </Stack.Navigator>
    </NavigationContainer>
  );
}
