import React, { useState } from 'react'
import s from './Card.module.css'
import cn from 'classnames'
import PhotoModal from '../PhotoModal/PhotoModal'

export default function Card({ imgUrl, className, likes, comments, isLikedByYou, onLikeClick, userData, isMutateLoading, onCommentSubmit }) {

  const [isModalVisisble, setModalVisible] = useState(false)
  const [comment, setComment] = useState('')

  return (
    <div className={cn(s.cnCardRoot, className)}>
      <img src={imgUrl} className={s.cnCardImage} alt='post_image' />
      <div className={s.cnCardHover}></div>
      <div className={s.cnCardIcons}>
        <i className={isLikedByYou ? 'fas fa-heart' : 'far fa-heart'} onClick={() => setModalVisible(true)} />
        <span className={s.cnCardNumber}>{likes}</span>
        <i className="far fa-comment" />
        <span className={s.cnCardNumber}>{comments.length}</span>
      </div>
      <PhotoModal
        {...userData}
        isOpen={isModalVisisble}
        onClose={() => setModalVisible(false)}
        comments={comments}
        commentValue={comment}
        setCommentValue={setComment}
        onCommentSubmit={() => onCommentSubmit(comment)}
        isCommentLoading={isMutateLoading}
        imgUrl={imgUrl}
        isLikedByYou={isLikedByYou}
        onLikeClick={onLikeClick}
      />
    </div>
  )
}
