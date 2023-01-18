import authApi from '@api/authApi'
import { apiErrorHandler } from '@utils/errorsHandling'

export function signUpUser(data: SignupData) {
  return (
    authApi
      .signUp(data)
      // TODO use connected-react-router for nav to /
      // .then(() =>
      // {
      // })
      .catch(error => apiErrorHandler(error))
  )
}
export function signInUser(data: SigninData) {
  return (
    authApi
      .signIn(data)
      // TODO use connected-react-router for nav to /
      // .then(() =>
      // {
      // })
      .catch(error => apiErrorHandler(error))
  )
}
export function defineUser() {
  console.log('define user called')
  return authApi
    .getUser()
    .then(result => result)
    .catch(error => apiErrorHandler(error))
}
export function logout() {
  return (
    authApi
      .logout()
      // TODO use connected-react-router for nav to /sign-in
      // .then(() =>
      // {
      // })
      .catch(error => apiErrorHandler(error))
  )
}
