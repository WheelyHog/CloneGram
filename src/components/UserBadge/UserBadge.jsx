import React from 'react'
import { useNavigate } from 'react-router-dom'
import s from './UserBadge.module.css'

export default function UserBadge({ nickname, avatarUrl, id }) {

  const navigate = useNavigate()
  const onUserBadgeClick = () => {
    navigate(`/${id}`)
  }

  return (
    <div className={s.cnUserBadgeRoot} onClick={onUserBadgeClick}>
      {avatarUrl ? <img src={avatarUrl} alt='logo' className={s.cnUserBadgeAvatar} /> : <div className={s.cnUserBadgePlaceholder}></div>}
      <span className={s.cnUserBadgeName}>{nickname}</span>
    </div>
  )
}
