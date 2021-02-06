const usersUrl = 'https://jsonplaceholder.typicode.com/users'

export async function getUsers(): Promise<any> {
  const response = await fetch(usersUrl)
  const json = await response.json()
  return json
}
