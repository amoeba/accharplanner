import { expect, it } from 'vitest'
import { valuesMatchIndicies } from '../utils/helpers'

it('valuesMatchIndicies works as expected', () => {
  expect(valuesMatchIndicies([])).toBe(true)
  expect(valuesMatchIndicies([0])).toBe(true)
  expect(valuesMatchIndicies([0, 1, 2])).toBe(true)
  expect(valuesMatchIndicies([-1, 0])).toBe(false)
  expect(valuesMatchIndicies([2, 1])).toBe(false)
})
