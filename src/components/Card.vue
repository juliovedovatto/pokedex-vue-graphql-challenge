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

  private flipCard($e: Event) {
    $e.preventDefault();

    const $target = $e.target as HTMLElement;
    const $element = $e.currentTarget as HTMLElement;
    const $flip = $element.querySelector('.card-flip-inner') as HTMLElement;
    const $gif = $element.querySelector('.sprite') as HTMLButtonElement;

    const isClickFromSpriteBtn = $target.classList.contains('.sprite') || $target.closest('.sprite')
      || $target.parentNode === null || false;

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
.pokemon-card {
  position: relative;
  transition: transform 0.2s cubic-bezier(0.5, 0.01, 0, 0.08);
  will-change: transform;
  pointer-events: auto;

  &:hover {
    cursor: pointer;
    transform: scale3d(1.2, 1.2, 1.2);
    z-index: 11;
  }
}
.card-flip {
  perspective: 1000px;
  width: 100%;
  height: 505px;

  .card-flip-inner {
    transition: transform 0.8s;
    transform-style: preserve-3d;
    will-change: transform;
    pointer-events: auto;
    position: relative;
    width: 100%;
    height: 100%;

    &.flip {
      transform: rotate3d(0, 1, 0, 180deg);
    }

    .flip-card-front, .flip-card-back {
      backface-visibility: hidden;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
    }

    .flip-card-back {
      transform: rotate3d(0, 1, 0, 180deg);
    }
  }
}
</style>
