const immer = require('immer')

const state = {
  name: 'Lorem',
  age: 20,
  location: 'Tokyo',
}

// const newState = immer.produce(state, (draftState) => {
//   draftState.age = 21
// })

const newState = state
state.age = 21

console.log('state :>> ', state)
console.log('newState :>> ', newState)
