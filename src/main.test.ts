import { describe, expect, it } from 'vitest'
import { main } from './main'

describe('main', () => {
  it('welcomes you', () => {
    expect(main()).toEqual('Oi package')
  })
})
