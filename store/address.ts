import { defineStore } from 'pinia'

export const useAddress = defineStore('address', {
  state: () => ({
    address: {
      id: '',
      line1: '',
      line2: '',
      city: '',
      postcode: '',
    },
  }),
  actions: {
    setAddress(value: object) {
      Object.assign(this.address, value)
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
