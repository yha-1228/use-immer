import React, { useEffect, useState } from 'react'
import produce from 'immer'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import { getUsers } from '../api'
import { Users } from '../types'
import { delay } from '../utils'

type State = {
  users: Users
  isLoaded: boolean
  error: any
}

const initialState = {
  users: [],
  isLoaded: false,
  error: null,
}

export default function UserTable02() {
  const [state, setState] = useState<State>(initialState)

  useEffect(() => {
    getUsers()
      .then(async (result) => {
        await delay(800)
        setState(
          produce(state, (draftState) => {
            draftState.isLoaded = true
            draftState.users = result
          })
        )
      })
      .catch((error) => {
        setState(
          produce(state, (draftState) => {
            draftState.error = error
          })
        )
      })
  }, [state])

  const renderByState = (state: State) => {
    if (state.error) {
      return <div>{state.error.message}</div>
    } else if (!state.isLoaded) {
      return (
        <Box textAlign="center" py="48px">
          <CircularProgress />
        </Box>
      )
    } else {
      return (
        <table>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {state.users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
  }

  return (
    <Box p="16px" m="0 auto" maxWidth="720px" bgcolor="#f5f5f5">
      {renderByState(state)}
    </Box>
  )
}
