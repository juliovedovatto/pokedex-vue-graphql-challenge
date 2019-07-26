<template>
  <div class="pokemon-details">
    <b-card no-body>
      <b-img-lazy class="sprite" :src="sprite" :data-sprite="sprite" slot="header" @load.native="onLoadSprite" v-if="sprite.length" />
      <h2 slot="header" class="card-name">{{ pokemon.name }}</h2>
      <b-row no-gutters slot="header">
        <b-col>
          <b-card-title>
            {{ pokemon.number }}
          </b-card-title>
        </b-col>
        <b-col>
          <BadgeType v-for="(type, index) in pokemon.types" :key="`type-${index}`" :type="type" />
        </b-col>
      </b-row>

      <b-card-body class="text-left">
        <div v-if="loaded">
          <b-row no-gutters class="details">
            <b-col sm="6">
              <b-card-sub-title class="mb-0">{{ pokemon.classification }}</b-card-sub-title>
            </b-col>
            <b-col class="text-center">
                <b-badge>Max. HP</b-badge> 
                {{ data.maxHP}}
            </b-col>
            <b-col class="text-center">
                <b-badge>Max. CP</b-badge> 
                {{ data.maxCP}}
            </b-col>
          </b-row>

          <h4 class="attack-section-title">Fast Attacks</h4>
          <b-row no-gutters class="attacks-header">
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
          <b-row no-gutters class="attacks" v-for="(attack, index) in data.attacks.fast" :key="`fast-attack-${index}`">
            <b-col class="text-left attack-title">
                {{ attack.name }}
            </b-col>
            <b-col class="text-center attack-type">
                <BadgeType :type="attack.type" />
            </b-col>
            <b-col class="text-right attack-damage">
                {{ attack.damage }}
            </b-col>
          </b-row>

          <h4 class="attack-section-title">Special Attacks</h4>
          <b-row no-gutters class="attacks-header">
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
          <b-row no-gutters class="attacks" v-for="(attack, index) in data.attacks.special" :key="`special-attack-${index}`">
            <b-col class="text-left attack-title">
                {{ attack.name }}
            </b-col>
            <b-col class="text-center attack-type">
                <BadgeType :type="attack.type" />
            </b-col>
            <b-col class="text-right attack-damage">
                {{ attack.damage }}
            </b-col>
          </b-row>
        </div>
        <content-placeholders :rounded="true" :animated="true" v-show="!loaded" v-else>
          <content-placeholders-text :lines="8" />
        </content-placeholders>
      </b-card-body>
      <b-card-footer>
        <div v-if="loaded">
          <b-row class="footer-details">
            <b-col>
              <h5 class="text-muted details-title">Weakness</h5>
              <BadgeType v-for="(type, index) in data.weaknesses" :key="`weakeness-${index}`" :type="type" />
            </b-col>
            <b-col>
              <h5 class="text-muted details-title">Flee Rate</h5>
              {{ data.fleeRate }}
            </b-col>
            <b-col>
              <h5 class="text-muted details-title">Weight</h5>
              {{ data.weight.minimum }} - {{ data.weight.maximum }}
            </b-col>
          </b-row>
        </div>
        <content-placeholders :rounded="true" :animated="true" v-show="!loaded">
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </b-card-footer>
    </b-card>
  </div>
</template>

<script lang="ts">
import { GenericObject } from '@/types/Generic';

import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import Gifffer from 'gifffer';

import { QUERY_POKEMONDETAILS } from '@/queries';

import BadgeType from './BadgeType.vue';

@Component({
  components: {
    BadgeType,
  },
})
export default class CardDetails extends Vue {
  @Prop() private pokemon!: GenericObject;
  @Prop() private load!: boolean;

  private data: GenericObject = {};
  private loaded: boolean = false;
  private sprite: string = '';

  private fetchData(id: string) {
    const query = QUERY_POKEMONDETAILS(id);

    this.$apollo.query(query).then((result: GenericObject) => {
      const { pokemon } = result.data;

      this.data = pokemon;
      this.loaded = !!pokemon;
    });
  }

  private mounted() {
    const slug = this.pokemon.name.toLowerCase().replace(/\s/g, '-').replace(/[^a-z-]/ig, '');
    this.sprite = `http://www.pokestadium.com/sprites/xy/${slug}.gif`;
  }

  @Watch('load', { immediate: true })
  private onLoad(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue && newValue && !this.loaded) {
      // add small delay
      window.setTimeout(() => { this.fetchData(this.pokemon.id); }, 100);
    }
  }

  private onLoadSprite($e: Event) {
    const $element = $e.currentTarget as HTMLImageElement;

    if ($element.getAttribute('src') === $element.dataset.sprite) {
      $element.dataset.gifffer = $element.dataset.sprite;
      delete $element.dataset.sprite;
      $element.removeAttribute('data-sprite');

      Gifffer();
      delete $element.dataset.gifffer;
      $element.removeAttribute('data-gifffer');
    }
  }
}
</script>

<style scoped lang="scss">
  .pokemon-details {

    .card {
      width: 100%;

      .card-header {
        text-align: center;

        .sprite {
          width: auto;
        }
        .card-title {
          font-size: 20px;
        }
      }
      .card-body {
        .card-subtitle {
          margin: 0;
        }

        .details {
          font-size: 14px;
        }

        .attack-section-title {
          font-size: 15px;
          font-weight: 700;
          margin-top: 10px;

          &:first-of-type {
            margin-top: 0;
          }
        }
        .attacks-header {
          font-size: 13px;
        }
        .attacks {
          font-size: 13px;

          .attack-title {}
          .attack-type {}
          .attack-attack-damage {}
        }
      }
       .card-footer {
         .footer-details {
           font-size: 13px;

           .details-title {
             font-size: 13px;
             font-weight: 700;
           }
         }
       }
    }
  }
</style>
