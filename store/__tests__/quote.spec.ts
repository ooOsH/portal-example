// @vitest-environment nuxt

import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useQuote } from '../quote'

describe('Quote Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('add phone and remove phone', () => {
    const quoteStore = useQuote()
    expect(quoteStore.quote.phones).toEqual([])
    quoteStore.addPhone('Apple iPhone 11', false)
    expect(quoteStore.quote.phones).toHaveLength(1)
    quoteStore.removePhone(0)
    expect(quoteStore.quote.phones).toEqual([])
  })

  it('sets policy number', () => {
    const quoteStore = useQuote()
    expect(quoteStore.quote.policyNo).toEqual('')
    quoteStore.setPolicyNo('BD-NW-16988533-GOL')
    expect(quoteStore.quote.policyNo).toEqual('BD-NW-16988533-GOL')
    expect(quoteStore.quote.policyCreated).toBeTruthy()
  })

  it('gets phone list from v1', async () => {
    const quoteStore = useQuote()
    expect(quoteStore.quote.phoneList).toEqual([])
    await quoteStore.getPhoneList()
    const phoneList = quoteStore.quote.phoneList.length
    expect(quoteStore.quote.phoneList).toHaveLength(phoneList)
  })
})
