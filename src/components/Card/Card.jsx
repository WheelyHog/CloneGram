import React from 'react'
import s from './Card.module.css'
import cn from 'classnames'

export default function Card({ imgUrl, className, likes, comments, isLikedByYou, onLikeClick }) {
  return (
    <div className={cn(s.cnCardRoot, className)}>
      <img src={imgUrl} className={s.cnCardImage} alt='post_image' />
      <div className={s.cnCardHover}></div>
      <div className={s.cnCardIcons}>
        <i className={isLikedByYou ? 'fas fa-heart' : 'far fa-heart'} onClick={() => onLikeClick()} />
        <span className={s.cnCardNumber}>{likes}</span>
        <i className="far fa-comment" />
        <span className={s.cnCardNumber}>{comments}</span>
      </div>
    </div>
  )
}
