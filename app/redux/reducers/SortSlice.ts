import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IToDo } from "../../interfaces/IToDo"

interface SortState {
    sortDescription: string
    sortCompleted: string
    sortDirection: string
}

const initialState: SortState = {
    sortDescription: 'Time',
    sortCompleted: 'All',
    sortDirection: 'Ascending'
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

export const { setSortDescription, setSortCompleted, sortDirection } = sortSlice.actions
export default sortSlice.reducer