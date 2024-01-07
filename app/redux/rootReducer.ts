import { combineReducers } from '@reduxjs/toolkit'
import toDoReducer from './reducers/ToDoSlice'
import sortReducer from './reducers/SortSlice'
import changeReducer from './reducers/ChangeSlice'
import authReducer from './reducers/AuthSlice'
import { todoAPI } from '../services/ToDoService'
import { userAPI } from '../services/AuthService'

export const rootReducer = combineReducers({
    toDoReducer,
    sortReducer,
    changeReducer,
    authReducer,
    [todoAPI.reducerPath]: todoAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer
})

export type RootState = ReturnType<typeof rootReducer>
