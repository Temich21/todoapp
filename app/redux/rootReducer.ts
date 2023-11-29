import { combineReducers } from '@reduxjs/toolkit'
import toDoReducer from './reducers/ToDoSlice'
import sortReducer from './reducers/SortSlice'
import changeReducer from './reducers/ChangeSlice'

export const rootReducer = combineReducers({
    toDoReducer,
    sortReducer,
    changeReducer
})

export type RootState = ReturnType<typeof rootReducer>
