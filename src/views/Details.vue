<template>
  <div>
    <Details v-bind:number="$route.params.number" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Details from '@/components/Details.vue';

@Component({
  components: {
    Details,
  },
})

export default class Home extends Vue {}
</script>
