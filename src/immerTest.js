// import produce from 'immer'
const immer = require('immer')

const state = [
  {
    todo: 'Learn typescript',
    done: true,
  },
  {
    todo: 'Try immer',
    done: false,
  },
]

const newState = immer.produce(state, (draftState) => {
  draftState.push({ todo: 'Tweet about it' })
  draftState[1].done = true
})

console.log('newState :>> ', newState)
