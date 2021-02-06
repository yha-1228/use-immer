// import produce from 'immer'
const immer = require('immer')

const baseState = [
  {
    todo: 'Learn typescript',
    done: true,
  },
  {
    todo: 'Try immer',
    done: false,
  },
]

const nextState = immer.produce(baseState, (draftState) => {
  draftState.push({ todo: 'Tweet about it' })
  draftState[1].done = true
})

console.log('nextState :>> ', nextState)
