<template>
  <b-field class="py-3">
    <b-input
      v-model="newMessage"
      :placeholder="$t('chat.newMessage')"
      type="text"
      icon-pack="fas"
      icon="paper-plane"
      expanded
      @keyup.native.enter="send"
    />
    <p class="control">
      <button
        class="button is-primary"
        :disabled="newMessage.length === 0"
        @click="send"
      >
        {{ $t('chat.send') }}
      </button>
    </p>
  </b-field>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  data() {
    return {
      newMessage: '',
    }
  },

  methods: {
    ...mapActions('room', {
      sendChatMessage: 'sendChatMessage',
    }),

    send(): void {
      if (this.newMessage !== '') {
        this.sendChatMessage(this.newMessage)
        this.newMessage = ''
      }
    },
  },
})
</script>
