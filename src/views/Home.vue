<template>
  <div class="home">
    <List class="pokemon-list" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import List from '@/components/List.vue';

@Component({
  components: {
    List,
  },
})

export default class HomeView extends Vue {}
</script>
