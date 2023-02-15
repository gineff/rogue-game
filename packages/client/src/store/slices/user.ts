import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { defineUser } from '@services/authController'
import { getFile } from '@api/resourceApi'
import { LoadingStatus, Logged, userInitialState } from '@constants/user'
import type { UserSlice } from '@constants/user'

/**
 * This will generate three action creators and action types:
 * loadUser.pending: user/loadUser/pending
 * loadUser.fulfilled: user/loadUser/fulfilled
 * loadUser.rejected: user/loadUser/rejected
 *
 * ! use them in createSlice's extraReducers option
 */
export const loadUser = createAsyncThunk('user/loadUser', async () => {
  const userByCookie = await defineUser()
  return userByCookie
})

const prepareUserData = (userData: UserSlice['data']) => ({
  ...userData,
  avatar:
    userData.avatar !== null
      ? getFile(userData.avatar)
      : userInitialState.data.avatar,
  display_name: userData.display_name || '',
})

const slicer = (initState: UserSlice) =>
  createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
      setUser(state, action: PayloadAction<UserSlice['data']>) {
        const user = action.payload
        state.data = prepareUserData(user)
      },
      clearUser() {
        return { ...initState, loadingStatus: LoadingStatus.Failed }
      },
    },
    extraReducers: builder => {
      builder
        .addCase(loadUser.pending, state => {
          state.loadingStatus = LoadingStatus.Loading
          state.loginStatus = Logged.Out
        })
        .addCase(loadUser.rejected, state => {
          state.loadingStatus = LoadingStatus.Failed
          state.loginStatus = Logged.Out
          state.data = initState.data
        })
        .addCase(loadUser.fulfilled, (state, action) => {
          state.loadingStatus = LoadingStatus.Succeeded
          const user = action.payload
          state.data = prepareUserData(user)
          state.loginStatus = Logged.In
          // state.loadingStatus = LoadingStatus.Idle
        })
    },
  })

const generateSlice = (initState: UserSlice) => slicer(initState).reducer

const userSlice = slicer(userInitialState)

export const { clearUser, setUser } = userSlice.actions

export default generateSlice

export { LoadingStatus, Logged }
