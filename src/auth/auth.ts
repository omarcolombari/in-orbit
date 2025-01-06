import Cookies from 'universal-cookie'

export function isAuthenticated() {
  const cookies = new Cookies()

  return !!cookies.get('in-orbit.token')
}
