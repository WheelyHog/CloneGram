export const GET_PHOTOS_SUCCESS = 'GET_PHOTOS_SUCCESS';
export const GET_PHOTOS_FAILED = 'GET_PHOTOS_FAILED';
export const GET_PHOTOS_STARTED = 'GET_PHOTOS_STARTED';
export const SET_PHOTOS_TOTAL = 'SET_PHOTOS_TOTAL';

export const MUTATE_PHOTOS_SUCCESS = 'MUTATE_PHOTOS_SUCCESS';
export const MUTATE_PHOTOS_FAILED = 'MUTATE_PHOTOS_FAILED';
export const MUTATE_PHOTOS_STARTED = 'MUTATE_PHOTOS_STARTED';

export const getPhotosSuccess = (photos) => ({ type: GET_PHOTOS_SUCCESS, payload: photos })
export const getPhotosFailed = (error) => ({ type: GET_PHOTOS_FAILED, payload: error })
export const getPhotosStarted = () => ({ type: GET_PHOTOS_STARTED })
export const setPhotosTotal = (total) => ({ type: SET_PHOTOS_TOTAL, payload: total })

export const mutatePhotosSuccess = () => ({ type: MUTATE_PHOTOS_SUCCESS })
export const mutatePhotosFailed = (error) => ({ type: MUTATE_PHOTOS_FAILED, payload: error })
export const mutatePhotosStarted = () => ({ type: MUTATE_PHOTOS_SUCCESS })