<template>
  <div class="pokemon-card">
    <CardFront @select="select" :pokemon="pokemon" />
    <CardDetails :id="selected" v-if="selected" />
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

  private selected: string = '';

  private select(id: string) {
    this.selected = id;
  }
}
</script>

<style scoped lang="scss">
.pokemon-card {}
</style>
