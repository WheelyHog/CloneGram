import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Button from '../Button/Button'
import Input from '../Input/Input'
import UserCounter from '../UserCounter/UserCounter'
import s from './UserBio.module.css'

const validateText = (text) => {
  if (!text) {
    return true
  }

  if (text < 3) {
    return true
  }

  if (/\s/g.test(text)) {
    return true
  }
  return false
}

export default function UserBio({ avatarUrl, nickname, subscribed, subscribers, firstname, lastname, description, url, isMyPage, isSubscribed }) {

  const [btnProps, setBtnProps] = useState({ onClick: () => false, children: "Subscribe" })
  const [isEditMode, setIsEditMode] = useState(false)
  const [formUserName, setFormUserName] = useState(nickname)
  const [formFirstName, setFormFirstName] = useState(firstname)
  const [formLastName, setFormLastName] = useState(lastname)
  const [formDescription, setFormDescription] = useState(description)
  const [formUrl, setFormtUrl] = useState(url)

  const onSaveEditForm = useCallback(() => {
    setIsEditMode(false)

    let isErrors = validateText(formUserName) || validateText(formFirstName) || validateText(formLastName);

    if (!formUrl) {

    }

    if (/^(ftp|http|https):\/\/[^ "]+$/.test(formUrl)) {

    }

    if (!formDescription) {

    }

    if (isErrors) {
      return
    }
    alert('success')
  }, [formUserName])

  useEffect(() => {
    if (isMyPage) {
      if (isEditMode) {
        setBtnProps({ onClick: onSaveEditForm, children: "Save" })
      } else {
        setBtnProps({ onClick: () => setIsEditMode(true), children: "Edit" })
      }
    } else if (isSubscribed) {
      setBtnProps({ onClick: () => false, children: "Unsubscribe" })
    } else {
      setBtnProps({ onClick: () => false, children: "Subscribe" })
    }
  }, [isMyPage, isSubscribed, isEditMode, onSaveEditForm])


  const fields = useMemo(() => {
    if (isEditMode) {
      return {
        username: <Input value={formUserName} onChange={({ target: { value } }) => setFormUserName(value)} errorText='required' className={s.cnInput} />,
        name:
          <>
            <Input value={formFirstName} onChange={({ target: { value } }) => setFormFirstName(value)} className={s.cnInput} errorText='required' />
            <Input value={formLastName} onChange={({ target: { value } }) => setFormLastName(value)} className={s.cnInput} errorText='required' />
          </>,
        description: <textarea value={formDescription} onChange={({ target: { value } }) => setFormDescription(value)} />,
        url: <Input value={formUrl} onChange={({ target: { value } }) => setFormtUrl(value)} />
      }
    }
    return {
      username: <span className={s.cnUserBioNickname}>{nickname}</span>,
      name: <span className={s.cnUserBioName}>{firstname} {lastname}</span>,
      description: <span>{description}</span>,
      url: <a href={url}>{url}</a>

    }
  }, [isEditMode, firstname, lastname, description, url, nickname, formFirstName, formLastName, formUserName, formDescription, formUrl])

  return (
    <div className={s.cnUserBioRoot}>
      <div>
        <img src={avatarUrl} className={s.cnUserBioAvatar} alt='avatar' />
      </div>
      <div className={s.cnUserBioInfo}>
        <div className={s.cnUserBioRow}>
          {fields.username}
          <Button {...btnProps} />
        </div>
        <div className={s.cnUserBioRow}>
          <UserCounter count={4} text='Publication' className={s.cnUserBioCounter} />
          <UserCounter count={subscribers} text='subscribers' className={s.cnUserBioCounter} />
          <UserCounter count={subscribed} text='subscriptions' />
        </div>
        <div className={s.cnUserBioRow}>
          {fields.name}
        </div>
        <div className={s.cnUserBioRow}>
          {fields.description}
        </div>
        {fields.url}
      </div>
    </div>
  )
}
