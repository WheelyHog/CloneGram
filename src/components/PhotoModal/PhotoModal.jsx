import React, { useEffect } from 'react'
import s from './PhotoModal.module.css'
import Modal from 'react-modal'
import UserBadge from '../UserBadge/UserBadge'
import Comment from '../Comment/Comment'
import TextArea from '../TextArea/TextArea'

export default function PhotoModal({ isOpen, onClose, imgUrl, username, avatarUrl, userId, comments, commentValue, setCommentValue, onCommentSubmit }) {

  useEffect(() => {
    const body = document.querySelector('body')
    if (isOpen) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} overlayClassName={s.cnModalOverlay} ariaHideApp={false} className={s.cnModal}>
      <div className={s.cnModalRoot}>
        <div className={s.cnModalImgWrapper}>
          <img src={imgUrl} alt={imgUrl} className={s.cnModalImg} />
        </div>
        <div className={s.cnModalCommentsBlock}>
          <div>
            <div className={s.cnModalHeader}>
              <UserBadge nickname={username} avatarUrl={avatarUrl} id={userId} />
            </div>
            <div className={s.cnModalComments}>
              {comments.map(comment => <Comment {...comment} />)}
            </div>
          </div>

          <div className={s.cnModalIcons}>
            <i className="far fa-heart" />
          </div>
          <TextArea placeholder='Write comment...' value={commentValue} onChange={setCommentValue} />
        </div>
        <div>

        </div>
      </div>
    </Modal>
  )
}
