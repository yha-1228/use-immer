const produce = require('immer')

const state = {
  name: 'Lorem',
  age: 20,
  location: 'Tokyo',
  resume: {
    univ: 'Suwa Rikadai',
    company01: 'icube',
  },
}

const newState = produce(state, (draftState) => {
  draftState.age = 21
})

console.log('state :>> ', state)
console.log('newState :>> ', newState)
