import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAddress } from '../address'

describe('Address Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('address can be set', () => {
    const addressStore = useAddress()
    const addressState = {
      id: '',
      line1: '',
      line2: '',
      city: '',
      postcode: '',
    }
    expect(addressStore.address).toEqual(addressState)
    const address = {
      id: 'GB|RM|A|19208788',
      line1: '10 Elm Grove ',
      line2: '',
      city: 'Southsea',
      postcode: 'PO5 1JG',
    }
    addressStore.setAddress(address)
    expect(addressStore.address).toEqual(address)
  })
})
