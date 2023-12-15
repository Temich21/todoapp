import { combineReducers } from '@reduxjs/toolkit'
import toDoReducer from './reducers/ToDoSlice'
import sortReducer from './reducers/SortSlice'
import changeReducer from './reducers/ChangeSlice'
import { todoAPI } from '../services/ToDoService'

export const rootReducer = combineReducers({
    toDoReducer,
    sortReducer,
    changeReducer,
    [todoAPI.reducerPath]: todoAPI.reducer
})

export type RootState = ReturnType<typeof rootReducer>
