<template>
  <figure class="image container" :class="`is-${size}x${size}`">
    <nuxt-link :to="localePath('index')">
      <img src="~/assets/svg/logo.svg" alt="Logo" />
    </nuxt-link>
  </figure>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    size: {
      type: Number,
      default: 256,
    },
  },
})
</script>
