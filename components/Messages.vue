<template>
  <div>
    <article
      v-for="(m, i) in messages"
      :key="i"
      :data-message="`message-${i}`"
      class="media"
    >
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ m.username }}</strong>
            <small>{{ $d(new Date(m.datetime), 'long') }}</small>
            <br />
            <span>{{ m.content }}</span>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  computed: {
    ...mapState('room', {
      messages: 'chatMessages',
    }),
  },
})
</script>
