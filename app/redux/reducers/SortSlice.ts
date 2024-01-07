import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SortState {
    sortDescription: string
    sortCompleted: string
}

const initialState: SortState = {
    sortDescription: 'Time Ascending',
    sortCompleted: 'All',
}

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSortDescription(state: SortState, action: PayloadAction<string>) {
            state.sortDescription = action.payload
        },
        setSortCompleted(state: SortState, action: PayloadAction<string>) {
            state.sortCompleted = action.payload
        },
    },
})

export const { setSortDescription, setSortCompleted } = sortSlice.actions
export default sortSlice.reducer