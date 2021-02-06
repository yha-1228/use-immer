import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { getUsers } from './api';
import { Users } from './types';

type State = {
  users: Users;
  isLoaded: boolean;
  error: string | null;
};

const initialState = {
  users: [],
  isLoaded: false,
  error: null,
};

export default function App() {
  const [state, setState] = useState<State>(initialState);

  const loadUsers = useCallback(() => {
    getUsers().then((result) => {
      setState({
        ...state,
        isLoaded: true,
        users: result,
      });
    });
  }, [state]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <div>
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
    </div>
  );
}
