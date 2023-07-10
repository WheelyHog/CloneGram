import { photosReducer } from "./photosReducer";
import { combineReducers } from 'redux';
import { usersReducer } from "./usersReducer";
import { postsByUserReducer } from "./postsByUser";


export const rootReducer = combineReducers({
  photos: photosReducer,
  users: usersReducer,
  postsByUser: postsByUserReducer
})

