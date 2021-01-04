<template>
  <div class="container">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <b-navbar transparent>
          <template slot="brand">
            <b-navbar-item :to="localePath('index')" tag="nuxt-link">
              {{ $t('navbar.brand') }}
            </b-navbar-item>
          </template>

          <template slot="start" />

          <template slot="end">
            <b-navbar-dropdown
              :label="$t('navbar.language')"
              right
              hoverable
              boxed
            >
              <b-navbar-item
                v-for="locale in $i18n.locales"
                :key="locale.code"
                :to="switchLocalePath(locale.code)"
                tag="nuxt-link"
              >
                {{ locale.name }}
              </b-navbar-item>
            </b-navbar-dropdown>
          </template>
        </b-navbar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
