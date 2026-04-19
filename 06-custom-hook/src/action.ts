export function doLogin(userName: string, password: string) {
  if (userName && password) {
    return true
  }
  return false
}
