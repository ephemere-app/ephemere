<template>
  <b-field :label="$t('join.share')">
    <p class="control">
      <b-tooltip :label="$t('join.secureLink')" type="is-dark">
        <span class="button is-static">
          <b-icon pack="fas" icon="shield-alt" type="is-success" />
        </span>
      </b-tooltip>
    </p>
    <b-input :value="value" type="text" readonly expanded />
    <p class="control">
      <b-button
        icon-pack="fas"
        icon-left="share-alt"
        @click="copyLinkClipboard"
      />
    </p>
  </b-field>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: String,
      required: true,
    },
  },

  methods: {
    async copyLinkClipboard(): Promise<void> {
      await this.$copyText(this.value)
      this.$buefy.toast.open({
        duration: 2000,
        position: 'is-top',
        message: this.$t('join.linkCopied') as string,
        type: 'is-success',
      })
      this.$emit('clipboard-link', this.value)
    },
  },
})
</script>
