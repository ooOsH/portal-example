import { defineStore } from 'pinia'
import type { Phone } from '@/types/phone'
import type { PhoneList } from '@/types/phoneList'

// Notifications
const toast = useToast()

// Phone list url
const phoneList = useRuntimeConfig().public.PHONE_LIST_URL

export const useQuote = defineStore('quote', {
  state: () => ({
    quote: {
      productType: '',
      numberOfPhones: '',
      flipPhones: false,
      phones: [] as Phone[],
      id: 0,
      customerCompanyName: '',
      customerBusinessType: false,
      customerFirstName: '',
      customerSurname: '',
      customerEmail: '',
      agentEmail: '',
      customerTelephoneNumber: '',
      phoneList: [] as PhoneList[],
      coverTypePersonal: 'Gold',
      coverTypeBusiness: 'SME',
      policyNo: '',
      policyCreated: false,
      premium: 0,
    },
  }),
  getters: {
    getPhones: (state) => state.quote.phones,
    getPhoneData(state) {
      const phones = state.quote.phoneList.map(
        (phone) => `${phone.make} ${phone.model}`,
      )
      const removeDupes = [...new Set(phones)]
      removeDupes.unshift('Unspecified phone model')
      return removeDupes
    },
  },
  actions: {
    async getPhoneList() {
      try {
        this.quote.phoneList = await $fetch(phoneList)
      } catch (error: any) {
        toast.add({
          color: 'red',
          title: 'Something went wrong',
          description: error.response.data,
        })
        return error
      }
    },
    setPolicyNo(value: string) {
      this.quote.policyNo = value
      this.quote.policyCreated = true
    },
    setPremium(value: number) {
      this.quote.premium = value
    },
    addPhone(name: string, flip: boolean) {
      const phone: Phone = {
        id: this.quote.id++,
        name,
        flipPhone: flip,
      }
      this.quote.phones = [phone, ...this.quote.phones]
    },
    removePhone(id: number) {
      this.quote.phones = this.quote.phones.filter((phone) => phone.id !== id)
    },
    resetBusiness() {
      this.quote.numberOfPhones = ''
      this.quote.flipPhones = false
      this.quote.customerCompanyName = ''
      this.quote.customerBusinessType = false
    },
    resetPersonal() {
      this.quote.phones = []
      this.quote.id = 0
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
