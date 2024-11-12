import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAgent } from '../agent'

describe('Agent Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('agent can be set', () => {
    const agentStore = useAgent()
    const agentState = {
      agentNo: '',
      agentCompanyName: '',
    }
    expect(agentStore.agent).toEqual(agentState)
    const agent = {
      agentNo: '12345',
      agentCompanyName: 'A Broker Company',
    }
    agentStore.setAgent(agent)
    expect(agentStore.agent).toEqual(agent)
  })
})
