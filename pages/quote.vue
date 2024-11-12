<template>
  <UContainer class="pt-5 pb-28 mx-auto max-w-screen-md">
    <Nav />
    <UForm
      :schema="confirmSchema"
      :state="confirmState"
      novalidate
      @submit="submitQuote"
    >
      <h2 class="text-xl text-blue-700 font-semibold">Summary of Details</h2>
      <hr class="my-4" />
      <div class="grid grid-cols-2 gap-4 quote">
        <div class="quote-detail">
          <strong>First name</strong><br />
          {{ quote.customerFirstName }}
        </div>
        <div class="quote-detail">
          <strong>Surname</strong><br />
          {{ quote.customerSurname }}
        </div>
        <div class="quote-detail">
          <strong>Contact number</strong><br />
          {{ quote.customerTelephoneNumber }}
        </div>
        <div class="quote-detail">
          <strong>Email address</strong><br />
          {{ quote.customerEmail }}
        </div>
        <div class="quote-detail">
          <strong>{{
            quote.productType === 'Business'
              ? 'Registered business address'
              : 'Address'
          }}</strong
          ><br />
          {{ `${addressStore.address.line1},` }}
          {{
            addressStore.address.line2 !== ''
              ? `${addressStore.address.line2},`
              : ''
          }}
          {{ `${addressStore.address.city},` }}
          {{ addressStore.address.postcode }}
        </div>
        <div class="quote-detail">
          <strong>Product type</strong><br />
          {{ quote.productType }}
        </div>
        <div class="quote-detail">
          <strong>Number of phones to insure</strong><br />
          {{
            quote.productType === 'Business'
              ? quote.numberOfPhones
              : quote.phones.length
          }}
        </div>
        <div v-if="quote.productType === 'Business'" class="quote-detail">
          <strong>Any insured phones flip or fold design</strong><br />
          {{ quote.flipPhones ? 'Yes' : 'No' }}
        </div>
        <div class="quote-detail">
          <strong>Excess</strong><br />
          £50 (per device)
        </div>
      </div>
      <UCard v-if="quote.productType === 'Personal'" class="my-6">
        <ul v-if="quote.phones.length">
          <li
            v-for="phone in quote.phones"
            :key="phone.id"
            class="flex items-center justify-between mb-2"
          >
            <span>
              {{ phone.name }} <br />
              <small>Flip Phone: {{ phone.flipPhone ? 'Yes' : 'No' }}</small>
            </span>
          </li>
        </ul>
        <ul v-else>
          <li>No phones have been added...</li>
        </ul>
      </UCard>
      <h2 class="text-xl text-blue-700 font-semibold mt-8">Customer Quote</h2>
      <hr class="my-4" />
      <p v-if="quote.productType === 'Personal'" class="mb-6">
        Please select one of the quoted packages below to proceed.
      </p>
      <div v-if="quote.productType === 'Business'" class="flex mb-8">
        <UCard class="quote-card active">
          <h2 class="text-xl font-bold">Business</h2>
          <p class="mb-4">
            24-72 hour repair or replacement of insured device(s)
          </p>
          <div class="quote-card-price">
            <div class="text-3xl font-bold mb-4">
              £{{ businessRates(quote.numberOfPhones) }}
            </div>
            <UButton variant="solid" color="green" disabled block>
              Selected
            </UButton>
            <UButton
              label="More info"
              block
              color="primary"
              variant="link"
              class="mt-2"
              @click="policyInfo = true"
            />
          </div>
        </UCard>
      </div>
      <div v-if="quote.productType === 'Personal'" class="flex mb-8">
        <UCard class="quote-card mr-4" :class="{ active: coverGold }">
          <h2 class="text-xl font-bold">Personal Gold</h2>
          <p class="mb-4">
            24-72 hour repair or replacement of insured device(s)
          </p>
          <div class="quote-card-price">
            <div class="text-3xl font-bold mb-4">
              £{{ goldRates(quote.phones) }}
            </div>
            <UButton
              :variant="coverGold ? 'solid' : 'outline'"
              :color="coverGold ? 'green' : 'blue'"
              block
              @click="quote.coverTypePersonal = 'Gold'"
            >
              {{ coverGold ? 'Selected' : 'Choose' }}
            </UButton>
            <UButton
              label="More info"
              block
              color="primary"
              variant="link"
              class="mt-2"
              @click="policyInfo = true"
            />
          </div>
        </UCard>
        <UCard class="quote-card" :class="{ active: coverPlatinum }">
          <h2 class="text-xl font-bold">Personal Platinum</h2>
          <p class="mb-4">Immediate replacement of insured device(s)</p>
          <div class="quote-card-price">
            <div class="text-3xl font-bold mb-4">
              £{{ platinumRates(quote.phones.length) }}
            </div>
            <UButton
              :variant="coverPlatinum ? 'solid' : 'outline'"
              :color="coverPlatinum ? 'green' : 'blue'"
              block
              @click="quote.coverTypePersonal = 'Platinum'"
            >
              {{ coverPlatinum ? 'Selected' : 'Choose' }}
            </UButton>
            <UButton
              label="More info"
              block
              color="primary"
              variant="link"
              class="mt-2"
              @click="policyInfo = true"
            />
          </div>
        </UCard>
      </div>
      <h2 class="text-xl text-blue-700 font-semibold mt-8">
        Review Terms with Customer
      </h2>
      <hr class="my-4" />
      <UFormGroup name="checkboxOne" class="mb-6">
        <UCheckbox
          v-model="confirmState.checkboxOne"
          label="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque voluptas facere assumenda fugit atque sunt nobis minima corrupti excepturi voluptate voluptatum at optio nisi, maiores iure quisquam, porro, odio magnam!"
        />
      </UFormGroup>
      <UFormGroup name="checkboxTwo" class="mb-6">
        <UCheckbox
          v-model="confirmState.checkboxTwo"
          label="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque voluptas facere assumenda fugit atque sunt nobis minima corrupti excepturi voluptate voluptatum at optio nisi, maiores iure quisquam, porro, odio magnam!"
        />
      </UFormGroup>
      <UFormGroup name="checkboxThree" class="mb-6">
        <UCheckbox
          v-model="confirmState.checkboxThree"
          label="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque voluptas facere assumenda fugit atque sunt nobis minima corrupti excepturi voluptate voluptatum at optio nisi, maiores iure quisquam, porro, odio magnam!"
        />
      </UFormGroup>
      <UFormGroup name="checkboxFour" class="mb-6">
        <UCheckbox
          v-model="confirmState.checkboxFour"
          label="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque voluptas facere assumenda fugit atque sunt nobis minima corrupti excepturi voluptate voluptatum at optio nisi, maiores iure quisquam, porro, odio magnam!"
        />
      </UFormGroup>
      <div class="flex items-center justify-between">
        <UButton to="/address" type="button" variant="outline" size="lg">
          Back
        </UButton>
        <UButton
          type="submit"
          size="lg"
          color="green"
          :disabled="quote.policyCreated || quote.productType === ''"
          >Create policy</UButton
        >
      </div>
    </UForm>
    <USlideover v-model="policyInfo">
      <div class="p-4 flex-1">
        <h2 class="text-lg text-blue-700 font-semibold mb-6">FAQs</h2>
        <UAccordion :items="faqs" size="xl" variant="outline" />
      </div>
    </USlideover>
  </UContainer>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'
import { useFirestore } from 'vuefire'
import { collection, addDoc } from 'firebase/firestore'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { faqs } from '@/src/faqs'

// Use firestore
const db = useFirestore()

// Get router
const router = useRouter()

// Notifications
const toast = useToast()

// Quote store
const { quote } = storeToRefs(useQuote())
const quoteStore = useQuote()

const coverGold = computed(() => {
  if (quoteStore.quote.coverTypePersonal === 'Gold') return true
})

const coverPlatinum = computed(() => {
  if (quoteStore.quote.coverTypePersonal === 'Platinum') return true
})

// Address store
const addressStore = useAddress()

// Agent store
const agentStore = useAgent()

// Business Rates
const businessRates = (value: string) => {
  // Check business type - return surcharge if true
  if (quoteStore.quote.customerBusinessType === true) {
    const options: any = {
      '0-5': 539,
      '6-10': 972,
      '11-20': 1783,
      '21-30': 2751,
      '31-40': 3725,
      '41-50': 4686,
    }
    return options[value] ?? 'Business Rate does not exist'
  } else {
    const options: any = {
      '0-5': 479,
      '6-10': 864,
      '11-20': 1579,
      '21-30': 2427,
      '31-40': 3281,
      '41-50': 4122,
    }
    return options[value] ?? 'Business Rate does not exist'
  }
}

// Personal Rates
const goldRatesTable = (phone: { name: string; flipPhone: boolean }) => {
  if (phone.flipPhone) return 159
  const options: any = {
    'Apple iPhone 14 Pro Max': 137,
    'Apple iPhone 14 Pro': 137,
    'Apple iPhone 14': 110,
    'Apple iPhone 13 Pro Max': 126,
    'Apple iPhone 13 Pro': 126,
    'Apple iPhone 13': 110,
    'Samsung Galaxy S23 Ultra': 137,
    'Samsung Galaxy S23': 110,
    'Samsung Galaxy S22 Ultra': 126,
    'Samsung Galaxy S22': 110,
    'Google Pixel 7 Pro': 121,
    'Google Pixel 7': 121,
  }
  return options[phone.name] ?? 99
}

const goldRates = (phones: Array<Object>) => {
  let total: any = 0
  phones.forEach((phone: any) => {
    total += goldRatesTable(phone)
  })
  return total
}

const platinumRates = (value: number) => {
  // Check flip type - return surcharge if true
  if (quoteStore.quote.phones.some((phone) => phone.flipPhone === true)) {
    const options: any = {
      1: 252,
      2: 498,
      3: 738,
      4: 979,
      5: 1218,
      6: 1454,
      7: 1688,
      8: 1920,
      9: 2149,
      10: 2376,
    }
    return options[value] ?? 'Platinum Rate does not exist'
  } else {
    const options: any = {
      1: 240,
      2: 474,
      3: 702,
      4: 931,
      5: 1158,
      6: 1382,
      7: 1604,
      8: 1824,
      9: 2041,
      10: 2256,
    }
    return options[value] ?? 'Platinum Rate does not exist'
  }
}

const policyInfo = ref(false)

const confirmState = reactive({
  checkboxOne: undefined,
  checkboxTwo: undefined,
  checkboxThree: undefined,
  checkboxFour: undefined,
})

const confirmSchema = z.object({
  checkboxOne: z.boolean().refine((value) => value === true, {
    message: 'Customer must accept this terms or conditions',
  }),
  checkboxTwo: z.boolean().refine((value) => value === true, {
    message: 'Customer must accept this terms or conditions',
  }),
  checkboxThree: z.boolean().refine((value) => value === true, {
    message: 'Customer must accept this terms or conditions',
  }),
  checkboxFour: z.boolean().refine((value) => value === true, {
    message: 'Customer must accept this terms or conditions',
  }),
})

type ConfirmSchema = z.output<typeof confirmSchema>

const createPolicyNumber = () => {
  const now = Math.floor(Date.now() / 100000)
  const first = quoteStore.quote.customerFirstName.charAt(0).toUpperCase()
  const second = quoteStore.quote.customerSurname.charAt(0).toUpperCase()
  let coverType = quoteStore.quote.coverTypePersonal
    .toLocaleUpperCase()
    .substring(0, 3)
  if (quoteStore.quote.productType === 'Business')
    coverType = quoteStore.quote.coverTypeBusiness
      .toLocaleUpperCase()
      .substring(0, 3)
  const policyNumber = `BD-${first}${second}-${now}-${coverType}`
  return policyNumber
}

// Tracking
let analyticsData
if (quoteStore.quote.productType === 'Business') {
  analyticsData = {
    currency: 'GBP',
    value: businessRates(quoteStore.quote.numberOfPhones),
    items: [
      {
        item_id: quoteStore.quote.productType,
        item_name: quoteStore.quote.coverTypeBusiness,
        item_brand: 'SO-SURE',
        item_category: 'BD Mobile',
        item_variant: quoteStore.quote.productType,
        price: businessRates(quoteStore.quote.numberOfPhones),
        quantity: 1,
      },
    ],
  }
} else {
  const total =
    goldRates(quoteStore.quote.phones) +
    platinumRates(quoteStore.quote.phones.length)
  analyticsData = {
    currency: 'GBP',
    value: total,
    items: [
      {
        item_id: quoteStore.quote.productType,
        item_name: 'Gold',
        item_brand: 'SO-SURE',
        item_category: 'BD Mobile',
        item_variant: quoteStore.quote.productType,
        price: goldRates(quoteStore.quote.phones),
        quantity: 1,
      },
      {
        item_id: quoteStore.quote.productType,
        item_name: 'Platinum',
        item_brand: 'SO-SURE',
        item_category: 'BD Mobile',
        item_variant: quoteStore.quote.productType,
        price: platinumRates(quoteStore.quote.phones.length),
        quantity: 1,
      },
    ],
  }
}
const analytics = getAnalytics()
logEvent(analytics, 'view_item', analyticsData)
// End Tracking

const getCurrentDate = () => {
  const date = new Date()
  return date.toISOString()
}

const getEndDate = () => {
  const date = new Date()
  date.setFullYear(date.getFullYear() + 1)
  date.setHours(0, 0, 0, 0)
  return date.toISOString()
}

// const submitQuote = async () => {
const submitQuote = async (event: FormSubmitEvent<ConfirmSchema>) => {
  const policyNumber = createPolicyNumber()
  const dateCreated = getCurrentDate()
  const endDate = getEndDate()
  let coverType = quoteStore.quote.coverTypePersonal
  let numberOfPhones = 'N/A'
  let flipPhones = 'N/A'
  let phones = quoteStore.quote.phones
  let customerCompanyName = 'N/A'
  let customerBusinessType = 'N/A'
  let premium
  if (quoteStore.quote.coverTypePersonal === 'Gold') {
    premium = goldRates(quoteStore.quote.phones)
  } else if (quoteStore.quote.coverTypePersonal === 'Platinum') {
    premium = platinumRates(quoteStore.quote.phones.length)
  }
  if (quoteStore.quote.productType === 'Business') {
    coverType = quoteStore.quote.coverTypeBusiness
    numberOfPhones = quoteStore.quote.numberOfPhones
    flipPhones = quoteStore.quote.flipPhones ? 'Yes' : 'No'
    phones = []
    customerCompanyName = quoteStore.quote.customerCompanyName
    customerBusinessType = quoteStore.quote.customerBusinessType ? 'Yes' : 'No'
    premium = businessRates(quoteStore.quote.numberOfPhones)
  }
  const quoteData = {
    dateCreated,
    endDate,
    brokerNo: agentStore.agent.agentNo,
    brokerName: agentStore.agent.agentCompanyName,
    brokerEmail: quoteStore.quote.agentEmail,
    policyNumber,
    productType: quoteStore.quote.productType,
    numberOfPhones,
    flipPhones,
    phones,
    customerCompanyName,
    customerBusinessType,
    customerFirstName: quoteStore.quote.customerFirstName,
    customerSurname: quoteStore.quote.customerSurname,
    customerEmail: quoteStore.quote.customerEmail,
    customerTelephoneNumber: quoteStore.quote.customerTelephoneNumber.replace(
      /^0+/,
      '+44',
    ),
    coverType,
    address: addressStore.address,
    premium,
  }
  try {
    await addDoc(collection(db, 'policies'), quoteData)
    quoteStore.setPolicyNo(quoteData.policyNumber)
    quoteStore.setPremium(premium)
    toast.add({
      color: 'green',
      title: 'Policy created',
      description: `${quoteData.policyNumber}`,
    })
    router.push({ name: 'confirm' })
  } catch (error: any) {
    toast.add({
      color: 'red',
      title: 'Something went wrong',
      description: error.response.description,
    })
    throw showError({
      statusCode: 404,
      fatal: true,
      message: 'No agent code provided or not found',
    })
  }
}
</script>

<style lang="scss">
.quote {
  &-card {
    text-align: center;
    width: 15rem;

    &.active {
      outline: 2px solid rgb(59 130 246);
    }

    > div {
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    &-price {
      margin-top: auto;
    }
  }
}
</style>
