import React from 'react'
import s from './Input.module.css'
import cn from 'classnames'

export default function Input({ errorText, className, ...restProps }) {
  return (
    <div className={cn(s.cnInputRoot, className)}>
      <input {...restProps} className={cn(s.cnInputItem, errorText && s.cnInputWithError)} />
      {errorText && <span className={s.cnInputError}>{errorText}</span>}
    </div>

  )
}
