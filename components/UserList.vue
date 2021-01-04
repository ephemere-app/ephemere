<template>
  <div>
    <b-field>
      <b-input
        :value="username"
        :placeholder="$t('userlist.username')"
        :maxlength="20"
        :has-counter="true"
        @input="usernameChanged"
      />
    </b-field>

    <article
      v-for="(u, i) in users"
      :key="u.id"
      :data-user="`user-${i}`"
      class="media"
    >
      <div class="media-left">
        <b-icon v-if="u.me || u.username" pack="fas" icon="user-shield" />
        <b-icon v-else pack="fas" icon="user-secret" />
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <span v-if="u.me" class="has-text-weight-bold">
              <span>{{ $t('userlist.me') }}</span>
              <span v-if="u.username">({{ u.username }})</span>
            </span>
            <span v-else-if="u.username">{{ u.username }}</span>
            <span v-else>{{ $t('userlist.anonymous') }} {{ i + 1 }}</span>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('room', {
      username: 'username',
      users: 'users',
    }),
  },

  methods: {
    ...mapActions('room', {
      updateUsername: 'updateUsername',
    }),

    usernameChanged(value: string): void {
      this.updateUsername(value)
    },
  },
})
</script>
