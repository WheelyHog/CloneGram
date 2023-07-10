import React from 'react'
import s from './UserCounter.module.css'

export default function UserCounter({ text, count }) {
  return (
    <div className={s.cnUserCounterWrapper}>
      <span className={s.cnUserCounterCount}>{count}</span>
      <span>{text}</span>
    </div>
  )
}
