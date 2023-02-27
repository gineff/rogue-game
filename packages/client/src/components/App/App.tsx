import { Route, Routes, useNavigate } from 'react-router-dom'
import SignIn from '@pages/SignIn'
import ForumPage from '@pages/ForumPage'
import GamePage from '@pages/GamePage'
import Leaderboard from '@pages/Leaderboard'
import UserProfile from '@pages/UserProfile'
import ServicePage from '@pages/ServicePage'
import SignUp from '@pages/SignUp'
import Main from '@pages/Main'
import ROUTES from '@constants/routes'
import { useEffect } from 'react'
import { useAppDispatch } from '@hooks/redux_typed_hooks'
import { loadUser } from '@store/slices/user'
import { SignInWithOauth } from '@services/oauthController'

function App() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    SignInWithOauth()
      .then(() => dispatch(loadUser()))
      .catch(() => navigate(ROUTES.SERVER_ERROR))
  }, [])
  return (
    <div className="app">
      <Routes>
        <Route path={ROUTES.ROOT} element={<Main />} />
        <Route path={ROUTES.GAME} element={<GamePage />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
        <Route path={ROUTES.LEADERBOARD} element={<Leaderboard />} />
        <Route path={ROUTES.PROFILE} element={<UserProfile />} />
        <Route
          path="*"
          element={
            <ServicePage
              errorCode={404}
              errorText={'Запрошенная страница не найдена'}
            />
          }
        />
        <Route
          path={ROUTES.SERVER_ERROR}
          element={
            <ServicePage
              errorCode={500}
              errorText={'Внутренняя ошибка сервера'}
            />
          }
        />
        <Route path={ROUTES.FORUM} element={<ForumPage />} />
      </Routes>
    </div>
  )
}

export default App
