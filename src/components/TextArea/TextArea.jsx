import React from 'react'
import Button from '../Button/Button'
import s from './TextArea.module.css'

export default function TextArea({ value, onChange, placeholder, isLoading, onSubmit, buttonText }) {
  return (
    <div className={s.cnTextareaWrapper}>
      <textarea className={s.cnTextArea} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
      <Button className={s.cnSendButton} onClick={onSubmit} disabled={isLoading}>{buttonText}</Button>
    </div>

  )
}
