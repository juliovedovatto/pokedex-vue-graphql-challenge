<template>
  <b-container>
    <div v-if="loaded">
      <b-row>
        <b-col sm="4" v-for="pokemon in pokemonList" :key="pokemon.id" class="monster">
          <Card :pokemon="pokemon" />
        </b-col>
      </b-row>
    </div>
    <div v-else>
      <b-img src="../assets/images/loading.gif" title="Loading..." />
    </div>
  </b-container>
</template>

<script lang="ts">
  import { GenericObject } from '../types/Generic';

  import { QUERY_POKEMONLIST } from '@/queries';
  
  import Card from './Card.vue';

  export default {
    components: {
      Card,
    },
    data() {
      return {
        loaded: false,
        pokemonList: [],
      };
    },

    apollo: {
      pokemonList: QUERY_POKEMONLIST(151),
    },

    watch: {
      pokemonList(newValue: GenericObject[], oldValue: []) {
        (this as any).loaded = !!newValue;
      },
    },
  };
</script>

<style scoped lang="scss">
  .container {
    padding: 30px 0;
  }
</style>