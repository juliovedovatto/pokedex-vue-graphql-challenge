<template>
  <div>
    <CardDetails :id="$route.params.number" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CardDetails from '@/components/CardDetails.vue';

@Component({
  components: {
    CardDetails,
  },
})
export default class DetailsView extends Vue {}
</script>
