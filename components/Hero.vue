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

              <p class="subtitle">
                {{ $t('hero.subtitle') }}
              </p>

              <p>
                {{ $t('hero.tagline') }}
              </p>
            </div>

            <br />

            <div class="has-text-centered">
              <b-field>
                <b-input
                  v-model.trim="message"
                  :placeholder="$t('hero.message.placeholder')"
                  maxlength="200"
                  type="textarea"
                  data-message
                />
              </b-field>

              <b-field grouped position="is-right">
                <b-select
                  v-model="expires"
                  :placeholder="$t('hero.message.expires.placeholder')"
                  pack="fas"
                  icon="stopwatch"
                >
                  <option value="1m">
                    {{ $t('hero.message.expires.oneMinute') }}
                  </option>
                  <option value="5m">
                    {{ $t('hero.message.expires.fiveMinutes') }}
                  </option>
                  <option value="15m">
                    {{ $t('hero.message.expires.fifteenMinutes') }}
                  </option>
                  <option value="1h">
                    {{ $t('hero.message.expires.oneHour') }}
                  </option>
                  <option value="1d">
                    {{ $t('hero.message.expires.oneDay') }}
                  </option>
                  <option value="2d">
                    {{ $t('hero.message.expires.twoDays') }}
                  </option>
                  <option value="1w">
                    {{ $t('hero.message.expires.oneWeek') }}
                  </option>
                </b-select>
                <p class="control">
                  <b-button
                    :label="$t('hero.message.send')"
                    :disabled="message.length === 0"
                    type="is-primary"
                    @click="sendMessage"
                  />
                </p>
              </b-field>

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
                {{ $t('hero.newRoom') }}
              </b-button>
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
import { v4 as uuid4 } from 'uuid'
import Logo from '~/components/Logo.vue'
import * as crypto from '~/utils/crypto'

export default Vue.extend({
  components: {
    Logo,
  },

  data() {
    return {
      message: '',
      expires: '1m',
      loading: false,
      license: this.$t('common.app.license'),
      repository: this.$t('common.app.repository'),
    }
  },

  methods: {
    async sendMessage(): Promise<void> {
      this.loading = true
      const key = crypto.generateKey()
      const content = crypto.encrypt(this.message, key)

      try {
        const url = `${process.env.BOX_URL}/box`
        const params = {
          content,
          expires_in: this.expires,
        }
        const res = await this.$axios.$post(url, params)
        this.$router.push(
          this.localePath({
            name: 'box-id',
            params: { id: res.id },
            hash: `#${key}`,
          })
        )
      } catch (e) {
        this.showFailureNotification()
      }
      this.loading = false
    },

    showFailureNotification(): void {
      this.$emit('failure')
      this.$buefy.toast.open({
        duration: 5000,
        position: 'is-top',
        message: this.$t('hero.message.failure') as string,
        type: 'is-danger',
      })
    },

    generateRoomId(): string {
      return uuid4()
    },

    generateRoomKey(): string {
      return crypto.generateKey()
    },
  },
})
</script>
