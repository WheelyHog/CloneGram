import React, { useEffect } from 'react'
import { Bars } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from '../../pages/MainPage/MainPage'
import NoAccessPage from '../../pages/NoAccessPage/NoAccessPage'
import UserPage from '../../pages/UserPage/UserPage'
import { getAuthorizedUser } from '../../redux/actions/users'
import s from './PageRoutes.module.css'

const authorizedRoutes = [
  { path: '/', element: <MainPage /> },
  { path: '/:id', element: <UserPage /> }
]


export default function PageRoutes() {
  const authorizedUser = useSelector(state => state.users.authorizedUser)
  const isLoading = useSelector(state => state.users.isAuthorizedUserLoading)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthorizedUser())
  }, [dispatch])

  if (isLoading) {
    return (
      <div className={s.cnPageRoutesLoader}>
        <Bars width={80} height={80} color='#000BFF' />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {authorizedUser ? authorizedRoutes.map(route => <Route {...route} key={route.path} />) : <Route path='/' element={<NoAccessPage />} />}
      </Routes>
    </BrowserRouter>
  )
}
