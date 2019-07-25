<template>
  <div class="pokemon-details">
    <b-card no-body v-if="loaded">
      <b-card-img :src="`http://www.pokestadium.com/sprites/xy/${slug}.gif`" slot="header" v-if="slug" />
      <h2 slot="header">{{ data.name }}</h2>

      <b-card-body class="text-left">
        <b-card-title>
          {{ data.number }}
          <BadgeType v-for="(type, index) in data.types" :key="`type-${index}`" :type="type" />
        </b-card-title>
        <b-card-sub-title class="mb-2">{{ data.classification }}</b-card-sub-title>

        <b-row no-gutters>
          <b-col>
              <b-badge>Max. HP</b-badge> 
              {{ data.maxHP}}
          </b-col>
          <b-col>
              <b-badge>Max. CP</b-badge> 
              {{ data.maxCP}}
          </b-col>
        </b-row>

        <h4>Fast Attacks</h4>
        <b-row no-gutters class="">
          <b-col class="text-left">
              <strong>Attack</strong>
          </b-col>
          <b-col class="text-center">
              <strong>Type</strong>
          </b-col>
          <b-col class="text-right">
              <strong>Power</strong>
          </b-col>
        </b-row>
        <b-row no-gutters class="" v-for="(attack, index) in data.attacks.fast" :key="`fast-attack-${index}`">
          <b-col class="text-left">
              {{ attack.name }}
          </b-col>
          <b-col class="text-center">
              <BadgeType :type="attack.type" />
          </b-col>
          <b-col class="text-right">
              {{ attack.damage }}
          </b-col>
        </b-row>

        <h4>Special Attacks</h4>
        <b-row no-gutters class="">
          <b-col class="text-left">
              <strong>Attack</strong>
          </b-col>
          <b-col class="text-center">
              <strong>Type</strong>
          </b-col>
          <b-col class="text-right">
              <strong>Power</strong>
          </b-col>
        </b-row>
        <b-row no-gutters class="" v-for="(attack, index) in data.attacks.special" :key="`special-attack-${index}`">
          <b-col class="text-left">
              {{ attack.name }}
          </b-col>
          <b-col class="text-center">
              <BadgeType :type="attack.type" />
          </b-col>
          <b-col class="text-right">
              {{ attack.damage }}
          </b-col>
        </b-row>
      </b-card-body>
      <b-card-footer>
        <b-row>
          <b-col>
            <h5 class="text-muted">Weakness</h5>
            <BadgeType v-for="(type, index) in data.weaknesses" :key="`weakeness-${index}`" :type="type" />
          </b-col>
          <b-col>
            <h5 class="text-muted">Flee Rate</h5>
            {{ data.fleeRate }}
            <h5 class="text-muted">Weight</h5>
            {{ data.weight.minimum }} - {{ data.weight.maximum }}
          </b-col>
        </b-row>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script lang="ts">
import { GenericObject } from '@/types/Generic';

import { Component, Prop, Vue } from 'vue-property-decorator';

import { QUERY_POKEMONDETAILS } from '@/queries';

import BadgeType from './BadgeType.vue';

@Component({
  components: {
    BadgeType,
  },
})
export default class CardDetails extends Vue {
  @Prop() private id!: string;

  private data: GenericObject = {};
  private loaded: boolean = false;
  private slug: string = '';

  private fetchData(id: string) {
    const query = QUERY_POKEMONDETAILS(id);

    this.$apollo.query(query).then((result: GenericObject) => {
      const { pokemon } = result.data;

      this.data = pokemon;
      this.loaded = !!pokemon;

      this.slug = pokemon.name.toLowerCase().replace(/\s/g, '-').replace(/[^a-z-]/ig, '');
    });
  }

  private mounted() {
    this.fetchData(this.id);
  }
}
</script>

<style scoped lang="scss">
  .pokemon-details {
    max-width: 20rem;

    .card {
      .card-header {
        text-align: center;
      }
      .card-img {
        width: auto;
      }
    }
  }
</style>
