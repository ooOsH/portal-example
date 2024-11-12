<template>
  <UContainer class="pt-5 pb-28 mx-auto max-w-screen-md">
    <Nav />
    <h2 class="text-xl text-blue-700 font-semibold">Search Address</h2>
    <hr class="my-4" />
    <p class="mb-6">
      Use this tool to find the customers address which will populate the fields
      below, otherwise enter manually.
    </p>
    <UForm
      :schema="addressSearchSchema"
      :state="addressState"
      novalidate
      @submit="submitAddressSearch"
    >
      <UFormGroup
        v-if="!addressState.addressSelectShow"
        label="House/Unit No."
        name="addressNo"
        class="mb-6"
      >
        <UInput v-model.trim="addressState.addressNo" placeholder="eg. 52a" />
      </UFormGroup>
      <UFormGroup
        v-if="!addressState.addressSelectShow"
        label="Postcode (UK only)"
        name="addressPostcode"
        class="mb-6"
      >
        <UInput
          v-model.trim="addressState.addressPostcode"
          placeholder="eg. BX1 1LT"
        />
      </UFormGroup>
      <UFormGroup
        v-if="addressState.addressSelectShow"
        label="Address Results"
        name="addressResultsOptions"
        class="mb-6"
      >
        <USelect
          v-model="addressState.address"
          :loading="!addressState.addressResultsOptions.length"
          :options="addressState.addressResultsOptions"
          option-attribute="name"
          placeholder="Choose your address..."
          @change="selectAddress(addressState.address)"
        />
      </UFormGroup>
      <div class="flex items-center justify-end">
        <UButton
          v-if="!addressState.addressSelectShow"
          type="submit"
          variant="outline"
          size="lg"
          >Find address</UButton
        >
        <UButton
          v-if="addressState.addressSelectShow"
          type="button"
          variant="outline"
          size="lg"
          @click="clearSelectAddress"
          >Search again</UButton
        >
      </div>
    </UForm>
    <h2 class="text-xl text-blue-700 font-semibold mt-8">Customer Address</h2>
    <hr class="my-4" />
    <UForm
      :schema="addressSchema"
      :state="address"
      novalidate
      @submit="submitSection"
    >
      <UFormGroup label="Address" name="line1" class="mb-6">
        <UInput v-model.trim="address.line1" />
      </UFormGroup>
      <UFormGroup label="Address line 2" name="line2" class="mb-6">
        <UInput v-model.trim="address.line2" />
      </UFormGroup>
      <UFormGroup label="City" name="line1" class="mb-6">
        <UInput v-model.trim="address.city" />
      </UFormGroup>
      <UFormGroup label="Postcode (UK only)" name="postcode" class="mb-6">
        <UInput v-model.trim="address.postcode" />
      </UFormGroup>
      <div class="flex items-center justify-between">
        <UButton to="/" type="button" variant="outline" size="lg">
          Back
        </UButton>
        <UButton type="submit" size="lg" color="green">Continue</UButton>
      </div>
    </UForm>
  </UContainer>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui/dist/runtime/types'

// Get router
const router = useRouter()

// Notifications
const toast = useToast()

// Get Loqate Key
const runtimeConfig = useRuntimeConfig().public

// Address Store
const addressStore = useAddress()
const { address } = storeToRefs(useAddress())

// Address search terms
const addressState = reactive({
  addressNo: undefined,
  addressPostcode: undefined,
  addressResultsOptions: [],
  addressSelectShow: false,
  address: undefined,
  addressType: undefined,
})

// Address Schema
const addressSearchSchema = z.object({
  addressType: z.string().optional(),
  addressResultsOptions: z
    .array(z.object({ name: z.string(), value: z.string() }))
    .optional(),
  addressSelectShow: z.boolean(),
  addressNo: z.string().min(1, 'House/Unit No. required'),
  addressPostcode: z
    .string()
    .min(3, 'Postcode required')
    .regex(
      /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/,
      'Please enter a valid postcode',
    ),
})

type AddressSearchSchema = z.output<typeof addressSearchSchema>

const submitAddressSearch = async (
  event: FormSubmitEvent<AddressSearchSchema>,
) => {
  const query = `${event.data.addressNo} ${event.data.addressPostcode}`
  const search: any = await findAddress(query, '', 300)
  event.data.addressType = search.Items[0].Type
  if (
    search.Items.length === 1 &&
    typeof search.Items[0].Error !== 'undefined'
  ) {
    toast.add({
      color: 'red',
      title: 'Something went wrong',
      description: search.Items[0].Description,
    })
  } else if (search.Items.length === 0) {
    toast.add({
      color: 'red',
      title: 'Sorry, there were no result',
    })
  } else if (search.Items.length === 1 && search.Items[0].Type === 'Address') {
    await retrieveAddress(search.Items[0].Id)
  } else {
    Object.entries(search.Items).forEach((result: any) => {
      const results: any = event.data.addressResultsOptions
      results.push({
        name: `${result[1].Text} ${result[1].Description}`,
        value: result[1].Id,
      })
    })
    event.data.addressSelectShow = true
  }
}

const addressSchema = z.object({
  line1: z.string().min(3, 'Address line 1 required'),
  line2: z.string().optional(),
  city: z.string().min(3, 'City required'),
  postcode: z
    .string()
    .min(3, 'Postcode required')
    .regex(
      /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/,
      'Please enter a valid postcode',
    ),
})

type AddressSchema = z.output<typeof addressSchema>

const submitSection = (event: FormSubmitEvent<AddressSchema>) => {
  router.push({ name: 'quote' })
}

// Rest Address
const clearSelectAddress = () => {
  addressState.addressNo = undefined
  addressState.addressPostcode = undefined
  addressState.addressResultsOptions = []
  addressState.addressSelectShow = false
  addressState.address = undefined
  addressState.addressType = undefined
}

// Find Address
const findAddress = async (query: string, container: string, limit = 300) => {
  try {
    const results = await $fetch(
      'https://api.addressy.com/Capture/Interactive/Find/v1.1/json3.ws',
      {
        method: 'post',
        query: {
          IsMiddleware: false,
          Origin: '',
          Countries: 'GBR',
          Limit: limit,
          Language: 'en-gb',
          Key: runtimeConfig.PCA_WEBKEY,
          Text: query,
          Container: container,
        },
      },
    )
    return results
  } catch (error) {
    console.log(error)
    toast.add({
      color: 'red',
      title: 'Something went wrong',
    })
  }
}

// Retrieve address via ID
const retrieveAddress = async (id: string) => {
  try {
    const result: any = await $fetch(
      'https://api.addressy.com/Capture/Interactive/Retrieve/v1.2/json3.ws',
      {
        method: 'POST',
        query: {
          Key: runtimeConfig.PCA_WEBKEY,
          Id: id,
        },
      },
    )
    if (
      result.Items.length === 1 &&
      typeof result.Items[0].error !== 'undefined'
    ) {
      toast.add({
        color: 'red',
        title: 'Something went wrong',
        description: result.Items[0].Description,
      })
    } else if (result.Items.length === 0) {
      toast.add({
        color: 'red',
        title: 'Sorry, there were no result - enter address manually',
      })
    } else {
      let line1 = `${result.Items[0].Line1} ${result.Items[0].Line2}`
      let line2 = result.Items[0].Line3
      if (result.Items[0].Company !== '') {
        line1 = `${result.Items[0].Company}, ${result.Items[0].Line1}`
        line2 = `${result.Items[0].Line2} ${result.Items[0].Line3}`
      }
      const address = {
        id: result.Items[0].Id,
        line1,
        line2,
        city: result.Items[0].City,
        postcode: result.Items[0].PostalCode,
      }
      addressStore.setAddress(address)
    }
  } catch (error) {
    console.log(error)
    toast.add({
      color: 'red',
      title: 'Something went wrong',
    })
  }
}

// Select address
const selectAddress = async (result: any) => {
  console.log(result)
  if (result === null) {
    return false
  } else if (addressState.addressType === 'BuildingName') {
    const retry: any = await findAddress('', result, 300)
    Object.entries(retry.Items).forEach((r: any) => {
      clearSelectAddress()
      const retry: any = addressState.addressResultsOptions
      retry.push({
        name: `${r[1].Text} ${r[1].Description}`,
        value: r[1].Id,
      })
    })
    addressState.addressSelectShow = true
  } else {
    await retrieveAddress(result)
  }
}
</script>
