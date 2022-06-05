import { it, describe, expect } from 'vitest'
import { Balance } from './balance'

describe('balance', () => {
  it('equalizes one expense between 2 accounts', () => {
    const balance = new Balance({
      account1: [
        {
          cost: 12,
          receivers: ['account1', 'account2']
        }
      ]
    })

    expect(balance.calculate()).toEqual({
      account2: {
        account1: 6
      }
    })
  })

  it('equalizes multiple expenses from one account between 2 accounts', () => {
    const balance = new Balance({
      account1: [
        {
          cost: 12,
          receivers: ['account1', 'account2']
        },
        {
          cost: 10,
          receivers: ['account1', 'account2']
        }
      ]
    })

    expect(balance.calculate()).toEqual({
      account2: {
        account1: 11
      }
    })
  })

  it('equalizes multiple expenses from the 2 accounts', () => {
    const balance = new Balance({
      account1: [
        {
          cost: 12,
          receivers: ['account1', 'account2']
        },
        {
          cost: 10,
          receivers: ['account1', 'account2']
        }
      ],
      account2: [
        {
          cost: 10,
          receivers: ['account1', 'account2']
        }
      ]
    })

    expect(balance.calculate()).toEqual({
      account2: {
        account1: 6
      }
    })
  })
})
