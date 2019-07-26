<template>
  <div class="pokemon-details">
    <b-card no-body>
      <b-img-lazy class="sprite" :src="sprite" :data-sprite="sprite" slot="header" @load.native="onLoadSprite" @error.native="onErrorSpriteFallback" v-if="sprite.length" />
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
            <b-col class="text-nowrap">
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
// Component related to the back side of the pokémon card, containing more details about the pokémon.

// this component is using classical component class approach in Vue, due his complexity
// the intent is  to show how TypeScript helps a lot when creating a Vue Component.

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

  /**
   * Vue native method, triggered when component mounts itself.
   * @void
   */
  private mounted() {
    const slug = this.pokemon.name.toLowerCase().replace(/\s/g, '-').replace(/[^a-z-]/ig, '');

    this.sprite = `http://www.pokestadium.com/sprites/xy/${slug}.gif`;
  }

  // watch if load variable value changed
  @Watch('load', { immediate: true })
  private onLoad(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue && newValue && !this.loaded) {
      // add small delay to increase component performance
      window.setTimeout(() => { this.fetchData(this.pokemon.id); }, 100);
    }
  }

  /**
   * This method will fetch data grom GraphQL, using apollo client.
   * @void
   */
  private fetchData(id: string) {
    // QUERY_POKEMONDETAILS is a function that will return a valid Apollo Options Object.
    // there was a reson to use in this way, to allow to split "model" logic from view.
    const query = QUERY_POKEMONDETAILS(id);

    // using apollo with a more programtic approach.
    // the intention is to show how flexible Apollo lib is with Vue.
    this.$apollo.query(query).then((result: GenericObject) => {
      const { pokemon } = result.data;

      this.data = pokemon;
      this.loaded = !!pokemon;
    });
  }

  /**
   * This method will trigger when sprite image is loaded.
   * Since Giffer is being used to control gif animations, there was a need to use this approach
   * @void
   */
  private onLoadSprite($e: Event) {
    const $element = $e.currentTarget as HTMLImageElement;

    // check if the lazy component loaded the sprite image
    if ($element.getAttribute('src') === $element.dataset.sprite) {
      $element.dataset.gifffer = $element.dataset.sprite; // set sprite to giffer parameter
      // remove sprite referal, to avoid this event being triggered each time gif shows up.
      delete $element.dataset.sprite;
      $element.removeAttribute('data-sprite');

      // call Giffer to control gif animation
      Gifffer();

      // remove giffer data attribute, to avoid Giffer being attached multiple times to the image
      delete $element.dataset.gifffer;
      $element.removeAttribute('data-gifffer');
    }
  }

  /**
   * This method will trigger when image fails to load. Since it is using a 3rd party image repository,
   * there is no naming convention to the pokémon images.
   * @void
   */
  private onErrorSpriteFallback($e: Event) {
    const $img = $e.currentTarget as HTMLImageElement;

    // if fallback was already triggered, will ignore and return false, to avoid loop call
    if ($img.dataset.fallback) {
      return false;
    }

    // if sprite image fails to load, it will try to change its own name
    const slug = this.pokemon.name.toLowerCase().replace(/-/g, '').replace(/[^a-z-]/ig, '');
    // set sprite value again, to force component reloading.
    this.sprite = `http://www.pokestadium.com/sprites/xy/${slug}.gif`;

    $img.dataset.fallback = '1'; // set fallback flag, to avoid loop call
  }
}
</script>

<style scoped lang="scss">
// scoped style will work only for the component, avoiding overwriting something else
// the only con is it won't work ok with dynamic elements, not created by Vue, like 3rd party libs.
</style>
