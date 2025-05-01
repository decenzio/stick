import { describe, expect, it, beforeAll, afterAll, test } from 'vitest'
import { onlyValue, addressOf, unHex } from '../src/mappings/utils/helper'
import { CHAIN } from '../src/environment'

describe('Helpers', () => {
  // let store: SquidStore;

  beforeAll(() => {
    // store = new SquidStore();
  })

  afterAll(() => {})

  describe('onlyValue', () => {
    it('should return a value', () => {
      const value = onlyValue({ __kind: 'HolderOf', value: 1 })
      expect(value).toBe(1)
    })

    it('should not return a value', () => {
      const value = onlyValue({ __kind: 'Issuer' } as any)
      expect(value).toBe(undefined)
    })
  })

  describe('addressOf', () => {
    it('should return a value', () => {
      const value = addressOf('0x30658243d02e18551f0d447dad1065db75b01e570fd47eec86805dbea12a28ed')
      if (CHAIN === 'substrate') {
        expect(value).toBe('5DAAJwGc61jZdkp6oCuLSKtW4sAGU5HVBzJptyk5F8NkRAMT')
      } else if (CHAIN === 'rococo') {
        expect(value).toBe('5DAAJwGc61jZdkp6oCuLSKtW4sAGU5HVBzJptyk5F8NkRAMT')
      } else {
        expect(value).toBe('DfmyFcUiNkVPQdYZuiPLHFWDTSWGk6feN9aHe22ivbFAD6A')
      }
    })

    test('should throw on invalid', () => {
      expect.hasAssertions()
      try {
        addressOf('0x30658243d02e18551f0d447dad1065db75b01e570fd47eec86805dbea12a28e')
      } catch (error) {
        expect(error.message).toMatch('The expression evaluated to a falsy value')
      }
    })
  })

  describe('unHex', () => {
    it('should return a value', () => {
      const value = unHex('0x42525a20546f6b656e')
      expect(value).toBe('BRZ Token')
    })

    test('should throw on invalid', () => {
      // expect.hasAssertions()
      try {
        unHex('0x42525a20546f6b656')
      } catch (error) {
        expect(error.message).toMatch('The expression evaluated to a falsy value')
      }
    })
  })
})
