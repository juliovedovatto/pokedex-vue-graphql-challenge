<template>
  <div>
  </div>
</template>

<script lang="ts">
import { GenericObject } from '@/types/Generic';

import { Component, Prop, Vue } from 'vue-property-decorator';

import { QUERY_POKEMONDETAILS } from '@/queries';

@Component
export default class Details extends Vue {
  @Prop() private number!: string;

  private data: GenericObject = {};

  private fetchData(id: string) {
    const query = QUERY_POKEMONDETAILS(id);

    this.$apollo.query(query).then((result: GenericObject) => {
      console.log(result);

      this.data = result;
    });
  }

  mounted() {
    this.fetchData(this.number);
  }
}
</script>

<style scoped lang="scss">
</style>
