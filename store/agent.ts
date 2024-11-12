import { defineStore } from 'pinia'

export const useAgent = defineStore('agent', {
  state: () => ({
    agent: {
      agentNo: '',
      agentCompanyName: '',
    },
  }),
  actions: {
    setAgent(value: object) {
      Object.assign(this.agent, value)
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
