import React from 'react'
import cn from 'classnames'
import s from './FormTextArea.module.css'

export default function FormTextArea({ className, errorText, ...restProps }) {
  return (
    <div className={cn(s.cnInput, className)}>
      <textarea {...restProps} className={cn(s.cnFormTextAreaRoot, errorText && s.cnFormTextAreaWithError)} />
      <span className={s.cnInputError}>{errorText}</span>
    </div>

  )
}
