import { GenericObject } from './types/Generic';

import gql from 'graphql-tag';

export const QUERY_POKEMONLIST = (amount: number) => {
  return {
    query: gql`query List($amount: Int!) {
      pokemons(first: $amount) {
        id
        number
        name
        classification
        types
        image
      }
    }`,
    variables() {
      return { amount };
    },
    update: (data: GenericObject): GenericObject[] => {
      return data.pokemons;
    },
  };
};

export const QUERY_POKEMONDETAILS = (id: string) => {
  console.log('id => ', id);
  return {
    query: gql`query Details($id: String!) {
      pokemon(id: $id) {
        id
        number
        name
        classification
        types
        image
      }
    }`,
    variables() {
      return { id: id };
    },
    update: (data: GenericObject): GenericObject => {
      return data.pokemon;
    },
  };
};

