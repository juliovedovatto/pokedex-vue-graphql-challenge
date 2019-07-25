<template>
  <b-container>
    <b-row>
      <b-col sm="4" v-for="pokemon in pokemonList" :key="pokemon.id" class="monster">
        <Card :pokemon="pokemon" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
  import { QUERY_POKEMONLIST } from '@/queries';
  
  import Card from './Card.vue';

  export default {
    components: {
      Card,
    },
    data() {
      return {
        selected: 0,
        showDetails: false,
        pokemonList: [],
      };
    },

    apollo: {
      pokemonList: QUERY_POKEMONLIST(151),
    },

  };
</script>

<style scoped lang="scss">
  .monster {
  }
</style>