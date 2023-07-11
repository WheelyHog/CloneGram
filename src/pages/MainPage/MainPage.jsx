import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DetailedCard from '../../components/DetailedCard/DetailedCard'
import Layout from '../../components/Layout/Layout'
import { getPhotos, sendComment, toggleLike } from '../../redux/actions/photos'
import s from './MainPage.module.css'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Bars } from 'react-loader-spinner'


export default function MainPage() {

  const photos = useSelector(state => state.photos.photos)
  const isLoading = useSelector(state => state.photos.isPhotosLoading)
  const isError = useSelector(state => state.photos.isPhotoError)
  const total = useSelector(state => state.photos.totalPhotos)
  const authorizedUser = useSelector(state => state.users.authorizedUser)
  const mutateLoading = useSelector(state => state.users.mutateLoading)
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPhotos(page))
  }, [page])

  const nextHandler = () => {
    setPage(page + 1)
  }

  const onLikeClick = (photoId) => {
    dispatch(toggleLike(authorizedUser.id, photoId))
  }

  const onCommentSendClick = (photoId, comment) => {
    dispatch(sendComment(authorizedUser.nickname, photoId, comment))
  }

  if (isError) {

  }

  return (
    <div>
      <Layout nickname={authorizedUser.nickname} id={authorizedUser.id} avatarUrl={authorizedUser.avatarUrl}>
        <div className={s.cnMainPageRoot}>
          {isLoading && <Bars color={'#000BFF'} height='15' width='15' />}
          {!isError && !isLoading && <InfiniteScroll
            dataLength={photos.length}
            next={nextHandler}
            hasMore={photos.length < total}
            loader={<div className={s.cnMainLoaderContainer}>
              <Bars color={'#000BFF'} height='15' width='15' />
            </div>}
            endMessage={<p>That's all!</p>}
          >
            {photos.map(({ author, likes, imgUrl, comments, id }) => (
              <DetailedCard
                id={id}
                username={author.nickname}
                userId={author.id}
                likes={likes.length}
                isLikedByYou={likes.includes(authorizedUser.id)}
                comments={comments}
                imgUrl={imgUrl}
                key={author.id}
                avatarUrl={author.avatarUrl}
                onLikeClick={onLikeClick}
                onCommentSendClick={onCommentSendClick}
                mutateLoading={mutateLoading}
              />
            ))}
          </InfiniteScroll>}
        </div>
      </Layout>
    </div>
  )
}
