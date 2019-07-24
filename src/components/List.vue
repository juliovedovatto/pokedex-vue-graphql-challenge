<template>
  <b-container>
    <b-row>
      <b-col sm="4" v-for="pokemon in pokemonList" :key="pokemon.id" class="monster">
        <div class="card-frame">
          <div  class="card-number">
            <h3>#{{ pokemon.number }}</h3>
          </div>
          <picture class="card-picture">
            <b-img v-bind:src="`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.number}.png`" v-bind:alt="pokemon.name" fluid class="image" />
          </picture>
          <b-img v-bind:src="`http://www.pokestadium.com/sprites/xy/${pokemon.name.toLowerCase()}.gif`" class="sprite" />

          <div class="card-details">
            <h2>{{ pokemon.name }}</h2>
            <b-badge v-for="type in pokemon.types" :key="`badge-${pokemon.id}-${type}`" v-bind:class="`badge-type badge-type-${type.toLowerCase()}`">{{ type }}</b-badge>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
  import { QUERY_POKEMONLIST } from '@/queries';

  export default {
    data() {
      return {
        pokemonList: [],
      };
    },

    apollo: {
      pokemonList: QUERY_POKEMONLIST(10),
    },

  };
</script>

<style scoped lang="scss">
  .monster {
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
    .sprite {
      display: none;
    }


    .badge-type {
        margin-right: 5px;

        &:last-of-type {
          margin-right: 0;
        }
        
        &-normal {
          background-color: #A8A878;
          border: 1px solid #6D6D4E;
        }

        &-fire {
          background-color: #F08030;
          border: 1px solid #9C531F;
        }

        &-water {
          background-color: #6890F0;
          border: 1px solid #445E9C;
        }

        &-electric {
          background-color: #F8D030;
          border: 1px solid #A1871F;
        }

        &-grass {
          background-color: #78C850;
          border: 1px solid #4E8234;
        }

        &-ice {
          background-color: #98D8D8;
          border: 1px solid #638D8D;
        }

        &-ground {
          background-color: #E0C068;
          border: 1px solid #927D44;
        }

        &-flying {
          background-color: #A890F0;
          border: 1px solid #6D5E9C;
        }

        &-ghost {
          background-color: #705898;
          border: 1px solid #493963;
        }

        &-rock {
          background-color: #B8A038;
          border: 1px solid #786824;
        }

        &-fighting {
          background-color: #C03028;
          border: 1px solid #7D1F1A;
        }

        &-poison {
          background-color: #A040A0;
          border: 1px solid #682A68;
        }

        &-psychic {
          background-color: #F85888;
          border: 1px solid #A13959;
        }

        &-bug {
          background-color: #A8B820;
          border: 1px solid #6D7815;
        }

        &-dark {
          background-color: #705848;
          border: 1px solid #49392F;
        }

        &-steel {
          background-color: #B8B8D0;
          border: 1px solid #787887;
        }

        &-dragon {
          background-color: #7038F8;
          border: 1px solid #4924A1;
        }
      }
  }
</style>