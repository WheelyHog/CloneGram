import { api } from "../../api"
import { getPostsFailed, getPostsStarted, getPostsSuccess } from "../actionCreators/postsByUser"

export const getPostsByUser = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(getPostsStarted())
      const response = await api.postsByUser.getPostsByUser({
        url: `/${userId}`
      })

      dispatch(getPostsSuccess(response.data.posts))
    } catch (error) {
      dispatch(getPostsFailed(error))
    }

  }
}

export const toggleLikeOnPost = (userId, postId, postAuthorId) => {
  return async (dispatch, getState) => {
    try {
      const posts = getState().postsByUser.posts

      const newPosts = [...posts]
      const newPostIndex = newPosts.findIndex(post => post.id === postId)
      const postForEdit = newPosts[newPostIndex]

      if (postForEdit.likes.includes(userId)) {
        postForEdit.likes = postForEdit.likes.filter(like => like !== userId)
      } else {
        postForEdit.likes.push(userId)
      }
      await api.postsByUser.mutatePosts({
        url: `/${postAuthorId}`,
        data: {
          id: postAuthorId,
          posts: newPosts
        }
      })
      dispatch(getPostsSuccess(newPosts))
    } catch (error) {

    }

  }
}
