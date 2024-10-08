import { muteRes } from '@utils/index'
import { restUsersApi } from '@api/index'

type ProfileData = Omit<User, 'id' | 'avatar'>

export const updProfile = (data: ProfileData) =>
  restUsersApi.put<User>('/profile', data)
export const updAvatar = (data: FormData) =>
  restUsersApi.put<User>('/profile/avatar', data)
export const updPassword = (data: PasswordData) =>
  restUsersApi.put<User>('/password', data).then(muteRes)

export default { updProfile, updAvatar, updPassword }
