import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Card from '../../components/Card/Card'
import Layout from '../../components/Layout/Layout'
import UserBio from '../../components/UserBio/UserBio'
import { getPostsByUser, sendCommentOnUserPage, toggleLikeOnPost } from '../../redux/actions/postsByUser'
import s from './UserPage.module.css'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Bars } from 'react-loader-spinner'
import { getUser } from '../../redux/actions/users'

export default function UserPage() {

  const authorizedUser = useSelector(state => state.users.authorizedUser)
  const user = useSelector(state => state.users.user)
  const posts = useSelector(state => state.postsByUser.posts)
  const isPostsLoading = useSelector(state => state.postsByUser.isPostsLoading)
  const isUserLoading = useSelector(state => state.users.isUserLoading)
  const mutateLoading = useSelector(state => state.photos.isMutateLoading)
  const [postsForRender, setPostsForRender] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    const newPosts = [...posts]
    if (newPosts.length) {
      setPostsForRender(newPosts.splice(0, 12))
    }
  }, [posts])

  const { id } = useParams()
  const dispatch = useDispatch()

  const onLikeClick = (photoId) => {
    dispatch(toggleLikeOnPost(authorizedUser.id, photoId, id))
  }

  const onCommentSendClick = (photoId, comment) => {
    dispatch(sendCommentOnUserPage(authorizedUser.nickname, photoId, user.id, comment))
  }

  useEffect(() => {
    dispatch(getPostsByUser(id))
    dispatch(getUser(id))
  }, [id, dispatch])

  const nextHandler = () => {
    const newPosts = [...posts]
    const offset = 12 * (page + 1)

    setPostsForRender([...postsForRender, ...newPosts.splice(offset, offset + 12)])
    setPage(page + 1)
  }


  return (
    <div>

      <Layout nickname={authorizedUser.nickname} id={authorizedUser.id} avatarUrl={authorizedUser.avatarUrl}>
        {isPostsLoading || isUserLoading ? <div className={s.cnMainLoaderContainer}>
          <Bars color={'#000BFF'} height='80' width='80' />
        </div>
          : <div className={s.cnUserPageRoot}>
            <UserBio
              avatarUrl={user.avatarUrl}
              nickname={user.nickname}
              subscribed={user.subscribed.length}
              subscribers={user.subscribers.length}
              firstname={user.firstname}
              lastname={user.lastname}
              description={user.description}
              url={user.url}
              isMyPage={id == authorizedUser.id}
              isSubscribed={user.subscribers.includes(authorizedUser.id)}
            />
            <div className={s.cnUserPageRootContent}>
              {postsForRender.length ?
                <InfiniteScroll
                  dataLength={postsForRender.length}
                  next={nextHandler}
                  hasMore={postsForRender.length < posts.length}
                  loader={<div className={s.cnMainLoaderContainer}>
                    <Bars color={'#000BFF'} height='15' width='15' />
                  </div>}
                  endMessage={<p>That's all!</p>}
                  className={s.cnUserPageScroll}
                >
                  {postsForRender.map(({ comments, likes, imgUrl, id }) =>
                    <Card
                      className={s.cnUserPageCard}
                      likes={likes.length}
                      comments={comments}
                      isLikedByYou={likes.includes(authorizedUser.id)}
                      onLikeClick={() => onLikeClick(id)}
                      imgUrl={imgUrl}
                      key={id}
                      userData={{
                        username: user.nickname,
                        avatarUrl: user.avatarUrl,
                        userId: user.id
                      }}
                      isMutateLoading={mutateLoading}
                      onCommentSubmit={(comment) => onCommentSendClick(id, comment)}
                    />)}
                </InfiniteScroll>
                : <p className={s.cnNoUserPosts}>User don't have posts!</p>}

            </div>
          </div>}
      </Layout>

    </div>
  )
}
