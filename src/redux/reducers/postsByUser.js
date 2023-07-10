import { GET_POSTS_FAILED, GET_POSTS_STARTED, GET_POSTS_SUCCESS } from "../actionCreators/postsByUser";

const inititalState = {
  posts: [],
  isPostsLoading: true
}

export const postsByUserReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_POSTS_STARTED:
      return { ...state, isPostsLoading: true }

    case GET_POSTS_SUCCESS:
      return {
        ...state,
        isPostsLoading: false,
        posts: action.payload
      }

    case GET_POSTS_FAILED:
      return { ...state, isPostsLoading: false }

    default:
      return { ...state }
  }
}