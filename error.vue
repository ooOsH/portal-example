<template>
  <UContainer
    class="pt-5 pb-28 mx-auto max-w-screen-md flex items-center justify-center min-h-screen"
  >
    <div class="error">
      <h2 class="text-2xl text-blue-500 font-semibold mb-2">
        {{ error.statusCode }}: {{ error.message }}
      </h2>
      <p class="mb-6">
        Please contact
        <NuxtLink to="mailto:tech@so-sure.com" class="underline">
          tech@so-sure.com
        </NuxtLink>
        for support
      </p>
    </div>
  </UContainer>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    default: () => {},
  },
})
</script>

<style lang="scss">
.error {
  text-align: center;
}
</style>
