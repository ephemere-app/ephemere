import * as index from '~/store'

describe('store/index state', () => {
  test('default state', () => {
    expect(index.state()).toStrictEqual(index.defaultState)
  })
})
