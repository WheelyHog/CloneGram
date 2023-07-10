import React from 'react'
import s from './Button.module.css'
import cn from 'classnames'

export default function Button(props) {
  return (
    <button {...props} className={cn(s.cnButton, props.className)} />
  )
}
