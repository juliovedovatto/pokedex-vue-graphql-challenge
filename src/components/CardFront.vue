<template>
  <div class="card-frame" @click="$emit('select', pokemon.id)" v-if="pokemon">
    <div  class="card-number">
      <h3>#{{ pokemon.number }}</h3>
    </div>
    <picture class="card-picture">
      <lazy-component>
        <b-img v-bind:src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.number}.png`" v-bind:alt="pokemon.name" fluid class="image" />
      </lazy-component>
    </picture>

    <div class="card-details">
      <h2>{{ pokemon.name }}</h2>
      <BadgeType v-for="type in pokemon.types" :key="`badge-${pokemon.id}-${type}`" :type="type" />
    </div>
  </div>
</template>

<script lang="ts">
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
};
</script>

<style scoped lang="scss">
.card-frame {
  padding-bottom: 20px;
  position: relative;
  margin-bottom: 20px;
  text-align: left;

  &:before {
    content: '';
    background: url('~@/assets/images/pokedex-card-frame-01.png') no-repeat;
    background-size: 100% auto;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 95px;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    background: url('~@/assets/images/pokedex-card-frame-04.png') no-repeat left bottom;
    background-size: 100% auto;
    width: 100%;
    height: 20px;
  }

  .card-number {
    position: relative;
    z-index: 10;
    padding: 41px 80px 0 0;
    text-align: right;
  }

  .card-picture {
    display: block;
    position: relative;
    margin-top: 19px;
    text-align: center;
    min-height: 300px;

    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: url('~@/assets/images/pokedex-card-frame-02.png') repeat-y left top;
      background-size: 100% auto;
      z-index: 10;
    }
    &:after {
      content: '';
      background: url('~@/assets/images/pokedex-card-frame-02-b.png') no-repeat left bottom;
      background-size: 100% auto;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 6px;
      width: 100%;
      z-index: 10;
    }

    .image {
      max-height: 300px;
    }
  }
  .card-details {
    background: url('~@/assets/images/pokedex-card-frame-03.png') repeat-y left top;
    background-size: 100% auto;
    text-align: center;
  }
}
</style>

