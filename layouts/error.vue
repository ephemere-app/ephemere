<template>
  <section class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div>
          <p class="title">
            {{ description.title }}
          </p>

          <p class="subtitle">
            {{ description.subtitle }}
          </p>
        </div>

        <nuxt-link :to="localePath('index')">
          {{ $t('error.backToHome') }}
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

interface Error {
  statusCode: number
  message: string
}

export default Vue.extend({
  props: {
    error: {
      type: Object,
      required: true,
    } as PropOptions<Error>,
  },

  head() {
    return this.$nuxtI18nSeo()
  },

  computed: {
    statusCode(): number {
      return this.error.statusCode || 500
    },

    description(): any | undefined {
      const handlers = new Map([
        [404, this.$t('error.pageNotFound')],
        [500, this.$t('error.internalServerError')],
      ])

      return handlers.get(this.statusCode)
    },
  },
})
</script>
