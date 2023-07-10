import React from 'react'
import s from './Comment.module.css'

export default function Comment({ nickname, text }) {
  return (
    <div className={s.cnCommentRoot}>
      <span className={s.cnCommentName}>{nickname}</span>
      <span className={s.cnCommentText}>{text}</span>
    </div>
  )
}
