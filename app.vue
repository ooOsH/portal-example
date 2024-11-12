<template>
  <div class="wrapper">
    <NuxtLoadingIndicator :height="5" color="green" />
    <NuxtPage />
    <UButton
      v-if="env === 'development'"
      type="button"
      variant="outline"
      color="red"
      class="reset-button"
      @click="reset"
    >
      Reset
    </UButton>
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
import { useResetStore } from '@/utils/useResetStore'

useHead({
  htmlAttrs: {
    lang: 'en-GB',
  },
  titleTemplate: (titleChunk) => {
    return titleChunk ? `SO-SURE Portal: ${titleChunk}` : 'SO-SURE Portal'
  },
})

// Get env
const env = useRuntimeConfig().public.ENVIRONMENT

// Reset stores
const resetStore = useResetStore()
const reset = () => {
  resetStore.all()
}
</script>

<style lang="scss">
.wrapper {
  position: relative;
  margin-top: 1rem;
}

.reset-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
