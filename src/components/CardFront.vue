<template>
  <div class="card-frame" v-if="pokemon">
    <div  class="card-number">
      <h3>{{ pokemon.number }}</h3>
    </div>
    <picture class="card-picture">
      <b-img-lazy class="image" blank-src="../assets/images/pokemon-loading.gif" :src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.number}.png`" :alt="pokemon.name" @load.native="onLoadImage" fluid />
    </picture>

    <div class="card-details">
      <h2 class="card-name">{{ pokemon.name }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
// Component related to the front of the pokémon card

// this component makes use of classic Vue Object,
// there was no real reason to use Class-Based approach, since it is a basic component.

import { GenericObject } from '../types/Generic';

import Vue from 'vue';

import BadgeType from './BadgeType.vue';

export default {
  components: {
    BadgeType,
  },

  props: {
    pokemon!: {
      type: Object as () => GenericObject,
    },
  },

  methods: {
    onLoadImage($e: Event) {
      const $img = $e.target as HTMLImageElement;
      const isLoadingImg = $img.src.match(/.gif$/i);

      if (!isLoadingImg) {
        this.triggerImageAnimation($img);
      }
    },

    triggerImageAnimation($img: HTMLImageElement) {
      $img.classList.add('hidden');

      window.setTimeout(() => {
        $img.classList.add('show');
        $img.classList.remove('hidden');
      }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">
// scoped style will work only for the component, avoiding overwriting something else
// the only con is it won't work ok with dynamic elements, not created by Vue, like 3rd party libs.
</style>

