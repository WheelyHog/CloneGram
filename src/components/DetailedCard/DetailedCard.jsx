import React, { useState } from 'react'
import s from './DetailedCard.module.css'
import UserBadge from '../UserBadge/UserBadge'
import Comment from '../Comment/Comment'
import cn from 'classnames'
import { nanoid } from 'nanoid'
import PhotoModal from '../PhotoModal/PhotoModal'
import TextArea from '../TextArea/TextArea'
import { Bars } from 'react-loader-spinner'

export default function DetailedCard({ username, avatarUrl, userId, imgUrl, likes, isLikedByYou, comments, onLikeClick, id, onCommentSendClick, mutateLoading }) {

  const renderComments = () => {
    if (comments.length > 2 && !isCommentsShown) {
      const commentsCopy = [...comments]
      const commentsForRender = commentsCopy.splice(comments.length - 2, 2)
      return (
        <>
          <span className={s.cnDetailedCardCommentTitle} onClick={() => setIsCommentsShown(true)}>{`Show another ${comments.length - commentsForRender.length} comments`}</span>
          {commentsForRender.map((elem, index) => <Comment {...elem} key={nanoid()} />)}
        </>
      )
    }
    return comments.map((elem, index) => <Comment {...elem} key={nanoid()} />)
  }

  const [isCommentsShown, setIsCommentsShown] = useState(false)
  const [comment, setComment] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleSendCommentClick = () => {
    if (comment) {
      onCommentSendClick(id, comment)
      setComment('')
    }
  }

  const onCloseModal = () => {
    setIsModalVisible(false)
    setComment('')
  }

  const onOpenModal = () => {
    setIsModalVisible(true)
    setComment('')
  }

  return (
    <div className={cn(s.cnDetailedCardRoot)}>
      <div className={s.cnDaetailedCardHeader}>
        <UserBadge nickname={username} avatarUrl={avatarUrl} id={userId} />
      </div>
      <div>
        {!isImageLoaded && <div className={s.cnImageLoader}><Bars width={15} height={15} /></div>}
        <img src={imgUrl} alt={'img'} className={cn(s.cnDetailedCardImg, isImageLoaded && s.cnDetailedCardImgLoaded)} onLoad={() => setIsImageLoaded(true)} />
      </div>
      <div className={s.cnDetailedCardButtons}>
        <i className={`${isLikedByYou ? 'fas' : 'far'} fa-heart`} onClick={() => onLikeClick(id)} />
        <i className="fas fa-comment" onClick={() => setIsModalVisible(true)} />
      </div>
      <div className={s.cnDetailedCardLikes}>
        {`${likes} people appreciated`}
      </div>
      <div className={s.cnDetailedCardComments}>
        {renderComments()}
      </div>
      <TextArea placeholder='Write comment...' value={comment} onChange={setComment} isLoading={mutateLoading} onSubmit={handleSendCommentClick} buttonText={'Send'} />
      <div className={s.cnDetailedCardTextareaWrapper}>
      </div>
      <PhotoModal
        username={username}
        avatarUrl={avatarUrl}
        userId={userId}
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        comments={comments}
        commentValue={comment}
        setCommentValue={setComment}
        onCommentSubmit={handleSendCommentClick}
        isCommentLoading={mutateLoading}
        imgUrl={imgUrl}
        isLikedByYou={isLikedByYou}
        onLikeClick={onLikeClick}
      />
    </div>
  )
}
