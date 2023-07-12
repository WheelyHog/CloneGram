import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Button from '../Button/Button'
import FormTextArea from '../FormTextArea/FormTextArea'
import Input from '../Input/Input'
import UserCounter from '../UserCounter/UserCounter'
import s from './UserBio.module.css'

const validateText = (text, cb) => {
  if (!text) {
    cb('Field Required!')
    return true
  }

  if (text < 3) {
    cb('Too short text!')
    return true
  }

  if (/\s/g.test(text)) {
    cb('No backspaces!')
    return true
  }
  return false
}

const requiredText = 'Field required'

const validateUrl = (text, cb) => {
  if (!text) {
    cb('Field Required!')
    return true
  }

  if (/^(ftp|http|https):\/\/[^ "]+$/.test(text)) {
    cb('Non-valid link')
    return true
  }
}

export default function UserBio({ avatarUrl, nickname, subscribed, subscribers, firstname, lastname, description, url, isMyPage, isSubscribed, onEdit, formLoading }) {

  const [btnProps, setBtnProps] = useState({ onClick: () => false, children: "Subscribe" })
  const [isEditMode, setIsEditMode] = useState(false)
  const [formUserName, setFormUserName] = useState(nickname)
  const [formFirstName, setFormFirstName] = useState(firstname)
  const [formLastName, setFormLastName] = useState(lastname)
  const [formDescription, setFormDescription] = useState(description)
  const [formUrl, setFormtUrl] = useState(url)
  const [userNameError, setUserNameError] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [urlError, setUrlError] = useState('')


  const onSaveEditForm = useCallback(async () => {

    const isUserNameError = validateText(formUserName, setUserNameError)
    const isFirstNameError = validateText(formFirstName, setFirstNameError)
    const isLastNameError = validateText(formLastName, setFormLastName)
    const isUrlError = validateUrl(formUrl, setUrlError)

    let isErrors = isUserNameError || isFirstNameError || isLastNameError || isUrlError

    if (!formDescription) {
      isErrors = true
      setDescriptionError(requiredText)
      return
    }

    if (isErrors) {
      return
    }

    setIsEditMode(false)

    await onEdit({
      firstname: formFirstName,
      lastname: formLastName,
      nickname: formUserName,
      description: formDescription,
      url: formUrl
    })

  }, [formUserName, formFirstName, formLastName, formUrl, formDescription])

  useEffect(() => {
    if (isMyPage) {
      if (isEditMode) {
        setBtnProps({ onClick: onSaveEditForm, children: "Save", disabled: formLoading })
      } else {
        setBtnProps({ onClick: () => setIsEditMode(true), children: "Edit" })
      }
    } else if (isSubscribed) {
      setBtnProps({ onClick: () => false, children: "Unsubscribe" })
    } else {
      setBtnProps({ onClick: () => false, children: "Subscribe" })
    }
  }, [isMyPage, isSubscribed, isEditMode, onSaveEditForm, formLoading])


  const fields = useMemo(() => {
    if (isEditMode) {
      return {
        username: <Input value={formUserName} onChange={({ target: { value } }) => setFormUserName(value)} errorText='required' className={s.cnInput} />,
        name:
          <>
            <Input value={formFirstName} onChange={({ target: { value } }) => setFormFirstName(value)} className={s.cnInput} errorText={firstNameError} />
            <Input value={formLastName} onChange={({ target: { value } }) => setFormLastName(value)} className={s.cnInput} errorText={lastNameError} />
          </>,
        description: <FormTextArea value={formDescription} onChange={({ target: { value } }) => setFormDescription(value)} className={s.cnInput} errorText={descriptionError} />,
        url: <Input value={formUrl} onChange={({ target: { value } }) => setFormtUrl(value)} errorText={urlError} />
      }
    }
    return {
      username: <span className={s.cnUserBioNickname}>{nickname}</span>,
      name: <span className={s.cnUserBioName}>{firstname} {lastname}</span>,
      description: <span>{description}</span>,
      url: <a href={url}>{url}</a>

    }
  }, [isEditMode, firstname, lastname, description, url, nickname, formFirstName, formLastName, formUserName, formDescription, formUrl, firstNameError, userNameError, descriptionError, urlError])

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
