<template>
  <UContainer class="pt-5 pb-28 mx-auto max-w-screen-md">
    <Nav />
    <UForm
      :schema="quoteSchema"
      :state="quote"
      novalidate
      @submit="submitSection"
    >
      <h2 class="text-xl text-blue-700 font-semibold">Broker Details</h2>
      <hr class="my-4" />
      <UFormGroup label="Agent No." name="agentNo" class="mb-6">
        <UInput v-model="agent.agentNo" disabled />
      </UFormGroup>
      <UFormGroup
        label="Agent Company Name"
        name="agentCompanyName"
        class="mb-6"
      >
        <UInput v-model="agent.agentCompanyName" disabled />
      </UFormGroup>
      <UFormGroup label="Agent Email" name="agentEmail" class="mb-6">
        <UInput v-model.trim="quote.agentEmail" type="email" />
      </UFormGroup>
      <h2 class="text-xl text-blue-700 font-semibold mt-8">Product Details</h2>
      <hr class="my-4" />
      <p class="mb-6">
        Please select a product type below and complete all of the following
        fields.
      </p>
      <UFormGroup label="Product type" name="productType" class="mb-6">
        <USelect
          v-model="quote.productType"
          :options="['Personal', 'Business']"
          placeholder="Choose an option..."
          @change="resetQuote"
        />
      </UFormGroup>
      <UFormGroup
        v-if="quote.productType === 'Business'"
        label="Number of insured phones"
        name="numberOfPhones"
        class="mb-6"
      >
        <USelect
          v-model="quote.numberOfPhones"
          :options="['0-5', '6-10', '11-20', '21-30', '31-40', '41-50']"
          placeholder="Choose an option..."
          option-attribute="name"
        />
      </UFormGroup>
      <UFormGroup
        v-if="quote.productType === 'Business'"
        label="Do any of the insured phones have a flip or fold design?"
        name="flipPhones"
        class="mb-6"
      >
        <div class="flex gap-4">
          <URadio
            v-model="quote.flipPhones"
            label="Yes"
            name="flipPhones"
            :value="true"
          />
          <URadio
            v-model="quote.flipPhones"
            label="No"
            name="flipPhones"
            :value="false"
          />
        </div>
      </UFormGroup>
      <div v-if="quote.productType === 'Personal'" class="mb-6">
        <UFormGroup
          label="Phone List"
          name="phoneList"
          help="Select a phone from the list above and click 'Add phone' below to add to the quote. If phone is not in the list select 'Unspecified phone model. Double check with the customer if the device is of a flip or folding phone'."
          class="mb-6"
        >
          <USelect
            v-model="phoneType"
            :loading="!quoteStore.getPhoneData.length"
            :options="quoteStore.getPhoneData"
            placeholder="Choose an option..."
            option-attribute="name"
          />
        </UFormGroup>
        <UFormGroup
          label="Does the specified phone model above have a flip or fold design?"
          name="flipPhonesPersonal"
          class="mb-6"
        >
          <div class="flex gap-4 mt-2">
            <URadio
              v-model="phoneTypeFlip"
              label="Yes"
              name="flipPhonesPersonal"
              :value="true"
            />
            <URadio
              v-model="phoneTypeFlip"
              label="No"
              name="flipPhonesPersonal"
              :value="false"
            />
          </div>
        </UFormGroup>
        <UButton
          icon="i-heroicons-plus-circle"
          type="button"
          variant="outline"
          @click="addPhone"
        >
          Add phone
        </UButton>
        <UCard class="my-6">
          <template #header>
            <div class="font-bold">
              {{
                quote.phones.length ? `${quote.phones.length} Phones` : 'Phone'
              }}
              to quote
            </div>
          </template>
          <ul v-if="quote.phones.length">
            <li
              v-for="phone in quote.phones"
              :key="phone.id"
              class="flex items-center justify-between mb-2"
            >
              <span>
                {{ phone.name }}<br />
                <small>Flip Phone: {{ phone.flipPhone ? 'Yes' : 'No' }}</small>
              </span>
              <UButton
                icon="i-heroicons-minus-circle"
                type="button"
                color="red"
                variant="outline"
                size="xs"
                @click="quoteStore.removePhone(phone.id)"
              >
                Remove
              </UButton>
            </li>
          </ul>
          <ul v-else>
            <li>No phones have been added...</li>
          </ul>
        </UCard>
      </div>
      <h2 class="text-xl text-blue-700 font-semibold mt-8">Customer Details</h2>
      <hr class="my-4" />
      <p class="mb-6">
        {{
          quote.productType === 'Business'
            ? 'Please complete all of the below fields. The registered address of the business is required.'
            : 'Please complete all of the below fields.'
        }}
      </p>
      <UFormGroup
        v-if="quote.productType === 'Business'"
        label="Company name"
        name="customerCompanyName"
        class="mb-6"
      >
        <UInput v-model.trim="quote.customerCompanyName" />
      </UFormGroup>
      <UFormGroup
        v-if="quote.productType === 'Business'"
        label="Does the business operate in the construction, infrastructure or hospitality sector?"
        name="customerBusinessType"
        class="mb-6"
      >
        <div class="flex gap-4">
          <URadio
            v-model="quote.customerBusinessType"
            label="Yes"
            name="customerBusinessType"
            :value="true"
          />
          <URadio
            v-model="quote.customerBusinessType"
            label="No"
            name="customerBusinessType"
            :value="false"
          />
        </div>
      </UFormGroup>
      <UFormGroup label="First name" name="customerFirstName" class="mb-6">
        <UInput v-model.trim="quote.customerFirstName" />
      </UFormGroup>
      <UFormGroup label="Surname" name="customerSurname" class="mb-6">
        <UInput v-model.trim="quote.customerSurname" />
      </UFormGroup>
      <UFormGroup label="Email" name="customerEmail" class="mb-6">
        <UInput v-model.trim="quote.customerEmail" type="email" />
      </UFormGroup>
      <UFormGroup
        label="Contact number"
        name="customerTelephoneNumber"
        class="mb-6"
      >
        <UInput v-model.trim="quote.customerTelephoneNumber" type="tel" />
      </UFormGroup>
      <div class="flex items-center justify-end">
        <UButton type="submit" size="lg" color="green">Continue</UButton>
      </div>
    </UForm>
  </UContainer>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

definePageMeta({
  middleware: ['agent'],
})

// Quote store
onMounted(() => {
  quoteStore.getPhoneList()
})

// Get router
const router = useRouter()

// Agent store
const { agent } = useAgent()

// Quote store
const { quote } = storeToRefs(useQuote())
const quoteStore = useQuote()

// Adding phones
const phoneType = ref()
const phoneTypeFlip = ref(false)

const addPhone = () => {
  if (phoneType.value === undefined) return false
  quoteStore.addPhone(phoneType.value, phoneTypeFlip.value)
  phoneType.value = undefined
  phoneTypeFlip.value = false
}

const resetQuote = () => {
  if (quoteStore.quote.productType === '') return
  quoteStore.resetBusiness()
  quoteStore.resetPersonal()
}

// Quote schema
const defaultProps = z.object({
  agentEmail: z
    .string()
    .min(4, 'Email required')
    .email('Invalid email address'),
  productType: z.string().min(3, 'Product type required'),
  customerFirstName: z.string().min(3, 'Customer first name required'),
  customerSurname: z.string().min(3, 'Customer surname required'),
  customerTelephoneNumber: z
    .string()
    .min(11, 'Customer telephone number required')
    .regex(
      /^(?:07|\+?44)(?:\d\s?){9,10}$/,
      'Please enter a valid telephone number',
    ),
  customerEmail: z
    .string()
    .min(4, 'Email required')
    .email('Invalid email address'),
})

// Quote schema - Business
const businessSchema = z.object({
  productType: z.literal('Business'),
  numberOfPhones: z.string().min(3, 'Number of phones required'),
  flipPhones: z.boolean(),
  customerCompanyName: z.string().min(3, 'Company name required'),
  customerBusinessType: z.boolean(),
})

// Quote schema - Personal
const personalSchema = z.object({
  productType: z.literal('Personal'),
})

// Quote schema - Set conditional based of product type
const conditionalSchema = z.discriminatedUnion(
  'productType',
  [businessSchema, personalSchema],
  {
    errorMap: () => ({ message: 'Product type is required' }),
  },
)
const quoteSchema = z.intersection(conditionalSchema, defaultProps)

type QuoteSchema = z.output<typeof quoteSchema>

const submitSection = (event: FormSubmitEvent<QuoteSchema>) => {
  router.push({ name: 'address' })
}
</script>
