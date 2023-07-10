import React from 'react'
import { NavLink } from 'react-router-dom'
import UserBadge from '../UserBadge/UserBadge'
import s from './Navbar.module.css'

export default function Navbar({ nickname, avatarUrl, id }) {
  return (
    <div className={s.cnNavbarRoot}>
      <div className={s.cnNavbarWrapper}>
        <NavLink to={'/'} className={s.cnNavbarLink}>CloneGram</NavLink>
        <UserBadge nickname={nickname} avatarUrl={avatarUrl} id={id} />
      </div>
    </div>
  )
}
