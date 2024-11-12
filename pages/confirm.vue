<template>
  <UContainer class="pt-5 pb-28 mx-auto max-w-screen-md">
    <Nav />
    <h2 class="text-xl text-blue-700 font-semibold">Policy Created</h2>
    <hr class="my-4" />
    <p class="mb-6">
      Thank you, please let the customer know we will be in touch with the
      customer to send over their important documents.
    </p>
    <p class="mb-6">
      Their policy number for reference is:
      <strong>{{ quoteStore.quote.policyNo }}</strong>
    </p>
    <UButton type="button" color="green" size="lg" @click="exit">
      Finish
    </UButton>
  </UContainer>
</template>

<script setup lang="ts">
import { getAnalytics, logEvent } from 'firebase/analytics'

// Get router
const router = useRouter()

// Quote store
const quoteStore = useQuote()

// Agent store
const agentStore = useAgent()

// Address store
const addressStore = useAddress()

// Tracking
const analyticsData = {
  currency: 'GBP',
  transaction_id: quoteStore.quote.policyNo,
  value: quoteStore.quote.premium,
  affiliation: `Broker Direct - ${agentStore.agent.agentCompanyName}`,
  tax: 0,
  items: [
    {
      item_id: quoteStore.quote.productType,
      item_name:
        quoteStore.quote.productType === 'Business'
          ? quoteStore.quote.coverTypeBusiness
          : quoteStore.quote.coverTypePersonal,
      item_brand: 'SO-SURE',
      item_category: 'BD Mobile',
      item_variant: quoteStore.quote.productType,
      price: quoteStore.quote.premium,
      quantity: 1,
    },
  ],
}
const analytics = getAnalytics()
logEvent(analytics, 'purchase', analyticsData)
// End Tracking

const exit = () => {
  quoteStore.$reset()
  addressStore.$reset()
  router.push({ name: 'index' })
}
</script>
