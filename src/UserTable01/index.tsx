import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import { getUsers } from '../api'
import { Users } from '../types'
import { delay } from '../utils'
import CircularProgress from '@material-ui/core/CircularProgress'

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

export default function UserTable01() {
  const [state, setState] = useState<State>(initialState)

  useEffect(() => {
    getUsers()
      .then(async (result) => {
        await delay(800)
        setState({
          ...state,
          isLoaded: true,
          users: result,
        })
      })
      .catch((error) => {
        setState({
          ...state,
          error: error,
        })
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
