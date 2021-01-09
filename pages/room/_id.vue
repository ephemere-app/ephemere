<template>
  <div>
    <div class="columns px-3">
      <div class="column is-3 has-background-light">
        <logo :size="64" class="mt-5" />
        <br />
        <user-list />
      </div>

      <div class="column is-6">
        <div class="hero is-fullheight">
          <div class="hero-head">
            <join-link v-model="link" />
          </div>

          <div class="hero-body is-align-items-flex-start scrollable">
            <messages />
          </div>

          <div class="hero-foot">
            <chat />
          </div>
        </div>
      </div>
    </div>

    <b-loading :is-full-page="true" :active="!connected" :can-cancel="false" />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import Logo from '~/components/Logo.vue'
import UserList from '~/components/UserList.vue'
import JoinLink from '~/components/JoinLink.vue'
import Messages from '~/components/Messages.vue'
import Chat from '~/components/Chat.vue'

export default Vue.extend({
  components: {
    Logo,
    UserList,
    JoinLink,
    Messages,
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

<style scoped>
.scrollable {
  overflow: hidden scroll;
  height: 0;
}
</style>
