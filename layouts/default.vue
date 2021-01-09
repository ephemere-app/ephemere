<template>
  <nuxt />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  head() {
    return this.$nuxtI18nSeo()
  },
})
</script>
