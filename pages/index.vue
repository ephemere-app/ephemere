<template>
  <div>
    <hero />
    <features />
    <security />
    <credits />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Hero from '~/components/Hero.vue'
import Features from '~/components/Features.vue'
import Security from '~/components/Security.vue'
import Credits from '~/components/Credits.vue'

export default Vue.extend({
  components: {
    Hero,
    Features,
    Security,
    Credits,
  },
})
</script>
