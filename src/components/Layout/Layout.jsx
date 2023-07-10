import React from 'react'
import Navbar from '../Navbar/Navbar'
import s from './Layout.module.css'

export default function Layout({ nickname, avatarUrl, id, children }) {
  return (
    <div className={s.cnLayoutRoot}>
      <div className={s.navbar}>
        <Navbar nickname={nickname} avatarUrl={avatarUrl} id={id} />
      </div>
      <div className={s.cnLayoutBody}>
        {children}
      </div>
    </div>
  )
}
