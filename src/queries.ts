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
  return {
    query: gql`query Details($id: String!) {
      pokemon(id: $id) {
        id
        number
        name
        weight {
          minimum
          maximum
        }
        height {
          minimum
          maximum
        }
        classification
        types
        resistant
        attacks {
          fast {
            name
            type
            damage
          }
          special {
            name
            type
            damage
          }
        }
        weaknesses
        fleeRate
        maxCP
        maxHP
      }
    }`,
    variables: { id },
  };
};

