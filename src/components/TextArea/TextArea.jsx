import React from 'react'
import s from './TextArea.module.css'

export default function TextArea({ value, setValue, ...restProps }) {
  return (
    <textarea className={s.cnRoot} placeholder='Write comment...' value={value} onChange={e => setValue(e.target.value)} {...restProps} />
  )
}
