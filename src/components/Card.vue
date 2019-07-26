<template>
  <div class="pokemon-card card-flip" @click="flipCard" @mouseleave="flipCardLeave">
      <div class="card-flip-inner">
      <div class="flip-card-front">
        <CardFront :pokemon="pokemon" />
      </div>
      <div class="flip-card-back">
        <CardDetails :pokemon="pokemon" :load="selected" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Component related to the whole Pokémon card, callind extra components to build card.

// this component is using classical component class approach in Vue, due his complexity

import { GenericObject } from '../types/Generic';

import { Component, Prop, Vue } from 'vue-property-decorator';

import CardFront from './CardFront.vue';
import CardDetails from './CardDetails.vue';

@Component({
  components: {
    CardFront,
    CardDetails,
  },
})
export default class Card extends Vue {
  @Prop() private pokemon!: GenericObject;

  private selected: boolean = false;

  /**
   * This method will flip the component, showing his "back".
   * Component make use of CSS animations to acomplish that.
   * @void
   */
  private flipCard($e: Event) {
    $e.preventDefault();

    const $target = $e.target as HTMLElement;
    const $element = $e.currentTarget as HTMLElement;
    const $flip = $element.querySelector('.card-flip-inner') as HTMLElement;
    const $gif = $element.querySelector('.sprite') as HTMLButtonElement;

    // check the element clicked, due Giffer package it triggers the card flip
    const isClickFromSpriteBtn = $target.classList.contains('.sprite')
      || $target.closest('.sprite') || $target.parentNode === null || false;

    // check if flip board exists or if the event was triggered from a button (Giffer)
    if (!$flip || isClickFromSpriteBtn) {
      return false;
    }

    $flip.classList.toggle('flip');
    if ($flip.classList.contains('flip')) {
      this.selected = true;
    }

    if ($gif) {
      // small delay to start gif animation
      window.setTimeout(() => {
        $gif.click();
        $gif.dataset.spritePlaying = $flip.classList.contains('flip') ? '1' : '0';
      }, 100);
    }

    return false;
  }

  /**
   * This method will flip card when mouse leave the element.
   * @void
   */
  private flipCardLeave($e: Event) {
    const $element = $e.currentTarget as HTMLElement;
    const $flip = $element.querySelector('.card-flip-inner') as HTMLElement;
    const $gif = $element.querySelector('.sprite') as HTMLButtonElement;

    if (!this.selected || !$flip) {
      return false;
    }

    $flip.classList.remove('flip');

    if ($gif) {
      // small delay to stop gif animation
      window.setTimeout(() => {
        if ($gif.dataset.spritePlaying && $gif.dataset.spritePlaying ===  '1') {
          $gif.click();
          $gif.dataset.spritePlaying = '0';
        }
      }, 100);
    }

  }
}
</script>

<style scoped lang="scss">
// scoped style will work only for the component, avoiding overwriting something else
// the only con is it won't work ok with dynamic elements, not created by Vue, like 3rd party libs.
</style>
