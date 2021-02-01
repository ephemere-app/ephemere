<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-half is-offset-one-quarter">
            <div class="has-text-centered">
              <logo />

              <br />

              <p class="title is-size-1">
                {{ $t('hero.title') }}
              </p>
            </div>

            <br />

            <div class="has-text-centered">
              <b-field
                :message="
                  $n(expiration, {
                    style: 'unit',
                    unit: expirationUnit,
                    unitDisplay: 'long',
                  })
                "
              >
                <b-input
                  v-model.trim="message"
                  :placeholder="$t('hero.message.placeholder')"
                  type="textarea"
                  disabled
                  data-message
                />
              </b-field>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-loading
      :is-full-page="true"
      :can-cancel="false"
      :active.sync="loading"
    />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '~/components/Logo.vue'
import * as crypto from '~/utils/crypto'

export default Vue.extend({
  components: {
    Logo,
  },

  data() {
    return {
      loading: true,
      message: '',
      expiresAt: '',
      expiration: 0,
      expirationUnit: 'second' as 'second' | 'minute' | 'hour' | 'day' | 'week',
      timer: undefined as number | undefined,
    }
  },

  async mounted() {
    this.loading = true

    const boxId = this.$route.params.id
    const hash = this.$route.hash
    let encryptionKey = ''
    if (hash.length > 1) {
      encryptionKey = hash.slice(1)
    }

    if (boxId && encryptionKey) {
      await this.getData(boxId, encryptionKey)
    }

    this.loading = false
  },

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },

  methods: {
    async getData(boxId: string, encryptionKey: string): Promise<void> {
      const url = `/api/box/${boxId}`
      const res = await this.$axios.$get(url).catch(() => null)
      if (res) {
        this.message = crypto.decrypt(res.data.content, encryptionKey)
        this.expiresAt = res.data.expireAt
        this.updateExpiration()
        this.timer = window.setInterval(this.updateExpiration, 1000)
      }
    },

    updateExpiration(): void {
      const expirationSec = Math.max(
        0,
        Math.floor((Date.parse(this.expiresAt) - Date.now()) / 1000)
      )

      if (expirationSec < 60) {
        this.expiration = expirationSec
        this.expirationUnit = 'second'
      } else if (expirationSec < 3600) {
        this.expiration = Math.floor(expirationSec / 60)
        this.expirationUnit = 'minute'
      } else if (expirationSec < 86400) {
        this.expiration = Math.floor(expirationSec / 3600)
        this.expirationUnit = 'hour'
      } else if (expirationSec < 604800) {
        this.expiration = Math.floor(expirationSec / 86400)
        this.expirationUnit = 'day'
      } else {
        this.expiration = Math.floor(expirationSec / 604800)
        this.expirationUnit = 'week'
      }
    },
  },
})
</script>
