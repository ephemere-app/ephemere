<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-half is-offset-one-quarter">
            <div class="has-text-centered">
              <p class="title">
                {{ $t('home.title') }}
              </p>

              <p class="subtitle">
                {{ $t('home.subtitle') }}
              </p>
            </div>

            <br />

            <div class="has-text-centered">
              <b-button
                type="is-link"
                icon-pack="fas"
                icon-left="paper-plane"
                :to="
                  localePath({
                    name: 'room-id',
                    params: { id: generateRoomId() },
                    hash: `#${generateRoomKey()}`,
                  })
                "
                tag="nuxt-link"
                outlined
              >
                {{ $t('home.newRoom') }}
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { v4 as uuid4 } from 'uuid'
import * as crypto from '~/utils/crypto'

export default Vue.extend({
  data() {
    return {
      license: this.$t('common.app.license'),
      repository: this.$t('common.app.repository'),
    }
  },

  methods: {
    generateRoomId(): string {
      return uuid4()
    },

    generateRoomKey(): string {
      return crypto.generateKey()
    },
  },
})
</script>
