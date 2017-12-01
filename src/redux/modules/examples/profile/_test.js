// @flow
import reducer from './reducer'
import initialState from './initialState'

it('reducer profile returns initialState by default', () => {

  const expected = initialState
  const actual = reducer(expected, {
    type: 'SOME_UNKNOWN_ACTION',
    payload: {},
  })

  expect(actual).toEqual(expected)

})


it('reducer profile.initialState has expected properties', () => {

  expect(initialState).toMatchSnapshot()

})
