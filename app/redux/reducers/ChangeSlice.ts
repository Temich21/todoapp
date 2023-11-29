import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ChangeTasksState {
    editingId: number | null
    titleInput: string
    textInput: string
    timeInput: string
    priorityInput: string
}

const initialState: ChangeTasksState = {
    editingId: null,
    titleInput: '',
    textInput: '',
    timeInput: '',
    priorityInput: 'Priority 4'
}

const changeTaskSlice = createSlice({
    name: 'changeInput',
    initialState,
    reducers: {
        setEditingId(state: ChangeTasksState, action: PayloadAction<string>) {
            state.editingId = action.payload
        },
        setTaskTitle(state: ChangeTasksState, action: PayloadAction<string>) {
            state.titleInput = action.payload
        },
        setTaskText(state: ChangeTasksState, action: PayloadAction<string>) {
            state.textInput = action.payload
        },
        setTaskTimeToDo(state: ChangeTasksState, action: PayloadAction<string>) {
            state.timeInput = action.payload
        },
        setPriority(state: ChangeTasksState, action: PayloadAction<string>) {
            state.priorityInput = action.payload
        }

    },
})

export const { setEditingId, setTaskTitle, setTaskText, setTaskTimeToDo, setPriority } = changeTaskSlice.actions
export default changeTaskSlice.reducer