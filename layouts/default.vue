<template>
  <div>
    <nuxt />
    <credits />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Credits from '~/components/Credits.vue'

export default Vue.extend({
  components: {
    Credits,
  },

  head() {
    return this.$nuxtI18nSeo()
  },
})
</script>
