<template>
  <div>
    <section class="hero is-fullheight">
      <div class="hero-body is-align-items-flex-start">
        <div class="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <logo size="64" />
              <br />
              <user-list />
            </div>

            <div class="column is-one-half">
              <join-link v-model="link" />
              <chat />
            </div>

            <div class="column is-one-quarter"></div>
          </div>
        </div>
      </div>
    </section>

    <b-loading :is-full-page="true" :active="!connected" :can-cancel="false" />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import Logo from '~/components/Logo.vue'
import UserList from '~/components/UserList.vue'
import JoinLink from '~/components/JoinLink.vue'
import Chat from '~/components/Chat.vue'

export default Vue.extend({
  components: {
    Logo,
    UserList,
    JoinLink,
    Chat,
  },

  data() {
    return {
      link: `${process.env.HOSTNAME}${this.$route.fullPath}`,
    }
  },

  computed: {
    ...mapState('room', {
      connected: 'connected',
    }),
  },

  mounted() {
    const room = this.$route.params.id
    const hash = this.$route.hash
    let encryptionKey = ''
    if (hash.length > 1) {
      encryptionKey = hash.slice(1)
    }

    if (room && encryptionKey) {
      this.connect({ room, encryptionKey })
    }

    window.addEventListener('beforeunload', this.disconnect)
  },

  beforeDestroy() {
    this.disconnect()
  },

  methods: {
    ...mapActions('room', {
      connect: 'connect',
      disconnect: 'disconnect',
    }),
  },
})
</script>
