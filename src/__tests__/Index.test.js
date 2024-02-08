import {expect, jest, test} from '@jest/globals'


import index from '../components/App/index'
import zafMock from '../../__mocks__/zafMock'
jest.mock('../../__mocks__/zafMock')


test('Ellie knows how to write a test', () => {
  expect(true)
})