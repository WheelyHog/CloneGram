import { GET_PHOTOS_FAILED, GET_PHOTOS_STARTED, GET_PHOTOS_SUCCESS, MUTATE_PHOTOS_FAILED, MUTATE_PHOTOS_STARTED, MUTATE_PHOTOS_SUCCESS, SET_PHOTOS_TOTAL } from "../actionCreators/photos";

const initialState = {
  photos: [],
  isPhotosLoading: true,
  totalPhotos: 0,
  isMutateLoading: false,
  isPhotoError: false
}


export const photosReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PHOTOS_STARTED:
      return { ...state, isPhotosLoading: true }

    case GET_PHOTOS_FAILED:
      return { ...state, isPhotosLoading: false, isPhotoError: true }

    case GET_PHOTOS_SUCCESS:
      return { ...state, photos: action.payload, isPhotosLoading: false, isPhotoError: false }

    case SET_PHOTOS_TOTAL:
      return { ...state, totalPhotos: action.payload }

    case MUTATE_PHOTOS_STARTED:
      return { ...state, isMutateLoading: true }

    case MUTATE_PHOTOS_SUCCESS:
      return { ...state, isMutateLoading: false }

    case MUTATE_PHOTOS_FAILED:
      return { ...state, isMutateLoading: false }

    default:
      return { ...state }
  }
}