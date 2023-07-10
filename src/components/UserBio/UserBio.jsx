import React, { useEffect, useState } from 'react'
import Button from '../Button/Button'
import UserCounter from '../UserCounter/UserCounter'
import s from './UserBio.module.css'

export default function UserBio({ avatarUrl, nickname, subscribed, subscribers, firstname, lastname, description, url, isMyPage, isSubscribed }) {

  const [btnProps, setBtnProps] = useState({ onClick: () => false, children: "Subscribe" })

  useEffect(() => {
    if (isMyPage) {
      setBtnProps({ onClick: () => false, children: "Edit" })
    } else if (isSubscribed) {
      setBtnProps({ onClick: () => false, children: "Unsubscribe" })
    } else {
      setBtnProps({ onClick: () => false, children: "Subscribe" })
    }
  }, [isMyPage, isSubscribed])

  return (
    <div className={s.cnUserBioRoot}>
      <div>
        <img src={avatarUrl} className={s.cnUserBioAvatar} alt='avatar' />
      </div>
      <div className={s.cnUserBioInfo}>
        <div className={s.cnUserBioRow}>
          <span className={s.cnUserBioNickname}>{nickname}</span>
          <Button {...btnProps} />
        </div>
        <div className={s.cnUserBioRow}>
          <UserCounter count={4} text='Publication' className={s.cnUserBioCounter} />
          <UserCounter count={subscribers} text='subscribers' className={s.cnUserBioCounter} />
          <UserCounter count={subscribed} text='subscriptions' />
        </div>
        <div className={s.cnUserBioRow}>
          <span className={s.cnUserBioName}>{firstname} {lastname}</span>
        </div>
        <div className={s.cnUserBioRow}>
          <span>{description}</span>
        </div>
        <a href={url}>{url}</a>
      </div>
    </div>
  )
}
