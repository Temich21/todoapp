import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AuthState {
    id: string
    email: string
    password: string
}

const initialState: AuthState = {
    id: '',
    email: '',
    password: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state: AuthState, action: PayloadAction<AuthState>) {
            state = { ...action.payload }
        }
    }
})

export const {
    setAuth
} = authSlice.actions

export default authSlice.reducer