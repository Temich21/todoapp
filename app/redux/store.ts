import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
// import { createWrapper } from "next-redux-wrapper"
import storage from 'redux-persist/lib/storage'
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux'
import { rootReducer } from './rootReducer'
import { todoAPI } from '../services/ToDoService'
import { userAPI } from '../services/AuthService'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () =>
    configureStore({
        reducer: persistedReducer,
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(todoAPI.middleware)
                .concat(userAPI.middleware)
    })

// export const wrapper = createWrapper(makeStore)

export type AppStore = ReturnType<typeof makeStore>
export const useAppStore: () => AppStore = useStore

export type AppDispatch = AppStore['dispatch']
export const useAppDispatch: () => AppDispatch = useDispatch

export type RootState = ReturnType<AppStore['getState']>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
