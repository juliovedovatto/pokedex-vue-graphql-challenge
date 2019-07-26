<template>
  <b-container>
    <div v-if="loaded">
      <b-row no-gutters>
        <b-col xl="4" md="6" sm="12" v-for="pokemon in pokemonList" :key="pokemon.id" class="monster">
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
  // Listing component, to call API and mount Card components

  // this component makes use of classic Vue Object,
  // there was no real reason to use Class-Based approach, since it is a basic component.

  import { GenericObject } from '../types/Generic';

  import { QUERY_POKEMONLIST } from '@/queries';

  import Card from './Card.vue';

  // amount of pokémons, in this example we will using only the first gen pokémons only
  const amount = 151;

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

    // using apollo as VUe component object.
    // the intention is to show how flexible Apollo lib is with Vue.
    apollo: {
      pokemonList: QUERY_POKEMONLIST(amount), // TODO: make amount variable dynamic.
    },

    watch: {
      /**
       * Watcher method to check when pokemonList
       */
      pokemonList(newValue: GenericObject[], oldValue: []) {
        // check size of variables. If it changed, this means result was loaded inside data variable.
        if (newValue.length !== oldValue.length) {
          (this as any).loaded = true; // need to cast this as any, to "fool" TypeScript validation
        }
      },
    },
  };
</script>

<style scoped lang="scss">
// scoped style will work only for the component, avoiding overwriting something else
// the only con is it won't work ok with dynamic elements, not created by Vue, like 3rd party libs.
</style>