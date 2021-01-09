<template>
  <footer class="footer">
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <div class="content has-text-centered heading">
          <i18n path="credits.made" tag="p">
            <template #author>
              <a :href="author.url" :title="author.name" :alt="author.name">
                <span>{{ author.name }}</span>
              </a>
            </template>
          </i18n>

          <i18n path="credits.powered" tag="p">
            <template #nuxt>
              <a :href="nuxt.url" :title="nuxt.name" :alt="nuxt.name">
                <span>{{ nuxt.name }}</span>
              </a>
            </template>

            <template #socketio>
              <a
                :href="socketio.url"
                :title="socketio.name"
                :alt="socketio.name"
              >
                <span>{{ socketio.name }}</span>
              </a>
            </template>

            <template #buefy>
              <a :href="buefy.url" :title="buefy.name" :alt="buefy.name">
                <span>{{ buefy.name }}</span>
              </a>
            </template>

            <template #fontawesome>
              <a
                :href="fontawesome.url"
                :title="fontawesome.name"
                :alt="fontawesome.name"
              >
                <span>{{ fontawesome.name }}</span>
              </a>
            </template>
          </i18n>

          <i18n path="credits.e2ee" tag="p">
            <template #tweetnacljs>
              <a
                :href="tweetnacljs.url"
                :title="tweetnacljs.name"
                :alt="tweetnacljs.name"
              >
                <span>{{ tweetnacljs.name }}</span>
              </a>
            </template>
          </i18n>

          <i18n path="credits.analytics" tag="p">
            <template #chiffre>
              <a :href="chiffre.url" :title="chiffre.name" :alt="chiffre.name">
                <span>{{ chiffre.name }}</span>
              </a>
            </template>
          </i18n>

          <br />

          <i18n path="credits.website" tag="p">
            <template #license>
              <a :href="license.url" :title="license.name" :alt="license.name">
                <span>{{ license.name }}</span>
              </a>
            </template>
          </i18n>

          <div class="block">
            <a
              :href="repository.url"
              :title="repository.name"
              :alt="repository.name"
            >
              <b-icon pack="fab" icon="github" size="is-large" />
            </a>
          </div>

          <p>
            {{ $t('credits.copyright.text') }} ©
            {{ $t('credits.copyright.start') }} -
            {{ $t('credits.copyright.end') }},
            {{ $t('credits.copyright.owner') }}
          </p>

          <p>
            <a
              :href="changelog.url"
              :title="changelog.name"
              :alt="changelog.name"
            >
              {{ $t('credits.version') }} {{ appVersion }}
            </a>
          </p>
        </div>
      </div>
      <div class="column is-2">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            <b-icon pack="fas" icon="globe" class="pr-2" />
            {{ $t('credits.language') }}
          </a>

          <div class="navbar-dropdown is-boxed">
            <nuxt-link
              v-for="locale in $i18n.locales"
              :key="locale.code"
              :to="switchLocalePath(locale.code)"
              class="navbar-item"
            >
              {{ locale.name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      appVersion: process.env.APP_VERSION,
      author: this.$t('common.app.author'),
      repository: this.$t('common.app.repository'),
      license: this.$t('common.app.license'),
      changelog: this.$t('common.app.changelog'),
      nuxt: this.$t('common.links.nuxt'),
      socketio: this.$t('common.links.socketio'),
      buefy: this.$t('common.links.buefy'),
      fontawesome: this.$t('common.links.fontawesome'),
      tweetnacljs: this.$t('common.links.tweetnacljs'),
      chiffre: this.$t('common.links.chiffre'),
    }
  },
})
</script>
