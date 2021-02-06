import './App.css'
import { useEffect, useState } from 'react'
import { getUsers } from './api'
import { Users } from './types'
import { delay } from './utils'
import Box from '@material-ui/core/Box'

type State = {
  users: Users
  isLoaded: boolean
  error: string | null
}

const initialState = {
  users: [],
  isLoaded: false,
  error: null,
}

export default function App() {
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
        console.log(error.message)
      })
  }, [state])

  return (
    <Box p="16px" m="0 auto" maxWidth="960px" bgcolor="#f5f5f5">
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
    </Box>
  )
}
