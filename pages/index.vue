<template>
  <div>
    <hero />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Hero from '~/components/Hero.vue'

export default Vue.extend({
  components: {
    Hero,
  },
})
</script>
