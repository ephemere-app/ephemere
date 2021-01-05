<template>
  <div>
    <hero />
    <features />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Hero from '~/components/Hero.vue'
import Features from '~/components/Features.vue'

export default Vue.extend({
  components: {
    Hero,
    Features,
  },
})
</script>
