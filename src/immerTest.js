const produce = require('immer')

const state = {
  name: 'Lorem',
  age: 20,
  location: 'Tokyo',
}

const newState = produce(state, (draftState) => {
  draftState.age = 21
})

console.log('state :>> ', state)
console.log('newState :>> ', newState)
