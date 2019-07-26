<template>
  <b-badge :class="`badge-type badge-type-${type.toLowerCase()}`">{{ type }}</b-badge>
</template>

<script lang="ts">
// simple component to show pokémon type, using Boostrap Badge component.

// this component makes use of classic Vue Object,
// there was no real reason to use Class-Based approach, since it is a basic component.

export default {
  props: {
    type!: String,
  },
};
</script>

<style scoped lang="scss">
// scoped style will work only for the component, avoiding overwriting something else
// the only con is it won't work ok with dynamic elements, not created by Vue, like 3rd party libs.
</style>

